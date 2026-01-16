// Datos de ejemplo - Tasa de paro por provincia
// En producción estos datos vendrían del INE

const PROVINCIAS_DATA = {
  2023: [
    { codigo: '28', nombre: 'Madrid', paro: 9.2, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', paro: 9.8, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', paro: 8.1, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', paro: 6.9, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', paro: 7.5, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', paro: 8.3, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', paro: 10.2, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', paro: 12.4, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', paro: 18.7, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', paro: 17.2, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', paro: 24.3, lat: 36.5271, lng: -6.2886 },
    { codigo: '15', nombre: 'A Coruna', paro: 11.2, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', paro: 11.8, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', paro: 9.4, lat: 43.1828, lng: -3.9878 },
    { codigo: '47', nombre: 'Valladolid', paro: 10.6, lat: 41.6523, lng: -4.7245 },
    { codigo: '37', nombre: 'Salamanca', paro: 12.1, lat: 40.9701, lng: -5.6635 },
  ],
}

export default function handler(req, res) {
  const { year = '2023' } = req.query
  const data = PROVINCIAS_DATA[year] || PROVINCIAS_DATA['2023']

  const geojson = {
    type: 'FeatureCollection',
    features: data.map((prov) => ({
      type: 'Feature',
      properties: {
        codigo: prov.codigo,
        nombre: prov.nombre,
        paro: prov.paro,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
