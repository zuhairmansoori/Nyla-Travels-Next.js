import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import { notFound } from "next/navigation";
import ShowActivityDetail from "@/components/activity/ShowActivityDetail";

// app/activities/[slug]/page.js

import { getActivityBySlug } from "@/lib/activity";
import ActivityCard from "@/components/activity/ActivityCard";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const activity = await getActivityBySlug(slug);
    const images = activity?.images.map((img) => img.url) || [];

    if (!activity) {
        return {
            title: "Activity Not Found | Nyla Travels",
        };
    }

    return {
        title: `${activity.title} | Nyla Travels`,

        description:
            activity.description?.slice(0, 160) ||
            `Book ${activity.title} with Nyla Travels.`,

        keywords: [
            activity.title,
            activity.destination,
            activity.category,
            "Travel Activities",
            "Tours",
            "Nyla Travels",
        ].filter(Boolean),

        alternates: {
            canonical: `/activities/${activity.slug}`,
        },

        openGraph: {
            title: `${activity.title} | Nyla Travels`,
            description:
                activity.description?.slice(0, 160) ||
                `Book ${activity.title} online with Nyla Travels.`,
            url: `https://nylatravels.com/activities/${activity.slug}`,
            siteName: "Nyla Travels",
            type: "website",
            images: [
                {
                    url: images || "/og-activities.png",
                    width: 1200,
                    height: 630,
                    alt: activity.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${activity.title} | Nyla Travels`,
            description:
                activity.description?.slice(0, 160) ||
                `Book ${activity.title} online.`,
            images: [images[0] || "/og-activities.png"],
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function ActivityDetailPage({ params }) {
    await connectDB();
    const { slug } = await params
    const activity = await activityModel.findOne({ slug: slug, isActive: true }).lean();
    const data = JSON.parse(JSON.stringify(activity));
    const recomonded = await activityModel.find({
        _id: { $ne: data._id },
        isActive: true,
        destination: data.destination
    }).lean()





    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",

        name: activity.title,

        description: activity.description,

        url: `https://nylatravels.com/activities/${activity.slug}`,

        image: activity.images.map((img) => img.url),

        touristType: "Tourists",

        address: {
            "@type": "PostalAddress",
            addressLocality: activity.destination,
        },

        provider: {
            "@type": "TravelAgency",
            name: "Nyla Travels",
            url: "https://nylatravels.com",
            logo: "https://nylatravels.com/NylaTravels.png",
        },

        additionalProperty: [
            {
                "@type": "PropertyValue",
                name: "Duration",
                value: activity.duration,
            },
            {
                "@type": "PropertyValue",
                name: "Meeting Point",
                value: activity.meetingPoint,
            },
        ],

        offers: {
            "@type": "Offer",
            price: activity.price,
            priceCurrency: activity.currency,
            availability: "https://schema.org/InStock",
            url: `https://nylatravels.com/activities/${activity.slug}`,
        },
    };

    if (!activity) notFound();
    const {
        title,
        destination,
        category,
        description,
        price,
        duration,
        meetingPoint,
        timings,
        images,
        highlights,
        included,
        excluded,
    } = data;

    return (
        <>
               <script
                   type="application/ld+json"
                   dangerouslySetInnerHTML={{
                       __html: JSON.stringify(jsonLd),
                   }}
               />
        <div>
            <ShowActivityDetail data={data} />
        </div>
          
                  <h3 className="text-primary text-center text-2xl font-semibold" >Recommanded</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 py-10 gap-8">
                    {recomonded.map((activity) => (
                        <ActivityCard key={activity._id.toString()} activity={activity} />

                    ))}
                </div>
           
        </>
    );
}