// Datos de ejemplo - Precio medio LOCALES COMERCIALES en VENTA (€/m²)
// Fuente real: Idealista, Fotocasa

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', locales_venta: 3850, num_locales: 12450, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', locales_venta: 3420, num_locales: 9870, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', locales_venta: 2180, num_locales: 2340, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', locales_venta: 2350, num_locales: 1890, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', locales_venta: 1780, num_locales: 890, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', locales_venta: 1450, num_locales: 1120, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', locales_venta: 1280, num_locales: 2150, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', locales_venta: 1650, num_locales: 5680, lat: 39.4699, lng: -0.3763 },
    { codigo: '03', nombre: 'Alicante', locales_venta: 1420, num_locales: 3450, lat: 38.3452, lng: -0.4810 },
    { codigo: '41', nombre: 'Sevilla', locales_venta: 1380, num_locales: 3890, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', locales_venta: 2150, num_locales: 4120, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', locales_venta: 1120, num_locales: 1980, lat: 36.5271, lng: -6.2886 },
    { codigo: '07', nombre: 'Illes Balears', locales_venta: 3280, num_locales: 2890, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', locales_venta: 1890, num_locales: 2340, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', locales_venta: 1650, num_locales: 1780, lat: 28.4636, lng: -16.2518 },
    { codigo: '15', nombre: 'A Coruna', locales_venta: 1180, num_locales: 1450, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', locales_venta: 980, num_locales: 1120, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', locales_venta: 1050, num_locales: 780, lat: 43.1828, lng: -3.9878 },
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
        locales_venta: prov.locales_venta,
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
