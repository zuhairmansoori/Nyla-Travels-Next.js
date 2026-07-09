import Image from 'next/image'
import React from 'react'
import FlightSearchForm from '../form/FlightSearchForm'
import AnimatedText from '../AnimatedText'
import Container from '../Container'


function Hero() {
  return (
    <div>
      <div>
        <section className=' relative min-h-screen pb-32 '>
          <Image
            src='/heroimg5.webp' alt='hero image' fill priority sizes='100vw'
             className='object-cover' />
          <div className="absolute inset-0 bg-black/40">
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4">
            <div className="w-full mt-15">
              <div className='pb-10 mt-24 md:m-0'>
                <AnimatedText>
                  <h1 className="mb-4 font-cinzel text-shadow-premium max-w-full text-center text-4xl font-bold text-secondary md:text-6xl lg:text-7xl">
                    Discover Your Next Adventure
                  </h1>
                  <p className="mb-8 max-w-full text-center text-lg lg:text-2xl text-white/90">
                    Book flights, hotels and unforgettable travel experiences around the world.
                  </p>
                </AnimatedText>



              </div>

              <div className='mt-12'>
                <Container>
                  <FlightSearchForm />
                </Container>

              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero
