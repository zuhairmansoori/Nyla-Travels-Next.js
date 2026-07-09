"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeftRight,
  CalendarIcon,
  Users,
  Search,
  Plus,
  Minus,
} from "lucide-react";
import FlightInput from "@/components/ui/FlightInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { findAirportByIata } from "@/lib/airport-utils";

const TRIP_TYPES = [
  { value: "oneway", label: "One way" },
  { value: "roundtrip", label: "Round trip" },
  { value: "multicity", label: "Multi-city" },
];

const CLASSES = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First class" },
];

/**
 * FlightSearchForm
 *
 * Reusable on:
 * 1. Homepage          -> <FlightSearchForm />
 * 2. Results page       -> <FlightSearchForm compact defaultValues={{...}} />
 *
 * defaultValues shape (all optional, usually built from URL searchParams):
 * {
 *   tripType: "oneway" | "roundtrip" | "multicity",
 *   from: "DEL",          // IATA string (NOT the airport object)
 *   to: "BOM",             // IATA string
 *   departDate: "2026-07-15", // "yyyy-MM-dd" string
 *   returnDate: "2026-07-20", // "yyyy-MM-dd" string
 *   adults: 1,
 * 
 *   children: 0,
 *   infants: 0,
 *   travelClass: "economy",
 * }
 */
export default function FlightSearchForm({ defaultValues, compact = false }) {
  const router = useRouter();

  const [tripType, setTripType] = useState(defaultValues?.tripType || "oneway");

  // defaultValues.from/to aate hain IATA string ke roop mein (URL se),
  // FlightInput ko poora airport object chahiye -> convert karo
  const [from, setFrom] = useState(() => findAirportByIata(defaultValues?.from));
  const [to, setTo] = useState(() => findAirportByIata(defaultValues?.to));

  const [departDate, setDepartDate] = useState(() =>
    defaultValues?.departDate ? new Date(defaultValues.departDate) : null
  );
  const [returnDate, setReturnDate] = useState(() =>
    defaultValues?.returnDate ? new Date(defaultValues.returnDate) : null
  );
  const [departOpen, setDepartOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  const [passengersOpen, setPassengersOpen] = useState(false);
  const [adults, setAdults] = useState(defaultValues?.adults || 1);
  const [children, setChildren] = useState(defaultValues?.children || 0);
  const [infants, setInfants] = useState(defaultValues?.infants || 0);
  const [travelClass, setTravelClass] = useState(defaultValues?.travelClass || "economy");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const updateCount = (setter, current, delta, min, max) => {
    const next = current + delta;
    if (next >= min && next <= max) setter(next);
  };

  const totalTravellers = adults + children + infants;
  const classLabel = CLASSES.find((c) => c.value === travelClass)?.label;

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please select both departure and arrival airports");
      return;
    }
    if (!departDate) {
      alert("Please select a departure date");
      return;
    }
    if (tripType === "roundtrip" && !returnDate) {
      alert("Please select a return date");
      return;
    }

    const params = new URLSearchParams({
      tripType,
      from: from.iata,
      to: to.iata,
      departDate: format(departDate, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      infants: String(infants),
      travelClass,
    });

    // returnDate sirf roundtrip ke liye add karo, warna URL mein "returnDate=" khali aayega
    if (tripType === "roundtrip" && returnDate) {
      params.set("returnDate", format(returnDate, "yyyy-MM-dd"));
    }

    router.push(`/flights/search?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto bg-white rounded-2xl border shadow-sm",
        compact ? "p-3 md:p-4" : "p-4 md:p-6"
      )}
    >
      {/* Trip type toggle */}
      <div className="flex gap-2 mb-4">
        {TRIP_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setTripType(type.value)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full border transition-colors",
              tripType === type.value
                ? "bg-[#003069] text-white border-[#003069]"
                : "bg-white text-foreground border-input hover:bg-accent"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* From / Swap / To */}
      <div className="relative flex flex-col md:flex-row gap-3 mb-3">
        <div className="flex-1">
          <FlightInput
            value={from}
            onChange={setFrom}
            placeholder="Select departure airport..."
            excludeIata={to?.iata}
          />
        </div>

        <button
          type="button"
          onClick={handleSwap}
          disabled={!from && !to}
          aria-label="Swap origin and destination"
          className={cn(
            "z-10 h-9 w-9 rounded-full border bg-background flex items-center justify-center shrink-0",
            "hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed",
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:self-center"
          )}
        >
          <ArrowLeftRight className="h-4 w-4 text-[#0d7fd6] transform rotate-90" />
        </button>

        <div className="flex-1">
          <FlightInput
            value={to}
            onChange={setTo}
            placeholder="Select arrival airport..."
            excludeIata={from?.iata}
          />
        </div>
      </div>

      {/* Dates + Passengers */}
      <div
        className={cn(
          "grid gap-3",
          tripType === "multicity"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        )}
      >
        {/* Departure date */}
        <Popover open={departOpen} onOpenChange={setDepartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-14 w-full justify-start rounded-xl"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[#0d7fd6] shrink-0" />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[11px] text-muted-foreground">
                  Departure
                </span>
                <span className="truncate text-sm">
                  {departDate ? format(departDate, "dd MMM yyyy") : "Select date"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={departDate}
              onSelect={(date) => {
                setDepartDate(date);
                // Agar return date departure se pehle hai to clear karo
                if (returnDate && date && returnDate < date) {
                  setReturnDate(null);
                }
                setDepartOpen(false);
              }}
              disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Return date - sirf roundtrip me */}
        {tripType !== "multicity" && (
          <Popover open={returnOpen} onOpenChange={setReturnOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={tripType === "oneway"}
                className="h-14 w-full justify-start rounded-xl disabled:opacity-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#0d7fd6] shrink-0" />
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-[11px] text-muted-foreground">
                    Return
                  </span>
                  <span className="truncate text-sm">
                    {tripType === "oneway"
                      ? "—"
                      : returnDate
                      ? format(returnDate, "dd MMM yyyy")
                      : "Select date"}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={(date) => {
                  setReturnDate(date);
                  setReturnOpen(false);
                }}
                disabled={(date) =>
                  date < (departDate || new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        {/* Passengers + Class */}
        <Popover open={passengersOpen} onOpenChange={setPassengersOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-14 w-full justify-start rounded-xl"
            >
              <Users className="mr-2 h-4 w-4 text-[#0d7fd6] shrink-0" />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[11px] text-muted-foreground">
                  Travellers &amp; class
                </span>
                <span className="truncate text-sm">
                  {totalTravellers} traveller{totalTravellers > 1 ? "s" : ""},{" "}
                  {classLabel}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4" align="end">
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Adults</p>
                  <p className="text-xs text-muted-foreground">12+ years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateCount(setAdults, adults, -1, 1, 9)}
                    disabled={adults <= 1}
                    className="h-7 w-7 rounded-full border flex items-center justify-center disabled:opacity-30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm">{adults}</span>
                  <button
                    type="button"
                    onClick={() => updateCount(setAdults, adults, 1, 1, 9)}
                    disabled={adults >= 9}
                    className="h-7 w-7 rounded-full border flex items-center justify-center disabled:opacity-30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Children</p>
                  <p className="text-xs text-muted-foreground">2-11 years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateCount(setChildren, children, -1, 0, 8)}
                    disabled={children <= 0}
                    className="h-7 w-7 rounded-full border flex items-center justify-center disabled:opacity-30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm">{children}</span>
                  <button
                    type="button"
                    onClick={() => updateCount(setChildren, children, 1, 0, 8)}
                    disabled={children >= 8}
                    className="h-7 w-7 rounded-full border flex items-center justify-center disabled:opacity-30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Infants</p>
                  <p className="text-xs text-muted-foreground">Under 2 years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateCount(setInfants, infants, -1, 0, adults)}
                    disabled={infants <= 0}
                    className="h-7 w-7 rounded-full border flex items-center justify-center disabled:opacity-30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm">{infants}</span>
                  <button
                    type="button"
                    onClick={() => updateCount(setInfants, infants, 1, 0, adults)}
                    disabled={infants >= adults}
                    className="h-7 w-7 rounded-full border flex items-center justify-center disabled:opacity-30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-2">Travel class</p>
                <div className="grid grid-cols-2 gap-2">
                  {CLASSES.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setTravelClass(c.value)}
                      className={cn(
                        "text-xs px-2 py-2 rounded-lg border text-left",
                        travelClass === c.value
                          ? "bg-[#003069] text-white border-[#003069]"
                          : "hover:bg-accent"
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-[#003069] hover:bg-[#0d7fd6]"
                onClick={() => setPassengersOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search button */}
      <Button
        onClick={handleSearch}
        className="w-full mt-4 h-12 rounded-xl bg-[#003069] hover:bg-[#0d7fd6] text-white font-medium"
      >
        <Search className="mr-2 h-4 w-4" />
        Search flights
      </Button>
    </div>
  );
}