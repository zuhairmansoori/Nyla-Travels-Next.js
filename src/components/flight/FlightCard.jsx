'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FlightCard({ flight,onSelect }) {
    const [expanded, setExpanded] = useState(false)
    console.log(flight)

    const legs = flight?.flights || []
    const layovers = flight?.layovers || []
    const firstLeg = legs[0]
    const lastLeg = legs[legs.length - 1]
    const stops = legs.length - 1

    if (!firstLeg || !lastLeg) return null

    const formatTime = (t) => {
        if (!t) return '--'
        const d = new Date(t)
        return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }

    const formatDuration = (mins) => {
        if (!mins) return ''
        const h = Math.floor(mins / 60)
        const m = mins % 60
        return `${h}h ${m}m`
    }

    return (
       <div className="w-full border rounded-xl p-3 sm:p-4 flex flex-col gap-3 hover:shadow-md transition-shadow bg-white">

    {/* Top summary row - clickable to expand */}
    <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
    >
        {/* Airline info + Timing — mobile pe same row */}
        <div className="flex items-center justify-between gap-3 sm:contents">
            
            {/* Airline info */}
            <div className="flex items-center gap-2 sm:w-1/5 min-w-0">
                {firstLeg.airline_logo && (
                    <img
                        src={firstLeg.airline_logo}
                        alt={firstLeg.airline}
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
                    />
                )}
                <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#003069' }}>
                        {firstLeg.airline}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {stops === 0 ? firstLeg.flight_number : `${legs.length} flights`}
                    </p>
                </div>
            </div>
        </div>

        {/* Timing */}
        <div className="flex items-center justify-between gap-2 sm:justify-center sm:gap-3 sm:w-2/5">
            <div className="text-center">
                <p className="text-base font-semibold">{formatTime(firstLeg.departure_airport?.time)}</p>
                <p className="text-xs text-gray-500">{firstLeg.departure_airport?.id}</p>
            </div>

            <div className="flex-1 flex flex-col items-center px-2 min-w-[60px]">
                <p className="text-xs text-gray-400">{formatDuration(flight.total_duration)}</p>
                <div className="w-full h-px bg-gray-300 relative my-1">
                    {stops > 0 &&
                        layovers.map((_, i) => (
                            <span
                                key={i}
                                className="absolute -top-1.5 w-2 h-2 rounded-full bg-gray-400"
                                style={{ left: `${((i + 1) / (stops + 1)) * 100}%`, transform: 'translateX(-50%)' }}
                            />
                        ))}
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
                    {stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`}
                    {stops > 0 && (
                        <ChevronDown
                            size={12}
                            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                    )}
                </p>
            </div>

            <div className="text-center">
                <p className="text-base font-semibold">{formatTime(lastLeg.arrival_airport?.time)}</p>
                <p className="text-xs text-gray-500">{lastLeg.arrival_airport?.id}</p>
            </div>
        </div>

        {/* Class */}
        <div className="hidden sm:block sm:w-1/5 text-center">
            <p className="text-xs text-gray-500">{firstLeg.travel_class}</p>
        </div>

        {/* Price + CTA — mobile pe apni alag row, top border se separate */}
        <div className="flex items-center justify-between pt-2 border-t sm:border-t-0 sm:pt-0 sm:justify-end sm:gap-3 sm:w-1/5">
            <p className="text-lg font-bold" style={{ color: '#0d7fd6' }}>
                ₹{flight.price?.toLocaleString('en-IN')}
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onSelect(flight)
                }}
                className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#003069' }}
            >
                Select
            </button>
        </div>
    </div>

    {/* Expanded leg-by-leg detail with layovers — bilkul same, koi change nahi */}
    {expanded && stops > 0 && (
        <div className="border-t pt-3 flex flex-col gap-2">
            {legs.map((leg, idx) => (
                <div key={idx}>
                    <div className="flex items-center gap-3 py-1">
                        {leg.airline_logo && (
                            <img src={leg.airline_logo} alt={leg.airline} className="w-5 h-5 object-contain" />
                        )}
                        <div className="flex-1 flex items-center justify-between text-sm">
                            <div>
                                <span className="font-medium">{formatTime(leg.departure_airport?.time)}</span>
                                <span className="text-gray-500 ml-1">{leg.departure_airport?.id}</span>
                                <span className="text-gray-400 mx-2">→</span>
                                <span className="font-medium">{formatTime(leg.arrival_airport?.time)}</span>
                                <span className="text-gray-500 ml-1">{leg.arrival_airport?.id}</span>
                                {leg.overnight && (
                                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-medium">
                                        Overnight
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-400">{formatDuration(leg.duration)}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 pl-8">
                        {leg.airline} · {leg.flight_number} · {leg.travel_class}
                    </p>

                    {layovers[idx] && (
                        <div className="flex items-center gap-2 pl-8 py-2 my-1 bg-amber-50 rounded-lg text-xs text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            {formatDuration(layovers[idx].duration)} layover at {layovers[idx].name} ({layovers[idx].id})
                        </div>
                    )}
                </div>
            ))}
        </div>
    )}
</div>
    )
}