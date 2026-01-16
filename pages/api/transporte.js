// Datos de ejemplo - TRANSPORTE (vehiculos, carreteras, transporte publico)
// Fuente real: DGT, Ministerio de Transportes, datos.gob.es

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', vehiculos: 4256780, turismos: 3456780, motos: 425670, km_carreteras: 3245, estaciones_tren: 185, aeropuerto_pax: 62345670, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', vehiculos: 3567890, turismos: 2890450, motos: 398560, km_carreteras: 2890, estaciones_tren: 156, aeropuerto_pax: 54234560, lat: 41.3851, lng: 2.1734 },
    { codigo: '46', nombre: 'Valencia', vehiculos: 1567890, turismos: 1289450, motos: 156780, km_carreteras: 1456, estaciones_tren: 78, aeropuerto_pax: 9234560, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', vehiculos: 1234560, turismos: 1012340, motos: 128450, km_carreteras: 1234, estaciones_tren: 65, aeropuerto_pax: 8456780, lat: 37.3891, lng: -5.9845 },
    { codigo: '48', nombre: 'Bizkaia', vehiculos: 678920, turismos: 556780, motos: 68920, km_carreteras: 678, estaciones_tren: 42, aeropuerto_pax: 6234560, lat: 43.2630, lng: -2.9350 },
    { codigo: '29', nombre: 'Malaga', vehiculos: 989450, turismos: 812340, motos: 98560, km_carreteras: 945, estaciones_tren: 35, aeropuerto_pax: 22345670, lat: 36.7213, lng: -4.4214 },
    { codigo: '07', nombre: 'Illes Balears', vehiculos: 756780, turismos: 623450, motos: 78920, km_carreteras: 456, estaciones_tren: 12, aeropuerto_pax: 32456780, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', vehiculos: 612340, turismos: 498560, motos: 62340, km_carreteras: 389, estaciones_tren: 0, aeropuerto_pax: 15234560, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', vehiculos: 534560, turismos: 434560, motos: 54230, km_carreteras: 345, estaciones_tren: 0, aeropuerto_pax: 12456780, lat: 28.4636, lng: -16.2518 },
    { codigo: '03', nombre: 'Alicante', vehiculos: 1123450, turismos: 923450, motos: 112340, km_carreteras: 892, estaciones_tren: 28, aeropuerto_pax: 16789450, lat: 38.3452, lng: -0.4810 },
    { codigo: '15', nombre: 'A Coruna', vehiculos: 612340, turismos: 501230, motos: 52340, km_carreteras: 612, estaciones_tren: 35, aeropuerto_pax: 1234560, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', vehiculos: 534560, turismos: 438920, motos: 45670, km_carreteras: 534, estaciones_tren: 28, aeropuerto_pax: 1456780, lat: 43.3614, lng: -5.8593 },
    { codigo: '50', nombre: 'Zaragoza', vehiculos: 567890, turismos: 467890, motos: 52340, km_carreteras: 567, estaciones_tren: 18, aeropuerto_pax: 789450, lat: 41.6488, lng: -0.8891 },
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
        transporte: prov.vehiculos,
        vehiculos: prov.vehiculos,
        turismos: prov.turismos,
        motos: prov.motos,
        km_carreteras: prov.km_carreteras,
        estaciones_tren: prov.estaciones_tren,
        aeropuerto_pax: prov.aeropuerto_pax,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
