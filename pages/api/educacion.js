// Datos de ejemplo - EDUCACION (centros, alumnos, profesores)
// Fuente real: Ministerio de Educacion, datos.gob.es

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', centros: 3245, alumnos: 1234560, profesores: 89450, universitarios: 285670, fp: 142340, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', centros: 2890, alumnos: 1123450, profesores: 78920, universitarios: 268450, fp: 128560, lat: 41.3851, lng: 2.1734 },
    { codigo: '46', nombre: 'Valencia', centros: 1456, alumnos: 456780, profesores: 32450, universitarios: 98560, fp: 52340, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', centros: 1234, alumnos: 398450, profesores: 28560, universitarios: 78920, fp: 42560, lat: 37.3891, lng: -5.9845 },
    { codigo: '48', nombre: 'Bizkaia', centros: 678, alumnos: 198450, profesores: 14560, universitarios: 52340, fp: 28450, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', centros: 456, alumnos: 128450, profesores: 9890, universitarios: 32560, fp: 18920, lat: 43.3128, lng: -1.9750 },
    { codigo: '50', nombre: 'Zaragoza', centros: 589, alumnos: 178920, profesores: 12890, universitarios: 48560, fp: 24560, lat: 41.6488, lng: -0.8891 },
    { codigo: '29', nombre: 'Malaga', centros: 745, alumnos: 256780, profesores: 18450, universitarios: 62340, fp: 32450, lat: 36.7213, lng: -4.4214 },
    { codigo: '03', nombre: 'Alicante', centros: 678, alumnos: 234560, profesores: 16780, universitarios: 52340, fp: 28920, lat: 38.3452, lng: -0.4810 },
    { codigo: '15', nombre: 'A Coruna', centros: 512, alumnos: 168450, profesores: 12340, universitarios: 42560, fp: 22340, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', centros: 456, alumnos: 142560, profesores: 10560, universitarios: 38920, fp: 18560, lat: 43.3614, lng: -5.8593 },
    { codigo: '07', nombre: 'Illes Balears', centros: 489, alumnos: 178450, profesores: 12890, universitarios: 28560, fp: 18920, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', centros: 412, alumnos: 156780, profesores: 11230, universitarios: 32450, fp: 16780, lat: 28.1235, lng: -15.4363 },
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
        educacion: prov.centros,
        centros: prov.centros,
        alumnos: prov.alumnos,
        profesores: prov.profesores,
        universitarios: prov.universitarios,
        fp: prov.fp,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
