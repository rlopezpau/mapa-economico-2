import { useState, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import LayerToggle from '@/components/LayerToggle'
import YearSelector from '@/components/YearSelector'
import Legend from '@/components/Legend'
import ExportButton from '@/components/ExportButton'

// Importar MapView dinámicamente para evitar errores de SSR con Leaflet
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Cargando mapa...</div>
    </div>
  ),
})

export default function Home() {
  const [indicator, setIndicator] = useState('pib')
  const [year, setYear] = useState(2023)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const mapRef = useRef(null)

  // Fetch datos GeoJSON
  const { data: geoData, isLoading, error } = useQuery({
    queryKey: ['geoData', indicator, year],
    queryFn: async () => {
      const res = await fetch(`/api/${indicator}?year=${year}`)
      if (!res.ok) throw new Error('Error cargando datos')
      return res.json()
    },
  })

  // Calcular min/max para la leyenda
  const values = geoData?.features
    ?.map(f => f.properties?.[indicator])
    ?.filter(v => v !== null && v !== undefined) || []
  const min = values.length > 0 ? Math.min(...values) : 0
  const max = values.length > 0 ? Math.max(...values) : 100

  return (
    <>
      <Head>
        <title>Mapa Economico de Espana</title>
        <meta name="description" content="Visualizacion de indicadores economicos de Espana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Mapa Economico de Espana
          </h1>
          <nav className="flex items-center gap-4">
            <a
              href="/fuentes"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Fuentes y metodologia
            </a>
          </nav>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 flex relative">
          {/* Mapa */}
          <div ref={mapRef} className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                <div className="text-gray-600">Cargando datos...</div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                <div className="text-red-600">Error: {error.message}</div>
              </div>
            )}

            <MapView
              geoData={geoData}
              indicator={indicator}
              year={year}
              onFeatureClick={setSelectedFeature}
            />

            {/* Leyenda flotante */}
            <div className="absolute bottom-4 left-4 z-10">
              <Legend indicator={indicator} min={min} max={max} />
            </div>
          </div>

          {/* Panel lateral de controles */}
          <aside className="w-64 bg-white shadow-lg p-4 space-y-6 overflow-y-auto">
            <LayerToggle selected={indicator} onChange={setIndicator} />
            <YearSelector selected={year} onChange={setYear} />

            <div className="border-t pt-4">
              <ExportButton targetRef={mapRef} filename={`mapa-${indicator}-${year}`} />
            </div>

            {/* Info del feature seleccionado */}
            {selectedFeature && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Seleccionado</h3>
                <div className="bg-gray-50 rounded-md p-3 text-sm">
                  <p className="font-medium">
                    {selectedFeature.properties?.nombre || 'Sin nombre'}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {indicator.toUpperCase()}:{' '}
                    {selectedFeature.properties?.[indicator]?.toLocaleString('es-ES') || 'N/D'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  Cerrar
                </button>
              </div>
            )}
          </aside>
        </div>
      </main>
    </>
  )
}
