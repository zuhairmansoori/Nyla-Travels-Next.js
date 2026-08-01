import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

const content = {
  packages: {
    title: "No packages found",
    message:
      "We couldn't find any travel packages matching your search. Try adjusting your filters or explore other destinations.",
    ctaLabel: "Clear filters",
  },
  flights: {
    title: "No flights found",
    message:
      "We couldn't find any flights for these dates or route. Try different dates or nearby airports.",
    ctaLabel: "Modify search",
  },
  hotels: {
    title: "No hotels found",
    message:
      "We couldn't find any stays matching your criteria. Try changing your dates or location.",
    ctaLabel: "Adjust search",
  },
  cars: {
    title: "No cars available",
    message:
      "There are no rental cars available for your selected dates and location right now.",
    ctaLabel: "Change dates",
  },
  default: {
    title: "Nothing found",
    message: "We couldn't find anything matching your request.",
    ctaLabel: "Reset",
  },
};

export default function EmptyState({ type = "default", onAction }) {
  const { title, message, ctaLabel } = content[type] || content.default;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
        <SearchX className="h-10 w-10 text-blue-900" strokeWidth={1.5} />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-slate-800">{title}</h3>

      <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
        {message}
      </p>

      {/* <Button
        variant="outline"
        onClick={onAction}
        className="border-blue-900 text-blue-900 hover:bg-blue-50"
      >
        {ctaLabel}
      </Button> */}
    </div>
  );
}