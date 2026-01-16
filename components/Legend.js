const INDICATOR_CONFIG = {
  pib: {
    label: 'PIB per cápita',
    unit: '€',
    colors: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
  },
  paro: {
    label: 'Tasa de paro',
    unit: '%',
    colors: ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#084594'],
  },
  ipc: {
    label: 'IPC',
    unit: '%',
    colors: ['#f7fcf5', '#c7e9c0', '#74c476', '#238b45', '#00441b'],
  },
  salarios: {
    label: 'Salario medio',
    unit: '€',
    colors: ['#fff5eb', '#fdd0a2', '#fd8d3c', '#d94801', '#7f2704'],
  },
  poblacion: {
    label: 'Población',
    unit: 'hab.',
    colors: ['#f7f4f9', '#d4b9da', '#c994c7', '#df65b0', '#980043'],
  },
}

export default function Legend({ indicator, min = 0, max = 100 }) {
  const config = INDICATOR_CONFIG[indicator] || INDICATOR_CONFIG.pib
  const colors = config.colors
  const step = (max - min) / colors.length

  return (
    <div className="legend">
      <h4 className="font-semibold text-sm mb-2">{config.label}</h4>
      <div className="space-y-1">
        {colors.map((color, i) => {
          const rangeMin = min + step * i
          const rangeMax = min + step * (i + 1)
          return (
            <div key={i} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: color }}
              />
              <span>
                {rangeMin.toLocaleString('es-ES')} - {rangeMax.toLocaleString('es-ES')} {config.unit}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
