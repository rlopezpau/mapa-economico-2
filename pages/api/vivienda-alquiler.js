// Datos de ejemplo - Precio medio vivienda en ALQUILER (€/mes)
// Fuente real: INE, Idealista, Fotocasa
// https://www.idealista.com/data/

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', vivienda_alquiler: 1650, variacion: 18.2, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', vivienda_alquiler: 1480, variacion: 15.6, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', vivienda_alquiler: 1120, variacion: 12.3, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', vivienda_alquiler: 1180, variacion: 10.8, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', vivienda_alquiler: 890, variacion: 8.5, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', vivienda_alquiler: 820, variacion: 9.1, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', vivienda_alquiler: 780, variacion: 11.4, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', vivienda_alquiler: 1050, variacion: 19.5, lat: 39.4699, lng: -0.3763 },
    { codigo: '03', nombre: 'Alicante', vivienda_alquiler: 920, variacion: 17.8, lat: 38.3452, lng: -0.4810 },
    { codigo: '41', nombre: 'Sevilla', vivienda_alquiler: 950, variacion: 14.2, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', vivienda_alquiler: 1280, variacion: 22.1, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', vivienda_alquiler: 780, variacion: 12.5, lat: 36.5271, lng: -6.2886 },
    { codigo: '07', nombre: 'Illes Balears', vivienda_alquiler: 1520, variacion: 16.8, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', vivienda_alquiler: 1080, variacion: 20.3, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', vivienda_alquiler: 980, variacion: 18.9, lat: 28.4636, lng: -16.2518 },
    { codigo: '15', nombre: 'A Coruna', vivienda_alquiler: 680, variacion: 8.2, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', vivienda_alquiler: 620, variacion: 7.5, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', vivienda_alquiler: 720, variacion: 9.8, lat: 43.1828, lng: -3.9878 },
    { codigo: '47', nombre: 'Valladolid', vivienda_alquiler: 650, variacion: 10.2, lat: 41.6523, lng: -4.7245 },
    { codigo: '37', nombre: 'Salamanca', vivienda_alquiler: 580, variacion: 8.9, lat: 40.9701, lng: -5.6635 },
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
        vivienda_alquiler: prov.vivienda_alquiler,
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
