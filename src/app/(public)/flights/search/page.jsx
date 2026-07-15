'use client'
import FlightCard from "@/components/flight/FlightCard"
import FlightFilters from "@/components/flight/FlightFilters"
import FlightSearchForm from "@/components/form/FlightSearchForm"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { SlidersHorizontal, X } from 'lucide-react'

const TIME_SLOTS = {
  early: [0, 6], morning: [6, 12], afternoon: [12, 18], evening: [18, 24]
}

export default function Page() {
  const [showFilters, setShowFilters] = useState(false)
  const searchParam = useSearchParams()
  const router = useRouter()

  const [flights, setFlights] = useState(null)
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState('outbound')
  const [selectedOutbound, setSelectedOutbound] = useState(null)
  const searchParamString = searchParam.toString()

  // ✅ fixed
  const isRoundTrip = searchParam.get('tripType') === 'roundtrip'

  const [filters, setFilters] = useState({
    stops: [],
    airlines: [],
    departureTime: [],
    maxPrice: 999999,
    sortBy: 'price',
  })

  // ✅ fixed
  const searchDefaultValues = useMemo(() => ({
    tripType: searchParam.get('tripType') || 'oneway',
    from: searchParam.get('from') || '',
    to: searchParam.get('to') || '',
    departDate: searchParam.get('departDate') || null,
    returnDate: searchParam.get('returnDate') || null,
    adults: Number(searchParam.get('adult')) || 1,
    children: Number(searchParam.get('children')) || 0,
    infants: Number(searchParam.get('infants')) || 0,
    travelClass: searchParam.get('travelClass') || 'economy',
  }), [searchParamString])

  useEffect(() => {
    setStep('outbound')
    setSelectedOutbound(null)
    fetchFlights(new URLSearchParams(searchParamString))
  }, [searchParamString])

  async function fetchFlights(params) {
    setLoading(true)
    try {
      const res = await fetch(`/api/flight?${params.toString()}`)
      const data = await res.json()
      setFlights(data)

      const allFlights = [...(data?.best_flights || []), ...(data?.other_flights || [])]
      const max = Math.max(...allFlights.map(f => f.price || 0), 0)
      setFilters(prev => ({ ...prev, maxPrice: max }))
    } catch (error) {
      console.log('api fetch', error)
    } finally {
      setLoading(false)
    }
  }

  const allFlights = useMemo(() => {
    return [...(flights?.best_flights || []), ...(flights?.other_flights || [])]
  }, [flights])

  const airlines = useMemo(() => {
    const set = new Set(allFlights.map(f => f.flights?.[0]?.airline).filter(Boolean))
    return Array.from(set)
  }, [allFlights])

  const filteredFlights = useMemo(() => {
    let result = allFlights.filter(f => {
      const stopsCount = (f.flights?.length || 1) - 1
      const stopMatch = filters.stops.length === 0 ||
        filters.stops.includes(stopsCount >= 2 ? 2 : stopsCount)

      const airlineMatch = filters.airlines.length === 0 ||
        filters.airlines.includes(f.flights?.[0]?.airline)

      const priceMatch = (f.price || 0) <= filters.maxPrice

      const depHour = f.flights?.[0]?.departure_airport?.time
        ? new Date(f.flights[0].departure_airport.time).getHours()
        : null
      const timeMatch = filters.departureTime.length === 0 || filters.departureTime.some(slot => {
        const [start, end] = TIME_SLOTS[slot]
        return depHour !== null && depHour >= start && depHour < end
      })

      return stopMatch && airlineMatch && priceMatch && timeMatch
    })

    if (filters.sortBy === 'price') {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (filters.sortBy === 'duration') {
      result = [...result].sort((a, b) => (a.total_duration || 0) - (b.total_duration || 0))
    } else if (filters.sortBy === 'departure') {
      result = [...result].sort((a, b) =>
        new Date(a.flights?.[0]?.departure_airport?.time || 0) -
        new Date(b.flights?.[0]?.departure_airport?.time || 0)
      )
    }

    return result
  }, [allFlights, filters])

  const handleSelect = async (flight) => {
    if (!isRoundTrip) {
      sessionStorage.setItem('selectedFlight', JSON.stringify(flight))
      sessionStorage.setItem('searchParams', searchParamString)
      router.push('/flights/booking')
      return
    }

    if (step === 'outbound') {
      setSelectedOutbound(flight)
      sessionStorage.setItem('selectedOutbound', JSON.stringify(flight))

      const params = new URLSearchParams(searchParamString)
      params.set('departureToken', flight.departure_token)   // ✅ fixed: camelCase

      setStep('return')
      await fetchFlights(params)
    } else {
      sessionStorage.setItem('selectedReturn', JSON.stringify(flight))
      sessionStorage.setItem('searchParams', searchParamString)
      router.push('/flights/booking')
    }
  }

  const handleBackToOutbound = () => {
    setStep('outbound')
    fetchFlights(new URLSearchParams(searchParamString))   // ✅ fixed: proper URLSearchParams object
  }

  return (
    <>
      <div className= "bg-blue-50 border rounded-xl p-4">
        <FlightSearchForm defaultValues={searchDefaultValues} compact />
      </div>
      <div className="max-w-full mx-2 lg:mx-5 px-4 py-6 flex flex-col sm:flex-row gap-4">

        <button
          onClick={() => setShowFilters(true)}
          className="sm:hidden flex items-center justify-center gap-2 border rounded-lg py-2.5 px-4 bg-white font-medium text-sm"
          style={{ color: '#003069' }}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        <div
          className={`sm:block sm:relative sm:w-64 sm:shrink-0 ${showFilters ? 'fixed inset-0 z-50 bg-black/40' : 'hidden'}`}
          onClick={() => setShowFilters(false)}
        >
          <div className="bg-white h-full sm:h-fit w-[85%] sm:w-full max-w-sm sm:max-w-none overflow-y-auto sm:overflow-visible" onClick={(e) => e.stopPropagation()}>
            <div className="sm:hidden flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>

            <FlightFilters
              filters={filters}
              setFilters={setFilters}
              airlines={airlines}
              maxPrice={Math.max(...allFlights.map(f => f.price || 0), 0)}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">

          {isRoundTrip && step === 'return' && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-sm">
                <span className="text-gray-500">Outbound selected: </span>
                <span className="font-medium" style={{ color: '#003069' }}>
                  {selectedOutbound?.flights?.[0]?.airline} · ₹{selectedOutbound?.price?.toLocaleString('en-IN')}
                </span>
              </div>
              <button onClick={handleBackToOutbound} className="text-sm underline" style={{ color: '#0d7fd6' }}>
                Change
              </button>
            </div>
          )}

          <p className="text-sm font-medium" style={{ color: '#003069' }}>
            {isRoundTrip ? (step === 'outbound' ? 'Select Outbound Flight' : 'Select Return Flight') : 'Select Flight'}
          </p>

          {loading && (
            <p className="text-center text-gray-500">Loading flights...</p>
          )}

          {!loading && (
            <p className="text-sm text-gray-500">{filteredFlights.length} flights found</p>
          )}

          {!loading && filteredFlights.length === 0 && (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-2 border rounded-xl bg-white text-center px-4">
              <p className="text-gray-600 font-medium">No flights match your filters</p>
              <p className="text-sm text-gray-400">Try adjusting stops, price or airline filters</p>
            </div>
          )}

          {!loading && filteredFlights.length > 0 && filteredFlights.map((flight, idx) => (
            <FlightCard
              key={flight.departure_token || flight.booking_token || idx}
              flight={flight}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </>
  )
  
}
