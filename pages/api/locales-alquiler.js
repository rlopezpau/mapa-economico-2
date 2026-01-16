// Datos de ejemplo - Precio medio LOCALES COMERCIALES en ALQUILER (€/m²/mes)
// Fuente real: Idealista, Fotocasa

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', locales_alquiler: 18.5, num_locales: 8950, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', locales_alquiler: 16.2, num_locales: 7120, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', locales_alquiler: 11.8, num_locales: 1890, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', locales_alquiler: 12.5, num_locales: 1450, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', locales_alquiler: 9.2, num_locales: 620, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', locales_alquiler: 8.5, num_locales: 780, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', locales_alquiler: 7.8, num_locales: 1680, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', locales_alquiler: 9.5, num_locales: 4120, lat: 39.4699, lng: -0.3763 },
    { codigo: '03', nombre: 'Alicante', locales_alquiler: 8.2, num_locales: 2780, lat: 38.3452, lng: -0.4810 },
    { codigo: '41', nombre: 'Sevilla', locales_alquiler: 8.8, num_locales: 2950, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', locales_alquiler: 12.8, num_locales: 3450, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', locales_alquiler: 6.5, num_locales: 1450, lat: 36.5271, lng: -6.2886 },
    { codigo: '07', nombre: 'Illes Balears', locales_alquiler: 15.8, num_locales: 2180, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', locales_alquiler: 10.5, num_locales: 1890, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', locales_alquiler: 9.2, num_locales: 1340, lat: 28.4636, lng: -16.2518 },
    { codigo: '15', nombre: 'A Coruna', locales_alquiler: 7.2, num_locales: 980, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', locales_alquiler: 6.5, num_locales: 850, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', locales_alquiler: 6.8, num_locales: 540, lat: 43.1828, lng: -3.9878 },
  ],
}

export default function handler(req, res) {
  const { year = '2024' } = req.query
  const data = PROVINCIAS_DATA[year] || PROVINCIAS_DATA['2024']

  const geojson = {
    type: 'FeatureCollection',
    features: data.map((prov) => ({
      type: 'Feature',
      properties: {
        codigo: prov.codigo,
        nombre: prov.nombre,
        locales_alquiler: prov.locales_alquiler,
        num_locales: prov.num_locales,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
