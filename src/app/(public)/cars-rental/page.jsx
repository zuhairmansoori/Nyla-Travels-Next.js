
import CarList from "@/components/car/CarList"
import SkeletonLoader from "@/components/SkeletonLoader"
import { Suspense } from "react"
import SearchInput from "@/components/admin/SearchInput"

export const metadata = {
  title: "Car Rental | Nyla Travels",

  description:
    "Rent a car with Nyla Travels. Choose from economy, SUV, luxury, and family cars at affordable prices with flexible daily, weekly, and monthly rental options.",

  keywords: [
    "Car Rental",
    "Rent a Car",
    "Car Hire",
    "Luxury Car Rental",
    "SUV Rental",
    "Economy Car Rental",
    "Monthly Car Rental",
    "Dubai Car Rental",
    "UAE Car Rental",
    "Nyla Travels",
  ],

  alternates: {
    canonical: "/car-rental",
  },

  openGraph: {
    title: "Car Rental | Nyla Travels",
    description:
      "Book affordable car rentals with Nyla Travels. Economy, SUV, luxury, and family cars available.",
    url: "https://nylatravels.com/car-rental",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-car-rental.png",
        width: 1200,
        height: 630,
        alt: "Car Rental - Nyla Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Car Rental | Nyla Travels",
    description:
      "Find the perfect rental car with Nyla Travels at competitive prices.",
    images: ["/og-car-rental.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

async function page({ searchParams }) {
  const params = await searchParams

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Car Rental",

    serviceType: "Car Rental",

    description:
      "Rent economy, SUV, luxury, and family cars with Nyla Travels. Flexible daily, weekly, and monthly car rental services at competitive prices.",

    url: "https://nylatravels.com/car-rental",

    image: "https://nylatravels.com/og-car-rental.png",

    provider: {
      "@type": "TravelAgency",
      name: "Nyla Travels",
      url: "https://nylatravels.com",
      logo: "https://nylatravels.com/NylaTravels.png",
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


  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <SearchInput divClassName={'w-2/3 md:w-full'}/>
      <Suspense fallback={<SkeletonLoader gridClassName={'lg:grid-cols-3 max-w-7xl m-auto'} count={'12'} />}  >
        <CarList params={params} />
      </Suspense>

    </div>
  )
}

export default page
