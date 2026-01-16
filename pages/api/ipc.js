// Datos de ejemplo - IPC por provincia
const PROVINCIAS_DATA = {
  2023: [
    { codigo: '28', nombre: 'Madrid', ipc: 3.2, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', ipc: 3.5, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', ipc: 3.1, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', ipc: 2.9, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', ipc: 3.0, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', ipc: 3.3, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', ipc: 3.4, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', ipc: 3.7, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', ipc: 3.8, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', ipc: 4.1, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', ipc: 3.9, lat: 36.5271, lng: -6.2886 },
    { codigo: '15', nombre: 'A Coruna', ipc: 3.2, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', ipc: 3.4, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', ipc: 3.1, lat: 43.1828, lng: -3.9878 },
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
        ipc: prov.ipc,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
