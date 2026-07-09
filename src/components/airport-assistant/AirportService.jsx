import {
  PlaneLanding,
  PlaneTakeoff,
  RefreshCcw,
  Accessibility,
  Briefcase,
  ShieldCheck,
  Car,
  Crown,
} from "lucide-react";

const services = [
  {
    title: "Arrival Meet & Assist",
    icon: PlaneLanding,
    features: [
      "Representative airport par receive karega",
      "Immigration mein guidance",
      "Baggage collect karne mein help",
      "Exit tak accompany karega",
    ],
  },
  {
    title: "Departure Assistance",
    icon: PlaneTakeoff,
    features: [
      "Check-in support",
      "Boarding pass assistance",
      "Baggage drop",
      "Immigration guidance",
      "Gate tak escort",
    ],
  },
  {
    title: "Transit Assistance",
    icon: RefreshCcw,
    features: [
      "Connecting flight locate karna",
      "Terminal transfer",
      "Boarding gate guidance",
      "Layover assistance",
    ],
  },
  {
    title: "Wheelchair Assistance",
    icon: Accessibility,
    features: [
      "Elderly passengers",
      "Medical passengers",
      "Pregnant women",
      "Disabled travelers",
    ],
  },
  {
    title: "Baggage Assistance",
    icon: Briefcase,
    features: [
      "Luggage collection",
      "Porter service",
      "Lost baggage reporting",
      "Oversized baggage support",
    ],
  },
  {
    title: "Fast Track Immigration",
    icon: ShieldCheck,
    features: [
      "Faster immigration process",
      "Long queues avoid",
      "VIP experience",
    ],
  },
  {
    title: "Airport Transfer",
    icon: Car,
    features: [
      "Hotel Transfer",
      "Private Car",
      "Luxury Car",
      "Family Van",
      "Group Transfer",
    ],
  },
  {
    title: "VIP Meet & Greet",
    icon: Crown,
    features: [
      "Personal escort",
      "Premium lounge",
      "Luxury transfer",
      "Dedicated support",
    ],
  },
];

export default function AirportServices() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Airport Assistance
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Services We Offer
          </h2>

          <p className="mt-4 text-gray-600">
            Professional airport assistance designed to make every journey
            smooth, comfortable and stress-free.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white transition group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <ul className="space-y-3">
                  {service.features.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#airport-assistance-form"
                  className="mt-6 inline-flex items-center font-semibold text-primary transition hover:gap-3"
                >
                  Book Now →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}