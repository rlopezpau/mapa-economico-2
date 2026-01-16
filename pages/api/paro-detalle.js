// Datos de ejemplo - PARO DETALLADO por sexo, edad y sector
// Fuente real: SEPE (Servicio Publico de Empleo Estatal)
// https://sede.sepe.gob.es/portalSede/es/datos-abiertos/catalogo-de-datos-del-SEPE

const PROVINCIAS_DATA = {
  2024: [
    { codigo: '28', nombre: 'Madrid', paro_total: 285340, hombres: 128450, mujeres: 156890, jovenes: 42560, mayores55: 68920, agricultura: 2340, industria: 28450, construccion: 18560, servicios: 235990, lat: 40.4168, lng: -3.7038 },
    { codigo: '08', nombre: 'Barcelona', paro_total: 268450, hombres: 121230, mujeres: 147220, jovenes: 38920, mayores55: 64230, agricultura: 1890, industria: 32450, construccion: 16780, servicios: 217330, lat: 41.3851, lng: 2.1734 },
    { codigo: '48', nombre: 'Bizkaia', paro_total: 52340, hombres: 23450, mujeres: 28890, jovenes: 7890, mayores55: 12560, agricultura: 450, industria: 8920, construccion: 3450, servicios: 39520, lat: 43.2630, lng: -2.9350 },
    { codigo: '20', nombre: 'Gipuzkoa', paro_total: 28450, hombres: 12780, mujeres: 15670, jovenes: 4230, mayores55: 6890, agricultura: 280, industria: 5120, construccion: 1890, servicios: 21160, lat: 43.3128, lng: -1.9750 },
    { codigo: '46', nombre: 'Valencia', paro_total: 178920, hombres: 82340, mujeres: 96580, jovenes: 28450, mayores55: 42560, agricultura: 12340, industria: 18920, construccion: 14560, servicios: 133100, lat: 39.4699, lng: -0.3763 },
    { codigo: '41', nombre: 'Sevilla', paro_total: 168450, hombres: 72340, mujeres: 96110, jovenes: 32450, mayores55: 38920, agricultura: 18560, industria: 12340, construccion: 12890, servicios: 124660, lat: 37.3891, lng: -5.9845 },
    { codigo: '29', nombre: 'Malaga', paro_total: 132560, hombres: 58920, mujeres: 73640, jovenes: 24560, mayores55: 32450, agricultura: 8920, industria: 8450, construccion: 11230, servicios: 103960, lat: 36.7213, lng: -4.4214 },
    { codigo: '11', nombre: 'Cadiz', paro_total: 142340, hombres: 62450, mujeres: 79890, jovenes: 28920, mayores55: 34560, agricultura: 12450, industria: 9120, construccion: 10890, servicios: 109880, lat: 36.5271, lng: -6.2886 },
    { codigo: '35', nombre: 'Las Palmas', paro_total: 98450, hombres: 45230, mujeres: 53220, jovenes: 18920, mayores55: 22340, agricultura: 3450, industria: 5120, construccion: 7890, servicios: 81990, lat: 28.1235, lng: -15.4363 },
    { codigo: '15', nombre: 'A Coruna', paro_total: 62340, hombres: 28450, mujeres: 33890, jovenes: 9450, mayores55: 14560, agricultura: 2890, industria: 7890, construccion: 4560, servicios: 47000, lat: 43.3623, lng: -8.4115 },
    { codigo: '33', nombre: 'Asturias', paro_total: 52890, hombres: 24560, mujeres: 28330, jovenes: 7230, mayores55: 13450, agricultura: 1230, industria: 6780, construccion: 3890, servicios: 40990, lat: 43.3614, lng: -5.8593 },
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
        paro_total: prov.paro_total,
        hombres: prov.hombres,
        mujeres: prov.mujeres,
        jovenes: prov.jovenes,
        mayores55: prov.mayores55,
        agricultura: prov.agricultura,
        industria: prov.industria,
        construccion: prov.construccion,
        servicios: prov.servicios,
      },
      geometry: {
        type: 'Point',
        coordinates: [prov.lng, prov.lat],
      },
    })),
  }

  res.status(200).json(geojson)
}
