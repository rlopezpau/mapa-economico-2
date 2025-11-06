# Mapa Económico

Este proyecto es una aplicación web interactiva desarrollada con Next.js y React que muestra un mapa de España con distintos indicadores económicos (PIB per cápita, tasa de paro, IPC, salarios medios y población). Los datos se cargan a través de endpoints internos que devuelven GeoJSON y se visualizan sobre un mapa mediante la biblioteca React‑Leaflet. Esta herramienta está pensada para visualizaciones en tiempo real y para experimentar con datos públicos de interés socioeconómico.

## Características

- Selección de capas económicas: PIB per cápita, paro, IPC, salarios y población.
- Selector de año para consultar la serie histórica.
- Mapa interactivo con geolocalización y tooltip informativo por provincia/municipio.
- Cuadro de búsqueda de municipios con autocompletado.
- Exportación de la vista del mapa a formato PNG.
- Página de fuentes y metodología con enlaces oficiales a los datos.

## Estructura del proyecto

```
/
├── components          # Componentes de interfaz (MapView, LayerToggle, Legend, etc.)
├── pages               # Rutas Next.js (incluye `/api` para los endpoints)
│   ├── api             # Endpoints REST que devuelven GeoJSON para cada indicador
│   ├── index.js        # Página principal con el mapa
│   └── fuentes.js      # Página con la descripción de fuentes y metodología
├── public              # Recursos estáticos (imágenes, iconos, etc.)
├── styles              # (opcional) Archivos CSS adicionales si los necesita
├── package.json        # Configuración de dependencias y scripts
├── tailwind.config.js  # Configuración de TailwindCSS
├── postcss.config.js   # Configuración de PostCSS
└── README.md           # Este documento
```

## Instalación

1. Asegúrate de tener Node.js 18 o superior y npm/pnpm instalados.
2. Clona este repositorio:
   ```bash
   git clone https://github.com/rlopezpau/mapa-economico.git
   cd mapa-economico
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue

Puedes desplegar la aplicación en cualquier plataforma compatible con Next.js (como Vercel). Basta con importar el repositorio y configurar la rama de producción.

## Roadmap

- [ ] Sustituir los datos de ejemplo por datos reales procedentes del INE u otras fuentes oficiales.
- [ ] Añadir archivos shapefile con geometrías completas de provincias y municipios.
- [ ] Implementar un selector de ámbito (comunidad autónoma, provincia, municipio).
- [ ] Mejora del buscador con un listado completo de municipios españoles.
- [ ] Añadir gráficos y comparativas temporales.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.