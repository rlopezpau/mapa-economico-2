# Tests de carga — Copiloto

Mide la capacidad real del despliegue antes de gastar en infraestructura.
Ver el plan completo en [`docs/escalado-1000-usuarios.md`](../docs/escalado-1000-usuarios.md).

## Requisitos

- [k6](https://k6.io/docs/get-started/installation/) instalado.

## Ejecutar

```bash
# Smoke test (valida el script sin carga): 1 usuario, 30s, contra localhost
BASE_URL=http://localhost k6 run --vus 1 --duration 30s load-tests/copiloto-chat.k6.js

# Test de capacidad contra staging (rampa hasta 60 usuarios)
BASE_URL=https://staging.tu-dominio CHAT_PATH=/api/chat AUTH_TOKEN=xxx \
  MAX_VUS=60 k6 run load-tests/copiloto-chat.k6.js
```

## Variables

| Var | Def | Descripción |
|---|---|---|
| `BASE_URL` | `http://localhost` | URL base del entorno a probar |
| `CHAT_PATH` | `/api/chat` | Ruta del endpoint de chat |
| `AUTH_TOKEN` | — | Bearer token si hace falta auth |
| `PROMPT` | pregunta de ejemplo | Texto a enviar |
| `MAX_VUS` | `60` | Pico de usuarios virtuales |
| `STREAM` | `1` | `1` si el endpoint responde SSE |
| `I_UNDERSTAND_PROD` | — | `yes` para permitir apuntar a producción (consume cuota/tokens reales) |

## ⚠️ Producción

El script **bloquea por defecto** los dominios de producción (`copiloto.edilia.tech`,
`ia.ayto.app`, …). Un test de carga genera tráfico real y consume cuota de
Vertex/Bedrock y tokens. Hazlo contra **staging**. Si necesitas medir producción,
acuérdalo antes, en ventana de bajo uso y con rampa baja (`I_UNDERSTAND_PROD=yes`).

## Interpretar

El número de VUs en el que el **TTFB p95** o la **tasa de error** se disparan es tu
**techo real de concurrencia**. Correlaciónalo con `php-fpm max_children=50` y vigila
el swap (`free -h`) en el VPS durante la prueba.
