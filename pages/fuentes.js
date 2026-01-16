import Head from 'next/head'
import Link from 'next/link'

const FUENTES = [
  {
    nombre: 'Instituto Nacional de Estadistica (INE)',
    descripcion: 'Fuente principal de datos economicos y demograficos de Espana',
    url: 'https://www.ine.es',
    indicadores: ['PIB', 'IPC', 'Poblacion', 'Turismo', 'EPA'],
  },
  {
    nombre: 'SEPE - Servicio Publico de Empleo Estatal',
    descripcion: 'Datos detallados de desempleo por sexo, edad y sector',
    url: 'https://sede.sepe.gob.es/portalSede/es/datos-abiertos/catalogo-de-datos-del-SEPE',
    indicadores: ['Paro registrado', 'Demandantes empleo'],
  },
  {
    nombre: 'Ministerio de Trabajo y Economia Social',
    descripcion: 'Datos de empleo, salarios y mercado laboral',
    url: 'https://www.mites.gob.es',
    indicadores: ['Salarios', 'Contratos', 'Afiliacion SS'],
  },
  {
    nombre: 'Direccion General del Catastro',
    descripcion: 'Informacion catastral de inmuebles urbanos y rusticos',
    url: 'https://www.catastro.hacienda.gob.es',
    indicadores: ['Inmuebles', 'Valor catastral', 'Parcelas'],
  },
  {
    nombre: 'Idealista / Fotocasa',
    descripcion: 'Precios de vivienda y locales comerciales en venta y alquiler',
    url: 'https://www.idealista.com/data/',
    indicadores: ['Vivienda venta', 'Vivienda alquiler', 'Locales'],
  },
  {
    nombre: 'datos.gob.es',
    descripcion: 'Portal de datos abiertos del Gobierno de Espana',
    url: 'https://datos.gob.es',
    indicadores: ['Empresas', 'Educacion', 'Sanidad', 'Transporte'],
  },
  {
    nombre: 'Ministerio de Sanidad',
    descripcion: 'Estadisticas del Sistema Nacional de Salud',
    url: 'https://www.sanidad.gob.es',
    indicadores: ['Hospitales', 'Camas', 'Personal sanitario'],
  },
  {
    nombre: 'Ministerio de Educacion',
    descripcion: 'Estadisticas educativas y centros de ensenanza',
    url: 'https://www.educacionfpydeportes.gob.es',
    indicadores: ['Centros', 'Alumnos', 'Profesores'],
  },
  {
    nombre: 'DGT - Direccion General de Trafico',
    descripcion: 'Parque de vehiculos y estadisticas de trafico',
    url: 'https://www.dgt.es',
    indicadores: ['Vehiculos', 'Turismos', 'Motos'],
  },
  {
    nombre: 'Banco de Espana',
    descripcion: 'Estadisticas financieras y economicas',
    url: 'https://www.bde.es',
    indicadores: ['PIB', 'Indicadores economicos'],
  },
]

export default function Fuentes() {
  return (
    <>
      <Head>
        <title>Fuentes y Metodologia - Mapa Economico</title>
        <meta name="description" content="Fuentes de datos y metodologia del Mapa Economico de Espana" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">
              Fuentes y Metodologia
            </h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              Volver al mapa
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Introduccion */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Sobre los datos
            </h2>
            <p className="text-gray-600">
              El Mapa Economico de Espana utiliza datos oficiales de fuentes publicas
              para mostrar indicadores socioeconomicos a nivel provincial. Los datos
              incluyen informacion economica, inmobiliaria, de servicios publicos y
              demografica. Se actualizan periodicamente conforme las fuentes publican
              nuevas estadisticas.
            </p>
          </section>

          {/* Fuentes */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Fuentes de datos ({FUENTES.length})
            </h2>
            <div className="space-y-4">
              {FUENTES.map((fuente, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                  <h3 className="font-medium text-gray-800">
                    <a
                      href={fuente.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {fuente.nombre}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{fuente.descripcion}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {fuente.indicadores.map((ind, j) => (
                      <span
                        key={j}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Metodologia */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Metodologia
            </h2>
            <div className="space-y-3 text-gray-600 text-sm">
              <h4 className="font-semibold text-gray-700">Economia</h4>
              <p>
                <strong>PIB per capita:</strong> Producto Interior Bruto dividido entre
                la poblacion total de cada territorio. Expresado en euros.
              </p>
              <p>
                <strong>Tasa de paro:</strong> Porcentaje de poblacion activa que se
                encuentra desempleada segun la EPA.
              </p>
              <p>
                <strong>IPC:</strong> Indice de Precios al Consumo, variacion interanual
                de los precios de bienes y servicios.
              </p>
              <p>
                <strong>Salario medio:</strong> Salario bruto anual promedio de los
                trabajadores por cuenta ajena.
              </p>
              <p>
                <strong>Empresas:</strong> Numero total de empresas activas incluyendo
                autonomos, PYMES y grandes empresas.
              </p>

              <h4 className="font-semibold text-gray-700 mt-4">Inmobiliario</h4>
              <p>
                <strong>Vivienda venta/alquiler:</strong> Precios medios de vivienda
                en venta (€/m2) y alquiler (€/mes) segun portales inmobiliarios.
              </p>
              <p>
                <strong>Locales comerciales:</strong> Precios medios de locales en
                venta (€/m2) y alquiler (€/m2/mes).
              </p>
              <p>
                <strong>Catastro:</strong> Numero de inmuebles urbanos y rusticos,
                superficie y valor catastral total.
              </p>

              <h4 className="font-semibold text-gray-700 mt-4">Servicios</h4>
              <p>
                <strong>Sanidad:</strong> Hospitales, camas hospitalarias, medicos
                y centros de salud por provincia.
              </p>
              <p>
                <strong>Educacion:</strong> Centros educativos, alumnos matriculados,
                profesores y estudiantes universitarios/FP.
              </p>
              <p>
                <strong>Transporte:</strong> Parque de vehiculos, red de carreteras,
                estaciones de tren y pasajeros de aeropuertos.
              </p>

              <h4 className="font-semibold text-gray-700 mt-4">Otros</h4>
              <p>
                <strong>Poblacion:</strong> Numero de habitantes empadronados segun
                el Padron Municipal.
              </p>
              <p>
                <strong>Turismo:</strong> Viajeros, pernoctaciones, establecimientos
                hoteleros y tasa de ocupacion.
              </p>
            </div>
          </section>

          {/* APIs disponibles */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              APIs disponibles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {[
                '/api/pib', '/api/paro', '/api/paro-detalle', '/api/ipc',
                '/api/salarios', '/api/empresas', '/api/poblacion',
                '/api/vivienda-venta', '/api/vivienda-alquiler',
                '/api/locales-venta', '/api/locales-alquiler', '/api/catastro',
                '/api/sanidad', '/api/educacion', '/api/transporte', '/api/turismo'
              ].map((api) => (
                <code key={api} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {api}
                </code>
              ))}
            </div>
          </section>

          {/* Licencia */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Licencia y uso
            </h2>
            <p className="text-gray-600 text-sm">
              Esta aplicacion es de codigo abierto bajo licencia MIT. Los datos
              mostrados provienen de fuentes publicas y estan sujetos a las
              condiciones de uso de cada organismo emisor.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
