// Datos de ejemplo - CATASTRO (inmuebles, superficie, valor catastral)
// Fuente real: Direccion General del Catastro
// https://www.catastro.hacienda.gob.es/

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', inmuebles_urbanos: 3456780, inmuebles_rusticos: 89450, superficie_urbana: 6234, valor_catastral: 285670000000, parcelas: 125670, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', inmuebles_urbanos: 2890450, inmuebles_rusticos: 156780, superficie_urbana: 5890, valor_catastral: 245890000000, parcelas: 198450, lat: 41.3851, lng: 2.1734 },
    { codigo: '46', nombre: 'Valencia', inmuebles_urbanos: 1456780, inmuebles_rusticos: 245670, superficie_urbana: 3456, valor_catastral: 98560000000, parcelas: 312450, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', inmuebles_urbanos: 1123450, inmuebles_rusticos: 345670, superficie_urbana: 2890, valor_catastral: 72340000000, parcelas: 423560, lat: 37.3891, lng: -5.9845 },
    { codigo: '48', nombre: 'Bizkaia', inmuebles_urbanos: 567890, inmuebles_rusticos: 78920, superficie_urbana: 1234, valor_catastral: 52340000000, parcelas: 98560, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', inmuebles_urbanos: 389450, inmuebles_rusticos: 62340, superficie_urbana: 890, valor_catastral: 38920000000, parcelas: 78450, lat: 43.3128, lng: -1.9750 },
    { codigo: '01', nombre: 'Araba', inmuebles_urbanos: 178920, inmuebles_rusticos: 45670, superficie_urbana: 456, valor_catastral: 18560000000, parcelas: 56780, lat: 42.8467, lng: -2.6726 },
    { codigo: '29', nombre: 'Malaga', inmuebles_urbanos: 989450, inmuebles_rusticos: 198560, superficie_urbana: 2345, valor_catastral: 78920000000, parcelas: 256780, lat: 36.7213, lng: -4.4214 },
    { codigo: '07', nombre: 'Illes Balears', inmuebles_urbanos: 623450, inmuebles_rusticos: 89450, superficie_urbana: 1456, valor_catastral: 68920000000, parcelas: 112340, lat: 39.5696, lng: 2.6502 },
    { codigo: '03', nombre: 'Alicante', inmuebles_urbanos: 1234560, inmuebles_rusticos: 178920, superficie_urbana: 2678, valor_catastral: 82340000000, parcelas: 234560, lat: 38.3452, lng: -0.4810 },
    { codigo: '50', nombre: 'Zaragoza', inmuebles_urbanos: 512340, inmuebles_rusticos: 289450, superficie_urbana: 1123, valor_catastral: 32560000000, parcelas: 356780, lat: 41.6488, lng: -0.8891 },
    { codigo: '15', nombre: 'A Coruna', inmuebles_urbanos: 534560, inmuebles_rusticos: 234560, superficie_urbana: 1234, valor_catastral: 34560000000, parcelas: 312340, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', inmuebles_urbanos: 478920, inmuebles_rusticos: 198450, superficie_urbana: 1089, valor_catastral: 28920000000, parcelas: 267890, lat: 43.3614, lng: -5.8593 },
    { codigo: '35', nombre: 'Las Palmas', inmuebles_urbanos: 534560, inmuebles_rusticos: 78920, superficie_urbana: 1234, valor_catastral: 42560000000, parcelas: 98560, lat: 28.1235, lng: -15.4363 },
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
        catastro: prov.inmuebles_urbanos,
        inmuebles_urbanos: prov.inmuebles_urbanos,
        inmuebles_rusticos: prov.inmuebles_rusticos,
        superficie_urbana: prov.superficie_urbana,
        valor_catastral: prov.valor_catastral,
        parcelas: prov.parcelas,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
