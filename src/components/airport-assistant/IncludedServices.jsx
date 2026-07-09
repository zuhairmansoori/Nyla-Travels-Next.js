import React from 'react'
import Image from 'next/image'

function IncludedServices() {
    return (
        <div>
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div>

                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                                Included Services
                            </span>

                            <h2 className="mt-4 text-4xl font-bold">
                                Everything You Need for a Smooth Airport Experience
                            </h2>

                            <p className="mt-6 text-gray-600 leading-8">
                                Our airport assistance service is designed to make every step of
                                your journey simple and stress-free. From the moment you arrive
                                at the airport until you reach your destination or boarding gate,
                                our professional team provides complete support to ensure a
                                comfortable travel experience.
                            </p>

                            <div className="mt-8 space-y-6">

                                <div>
                                    <h3 className="text-xl font-semibold">Meet & Greet</h3>
                                    <p className="mt-2 text-gray-600">
                                        Our representative welcomes you personally and assists you
                                        throughout your airport journey.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold">Immigration & Boarding Assistance</h3>
                                    <p className="mt-2 text-gray-600">
                                        We help you complete immigration, check-in and boarding
                                        procedures quickly and efficiently.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold">Baggage & Airport Escort</h3>
                                    <p className="mt-2 text-gray-600">
                                        From luggage handling to escorting you through the airport,
                                        we ensure a hassle-free experience.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold">Additional Premium Services</h3>
                                    <p className="mt-2 text-gray-600">
                                        Flight updates, wheelchair assistance on request, lounge
                                        booking and airport transfers are also available to make your
                                        journey even more comfortable.
                                    </p>
                                </div>

                            </div>

                            <a
                                href="#airport-assistance-form"
                                className="inline-flex mt-10 rounded-xl bg-primary px-7 py-4 text-white font-semibold hover:opacity-90 transition"
                            >
                                Book Airport Assistance
                            </a>

                        </div>

                        {/* Right Image */}
                        <div className="relative">

                            <Image
                                src="/airportassistant2.webp"
                                alt="Airport Assistance Services"
                                width={500}
                                height={550}
                                className="w-full h-162.5 object-cover object-right rounded-3xl shadow-2xl"
                            />

                            {/* Floating Card */}
                            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-xl max-w-xs">
                                <h4 className="text-2xl font-bold text-primary">
                                    Premium Assistance
                                </h4>

                                <p className="mt-2 text-gray-600">
                                    Personalized airport support for arrivals, departures and transit passengers.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}

export default IncludedServices
