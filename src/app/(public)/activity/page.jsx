
import { Suspense } from "react";
import ActivityList from "@/components/activity/ActivityList";
import SkeletonLoader from "@/components/SkeletonLoader";
import SearchInput from "@/components/admin/SearchInput";



export const metadata = {
  title: "Travel Activities & Tours",

  description:
    "Discover exciting travel activities, sightseeing tours, adventure experiences, attraction tickets, and family-friendly experiences with Nyla Travels.",

  keywords: [
    "Travel Activities",
    "Tours",
    "Sightseeing",
    "Adventure Activities",
    "Attraction Tickets",
    "Things to Do",
    "Dubai Activities",
    "City Tours",
    "Family Activities",
    "Nyla Travels",
  ],

  alternates: {
    canonical: "/activities",
  },

  openGraph: {
    title: "Travel Activities & Tours | Nyla Travels",
    description:
      "Book sightseeing tours, adventure activities, attraction tickets, and unforgettable travel experiences with Nyla Travels.",
    url: "https://nylatravels.com/activity",
    siteName: "Nyla Travels",
    type: "website",
    images: [
      {
        url: "/og-activities.png",
        width: 1200,
        height: 630,
        alt: "Travel Activities & Tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Travel Activities & Tours | Nyla Travels",
    description:
      "Explore and book the best travel activities and tours with Nyla Travels.",
    images: ["/og-activities.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default async function ActivitiesPage({searchParams}) {
   const params = await searchParams
   const search = params.search
  //  console.log('page search',search);
   
   const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",

  name: "Travel Activities",

  description:
    "Explore and book exciting travel activities, sightseeing tours, desert safaris, attraction tickets, and unforgettable experiences with Nyla Travels.",

  url: "https://nylatravels.com/activities",

  image: "https://nylatravels.com/og-activities.png",

  isPartOf: {
    "@type": "WebSite",
    name: "Nyla Travels",
    url: "https://nylatravels.com",
  },

  publisher: {
    "@type": "TravelAgency",
    name: "Nyla Travels",
    logo: {
      "@type": "ImageObject",
      url: "https://nylatravels.com/NylaTravels.png",
    },
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
        <div className="">
            <SearchInput divClassName={'w-2/3 md:w-full'} pagination={"cursor"}/>
        <div className=" px-4 py-10" >
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Explore Our Activities
            </h1>
            <p className="text-gray-500 text-center mb-10">
                Handpicked experiences for your next trip.
            </p>
             
             <div>
                <Suspense key={search} fallback={<SkeletonLoader gridClassName={' max-w-7xl m-auto '} count={'12'} /> }  >
                 <ActivityList search={search} />
                </Suspense>
             </div>
           
        </div>
        </div>
    </>
    );
}