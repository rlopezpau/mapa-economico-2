// Datos de ejemplo - Precio medio vivienda en VENTA (€/m²)
// Fuente real: INE, Idealista, Fotocasa, Ministerio de Vivienda
// https://www.idealista.com/data/

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', vivienda_venta: 4250, variacion: 12.5, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', vivienda_venta: 3890, variacion: 10.8, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', vivienda_venta: 2950, variacion: 8.2, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', vivienda_venta: 3120, variacion: 7.5, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', vivienda_venta: 2340, variacion: 5.1, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', vivienda_venta: 1890, variacion: 6.3, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', vivienda_venta: 1650, variacion: 7.8, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', vivienda_venta: 2180, variacion: 14.2, lat: 39.4699, lng: -0.3763 },
    { codigo: '03', nombre: 'Alicante', vivienda_venta: 2340, variacion: 15.1, lat: 38.3452, lng: -0.4810 },
    { codigo: '41', nombre: 'Sevilla', vivienda_venta: 1920, variacion: 9.4, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', vivienda_venta: 2890, variacion: 18.3, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', vivienda_venta: 1680, variacion: 8.7, lat: 36.5271, lng: -6.2886 },
    { codigo: '07', nombre: 'Illes Balears', vivienda_venta: 4120, variacion: 13.6, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', vivienda_venta: 2450, variacion: 16.2, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', vivienda_venta: 2180, variacion: 14.8, lat: 28.4636, lng: -16.2518 },
    { codigo: '15', nombre: 'A Coruna', vivienda_venta: 1540, variacion: 5.2, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', vivienda_venta: 1380, variacion: 4.1, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', vivienda_venta: 1620, variacion: 6.8, lat: 43.1828, lng: -3.9878 },
    { codigo: '47', nombre: 'Valladolid', vivienda_venta: 1450, variacion: 5.5, lat: 41.6523, lng: -4.7245 },
    { codigo: '37', nombre: 'Salamanca', vivienda_venta: 1680, variacion: 4.8, lat: 40.9701, lng: -5.6635 },
  ],
  2023: [
    { codigo: '28', nombre: 'Madrid', vivienda_venta: 3780, variacion: 9.2, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', vivienda_venta: 3510, variacion: 7.5, lat: 41.3851, lng: 2.1734 },
    { codigo: '29', nombre: 'Malaga', vivienda_venta: 2440, variacion: 15.1, lat: 36.7213, lng: -4.4214 },
    { codigo: '46', nombre: 'Valencia', vivienda_venta: 1910, variacion: 11.3, lat: 39.4699, lng: -0.3763 },
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
        vivienda_venta: prov.vivienda_venta,
        variacion: prov.variacion,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
