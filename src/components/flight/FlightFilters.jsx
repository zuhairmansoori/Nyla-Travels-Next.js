'use client'

const TIME_SLOTS = [
  { label: 'Before 6 AM', value: 'early', range: [0, 6] },
  { label: '6 AM - 12 PM', value: 'morning', range: [6, 12] },
  { label: '12 PM - 6 PM', value: 'afternoon', range: [12, 18] },
  { label: 'After 6 PM', value: 'evening', range: [18, 24] },
]

export default function FlightFilters({ filters, setFilters, airlines, maxPrice }) {

  const toggleStop = (val) => {
    setFilters(prev => ({
      ...prev,
      stops: prev.stops.includes(val)
        ? prev.stops.filter(s => s !== val)
        : [...prev.stops, val]
    }))
  }

  const toggleAirline = (val) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(val)
        ? prev.airlines.filter(a => a !== val)
        : [...prev.airlines, val]
    }))
  }

  const toggleTime = (val) => {
    setFilters(prev => ({
      ...prev,
      departureTime: prev.departureTime.includes(val)
        ? prev.departureTime.filter(t => t !== val)
        : [...prev.departureTime, val]
    }))
  }

  const resetFilters = () => {
    setFilters({
      stops: [],
      airlines: [],
      departureTime: [],
      maxPrice: maxPrice,
      sortBy: 'price',
    })
  }

  return (
    <div className="w-full sm:w-64 shrink-0 border rounded-xl p-4 flex flex-col gap-5 bg-white h-fit">

      <div className="flex items-center justify-between">
        <h3 className="font-semibold" style={{ color: '#003069' }}>Filters</h3>
        <button onClick={resetFilters} className="text-xs text-gray-500 hover:underline">
          Reset
        </button>
      </div>

      {/* Sort */}
      <div>
        <p className="text-sm font-medium mb-2">Sort by</p>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          className="w-full border rounded-lg px-2 py-1.5 text-sm"
        >
          <option value="price">Cheapest</option>
          <option value="duration">Shortest duration</option>
          <option value="departure">Earliest departure</option>
        </select>
      </div>

      {/* Stops */}
      <div>
        <p className="text-sm font-medium mb-2">Stops</p>
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Non-stop', value: 0 },
            { label: '1 Stop', value: 1 },
            { label: '2+ Stops', value: 2 },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.stops.includes(opt.value)}
                onChange={() => toggleStop(opt.value)}
                className="accent-[#003069]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-sm font-medium mb-2">
          Max Price: ₹{filters.maxPrice?.toLocaleString('en-IN')}
        </p>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#0d7fd6]"
        />
      </div>

      {/* Departure time */}
      <div>
        <p className="text-sm font-medium mb-2">Departure time</p>
        <div className="flex flex-col gap-1.5">
          {TIME_SLOTS.map(slot => (
            <label key={slot.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.departureTime.includes(slot.value)}
                onChange={() => toggleTime(slot.value)}
                className="accent-[#003069]"
              />
              {slot.label}
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      {airlines.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Airlines</p>
          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
            {airlines.map(airline => (
              <label key={airline} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={() => toggleAirline(airline)}
                  className="accent-[#003069]"
                />
                {airline}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}