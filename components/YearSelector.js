const YEARS = [2019, 2020, 2021, 2022, 2023, 2024]

export default function YearSelector({ selected, onChange }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700">Año</h3>
      <select
        value={selected}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   bg-white text-gray-700"
      >
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Slider alternativo */}
      <input
        type="range"
        min={YEARS[0]}
        max={YEARS[YEARS.length - 1]}
        value={selected}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none
                   cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{YEARS[0]}</span>
        <span>{YEARS[YEARS.length - 1]}</span>
      </div>
    </div>
  )
}
