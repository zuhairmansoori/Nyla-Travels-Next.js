// app/flight/booking/page.jsx
'use client'
import { use, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plane, User, Mail, Phone, ArrowRight } from 'lucide-react'

const TITLE_OPTIONS = ['Mr', 'Mrs', 'Ms']
const CHILD_TITLE_OPTIONS = ['Master', 'Miss']

function formatTime(t) {
  if (!t) return '--'
  return new Date(t).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(t) {
  if (!t) return '--'
  return new Date(t).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function FlightSummaryCard({ label, flight }) {
  const legs = flight?.flights || []
  const firstLeg = legs[0]
  const lastLeg = legs[legs.length - 1]
  const stops = legs.length - 1

  if (!firstLeg) return null

  return (
    <div className="border rounded-xl p-4 bg-white">
      <p className="text-xs font-medium text-gray-500 mb-2">{label}</p>
      <div className="flex items-center gap-3">
        {firstLeg.airline_logo && (
          <img src={firstLeg.airline_logo} alt={firstLeg.airline} className="w-8 h-8 object-contain" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: '#003069' }}>{firstLeg.airline}</p>
          <p className="text-xs text-gray-500">
            {stops === 0 ? firstLeg.flight_number : `${legs.length} flights, ${stops} stop${stops > 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">
            {formatTime(firstLeg.departure_airport?.time)} → {formatTime(lastLeg.arrival_airport?.time)}
          </p>
          <p className="text-xs text-gray-500">
            {firstLeg.departure_airport?.id} → {lastLeg.arrival_airport?.id} · {formatDate(firstLeg.departure_airport?.time)}
          </p>
        </div>
      </div>
    </div>
  )
}



export default function BookingPage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  const [tripType, setTripType] = useState('oneway')
  const [outboundFlight, setOutboundFlight] = useState(null)
  const [returnFlight, setReturnFlight] = useState(null)
  const [paxCounts, setPaxCounts] = useState({ adults: 1, children: 0, infants: 0 })

  const [passengers, setPassengers] = useState([])
  const [contact, setContact] = useState({ email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)



  async function fetcht() {
    const flight = JSON.parse(sessionStorage.getItem("selectedFlight"));
    const bookingToken = flight.booking_token;
    const searchParamString = sessionStorage.getItem("searchParams");
    const params = new URLSearchParams(searchParamString);
    console.log(bookingToken);
    // booking token add karo
    params.set("bookingToken", bookingToken);
    // ya agar API departureToken expect karti hai:
    // params.set("departureToken", bookingToken);
    console.log(params.toString());
    
    const res = await fetch(`/api/flight?${params.toString()}`)
    const data = await res.json()
    console.log('ye booking data hai', data)
    
  }
  
  useEffect(() => {
    console.log('booking api hit hua');
    fetcht()

  }, [])
  useEffect(() => {
    try {
      const searchParamsStr = sessionStorage.getItem('searchParams') || ''
      const params = new URLSearchParams(searchParamsStr)

      const type = params.get('tripType') || 'oneway'
      const adults = Number(params.get('adults')) || 1
      const children = Number(params.get('children')) || 0
      const infants = Number(params.get('infants')) || 0

      setTripType(type)
      setPaxCounts({ adults, children, infants })

      if (type === 'roundtrip') {
        const outbound = sessionStorage.getItem('selectedOutbound')
        const ret = sessionStorage.getItem('selectedReturn')
        if (!outbound || !ret) {
          setError('missing')
          return
        }
        setOutboundFlight(JSON.parse(outbound))
        setReturnFlight(JSON.parse(ret))
      } else {
        const flight = sessionStorage.getItem('selectedFlight')


        if (!flight) {
          setError('missing')
          return
        }
        setOutboundFlight(JSON.parse(flight))
      }

      const initialPassengers = []
      for (let i = 0; i < adults; i++) {
        initialPassengers.push({ type: 'adult', title: 'Mr', firstName: '', lastName: '' })
      }
      for (let i = 0; i < children; i++) {
        initialPassengers.push({ type: 'child', title: 'Master', firstName: '', lastName: '', dob: '' })
      }
      for (let i = 0; i < infants; i++) {
        initialPassengers.push({ type: 'infant', firstName: '', lastName: '', dob: '' })
      }
      setPassengers(initialPassengers)
      setLoaded(true)
    } catch (e) {
      console.log('booking page load error', e)
      setError('missing')
    }
  }, [])

  const totalPrice = useMemo(() => {
    if (tripType === 'roundtrip') return returnFlight?.price || 0
    return outboundFlight?.price || 0
  }, [tripType, outboundFlight, returnFlight])

  const totalTravellers = paxCounts.adults + paxCounts.children + paxCounts.infants

  // ✅ passenger field update karne ke liye
  function updatePassenger(index, field, value) {
    setPassengers(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  function validate() {
    for (const p of passengers) {
      if (!p.firstName?.trim() || !p.lastName?.trim()) return false
      if ((p.type === 'child' || p.type === 'infant') && !p.dob) return false
    }
    if (!contact.email?.trim() || !contact.phone?.trim()) return false
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) return false
    return true
  }

  // ✅ actual API call — booking DB me save karega
  async function handleContinue() {
    if (!validate()) {
      alert('Please fill all required fields correctly')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripType,
          outboundFlight,
          returnFlight: tripType === 'roundtrip' ? returnFlight : null,
          passengers,
          contact,
          totalPrice,
        }),
      })

      const data = await res.json()

      if (res.status === 401) {
        alert('Booking karne ke liye pehle login karo')
        router.push('/login?redirect=/flight/booking')
        setSubmitting(false)
        return
      }

      if (!res.ok) {
        alert(data.error || 'Booking save nahi ho payi, dobara try karo')
        setSubmitting(false)
        return
      }

      sessionStorage.setItem('bookingId', data.bookingId)
      router.push('/flight/confirmation')
    } catch (err) {
      console.error('Booking submit error:', err)
      alert('Kuch galat ho gaya, dobara try karo')
      setSubmitting(false)
    }
  }

  if (error === 'missing') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Plane className="mx-auto mb-4 text-gray-300" size={48} />
        <p className="text-gray-600 font-medium mb-2">Koi flight select nahi hui</p>
        <p className="text-sm text-gray-400 mb-6">Pehle flight search karke select karo</p>
        <Button onClick={() => router.push('/flights/search')} style={{ backgroundColor: '#003069' }}>
          Search Flights
        </Button>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading booking details...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold" style={{ color: '#003069' }}>Passenger Details</h1>

      <div className="flex flex-col gap-3">
        <FlightSummaryCard label="Outbound" flight={outboundFlight} />
        {tripType === 'roundtrip' && (
          <FlightSummaryCard label="Return" flight={returnFlight} />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium" style={{ color: '#003069' }}>
          Traveller Details ({totalTravellers} traveller{totalTravellers > 1 ? 's' : ''})
        </p>

        {passengers.map((p, idx) => (
          <div key={idx} className="border rounded-xl p-4 bg-white flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User size={16} style={{ color: '#0d7fd6' }} />
              <p className="text-sm font-medium">
                {p.type === 'adult' ? `Adult ${idx + 1}` : p.type === 'child' ? `Child ${idx + 1}` : `Infant ${idx + 1}`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {p.type !== 'infant' && (
                <Select value={p.title} onValueChange={(v) => updatePassenger(idx, 'title', v)}>
                  <SelectTrigger className="sm:col-span-1">
                    <SelectValue placeholder="Title" />
                  </SelectTrigger>
                  <SelectContent>
                    {(p.type === 'adult' ? TITLE_OPTIONS : CHILD_TITLE_OPTIONS).map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Input
                placeholder="First name"
                value={p.firstName}
                onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)}
                className={p.type === 'infant' ? 'sm:col-span-2' : 'sm:col-span-1'}
              />
              <Input
                placeholder="Last name"
                value={p.lastName}
                onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)}
                className={p.type === 'infant' ? 'sm:col-span-2' : 'sm:col-span-1'}
              />

              {(p.type === 'child' || p.type === 'infant') && (
                <Input
                  type="date"
                  placeholder="Date of birth"
                  value={p.dob}
                  onChange={(e) => updatePassenger(idx, 'dob', e.target.value)}
                  className="sm:col-span-1"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-4 bg-white flex flex-col gap-3">
        <p className="text-sm font-medium" style={{ color: '#003069' }}>Contact Details</p>
        <p className="text-xs text-gray-400 -mt-2">Booking confirmation yahan bheji jaayegi</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="Email address"
              value={contact.email}
              onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
              className="pl-9"
            />
          </div>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="tel"
              placeholder="Phone number"
              value={contact.phone}
              onChange={(e) => setContact(prev => ({ ...prev, phone: e.target.value }))}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-4 bg-white flex flex-col gap-3 sticky bottom-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total for {totalTravellers} traveller{totalTravellers > 1 ? 's' : ''} (incl. taxes)</p>
            <p className="text-2xl font-bold" style={{ color: '#0d7fd6' }}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </p>
          </div>
          <Button
            onClick={handleContinue}
            disabled={submitting}
            className="h-12 px-6 rounded-xl text-white font-medium"
            style={{ backgroundColor: '#003069' }}
          >
            {submitting ? 'Booking...' : 'Continue'}
            {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}