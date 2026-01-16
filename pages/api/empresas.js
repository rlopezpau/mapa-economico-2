// Datos de ejemplo - Numero de EMPRESAS y AUTONOMOS
// Fuente real: INE, Seguridad Social, datos.gob.es
// https://datos.gob.es/

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', empresas: 524680, autonomos: 412350, pymes: 489120, grandes: 2340, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', empresas: 478920, autonomos: 385670, pymes: 445780, grandes: 1890, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', empresas: 98450, autonomos: 78230, pymes: 94120, grandes: 420, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', empresas: 72340, autonomos: 58120, pymes: 69450, grandes: 310, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', empresas: 28450, autonomos: 22180, pymes: 27120, grandes: 145, lat: 42.8467, lng: -2.6726 },
    { codigo: '31', nombre: 'Navarra', empresas: 52890, autonomos: 41230, pymes: 50780, grandes: 215, lat: 42.6954, lng: -1.6761 },
    { codigo: '50', nombre: 'Zaragoza', empresas: 78450, autonomos: 62340, pymes: 75120, grandes: 285, lat: 41.6488, lng: -0.8891 },
    { codigo: '46', nombre: 'Valencia', empresas: 198670, autonomos: 162450, pymes: 189340, grandes: 680, lat: 39.4699, lng: -0.3763 },
    { codigo: '03', nombre: 'Alicante', empresas: 145230, autonomos: 118560, pymes: 138450, grandes: 425, lat: 38.3452, lng: -0.4810 },
    { codigo: '41', nombre: 'Sevilla', empresas: 132450, autonomos: 108920, pymes: 126780, grandes: 485, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', empresas: 128670, autonomos: 105340, pymes: 123120, grandes: 395, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', empresas: 68920, autonomos: 54230, pymes: 65780, grandes: 180, lat: 36.5271, lng: -6.2886 },
    { codigo: '07', nombre: 'Illes Balears', empresas: 98450, autonomos: 82130, pymes: 94560, grandes: 285, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', empresas: 78230, autonomos: 64520, pymes: 74890, grandes: 215, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', empresas: 68450, autonomos: 56780, pymes: 65120, grandes: 175, lat: 28.4636, lng: -16.2518 },
    { codigo: '15', nombre: 'A Coruna', empresas: 82340, autonomos: 68450, pymes: 78920, grandes: 245, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', empresas: 72450, autonomos: 58230, pymes: 69120, grandes: 185, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', empresas: 42560, autonomos: 34890, pymes: 40780, grandes: 115, lat: 43.1828, lng: -3.9878 },
    { codigo: '47', nombre: 'Valladolid', empresas: 38450, autonomos: 31230, pymes: 36890, grandes: 125, lat: 41.6523, lng: -4.7245 },
    { codigo: '37', nombre: 'Salamanca', empresas: 24560, autonomos: 19870, pymes: 23450, grandes: 65, lat: 40.9701, lng: -5.6635 },
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
        empresas: prov.empresas,
        autonomos: prov.autonomos,
        pymes: prov.pymes,
        grandes: prov.grandes,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
