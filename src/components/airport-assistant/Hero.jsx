import Image from 'next/image'
import React from 'react'
import AnimatedText from '../AnimatedText'
import { Button } from '../ui/button'
import Link from 'next/link'
import HeadingMotion from '../HeadingMotion'

function Hero() {
  return (
    <>
      <section>
        <div className='relative h-[90vh] pb-32'>
          <Image
            src="/airport-assistant.webp"
            alt="Hero Image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            className=" z-0 hidden md:block object-cover md:object-top "
          />
          {/* // mobile view ke liye image */}
          <Image
            src="/airport-assistant-mobile.webp"
            alt="Hero Image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            className=" z-0  md:hidden object-cover md:object-top "
          />
          <div className='absolute h-auto inset-0 bg-black/40  z-10'></div>
          <div className="relative mx-auto  flex min-h-screen max-w-full items-center px-4 lg:px-20 z-20">
            <div className="w-full mt-15">
              <div className='pb-10  md:m-0'>
                <AnimatedText>
                  <HeadingMotion>
                        <h1 className="mb-4 max-w-full text-shadow-premium  font-cinzel text-3xl font-bold text-center lg:text-left lg:w-1/2 text-white md:text-4xl lg:text-6xl">
                    Airport Meet &
                    Assist Services
                    Worldwide
                  </h1>
                  </HeadingMotion>
                 
                  <div className='w-full lg:text-left'>
                    <HeadingMotion>
                          <p className="mb-8  lg:mr-auto text-center lg:text-left text- max-w-lg leading-8 text-lg lg:text-2xl text-white/90">
                      Enjoy a smooth and stress-free airport experience with our professional Meet & Assist services. From arrival to departure, our team is here to guide you every step of the way.
                    </p>
                    </HeadingMotion>
                   
                  </div>

                </AnimatedText>

              </div>
              <div className='flex justify-start lg:w-1/3'>
              <HeadingMotion>
                     <Button className='px-8 py-6 rounded-xl font-semibold shadow-xl hover:scale-105 text-xl transition-all duration-300'>
                    <Link href="#airport-assistance-form">Get Assistance Now </Link></Button>
              </HeadingMotion>
                
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
