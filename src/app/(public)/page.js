import Hero from "@/components/home/Hero";
import Nav from "@/components/Nav";

import WhyNyla from "@/components/home/WhyNyla";
import TopAttraction from "@/components/home/TopAttraction";
import PopularPackages from "@/components/home/PopularPackages";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Customise from "@/components/home/Customise";

export const metadata = {
  title: "Nyla Travels | Flights, Hotels, Visa, Car Rental & Holiday Packages",

  description:
    "Nyla Travels offers flight booking, hotel reservations, visa services, holiday packages, airport assistance, car rental, and travel activities at competitive prices.",

  keywords: [
    "Nyla Travels",
    "Travel Agency",
    "Flight Booking",
    "Hotel Booking",
    "Visa Services",
    "Holiday Packages",
    "Car Rental",
    "Airport Assistance",
    "Travel Activities",
    "Travel Deals",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Nyla Travels | Your Trusted Travel Partner",
    description:
      "Book flights, hotels, visa services, holiday packages, airport assistance, car rentals, and travel activities with Nyla Travels.",
    url: "https://nylatravels.com",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Nyla Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nyla Travels | Flights, Hotels & Visa Services",
    description:
      "Your one-stop travel partner for flights, hotels, visas, holidays, airport assistance, and car rentals.",
    images: ["/og-home.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Nyla Travels",
    url: "https://nylatravels.com",
    logo: "https://nylatravels.com/NylaTravels.svg",
    image: "https://nylatravels.com/og-home.png",
    description:
      "Book flights, visa services, car rentals, activities and airport assistance with Nyla Travels.",
    telephone: "+91 9213909942",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Laxmi Nagar",
      addressRegion: "Delhi",
      postalCode: "110092",
      addressCountry: "IN",
    },
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Nav />
      <Hero />
      <TopAttraction />
      <PopularPackages />
      <WhyNyla />
      <Testimonials />
      <FAQ />
      <Customise />
    </>
  );
}
