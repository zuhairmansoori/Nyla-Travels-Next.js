import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import { notFound } from "next/navigation";
import ActivityGallery from "@/components/ActivityGallery";

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
            <div className="max-w-screen lg:max-w-6xl mx-auto px-4 py-10">
                {/* Breadcrumb-ish header */}
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-3">
                        {category}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    <p className="text-gray-500 mt-1">{destination}</p>
                </div>

                <ActivityGallery images={images} title={title} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                    {/* Left: main content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Description */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Overview</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {description}
                            </p>
                        </section>

                        {/* Highlights */}
                        {highlights?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">Highlights</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {highlights.map((h, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <span className="mt-0.5 text-blue-600">✦</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Included / Excluded */}
                        {(included?.length > 0 || excluded?.length > 0) && (
                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {included?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-3">
                                            What&apos;s Included
                                        </h3>
                                        <ul className="space-y-2">
                                            {included.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-gray-600"
                                                >
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {excluded?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-3">
                                            What&apos;s Excluded
                                        </h3>
                                        <ul className="space-y-2">
                                            {excluded.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-gray-600"
                                                >
                                                    <span className="text-red-500 mt-0.5">✕</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Meeting point + timings */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {meetingPoint && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-2">Meeting Point</h3>
                                    <p className="text-sm text-gray-600">{meetingPoint}</p>
                                </div>
                            )}
                            {duration && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-2">Duration</h3>
                                    <p className="text-sm text-gray-600">{duration}</p>
                                </div>
                            )}
                        </section>

                        {timings?.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Available Timings</h3>
                                <div className="flex flex-wrap gap-2">
                                    {timings.map((t, i) => (
                                        <span
                                            key={i}
                                            className="px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-700"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right: booking sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-25 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <p className="text-xs text-gray-400">Starting From</p>
                            <p className="text-3xl font-bold text-gray-900 mb-5">
                                INR {price?.toLocaleString()}
                            </p>

                            <button className="w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
                                Book Now
                            </button>

                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                    `Hi, I'm interested in ${title}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-3 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                            >
                                Enquire on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                  <h3 className="text-primary text-center text-2xl font-semibold" >Recommanded</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 py-10 gap-8">
                    {recomonded.map((activity) => (
                        <ActivityCard key={activity._id.toString()} activity={activity} />

                    ))}
                </div>
            </div>
        </>
    );
}