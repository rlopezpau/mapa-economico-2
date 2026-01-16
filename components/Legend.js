const INDICATOR_CONFIG = {
  // Economia
  pib: {
    label: 'PIB per capita',
    unit: '€',
    colors: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
  },
  paro: {
    label: 'Tasa de paro',
    unit: '%',
    colors: ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#084594'],
  },
  'paro-detalle': {
    label: 'Paro total',
    unit: 'personas',
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
  empresas: {
    label: 'Num. empresas',
    unit: '',
    colors: ['#f7f4f9', '#d4b9da', '#c994c7', '#df65b0', '#980043'],
  },

  // Inmobiliario
  'vivienda-venta': {
    label: 'Precio venta',
    unit: '€/m2',
    colors: ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'],
  },
  'vivienda-alquiler': {
    label: 'Precio alquiler',
    unit: '€/mes',
    colors: ['#f7fcf0', '#ccebc5', '#7bccc4', '#2b8cbe', '#084081'],
  },
  'locales-venta': {
    label: 'Locales venta',
    unit: '€/m2',
    colors: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#d7301f'],
  },
  'locales-alquiler': {
    label: 'Locales alquiler',
    unit: '€/m2/mes',
    colors: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#8c96c6', '#810f7c'],
  },
  catastro: {
    label: 'Inmuebles urbanos',
    unit: '',
    colors: ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#ae017e'],
  },

  // Servicios
  sanidad: {
    label: 'Hospitales',
    unit: '',
    colors: ['#f7fcfd', '#ccece6', '#66c2a4', '#238b45', '#005824'],
  },
  educacion: {
    label: 'Centros educativos',
    unit: '',
    colors: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#023858'],
  },
  transporte: {
    label: 'Vehiculos',
    unit: '',
    colors: ['#fff7f3', '#fde0dd', '#fcc5c0', '#f768a1', '#7a0177'],
  },

  // Otros
  poblacion: {
    label: 'Poblacion',
    unit: 'hab.',
    colors: ['#f7f4f9', '#d4b9da', '#c994c7', '#df65b0', '#980043'],
  },
  turismo: {
    label: 'Viajeros',
    unit: '',
    colors: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#1d91c0', '#0c2c84'],
  },
}

// Formatear numeros grandes
const formatNumber = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toLocaleString('es-ES')
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
              <span className="text-xs">
                {formatNumber(rangeMin)} - {formatNumber(rangeMax)} {config.unit}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
