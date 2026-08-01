import MdkalimMessage from '@/components/about/MdkalimMessage'
import AirportAssistant from '@/components/airport-assistant/Airport-Assistant'
import AirportServices from '@/components/airport-assistant/AirportService'
import Hero from '@/components/airport-assistant/Hero'
import HowItWorks from '@/components/airport-assistant/HowItWorks'
import WhyChooseUs from '@/components/airport-assistant/WhyChooseUs'
import WhoCanUseService from '@/components/airport-assistant/WhoCanUseService'
import IncludedServices from '@/components/airport-assistant/IncludedServices'
import AssistanceFormSection from '@/components/airport-assistant/AssistanceFormSection'
import Faq from '@/components/airport-assistant/Faq'


export const metadata = {
  title: "Airport Assistance",

  description:
    "Book airport assistance services with Nyla Travels, including Meet & Greet, Fast Track, wheelchair assistance, VIP services, and airport support for a smooth travel experience.",

  keywords: [
    "Airport Assistance",
    "Meet and Greet",
    "Fast Track Service",
    "VIP Airport Service",
    "Wheelchair Assistance",
    "Airport Concierge",
    "Airport Support",
    "Travel Assistance",
    "Nyla Travels",
  ],

  alternates: {
    canonical: "/airport-assistance",
  },

  openGraph: {
    title: "Airport Assistance | Nyla Travels",
    description:
      "Enjoy hassle-free airport assistance with Meet & Greet, Fast Track, wheelchair assistance, and VIP airport services.",
    url: "https://www.nylatravels.com/airport-assistance",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-airport-assistance.png",
        width: 1200,
        height: 630,
        alt: "Airport Assistance Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Airport Assistance | Nyla Travels",
    description:
      "Professional airport assistance services for a smooth and stress-free journey.",
    images: ["/og-airport-assistance.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: "Airport Assistance",

    serviceType: "Airport Assistance",

    description:
      "Book airport assistance services with Nyla Travels, including Meet & Greet, Fast Track, wheelchair assistance, VIP airport services, and seamless travel support.",

    url: "https://www.nylatravels.com/airport-assistance",

    image: "https://www.nylatravels.com/og-airport-assistance.png",

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
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Hero />
      <AirportAssistant />
      <AirportServices />
      <WhyChooseUs />
      <WhoCanUseService />
      <IncludedServices />
      <HowItWorks />
      <AssistanceFormSection />
      <MdkalimMessage />
      <Faq />
    </div>
  )
}