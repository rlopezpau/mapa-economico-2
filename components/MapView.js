import { useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix para los iconos de Leaflet en Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Colores para la escala de valores
const getColor = (value, min, max) => {
  if (value === null || value === undefined) return '#cccccc'

  const normalized = (value - min) / (max - min)
  const colors = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15']
  const index = Math.min(Math.floor(normalized * colors.length), colors.length - 1)
  return colors[index]
}

// Componente para ajustar la vista del mapa
function FitBounds({ geoData }) {
  const map = useMap()

  useEffect(() => {
    if (geoData && geoData.features && geoData.features.length > 0) {
      const geoJsonLayer = L.geoJSON(geoData)
      map.fitBounds(geoJsonLayer.getBounds())
    }
  }, [geoData, map])

  return null
}

export default function MapView({
  geoData,
  indicator = 'pib',
  year = 2023,
  onFeatureClick
}) {
  // Centro de España
  const center = [40.4168, -3.7038]
  const zoom = 6

  // Calcular min/max para la escala de colores
  const values = geoData?.features
    ?.map(f => f.properties?.[indicator])
    ?.filter(v => v !== null && v !== undefined) || []

  const min = Math.min(...values, 0)
  const max = Math.max(...values, 100)

  // Estilo para cada feature del GeoJSON
  const style = (feature) => {
    const value = feature.properties?.[indicator]
    return {
      fillColor: getColor(value, min, max),
      weight: 1,
      opacity: 1,
      color: '#666',
      fillOpacity: 0.7,
    }
  }

  // Interacciones con cada feature
  const onEachFeature = (feature, layer) => {
    const props = feature.properties || {}
    const value = props[indicator]
    const name = props.nombre || props.name || 'Sin nombre'

    // Tooltip al pasar el mouse
    layer.bindTooltip(`
      <strong>${name}</strong><br/>
      ${indicator.toUpperCase()}: ${value?.toLocaleString('es-ES') || 'N/D'}
    `)

    // Eventos de hover
    layer.on({
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#333',
          fillOpacity: 0.9,
        })
        layer.bringToFront()
      },
      mouseout: (e) => {
        e.target.setStyle(style(feature))
      },
      click: () => {
        if (onFeatureClick) {
          onFeatureClick(feature)
        }
      }
    })
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoData && geoData.features && (
        <>
          <GeoJSON
            key={`${indicator}-${year}`}
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
          <FitBounds geoData={geoData} />
        </>
      )}
    </MapContainer>
  )
}
