# Escalado de Copiloto (copiloto.edilia.tech) a 1000 usuarios

> Documento de planificación. Fecha de medición: 2026-06-01.
> Objetivo: saber qué infraestructura hace falta para llegar a ~1000 usuarios
> concurrentes y cuánto cuesta, partiendo de **0 clientes**.
>
> El coste de **tokens de IA lo repercute el cliente** (margen ×5 configurado en
> `config/ia_pricing.php`), así que aquí dimensionamos solo la **infraestructura**,
> que es lo que paga Edilia.

---

## 1. Arquitectura real medida (VPS de producción)

Stack: **Laravel 12.53 + PHP-FPM 8.3 + nginx + Redis + Horizon**, con **MySQL**
(app) y **PostgreSQL 16 + pgvector** (RAG).

Puntos clave de la inferencia:

- **El chat NO usa LLM local.** Usa **Claude vía Vertex AI (europe-west1)** como
  primario y **AWS Bedrock (eu-central-1)** como fallback. Modelos:
  `claude-haiku-4-5`, `claude-sonnet-4-6`, `claude-opus-4-6`. → La inferencia del
  modelo **escala en la nube del proveedor**, no en el VPS.
- **Ollama local solo hace embeddings** (`nomic-embed-text`) para el RAG. Eso sí
  corre en la CPU del VPS.
- Marco RGPD: solo proveedores UE (Vertex EU, Bedrock EU, Mistral EU). No añadir
  proveedores US sin DPA.

### Recursos y límites medidos

| Recurso | Valor real medido | Implicación |
|---|---|---|
| CPU / RAM | 4 vCPU (8 hilos, AMD EPYC-Milan) / 15 GB | ~1,1 GB de swap usados casi en reposo |
| **php-fpm** | `pm=dynamic`, **`max_children=50`**, start=10, min_spare=5, max_spare=20, max_requests=500 | Techo de **~50 peticiones PHP simultáneas** |
| nginx | 8 workers × `worker_connections 1024` = 8192 | No es el cuello de botella |
| MySQL | `max_connections=300` | Holgado por ahora |
| **PostgreSQL (RAG)** | `max_connections=100` | Límite al escalar a varios nodos web → requiere PgBouncer |
| Horizon (colas) | `default`, `ia` (1–3 workers), `ocr`, `notifications`, `crm`, `ingesta` | Cola IA con pocos workers para asíncrono |
| **Cap de producto** | `global_daily=2000`, `tenant_hourly=20`, `tenant_daily=100` (`config/ai.php`) | **Tope duro de 2.000 mensajes IA/día** independientemente del hardware |
| Plan Free | 150.000 tokens "welcome" one-shot (`config/ia.php`) | Acota el coste de usuarios gratis |

---

## 2. Capacidad real actual (analítica)

El chat hace **streaming SSE** (`consulta-stream.php`): **cada respuesta retiene un
worker php-fpm durante toda la generación (~5–30 s)**. Por tanto:

- **Límite por workers:** `max_children=50` → como mucho ~50 chats en vuelo a la vez.
- **Límite por RAM:** cada worker php-fpm pesa ~160 MB → 50 × 160 MB ≈ **8 GB**.
  Con MySQL + PostgreSQL + Ollama + Horizon + Next/Docker ya ocupando ~7 GB en
  reposo, a 40–50 streams **se entra en swap** y la latencia se dispara.
- **Límite de producto:** el cap `global_daily=2000` corta a **2.000 mensajes/día**.

> **Capacidad segura actual ≈ 30–50 chats simultáneos y ~2.000 mensajes IA/día.**
> Suficiente para pilotos y primeras demos. Lejos de 1000 concurrentes reales
> (faltan ~6–7× en workers + un cambio de modelo de ejecución).

El número exacto de degradación se confirma con el **test de carga** (sección 5).

---

## 3. Plan de infraestructura por fases

Regla: **la infraestructura crece detrás de la demanda, no por delante.** Con 0
clientes no se monta nada nuevo. Todo en **proveedor EU (Hetzner)** para preservar
el marco RGPD.

| Fase | Disparador | Qué se monta | Capacidad objetivo | Coste/mes (Hetzner EU) |
|---|---|---|---|---|
| **0 — Hoy** | 0 clientes, pilotos | VPS actual + ajustes baratos: subir caps internos, tune php-fpm | ~30–50 concurrentes | **€0 extra** |
| **1 — Primeros clientes** | 1–10 ayuntamientos / cientos de usuarios/día | Subir a **8 vCPU / 32 GB** + migrar chat a **Laravel Octane** (Swoole/RoadRunner) para romper el límite "1 worker = 1 conversación" | ~150–300 concurrentes | **~€60–80** |
| **2 — Escala** | Camino a 1000 concurrentes | **2–3 nodos web** (Octane) + **balanceador** (HAProxy/nginx) + **nodo BD dedicado** + **PgBouncer** + Redis aparte | ~1000 concurrentes | **~€320** |

Detalle de la Fase 2:

| Componente | Aprox. €/mes |
|---|---|
| 3× nodo web con Octane (8 vCPU / 32 GB) | 180 |
| 1× nodo BD (16 vCPU / 64 GB, MySQL + PostgreSQL) + PgBouncer | 120 |
| Redis dedicado + balanceador | ~20 |
| **Total infraestructura** | **~€320** |

> En hiperescalar gestionado EU (AWS/GCP con BD gestionada) el equivalente sube a
> **~€2.000–4.000/mes**. Hetzner es la opción coste-eficiente y RGPD-compatible.

### Lo que NO escala con hardware (acción humana, con antelación)

- Subir el cap interno `global_daily` (y `tenant_*`) en `config/ai.php`.
- Pedir **aumento de cuota (RPM/TPM)** a **Vertex AI** y **Bedrock**.
- Mantener **DPA / RGPD** con cada proveedor.

---

## 4. Coste de tokens (lo paga el cliente — referencia)

Precios reales del catálogo `app/Helpers/ApiUsageLogger.php` (Vertex EU, EUR):

| Modelo | Input | Output | Coste/turno típico* |
|---|---|---|---|
| Haiku 4.5 | €0,728 /M tok | €3,64 /M tok | ~€0,009 (9k in + 0,8k out, con RAG) |
| Sonnet 4.6 | €2,73 /M tok | €13,65 /M tok | ~€0,041 (10k in + 1k out) |
| Mistral Small | €0,137 /M tok | €0,546 /M tok | marginal (embeddings/doc) |

\* "turno" = una pregunta-respuesta con contexto RAG. Mezcla realista (~70 % Haiku /
30 % Sonnet) → **~€0,015 por mensaje** de coste real. Con margen ×5, lo imputado al
cliente es ~€0,075/mensaje.

Como el coste de tokens se repercute al cliente, **no afecta al presupuesto de
infraestructura de Edilia**. Solo hay que vigilarlo para facturación y alertas de
gasto.

---

## 5. Cómo medir la capacidad real (test de carga)

Script: [`load-tests/copiloto-chat.k6.js`](../load-tests/copiloto-chat.k6.js).

Hace una **rampa controlada de usuarios virtuales** contra el endpoint de chat y
mide latencia (p95), tasa de error y a partir de qué concurrencia empieza la
degradación. Por defecto apunta a `http://localhost` y **exige fijar `BASE_URL`
explícitamente** para no golpear producción por accidente.

```bash
# Instalar k6: https://k6.io/docs/get-started/installation/

# 1) Contra un entorno de staging/local (recomendado)
BASE_URL=https://staging.tu-dominio CHAT_PATH=/api/chat AUTH_TOKEN=xxx \
  k6 run load-tests/copiloto-chat.k6.js

# 2) Smoke test muy suave para validar el script (1 VU, 30s)
BASE_URL=http://localhost k6 run --vus 1 --duration 30s load-tests/copiloto-chat.k6.js
```

> ⚠️ **No ejecutar contra producción sin acordarlo.** Un test de carga real genera
> tráfico real: consumiría cuota de Vertex/Bedrock, tokens y workers. Si se hace
> contra el VPS de producción, hacerlo en ventana de bajo uso, con rampa baja y
> avisando. Lo ideal es un entorno de staging idéntico.

### Qué buscar en los resultados

- **Concurrencia de degradación:** VUs a partir de los cuales `http_req_duration`
  p95 se dispara o aparecen errores → ese es tu techo real actual.
- **Saturación de workers:** correlacionar con `pm.max_children=50`.
- **Swap:** vigilar `free -h` en el VPS durante la prueba.

---

## 6. Recomendación

1. **Ahora (0 clientes):** no montar infraestructura nueva. El VPS actual cubre
   pilotos. Como mucho, subir caps internos cuando haga falta.
2. **Antes del primer cliente:** ejecutar el test de carga en staging para fijar el
   número real de degradación y preparar la migración a Octane (Fase 1).
3. **Con tracción:** saltar a Fase 1 (vertical + Octane) y, solo al acercarse a los
   límites, a Fase 2 (horizontal). Pedir cuota a Vertex/Bedrock con días de
   antelación.

**El cuello de botella no es Claude** (escala en la nube), son tres cosas propias:
(1) php-fpm + streaming → Octane, (2) el cap interno de 2.000/día, (3) la
observabilidad de coste. Las tres son abordables por fases y sin gasto prematuro.
