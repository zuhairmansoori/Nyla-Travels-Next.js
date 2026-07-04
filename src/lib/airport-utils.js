import { airports } from "@/components/data/airports";

/**
 * URL/searchParams se sirf IATA string milta hai (e.g. "DEL"),
 * lekin FlightInput component ko poora airport object chahiye
 * ({ iata, city, name, country, icao }) — yeh function wahi convert karta hai.
 */
export function findAirportByIata(iata) {
  if (!iata) return null;
  return airports.find((a) => a.iata === iata) || null;
}