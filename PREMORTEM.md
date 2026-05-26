# Premortem · edilia.tech

> **Ejercicio**: Es mayo de 2027. Edilia.tech ha fracasado. La empresa cierra, pivota radicalmente o entra en zombie-mode (ingresos planos, churn que iguala altas, sin runway para seguir invirtiendo). Trabajamos hacia atrás: ¿qué pasó?

---

## 0. Supuestos de partida (corrígeme si me desvío)

Sin briefing previo, asumo lo siguiente. Si algo no encaja, el premortem se rehace en minutos cambiando estos supuestos:

- **Qué es**: SaaS PropTech español para **administradores de fincas** y/o **comunidades de propietarios** — gestión de incidencias, juntas, derramas, comunicación con vecinos, contabilidad básica.
- **Etapa**: MVP en mercado con primeros clientes de pago (10–100 comunidades / 5–20 despachos administradores), buscando product-market fit y modelo de venta repetible.
- **Mercado primario**: España (LOPD/LPH, modelo de administrador colegiado).
- **Modelo**: SaaS recurrente, probablemente per-comunidad/mes o per-vivienda/mes, vendido al administrador (B2B) que es quien decide e instala.
- **Equipo**: pequeño (2–6 personas), founder técnico + comercial/dominio, sin ronda institucional o pre-seed.
- **Horizonte del premortem**: 12 meses.

---

## 1. Top 5 causas más probables de fracaso (ranked)

Ordenadas por **probabilidad × impacto**, no por gravedad individual. Si solo lees una sección, lee esta.

### #1 — Vendemos al administrador pero el valor lo siente el vecino
El administrador de fincas es un decisor conservador con margen ajustado: no cambia de software por un producto "más bonito". El vecino sí adoraría la app moderna, pero **no paga ni decide**. Resultado: demos que entusiasman al presidente de la comunidad pero el administrador bloquea porque le obligaría a re-formar al equipo, migrar 15 años de datos, y arriesgar su relación con los clientes. **Ciclos de venta de 4–9 meses, conversión <10%, CAC insostenible.**

> *Señal temprana*: "Nos encanta pero ahora no es buen momento" repetido en 3+ pipelines consecutivos. Demos con presidente sin administrador presente.

### #2 — Competencia incumbente (Gesfincas, Fincas Plus, TAAF, Netfincas…) baja precio o copia features
El mercado ya tiene ERPs verticales con 20+ años, integraciones bancarias, certificaciones fiscales y red comercial vía colegios profesionales. **No competimos contra "nada", competimos contra costumbre + integración contable + soporte telefónico en español.** Si un incumbente lanza una app móvil decente, nuestra principal ventaja diferencial desaparece en un sprint.

> *Señal temprana*: deals perdidos porque "ya nos lo da X gratis en el módulo nuevo". Tu feature estrella aparece en el changelog de un competidor.

### #3 — Quemamos caja en custom development para los 3 primeros clientes "ancla"
Para cerrar las primeras 5 cuentas grandes hicimos promesas: "integramos con vuestro banco", "exportación al formato del gestor X", "módulo de morosos a medida". Cada cuenta arrastra 2–4 semanas de dev no reutilizable. **El producto se convierte en una agencia de servicios disfrazada de SaaS**, ingresos crecen lineal con headcount, no hay apalancamiento. Cuando llega el momento de levantar ronda, el ARR per FTE asusta.

> *Señal temprana*: roadmap de producto = unión de peticiones de los 3 mayores clientes. Más de 30% del tiempo de ingeniería en "integraciones".

### #4 — Regulación y datos sensibles nos pillan sin estructura
Gestionamos datos personales de miles de vecinos (RGPD), domiciliaciones SEPA, votos electrónicos en juntas (validez legal cuestionable según estatutos), libro de actas firmado. **Una sola brecha de datos, un solo voto impugnado en una junta, y la confianza del segmento — que es boca-oreja puro — se evapora.** Sin DPO, sin auditoría, sin contratos de encargado bien firmados, el primer susto nos sienta en el despacho del abogado durante 6 meses.

> *Señal temprana*: incidencias de seguridad menores sin postmortem. Quejas de RGPD que se contestan sin protocolo. Ningún cliente nos ha pedido aún un DPA.

### #5 — Founder técnico se quema o el comercial no aparece
En etapa MVP-tracción la fricción operativa es brutal: onboarding manual, soporte de primera línea, demos, ventas, hiring, producto, infra. Si la pareja founder no está bien complementada (técnico fuerte + alguien que vende y conoce el dominio profundamente), uno de los dos colapsa antes del mes 9. **El equipo se rompe no por falta de talento sino por falta de reparto claro de owner­ship.**

> *Señal temprana*: founders haciendo soporte de tier-1 a las 23h. Ningún nuevo cliente entrado en el mes por canal repetible (todos vienen "de un conocido").

---

## 2. Modos de fracaso por área

### 🎯 Mercado y demanda
- **TAM real español más pequeño de lo modelado**: ~9.000 despachos de administradores colegiados, pero solo el tercio superior tiene capacidad de pagar SaaS moderno. ARPU realista bajo presiona unit economics.
- **Estacionalidad de juntas (febrero-junio)**: el resto del año el producto se usa poco → percepción de "no merece la pena" en el 60% del calendario.
- **Adopción multi-stakeholder**: necesitas que adopten administrador + presidente + 60% de vecinos para que el producto funcione. Cualquier eslabón frena.

### 🛠 Producto y tecnología
- **Migración de datos desde Excel/software legacy** mal resuelta → cada cliente nuevo es un proyecto de 2 semanas.
- **App móvil del vecino con baja retención** (se abre 3 veces al año en junta) → ratios DAU/MAU horribles aunque el negocio funcione bien.
- **Notificaciones legales certificadas** (burofax, convocatorias con validez legal) requieren integración con Lleida.net/Logalty u homólogo → si se hace mal, las actas se impugnan.
- **Contabilidad y SEPA**: si no compite con el ERP contable del administrador, queda como herramienta secundaria → primer recorte de gasto cuando el cliente prioriza.

### 💸 Go-to-market y ventas
- **Sin canal por colegios profesionales** (CAF — Colegio de Administradores de Fincas), captar despachos uno a uno es prohibitivo.
- **Pricing demasiado bajo** ("queremos ser asequibles") → no podemos pagar comerciales → no escalamos.
- **Pricing demasiado alto** sin caso de negocio cuantificado para el administrador (¿cuántas horas le ahorras al mes en €?) → demos que no cierran.
- **Sin programa de partners** con instaladores/asesorías locales que ya tienen la relación con el cliente.

### ⚙️ Operaciones
- **Soporte tier-1 sin escalado**: vecinos de 70+ años llamando para reset de contraseña → un FTE entero consumido en 3 meses.
- **Onboarding de comunidad nueva** no productizado → cada alta requiere founder presente.
- **SLA implícito**: el día de la junta el sistema TIENE que ir → una caída en horario crítico = cliente perdido + boca-oreja negativo en el sector.

### 👥 Equipo y cultura
- **Single point of failure técnico**: founder lleva todo el backend → vacaciones imposibles → enfermedad = paralización.
- **Sin alguien del dominio en el equipo**: nadie ha sido administrador de fincas → producto técnicamente correcto pero ergonómicamente extraterrestre para el usuario real.
- **Equity y vesting mal definidos** entre co-founders → primera tensión seria (decisión de pivot o de levantar ronda) destruye la relación.

### 💰 Financiación y unit economics
- **CAC payback > 18 meses** con churn anual >15% → estructuralmente no funciona.
- **Bootstrap demasiado largo**: 18 meses sin ronda quema al equipo, sale talento, founders aceptan condiciones malas en la primera ronda que llega.
- **Ronda levantada demasiado temprano** con poco tracking → dilución alta, board exigente, runway que tampoco alcanza el siguiente milestone.

### ⚖️ Regulatorio y legal
- **RGPD mal implementado**: consentimientos no granulares, datos sensibles (incidencias médicas en partes de obra) sin tratamiento especial.
- **Ley de Propiedad Horizontal**: votación electrónica, asistencia remota a juntas, contabilización de quorum — un error y la junta es nula.
- **Conservación de actas** durante 5+ años con integridad probable → backup, firma, no-repudio.

### 🥊 Competencia
- **Incumbentes verticales** con red comercial y contabilidad consolidada.
- **Horizontales** (Notion, Slack + un Drive bien montado) "suficientemente buenos" para administradores pequeños.
- **Bancos** lanzando módulos gratuitos para comunidades como gancho de cuenta (Santander, CaixaBank ya tienen movimientos en esta línea).
- **Nuevo entrante con más capital**: alguien con €2M de seed nos hace dumping durante 18 meses.

---

## 3. Matriz Probabilidad × Impacto

| Riesgo | Prob. | Impacto | Prioridad |
|---|---|---|---|
| Decisor (administrador) ≠ usuario que ama el producto (vecino) | Alta | Alto | **🔴 P0** |
| Custom dev para anclas mata márgenes | Alta | Alto | **🔴 P0** |
| Founder burnout / equipo desequilibrado | Media-Alta | Alto | **🔴 P0** |
| Incumbente baja precio o copia | Media | Alto | 🟠 P1 |
| Brecha de datos / acta impugnada | Baja-Media | Crítico | 🟠 P1 |
| Estacionalidad de uso erosiona percepción de valor | Media | Medio | 🟡 P2 |
| Pricing mal calibrado | Media | Medio | 🟡 P2 |
| Canal CAF cerrado o caro | Media | Medio | 🟡 P2 |
| Banco ofrece equivalente gratuito | Baja | Alto | 🟡 P2 |

---

## 4. Señales tempranas (lo que veremos antes de que sea tarde)

Revisar mensualmente. Si **dos o más** se cumplen el mismo mes → reunión de equipo para discutir pivot/cambio.

- [ ] CAC payback > 14 meses durante dos trimestres seguidos
- [ ] Más de 30% del tiempo de ingeniería en peticiones específicas de un solo cliente
- [ ] Net Revenue Retention < 100% en cohortes con 6+ meses
- [ ] Pipeline donde >50% de oportunidades están en "evaluación" >90 días
- [ ] 0 nuevos clientes llegados por canal repetible en un mes (todos vía warm intros)
- [ ] Cualquier incidente de seguridad sin postmortem documentado en 48h
- [ ] Founders haciendo soporte de tier-1 más de 5h/semana cada uno
- [ ] Un competidor anuncia funcionalidad equivalente a nuestra principal diferenciación
- [ ] Cliente pide DPA / auditoría de seguridad y no tenemos respuesta lista
- [ ] Demo del presidente entusiasmado pero administrador bloquea — patrón repetido 3 veces

---

## 5. Contramedidas — qué hacer en los próximos 90 días

### Antes de 30 días
1. **Documentar el ICP exacto**: un solo perfil de administrador (tamaño de cartera, edad, software actual, geografía). Todo lo demás se pospone.
2. **Cuantificar el ROI para el administrador en euros/hora**: si no sabemos decir "te ahorra X horas/mes = Y€", no tenemos pitch.
3. **Auditoría RGPD básica**: encargado de tratamiento firmado con cada cliente, registro de actividades, DPO externo si es necesario (~150€/mes).
4. **Postmortem template** preparado para el primer incidente.

### Antes de 60 días
5. **Cerrar política de "no custom dev"**: integraciones y features solo si sirven a ≥3 clientes o son standard del sector. Si un cliente quiere algo único, se factura como servicio aparte y se documenta como no-roadmap.
6. **Probar canal CAF** (charlas en colegios, sponsoring de eventos, contenido en revistas del sector). Si en 60 días no hay 5 leads cualificados por este canal, descartar y probar partners (asesorías que ya venden a administradores).
7. **Definir SLA explícito** y plan de respaldo para días de junta (febrero-junio).

### Antes de 90 días
8. **Co-founder o primera contratación con dominio profundo**: ex-administrador, ex-empleado de Gesfincas/Fincas Plus, abogado especializado en propiedad horizontal. Sin esto, vamos ciegos.
9. **Decisión bootstrap vs. ronda** basada en runway real y velocidad de NRR. Documentar la decisión y sus condiciones de revisión.
10. **Sesión con 5 clientes "fans"** preguntando: "Si tuvieras que cancelarnos mañana, ¿cuál sería la razón?" — es el premortem hecho con datos reales.

---

## 6. Cosas que NO son riesgos principales aunque parezcan

Para no malgastar atención:

- **Elegir el stack tecnológico "equivocado"**: irrelevante a esta escala. Cualquier stack moderno aguanta los próximos 3 años.
- **Falta de features**: el roadmap no es el problema; el problema es vender lo que ya hay.
- **Marca / logo / nombre**: no decide nada hasta que tengas 500 clientes.
- **Internacionalización temprana**: España solo tiene complejidad suficiente para 3 años de trabajo. LATAM/Portugal son distracción hasta PMF.
- **"Y si entra Google/Microsoft"**: no entrarán en este vertical. El riesgo es el incumbente local, no el gigante.

---

## 7. Cómo usar este documento

- **Reunión de equipo de 60 minutos**: cada persona vota sus tres riesgos más temidos en silencio antes de discutir.
- **Revisar trimestralmente**: los riesgos cambian de orden conforme avanza la empresa.
- **Owner por cada P0/P1**: si nadie es responsable de un riesgo, no se mitiga.
- **El éxito del premortem se mide al revés**: si dentro de 12 meses los riesgos que se cumplieron fueron los listados aquí, el ejercicio funcionó (aunque la empresa haya sufrido). Si fracasó por algo no listado, el siguiente premortem debe ser más ancho.

---

*Documento generado como ejercicio de premortem. Los supuestos de partida (§0) son hipótesis; ajustar el documento si edilia.tech opera en un vertical, etapa o modelo distinto.*
