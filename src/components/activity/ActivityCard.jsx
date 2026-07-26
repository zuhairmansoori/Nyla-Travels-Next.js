import Image from "next/image";
import Link from "next/link";

export default function ActivityCard({ activity }) {
    const { title, slug, description, price, images, highlights } = activity;
    const coverImage = images?.[0]?.url;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative aspect-4/3 bg-gray-100">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        No image
                    </div>
                )}
            </div>

            <div className="p-5">
                {/* Highlight tags */}
                {/* {highlights?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {highlights.slice(0, 3).map((h, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium"
                            >
                                {h}
                            </span>
                        ))}
                    </div>
                )} */}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400">Starting From</p>
                        <p className="text-lg font-bold text-gray-900">
                            INR {price?.toLocaleString()}
                        </p>
                    </div>

                    <Link
                        href={`/activity/${slug}`}
                        className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        View details
                    </Link>
                </div>
            </div>
        </div>
    );
}