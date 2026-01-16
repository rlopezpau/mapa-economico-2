import { toPng } from 'html-to-image'

export default function ExportButton({ targetRef, filename = 'mapa-economico' }) {
  const handleExport = async () => {
    if (!targetRef?.current) return

    try {
      const dataUrl = await toPng(targetRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff',
      })

      // Crear link de descarga
      const link = document.createElement('a')
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error al exportar:', error)
      alert('Error al exportar el mapa')
    }
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white
                 rounded-md hover:bg-green-700 transition-colors duration-200
                 text-sm font-medium"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Exportar PNG
    </button>
  )
}
