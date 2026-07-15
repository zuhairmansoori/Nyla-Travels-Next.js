import React from 'react'
import ImageMotion from '../ImageMotion'
import HeadingMotion from '../HeadingMotion'
function AirportAssistant() {
  return (
    <>
      <section className='bg-gray-100  overflow-x-hidden' >
        <div className='flex flex-col md:flex-row-reverse gap-10 items-start justify-center px-4 lg:px-20 py-20'>
          <div className="md:w-[45%]">
            <ImageMotion
            src="/airport-assistant.webp"
            alt="Airport Assistance"
            width={800}
            height={600}
            sizes="100vw"
            className="object-cover rounded-lg w-full h-auto shadow-lg"
            />
          </div>
           <div className="md:w-[55%]">
            <HeadingMotion>
              <h2 className='text-3xl  lg:text-5xl text-primary font-cinzel tracking-wider  font-bold mb-8'>
              Airport Assistances
             </h2>
            </HeadingMotion>
             
             <div className='text-lg lg:text-xl text-justify flex flex-col gap-4'>
               <HeadingMotion>
                 <p>
                Airport Assistance is a premium service designed to make your airport journey smooth, comfortable, and stress-free. Whether you are arriving, departing, or connecting through the airport, our professional representatives provide personalized support at every step.
              </p>
               </HeadingMotion>
             
               <HeadingMotion>
                   <p>
                Our services include airport meet & greet, immigration assistance, baggage handling, fast track support, wheelchair assistance, airport transfers, lounge access, and flight guidance. We ensure a seamless travel experience by helping you navigate airport procedures quickly and efficiently, allowing you to travel with confidence and peace of mind.
              </p>
               </HeadingMotion>
             
             </div>
           </div>
        </div>
      </section>
    </>
  )
}

export default AirportAssistant
