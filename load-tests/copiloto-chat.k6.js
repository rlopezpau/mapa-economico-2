// Test de carga del chat de Copiloto (copiloto.edilia.tech)
//
// Mide a partir de qué concurrencia el endpoint de chat empieza a degradarse,
// para fijar la capacidad real del despliegue actual (php-fpm max_children=50,
// streaming SSE que retiene un worker por conversación).
//
// USO
//   k6 run load-tests/copiloto-chat.k6.js
//
//   Variables de entorno:
//     BASE_URL    (OBLIGATORIA salvo localhost) URL base, p.ej. https://staging.tu-dominio
//     CHAT_PATH   ruta del endpoint de chat (def: /api/chat)
//     AUTH_TOKEN  Bearer token si el endpoint requiere auth (opcional)
//     PROMPT      texto a enviar (def: pregunta corta de prueba)
//     MAX_VUS     pico de usuarios virtuales de la rampa (def: 60)
//     STREAM      "1" si el endpoint responde SSE/streaming (def: 1)
//     I_UNDERSTAND_PROD  poner "yes" para permitir apuntar a un dominio de producción
//
// SEGURIDAD
//   - Por defecto BASE_URL = http://localhost. Apuntar a un host remoto exige
//     fijar BASE_URL explícitamente.
//   - Apuntar a dominios de producción conocidos está BLOQUEADO salvo que se
//     pase I_UNDERSTAND_PROD=yes (un load test consume cuota y tokens reales).

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'http://localhost';
const CHAT_PATH = __ENV.CHAT_PATH || '/api/chat';
const AUTH_TOKEN = __ENV.AUTH_TOKEN || '';
const PROMPT = __ENV.PROMPT || '¿Qué documentación necesito para empadronarme?';
const MAX_VUS = parseInt(__ENV.MAX_VUS || '60', 10);
const STREAM = (__ENV.STREAM || '1') === '1';
const ALLOW_PROD = (__ENV.I_UNDERSTAND_PROD || '') === 'yes';

// Guarda anti-producción: evita golpear los dominios reales por accidente.
const PROD_HOSTS = ['copiloto.edilia.tech', 'ia.ayto.app', 'ayto.app', 'edilia.tech'];
if (!ALLOW_PROD) {
  for (const h of PROD_HOSTS) {
    if (BASE_URL.includes(h)) {
      throw new Error(
        `BASE_URL apunta a un host de producción (${h}). Un test de carga genera ` +
        `tráfico real y consume cuota/tokens. Usa staging, o pasa I_UNDERSTAND_PROD=yes ` +
        `solo si lo has acordado y en ventana de bajo uso.`
      );
    }
  }
}

const ttfb = new Trend('chat_ttfb', true);          // time-to-first-byte (sensible al streaming)
const fullDuration = new Trend('chat_full_duration', true);
const errorRate = new Rate('chat_errors');

export const options = {
  // Rampa: sube usuarios poco a poco para ver DÓNDE empieza la degradación.
  stages: [
    { duration: '30s', target: Math.max(1, Math.round(MAX_VUS * 0.1)) },
    { duration: '1m', target: Math.round(MAX_VUS * 0.33) },
    { duration: '1m', target: Math.round(MAX_VUS * 0.66) },
    { duration: '2m', target: MAX_VUS },
    { duration: '1m', target: MAX_VUS },   // sostiene el pico
    { duration: '30s', target: 0 },         // baja
  ],
  thresholds: {
    // Umbrales orientativos: ajustar a tu SLA. Marcan "degradado" si se superan.
    chat_ttfb: ['p(95)<5000'],
    chat_full_duration: ['p(95)<30000'],
    chat_errors: ['rate<0.02'],
  },
};

export default function () {
  const url = `${BASE_URL}${CHAT_PATH}`;
  const headers = { 'Content-Type': 'application/json' };
  if (AUTH_TOKEN) headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  if (STREAM) headers['Accept'] = 'text/event-stream';

  const payload = JSON.stringify({
    message: PROMPT,
    stream: STREAM,
  });

  const start = Date.now();
  const res = http.post(url, payload, { headers, timeout: '60s' });
  const elapsed = Date.now() - start;

  // Con respuesta no-streaming, ttfb ≈ duración total. Con streaming real habría
  // que usar la API de streaming de k6; aquí medimos la duración de la petición
  // completa, que ya basta para detectar saturación de workers.
  ttfb.add(res.timings.waiting);
  fullDuration.add(elapsed);

  const ok = check(res, {
    'status 200': (r) => r.status === 200,
    'cuerpo no vacío': (r) => r.body && r.body.length > 0,
  });
  errorRate.add(!ok);

  // "Think time": un usuario real no encadena mensajes sin pausa.
  sleep(Math.random() * 3 + 2); // 2–5 s
}

export function handleSummary(data) {
  const p95 = (m) => (data.metrics[m] ? Math.round(data.metrics[m].values['p(95)']) : 'n/a');
  const rate = (m) => (data.metrics[m] ? (data.metrics[m].values.rate * 100).toFixed(2) : 'n/a');
  const line = '─'.repeat(56);
  const summary =
    `\n${line}\n` +
    `RESUMEN TEST DE CARGA — Copiloto chat\n` +
    `${line}\n` +
    `Target            : ${BASE_URL}${CHAT_PATH}\n` +
    `Pico VUs          : ${MAX_VUS}\n` +
    `TTFB p95          : ${p95('chat_ttfb')} ms\n` +
    `Duración total p95: ${p95('chat_full_duration')} ms\n` +
    `Errores           : ${rate('chat_errors')} %\n` +
    `${line}\n` +
    `Interpreta: el nº de VUs donde TTFB p95 o errores se disparan es tu\n` +
    `techo real de concurrencia. Correlaciónalo con php-fpm max_children=50\n` +
    `y vigila el swap del VPS (free -h) durante la prueba.\n${line}\n`;
  return { stdout: summary };
}
