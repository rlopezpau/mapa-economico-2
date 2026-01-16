// Datos de ejemplo - PIB per cápita por provincia
// En producción estos datos vendrían del INE

const PROVINCIAS_DATA = {
  2023: [
    { codigo: '28', nombre: 'Madrid', pib: 35847, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', pib: 32156, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', pib: 33421, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', pib: 34102, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', pib: 36589, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', pib: 32847, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', pib: 28934, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', pib: 24521, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', pib: 20156, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', pib: 19847, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', pib: 18234, lat: 36.5271, lng: -6.2886 },
    { codigo: '15', nombre: 'A Coruna', pib: 23156, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', pib: 22847, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', pib: 24102, lat: 43.1828, lng: -3.9878 },
    { codigo: '47', nombre: 'Valladolid', pib: 25634, lat: 41.6523, lng: -4.7245 },
    { codigo: '37', nombre: 'Salamanca', pib: 21847, lat: 40.9701, lng: -5.6635 },
  ],
  2022: [
    { codigo: '28', nombre: 'Madrid', pib: 34521, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', pib: 31024, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', pib: 32156, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', pib: 32847, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', pib: 35102, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', pib: 31521, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', pib: 27634, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', pib: 23421, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', pib: 19234, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', pib: 18921, lat: 36.7213, lng: -4.4214 },
  ],
}

export default function handler(req, res) {
  const { year = '2023' } = req.query
  const data = PROVINCIAS_DATA[year] || PROVINCIAS_DATA['2023']

  // Convertir a GeoJSON (puntos por ahora, idealmente serían polígonos)
  const geojson = {
    type: 'FeatureCollection',
    features: data.map((prov) => ({
      type: 'Feature',
      properties: {
        codigo: prov.codigo,
        nombre: prov.nombre,
        pib: prov.pib,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
