'use client'
import Image from 'next/image'
import React from 'react'
import OnclickBtn from '../ui/OnclickBtn'
import { motion } from 'motion/react'
import HeadingMotion from '../HeadingMotion'
const MotionImage = motion.create(Image);


function About() {
  return (
    <>
      <section 
      
      
      className='bg-gray-100 overflow-hidden'>
         <div className='hero-text grid gap-10 lg:grid-cols-2 justify-center items-start w-full px-4 md:px-20 py-10 pb-20 justify-items-end'>
          <div className='flex flex-col gap-4 md:gap-6 justify-center items-center '>
            <HeadingMotion>
                 <h2 className='text-3xl  lg:text-5xl text-primary font-cinzel tracking-wider  font-bold mb-8'>About <span className='text-primary font-bold'>Nyla </span><span className='text-secondary'>Travel</span></h2>
            </HeadingMotion>
      
            <motion.div
             initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            
            className='text-lg md:text-xl text-center md:text-left text-gray-700 flex flex-col gap-4 md:gap-6 justify-center items-center'>
               <p>At Nyla Travels, we believe that every journey is more than just reaching a destination it&apos;s about creating unforgettable memories. We are passionate about helping travelers discover new places with comfort, confidence, and peace of mind.</p>
            <p>Our team is dedicated to delivering personalized travel solutions, including holiday packages, flight bookings, hotel reservations, visa assistance, and customized tour planning. Every trip is carefully designed to match the unique preferences and budget of our customers.</p>
            <p>Under the leadership of <strong>MD Kalim</strong>, Nyla Travels has built its reputation on trust, quality service, and customer satisfaction. Our commitment is to provide reliable travel experiences with attention to every detail, ensuring that every journey is smooth and memorable.</p>
            <p>Whether you&apos;re planning a family vacation, a honeymoon, a business trip, or an international adventure, Nyla Travels is your trusted travel partner. We are here to turn your travel dreams into unforgettable experiences, one journey at a time.</p>
            </motion.div>
           
           
         </div>
          <div className='relative   flex justify-center lg:justify-end items-center'>
            <MotionImage
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/about/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
            className='w-55 h-80 sm:w-100 sm:h-120 rounded-lg object-cover shadow-image'
            />
            <MotionImage
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 , delay: 0.3}}
            src="/about/aboutnyla.webp"
            alt="Hero Image"
            width={500}
            height={500}
            className='w-45  h-60 sm:w-90 sm:h-110 rounded-lg object-cover object-right absolute top-30 sm:top-40 right-40 sm:right-50 shadow-image'
            />
         </div>

          </div>
            
         <motion.div 
         initial={{opacity: 0 , y: 40}}
         whileInView={{opacity:1, y: 0}}
         viewport={{once:true}}
         transition={{duration:1}}
         className=' py-10 sm:py-20 lg:py-10  flex justify-center items-center'>
              <OnclickBtn className={'text-xl'}>Contact Us</OnclickBtn> 
            </motion.div> 
        
      </section>
    </>
  )
}

export default About
