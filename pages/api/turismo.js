// Datos de ejemplo - TURISMO (viajeros, pernoctaciones, hoteles)
// Fuente real: INE, Encuesta de Ocupacion Hotelera
// https://www.ine.es/

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', viajeros: 8945230, pernoctaciones: 18234560, hoteles: 1245, plazas: 98560, ocupacion: 72.5, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', viajeros: 9234560, pernoctaciones: 21456780, hoteles: 1180, plazas: 112340, ocupacion: 78.2, lat: 41.3851, lng: 2.1734 },
    { codigo: '07', nombre: 'Illes Balears', viajeros: 12456780, pernoctaciones: 58923450, hoteles: 1450, plazas: 285670, ocupacion: 82.4, lat: 39.5696, lng: 2.6502 },
    { codigo: '35', nombre: 'Las Palmas', viajeros: 5234560, pernoctaciones: 32456780, hoteles: 520, plazas: 142560, ocupacion: 76.8, lat: 28.1235, lng: -15.4363 },
    { codigo: '38', nombre: 'Santa Cruz Tenerife', viajeros: 4567890, pernoctaciones: 28945670, hoteles: 480, plazas: 128450, ocupacion: 74.5, lat: 28.4636, lng: -16.2518 },
    { codigo: '29', nombre: 'Malaga', viajeros: 6234560, pernoctaciones: 18567890, hoteles: 680, plazas: 98560, ocupacion: 68.9, lat: 36.7213, lng: -4.4214 },
    { codigo: '03', nombre: 'Alicante', viajeros: 4567230, pernoctaciones: 14235670, hoteles: 520, plazas: 72340, ocupacion: 65.4, lat: 38.3452, lng: -0.4810 },
    { codigo: '46', nombre: 'Valencia', viajeros: 3456780, pernoctaciones: 7234560, hoteles: 420, plazas: 48920, ocupacion: 62.8, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', viajeros: 3234560, pernoctaciones: 6456780, hoteles: 380, plazas: 42560, ocupacion: 64.2, lat: 37.3891, lng: -5.9845 },
    { codigo: '48', nombre: 'Bizkaia', viajeros: 1456780, pernoctaciones: 2567890, hoteles: 185, plazas: 18920, ocupacion: 58.5, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', viajeros: 1234560, pernoctaciones: 2123450, hoteles: 145, plazas: 14560, ocupacion: 56.8, lat: 43.3128, lng: -1.9750 },
    { codigo: '15', nombre: 'A Coruna', viajeros: 1123450, pernoctaciones: 2045670, hoteles: 165, plazas: 15890, ocupacion: 52.4, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', viajeros: 1345670, pernoctaciones: 2456780, hoteles: 185, plazas: 17230, ocupacion: 48.9, lat: 43.3614, lng: -5.8593 },
    { codigo: '39', nombre: 'Cantabria', viajeros: 987650, pernoctaciones: 1823450, hoteles: 145, plazas: 12890, ocupacion: 46.5, lat: 43.1828, lng: -3.9878 },
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
        turismo: prov.viajeros,
        viajeros: prov.viajeros,
        pernoctaciones: prov.pernoctaciones,
        hoteles: prov.hoteles,
        plazas: prov.plazas,
        ocupacion: prov.ocupacion,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
