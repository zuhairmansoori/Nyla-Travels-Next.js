'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'
import HeadingMotion from '../HeadingMotion';
const MotionImage = motion.create(Image);
function MdkalimMessage() {
    return (
        <>
            <section className='py-10 overflow-hidden bg-gray-100'>
                <div className='flex flex-col-reverse md:flex-row items-center justify-center md:items-center text-lg md:text-xl md:justify-around gap-5 py-10 px-4 md:px-20'>
                    <div className='flex flex-col gap-4 md:w-1/2'>
                    <HeadingMotion>
                          <h2 className='text-2xl text-secondary text-center sm:text-3xl md:text-4xl lg:text-5xl lg:pb-20 '>Message from MD Kalim</h2>
                    </HeadingMotion>
                       <HeadingMotion>
                           <h3 className='text-sm sm:text-xl md:text-2xl font-bold p-0'>Welcome to Nyla Travels.</h3>
                       </HeadingMotion>
                       <HeadingMotion>  <p className='text-base text-left sm:text-left  md:text-lg'>
                            At Nyla Travels, our mission is to create a trusted connection between India and Dubai by providing reliable travel and business support. Along with holiday packages, visa services, flights, and hotel bookings, we also assist clients with document services, real estate guidance, and business support in Dubai. Our goal is to make every journey simple, secure, and full of new opportunities. Through honesty, dedication, and personalized service, we are committed to helping our clients travel, grow, and achieve their dreams with confidence.
                        </p></HeadingMotion>
                        <HeadingMotion>
                                <div className='flex flex-col gap-2 text-right'>
                            <h3 className='font-semibold'>— MD Kalim</h3>
                            <p className='text-[10px]'>Founder & Managing Director, Nyla Travels</p>
                        </div>
                        </HeadingMotion>
                       
                      
                       
                    </div>
                    <div className='md:w-1/2 flex md:justify-end items-center'>
                        <MotionImage
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            src='/about/mdkalim.png'
                            alt='MD Kalim Message'
                            width={600}
                            height={700}
                            loading="eager"
                            className='rounded-lg shadow-lg w-auto h-auto'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default MdkalimMessage
