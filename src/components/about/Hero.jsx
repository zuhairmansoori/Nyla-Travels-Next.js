import Image from 'next/image'
import React from 'react'
import AnimatedText from '../AnimatedText'


function Hero() {
    return (
        <>
            <section>
                <div className='relative h-[90vh] pb-32'>
                    <Image
                        src="/about/about-hero.webp"
                        alt="Hero Image"
                        fill
                        priority
                        sizes="100vw"
                        className=" z-0 hidden md:block object-cover"
                    />
                    <Image
                        src="/about/about-hero-mobile.webp"
                        alt="Hero Image"
                        fill
                        priority
                        sizes="100vw"
                        className=" z-0  md:hidden object-cover"
                    />
                    <div className='absolute h-auto inset-0 bg-black/45  z-10'></div>
                    <div className="relative mx-auto  flex min-h-screen max-w-full items-center px-4 lg:px-20 z-20">
                        <div className="w-full mt-15">
                            <div className='pb-10  md:m-0 z-40'>
                                <AnimatedText>
                                    <h1 className="mb-4 max-w-full text-shadow-premium  font-cinzel text-3xl font-bold text-center lg:text-left lg:w-1/2 text-white md:text-4xl lg:text-6xl">
                                        Your Trusted Travel Partner for Dubai & Beyond
                                    </h1>
                                    <div className='w-full lg:text-right'>
                                        <p className="mb-8  lg:mr-auto text-center lg:text-left text- max-w-lg leading-8 text-lg lg:text-2xl text-white/90">
                                            Nyla Travel helps travelers with Dubai visas, holiday packages,
                                            airport assistance, hotel bookings, and personalized travel support.
                                        </p>
                                    </div>

                                </AnimatedText>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
