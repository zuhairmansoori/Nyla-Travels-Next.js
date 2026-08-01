import About from '@/components/about/About'
import Hero from '@/components/about/Hero'
import OurMission from '@/components/about/OurMission'
import Stats from '@/components/about/Stats'
import WhyNyla from '@/components/home/WhyNyla'
import OverVision from '@/components/about/OverVision'
import MdkalimMessage from '@/components/about/MdkalimMessage'
import React from 'react'
import Faq from '@/components/about/ Faq'
import Testimonials from '@/components/home/Testimonials'

// app/about/metadata.ts (ya page.tsx me export const metadata)


export const metadata = {
  title: "About Us",

  description:
    "Learn more about Nyla Travels, your trusted travel partner for flights, hotels, visa services, airport transfers, car rentals, and holiday packages worldwide.",

  keywords: [
    "About Nyla Travels",
    "Travel Agency",
    "Flights",
    "Hotels",
    "Visa Services",
    "Holiday Packages",
    "Airport Transfers",
    "Car Rental",
    "Travel Company",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Nyla Travels",
    description:
      "Discover who we are and why thousands of travelers trust Nyla Travels for flights, hotels, visas, airport transfers, and holiday packages.",
    url: "https://nylatravels.com/about",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-about.png", // 1200×630 image
        width: 1200,
        height: 630,
        alt: "About Nyla Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Nyla Travels",
    description:
      "Learn more about Nyla Travels and our travel services.",
    images: ["/og-about.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

function page() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nyla Travels",
    url: "https://nylatravels.com",
    logo: "https://nylatravels.com/NylaTravels.svg",
    image: "https://nylatravels.com/og-about.png",
    description:
      "Nyla Travels is a trusted travel agency offering flight booking, visa services, holiday packages, airport assistance, travel activities, and car rental services.",
    email: "info@nylatravels.com",
    telephone: "+91 9213909942",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Laxmi Nagar",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.facebook.com/nyla.travels",
      "https://www.instagram.com/nylatravels",
      "https://www.linkedin.com/company/nylatravels"
    ]
  };


  return (
    <>
     <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd),
    }}
  />
      <Hero />
      <About />
      <Stats />
      <MdkalimMessage />
      <OverVision />
      <OurMission />
      <WhyNyla />
      <Testimonials />
      <Faq />

    </>
  )
}

export default page
