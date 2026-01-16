// Datos de ejemplo - SANIDAD (hospitales, camas, medicos, centros salud)
// Fuente real: Ministerio de Sanidad, SNS, datos.gob.es

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', hospitales: 84, camas: 18920, medicos: 42560, enfermeros: 38450, centros_salud: 425, urgencias: 156, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', hospitales: 72, camas: 16450, medicos: 38920, enfermeros: 34560, centros_salud: 398, urgencias: 142, lat: 41.3851, lng: 2.1734 },
    { codigo: '46', nombre: 'Valencia', hospitales: 38, camas: 8920, medicos: 18560, enfermeros: 16780, centros_salud: 245, urgencias: 78, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', hospitales: 32, camas: 7450, medicos: 15890, enfermeros: 14230, centros_salud: 198, urgencias: 65, lat: 37.3891, lng: -5.9845 },
    { codigo: '48', nombre: 'Bizkaia', hospitales: 18, camas: 4560, medicos: 9450, enfermeros: 8560, centros_salud: 125, urgencias: 42, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', hospitales: 12, camas: 2890, medicos: 6230, enfermeros: 5670, centros_salud: 85, urgencias: 28, lat: 43.3128, lng: -1.9750 },
    { codigo: '50', nombre: 'Zaragoza', hospitales: 15, camas: 3890, medicos: 7890, enfermeros: 7120, centros_salud: 112, urgencias: 35, lat: 41.6488, lng: -0.8891 },
    { codigo: '29', nombre: 'Malaga', hospitales: 22, camas: 4560, medicos: 9120, enfermeros: 8230, centros_salud: 145, urgencias: 48, lat: 36.7213, lng: -4.4214 },
    { codigo: '03', nombre: 'Alicante', hospitales: 18, camas: 3890, medicos: 7890, enfermeros: 7120, centros_salud: 128, urgencias: 42, lat: 38.3452, lng: -0.4810 },
    { codigo: '15', nombre: 'A Coruna', hospitales: 14, camas: 3450, medicos: 6780, enfermeros: 6120, centros_salud: 98, urgencias: 32, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', hospitales: 12, camas: 2890, medicos: 5890, enfermeros: 5340, centros_salud: 85, urgencias: 28, lat: 43.3614, lng: -5.8593 },
    { codigo: '07', nombre: 'Illes Balears', hospitales: 15, camas: 3120, medicos: 6450, enfermeros: 5890, centros_salud: 95, urgencias: 32, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', hospitales: 12, camas: 2560, medicos: 5230, enfermeros: 4780, centros_salud: 78, urgencias: 25, lat: 28.1235, lng: -15.4363 },
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
        sanidad: prov.hospitales,
        hospitales: prov.hospitales,
        camas: prov.camas,
        medicos: prov.medicos,
        enfermeros: prov.enfermeros,
        centros_salud: prov.centros_salud,
        urgencias: prov.urgencias,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
