"use client";

import Image from "next/image";
import { useState } from "react";

export default function ActivityGallery({ images, title }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-16/7 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300">
                No images available
            </div>
        );
    }

    return (
        <div className="space-y-3 min-w-0">
            {/* Main image */}
            <div className="lg:aspect-16/7 rounded-2xl overflow-hidden bg-gray-100">
                <Image
                    src={images[activeIndex].url}
                    alt={title}
                    width={500}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="overflow-x-auto pb-1 no-scrollbar">
                    <ul className="flex gap-3 w-max scroll-smooth list-none">
                        {images.map((img, i) => (
                            <li key={img.public_id} className="shrink-0">
                                <button
                                    onClick={() => setActiveIndex(i)}
                                    className={`block w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                                        i === activeIndex
                                            ? "border-blue-600"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={title}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}