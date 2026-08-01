import SearchInput from "@/components/admin/SearchInput"
import VisaList from "@/components/admin/visa/VisaList"
import SkeletonLoader from "@/components/SkeletonLoader"
import {Suspense} from 'react'


export const metadata = {
  title: "Visa Services | Nyla Travels",

  description:
    "Apply for tourist, business, and visit visas with Nyla Travels. Fast visa processing, expert assistance, and competitive prices for UAE and international destinations.",

  keywords: [
    "Visa Services",
    "Tourist Visa",
    "Visit Visa",
    "Business Visa",
    "Dubai Visa",
    "UAE Visa",
    "Travel Visa",
    "Visa Assistance",
    "Visa Application",
    "Nyla Travels",
  ],

  alternates: {
    canonical: "/visa",
  },

  openGraph: {
    title: "Visa Services | Nyla Travels",
    description:
      "Get fast and reliable visa services with Nyla Travels. Apply for tourist, business, and visit visas online.",
    url: "https://www.nylatravels.com/visa",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-visa.png",
        width: 1200,
        height: 630,
        alt: "Visa Services - Nyla Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Visa Services | Nyla Travels",
    description:
      "Apply for UAE and international visas with Nyla Travels.",
    images: ["/og-visa.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function page({searchParams}) {
  const param = await searchParams
  const search = param.search || ''

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",

  name: "Visa Services",

  serviceType: "Visa Services",

  description:
    "Apply for tourist, business, and visit visas with Nyla Travels. Fast visa processing and expert visa assistance.",

  url: "https://www.nylatravels.com/visa",

  image: "https://www.nylatravels.com/og-visa.png",

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
    <>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
     <SearchInput divClassName={''}/>
      <Suspense key={search} fallback={<SkeletonLoader cardClassName="w-72" gridClassName={'lg:grid-cols-4 max-w-7xl m-auto'} count={'12'} />}>
                <VisaList search={search}/>
           
      </Suspense>
 
    </>
  )
}