# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Mapa Económico** — Next.js + React web app that renders an interactive map of Spain with toggleable socioeconomic layers (PIB per cápita, unemployment, IPC, salaries, population), a year selector, municipality search, and PNG export. Data is served from internal `/api/*` endpoints as GeoJSON and rendered with React‑Leaflet. README is in Spanish; user‑facing copy should remain in Spanish.

## Current repository state

This repo is a **scaffold**. Only config files (`package.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`) and `README.md` are committed. The `components/`, `pages/` (including `pages/api/`), `public/`, and `styles/` directories described in the README do **not exist yet** — they must be created when implementing features. Do not assume existing source files; verify with `ls`/`Glob` before editing.

## Commands

```bash
npm install        # install deps (Node 18+)
npm run dev        # next dev — http://localhost:3000
npm run build      # next build (production)
npm run start      # next start (serve production build)
npm run lint       # next lint
```

There is no test runner configured. If adding tests, wire up the framework and a `test` script explicitly; don't assume one exists.

## Architecture (as described by README — to be implemented)

- **Pages Router** (Next.js 13.5). `pages/index.js` is the map page; `pages/fuentes.js` documents data sources/methodology.
- **API routes** under `pages/api/*` return GeoJSON per indicator. Each layer (PIB, paro, IPC, salarios, población) should have its own endpoint and accept a year parameter for historical series.
- **Map rendering** uses `react-leaflet` + `leaflet`. The main component (`MapView`) consumes GeoJSON from the API and composes with `LayerToggle`, `Legend`, year selector, and municipality autocomplete.
- **Data fetching** uses `@tanstack/react-query` v4 — cache/invalidate per layer+year key rather than fetching ad hoc in components.
- **Export** uses `html-to-image` to snapshot the map container to PNG.

### React‑Leaflet + Next.js SSR

Leaflet touches `window` on import and will crash during SSR. Import `MapContainer` and any react‑leaflet components via `next/dynamic` with `{ ssr: false }`, or gate rendering on a client‑only flag. Also import Leaflet's CSS (`leaflet/dist/leaflet.css`) once (e.g. in `pages/_app.js`), and fix the default marker icon paths if using default markers.

### Styling

Tailwind is configured to scan `./pages/**/*.{js,ts,jsx,tsx}` and `./components/**/*.{js,ts,jsx,tsx}` only. New top‑level source directories must be added to `tailwind.config.js` `content` or their classes will be purged.

## CI caveat

`.github/workflows/npm-grunt.yml` runs `npm install && grunt` on Node 18/20/22, but there is **no Gruntfile and no `grunt` dependency** in `package.json`. The workflow will fail until it is rewritten (e.g. to `npm run build` / `npm run lint`) or a Grunt setup is added. Flag this when touching CI.

## Conventions

- Keep API responses as valid GeoJSON `FeatureCollection`s keyed by province/municipality code so the client can merge indicator values with geometries.
- Per README roadmap, sample data is a placeholder — real sources are INE and official datasets. Keep the `fuentes.js` page in sync with any new data source you add.
