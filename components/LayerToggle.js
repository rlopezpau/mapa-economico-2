const INDICATORS = [
  { id: 'pib', label: 'PIB per cápita', icon: '💰' },
  { id: 'paro', label: 'Tasa de paro', icon: '📊' },
  { id: 'ipc', label: 'IPC', icon: '📈' },
  { id: 'salarios', label: 'Salarios', icon: '💵' },
  { id: 'poblacion', label: 'Población', icon: '👥' },
]

export default function LayerToggle({ selected, onChange }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">Indicador</h3>
      <div className="flex flex-col gap-1">
        {INDICATORS.map((ind) => (
          <button
            key={ind.id}
            onClick={() => onChange(ind.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left
              transition-colors duration-200
              ${selected === ind.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span>{ind.icon}</span>
            <span>{ind.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
