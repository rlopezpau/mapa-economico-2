// Datos de ejemplo - Poblacion por provincia
const PROVINCIAS_DATA = {
  2023: [
    { codigo: '28', nombre: 'Madrid', poblacion: 6751251, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', poblacion: 5714730, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', poblacion: 1155772, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', poblacion: 727121, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', poblacion: 333940, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', poblacion: 664117, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', poblacion: 972528, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', poblacion: 2589312, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', poblacion: 1942155, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', poblacion: 1685920, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', poblacion: 1244049, lat: 36.5271, lng: -6.2886 },
    { codigo: '15', nombre: 'A Coruna', poblacion: 1121815, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', poblacion: 1011792, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', poblacion: 584507, lat: 43.1828, lng: -3.9878 },
    { codigo: '47', nombre: 'Valladolid', poblacion: 519361, lat: 41.6523, lng: -4.7245 },
    { codigo: '37', nombre: 'Salamanca', poblacion: 325364, lat: 40.9701, lng: -5.6635 },
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
        poblacion: prov.poblacion,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
