import { getJson } from 'serpapi'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const { searchParams } = req.nextUrl

    const tripType = searchParams.get('tripType')
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const departDate = searchParams.get('departDate')
    const returnDate = searchParams.get('returnDate')
    const adults = searchParams.get('adult')
    const children = searchParams.get('children')
    const infants = searchParams.get('infants')
    const travelClass = searchParams.get('travelClass')

    const departureToken = searchParams.get('departureToken')
    const bookingToken = searchParams.get('bookingToken')

    const travelClassMap = {
        economy: 1,
        premium: 2,
        business: 3,
        first: 4,
    }

    console.log('api hit', { tripType, from, to, departureToken })

    if (!from || !to || !departDate) {
        return NextResponse.json(
            { error: 'from, to, departDate required hai' },
            { status: 400 }
        )
    }

    try {
        const params = {
            engine: "google_flights",
            api_key: process.env.SERP_API_KEY,

            departure_id: from,
            arrival_id: to,

            type: tripType === "roundtrip" ? 1 : 2,

            outbound_date: departDate,

            adults: Number(adults) || 1,
            children: Number(children) || 0,
            infants_on_lap: Number(infants) || 0,

            travel_class: travelClassMap[travelClass] || 1,

            gl: "in",
            hl: "en",
            currency: "INR",
        }

        // ✅ return_date sirf round trip me hi bhejo
        if (tripType === "roundtrip" && returnDate) {
            params.return_date = returnDate
        }

        // ⚠️ dono token ek saath kabhi mat bhejna
        if (bookingToken) {
            params.booking_token = bookingToken
        } else if (departureToken) {
            params.departure_token = departureToken
        }

        const data = await getJson(params)
        return NextResponse.json(data)
    } catch (error) {
        console.error('SerpApi error:', error)
        return NextResponse.json({ error: 'Flight search failed' }, { status: 500 })
    }
}