import FlightSearchForm from "@/components/form/FlightSearchForm";
export const metadata = {
  title: "Flight Booking | Nyla Travels",

  description:
    "Search and book domestic and international flights with Nyla Travels. Compare airfares, find the best flight deals, and book your journey online with ease.",

  keywords: [
    "Flight Booking",
    "Book Flights",
    "Cheap Flights",
    "Air Tickets",
    "International Flights",
    "Domestic Flights",
    "Flight Deals",
    "Airfare",
    "Airline Tickets",
    "Nyla Travels",
  ],

  alternates: {
    canonical: "/flights",
  },

  openGraph: {
    title: "Flight Booking | Nyla Travels",
    description:
      "Compare and book flights at the best prices with Nyla Travels. Domestic and international flight booking made easy.",
    url: "https://www.nylatravels.com/flights",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-flights.png",
        width: 1200,
        height: 630,
        alt: "Flight Booking - Nyla Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flight Booking | Nyla Travels",
    description:
      "Book domestic and international flights with Nyla Travels.",
    images: ["/og-flights.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function page(){

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",

  name: "Flight Booking",

  serviceType: "Flight Booking",

  description:
    "Search and book domestic and international flights with Nyla Travels. Compare airfares and book airline tickets at the best prices.",

  url: "https://www.nylatravels.com/flights",

  image: "https://www.nylatravels.com/og-flights.png",

  provider: {
    "@type": "TravelAgency",
    name: "Nyla Travels",
    url: "https://www.nylatravels.com",
    logo: "https://www.nylatravels.com/NylaTravels.png",
    telephone: "+919213909942",
  },

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  availableLanguage: [
    "English",
    "Hindi",
    "Urdu",
  ],
};

    return(
        <>
           <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
           <FlightSearchForm/>
        </>
    
    )
}