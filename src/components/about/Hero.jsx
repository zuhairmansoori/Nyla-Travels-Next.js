import Image from 'next/image'
import React from 'react'
import OnclickBtn from '../ui/OnclickBtn'


function Hero() {
  return (
    <>
      <section className='bg-gray-100'>
         <div className='hero-text grid gap-10 md:grid-cols-2 justify-center items-start w-full px-4 md:px-20 py-10 pb-20 justify-items-end'>
          <div className='flex flex-col gap-4 md:gap-6 justify-center items-center '>
            <h2 className='text-3xl md:text-5xl text-center p-10 pt-4  font-bold'>About <span className='text-primary'>Nyla </span><span className='text-secondary'>Travel</span></h2>
            <div className='text-lg md:text-xl text-center md:text-left text-gray-700 flex flex-col gap-4 md:gap-6 justify-center items-center'>
               <p>At Nyla Travels, we believe that every journey is more than just reaching a destination it&apos;s about creating unforgettable memories. We are passionate about helping travelers discover new places with comfort, confidence, and peace of mind.</p>
            <p>Our team is dedicated to delivering personalized travel solutions, including holiday packages, flight bookings, hotel reservations, visa assistance, and customized tour planning. Every trip is carefully designed to match the unique preferences and budget of our customers.</p>
            <p>Under the leadership of <strong>MD Kalim</strong>, Nyla Travels has built its reputation on trust, quality service, and customer satisfaction. Our commitment is to provide reliable travel experiences with attention to every detail, ensuring that every journey is smooth and memorable.</p>
            <p>Whether you&apos;re planning a family vacation, a honeymoon, a business trip, or an international adventure, Nyla Travels is your trusted travel partner. We are here to turn your travel dreams into unforgettable experiences, one journey at a time.</p>
            </div>
           
           
         </div>
          <div className='relative flex justify-end items-center'>
            <Image
            src="/about/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
            className='w-60 h-80 md:w-100 md:h-120 rounded-lg object-cover shadow-image'
            />
            <Image
            src="/about/hero2.png"
            alt="Hero Image"
            width={500}
            height={500}
            className='w-50 h-60 md:w-90 md:h-110 rounded-lg object-cover absolute top-30 md:top-40 right-40 md:right-50 shadow-image'
            />
         </div>

          </div>
            
         <div className='py-10  flex justify-center items-center'>
              <OnclickBtn className={'text-xl'}>Contact Us</OnclickBtn> 
            </div>
        
      </section>
    </>
  )
}

export default Hero
