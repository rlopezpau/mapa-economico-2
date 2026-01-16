import { useState } from 'react'

const INDICATOR_CATEGORIES = [
  {
    name: 'Economia',
    indicators: [
      { id: 'pib', label: 'PIB per capita', icon: '💰' },
      { id: 'paro', label: 'Tasa de paro', icon: '📊' },
      { id: 'paro-detalle', label: 'Paro detallado', icon: '📉' },
      { id: 'ipc', label: 'IPC', icon: '📈' },
      { id: 'salarios', label: 'Salarios', icon: '💵' },
      { id: 'empresas', label: 'Empresas', icon: '🏢' },
    ],
  },
  {
    name: 'Inmobiliario',
    indicators: [
      { id: 'vivienda-venta', label: 'Vivienda venta', icon: '🏠' },
      { id: 'vivienda-alquiler', label: 'Vivienda alquiler', icon: '🔑' },
      { id: 'locales-venta', label: 'Locales venta', icon: '🏪' },
      { id: 'locales-alquiler', label: 'Locales alquiler', icon: '🏬' },
      { id: 'catastro', label: 'Catastro', icon: '📋' },
    ],
  },
  {
    name: 'Servicios',
    indicators: [
      { id: 'sanidad', label: 'Sanidad', icon: '🏥' },
      { id: 'educacion', label: 'Educacion', icon: '🎓' },
      { id: 'transporte', label: 'Transporte', icon: '🚗' },
    ],
  },
  {
    name: 'Otros',
    indicators: [
      { id: 'poblacion', label: 'Poblacion', icon: '👥' },
      { id: 'turismo', label: 'Turismo', icon: '✈️' },
    ],
  },
]

export default function LayerToggle({ selected, onChange }) {
  const [expandedCategory, setExpandedCategory] = useState('Economia')

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-700">Indicadores</h3>

      {INDICATOR_CATEGORIES.map((category) => (
        <div key={category.name} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedCategory(
              expandedCategory === category.name ? null : category.name
            )}
            className="w-full px-3 py-2 bg-gray-50 text-left text-sm font-medium
                       text-gray-700 hover:bg-gray-100 flex justify-between items-center"
          >
            <span>{category.name}</span>
            <span className="text-xs">
              {expandedCategory === category.name ? '▼' : '▶'}
            </span>
          </button>

          {expandedCategory === category.name && (
            <div className="p-2 space-y-1">
              {category.indicators.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => onChange(ind.id)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left
                    transition-colors duration-200
                    ${selected === ind.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  <span>{ind.icon}</span>
                  <span>{ind.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
