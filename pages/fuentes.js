import Head from 'next/head'
import Link from 'next/link'

const FUENTES = [
  {
    nombre: 'Instituto Nacional de Estadistica (INE)',
    descripcion: 'Fuente principal de datos economicos y demograficos de Espana',
    url: 'https://www.ine.es',
    indicadores: ['PIB', 'IPC', 'Poblacion', 'Paro'],
  },
  {
    nombre: 'Ministerio de Trabajo',
    descripcion: 'Datos de empleo, salarios y mercado laboral',
    url: 'https://www.mites.gob.es',
    indicadores: ['Tasa de paro', 'Salarios'],
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
              para mostrar indicadores socioeconomicos a nivel provincial y municipal.
              Los datos se actualizan periodicamente conforme las fuentes publican
              nuevas estadisticas.
            </p>
          </section>

          {/* Fuentes */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Fuentes de datos
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
              <p>
                <strong>PIB per capita:</strong> Producto Interior Bruto dividido entre
                la poblacion total de cada territorio. Expresado en euros.
              </p>
              <p>
                <strong>Tasa de paro:</strong> Porcentaje de poblacion activa que se
                encuentra desempleada segun la EPA (Encuesta de Poblacion Activa).
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
                <strong>Poblacion:</strong> Numero de habitantes empadronados segun
                el Padron Municipal.
              </p>
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
