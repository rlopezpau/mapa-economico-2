// Datos de ejemplo - Salario medio por provincia
const PROVINCIAS_DATA = {
  2023: [
    { codigo: '28', nombre: 'Madrid', salarios: 28456, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', salarios: 26847, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', salarios: 27521, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', salarios: 28102, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', salarios: 29234, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', salarios: 27156, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', salarios: 24521, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', salarios: 22847, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', salarios: 21234, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', salarios: 20156, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', salarios: 19847, lat: 36.5271, lng: -6.2886 },
    { codigo: '15', nombre: 'A Coruna', salarios: 23421, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', salarios: 23847, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', salarios: 23156, lat: 43.1828, lng: -3.9878 },
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
        salarios: prov.salarios,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
