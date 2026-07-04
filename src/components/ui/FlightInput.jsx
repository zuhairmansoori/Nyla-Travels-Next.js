"use client";
import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Plane } from "lucide-react";
import { airports } from "@/components/data/airports";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function FlightInput({ value, onChange, placeholder, excludeIata }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const filteredAirports = useMemo(() => {
    const base = excludeIata
      ? airports.filter((a) => a.iata !== excludeIata)
      : airports;

    if (!query) return base.slice(0, 20);
    const q = query.toLowerCase();
    return base
      .filter(
        (a) =>
          a.city.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.iata.toLowerCase().includes(q) ||
          a.icao.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [query, excludeIata]);

  const handleOpenChange = (o) => {
    setOpen(o);
    if (o) setQuery("");
  };

  const handleSelect = (airport) => {
    onChange(airport);
    setOpen(false);
  };

  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="h-14 w-full justify-between rounded-xl"
    >
      {value ? (
        <div className="flex items-center gap-2 overflow-hidden">
          <Plane className="size-4 shrink-0 text-primary" />
          <span className="truncate">
            {value.city} ({value.iata})-{value.name}
          </span>
        </div>
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  const airportList = (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search city, airport, IATA, ICAO..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[300px] md:max-h-[300px] overflow-y-auto">
        <CommandEmpty>No airport found.</CommandEmpty>
        <CommandGroup>
          {filteredAirports.map((airport) => (
            <CommandItem
              key={airport.iata}
              value={airport.iata}
              onSelect={() => handleSelect(airport)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value?.iata === airport.iata ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="flex flex-col">
                <span className="font-medium">
                  {airport.city} ({airport.iata})
                </span>
                <span className="text-xs text-muted-foreground">
                  {airport.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {airport.country} • {airport.icao}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent
          className="w-[420px] p-0"
          align="start"
          side="bottom"
          avoidCollisions={false}
        >
          {airportList}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <div className="px-2 pt-2 h-full flex flex-col">{airportList}</div>
      </DrawerContent>
    </Drawer>
  );
}