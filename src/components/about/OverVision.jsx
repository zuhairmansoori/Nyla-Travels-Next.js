'use client'
import React from 'react'
import Image from 'next/image'
import HeadingMotion from '../HeadingMotion'
import { motion } from 'motion/react'
const MotionImage = motion.create(Image);
function OverVision() {
  return (
    <>
      <section className='bg-gray-100 pt-20 overflow-hidden'>
              <div className='flex flex-col md:flex-row-reverse items-center  justify-center md:items-center md:justify-end  gap-5 py-10 px-4 md:px-20'>
                <div className='md:w-1/2'>
                <HeadingMotion>
                   <h2 className='text-secondary text-3xl md:text-5xl md:pb-10 font-bold text-center'>Our Vision</h2>
                </HeadingMotion>
                <HeadingMotion>
                     <p className='text-lg md:text-xl text-gray-700 mt-4 text-center md:text-left'>At Nyla Travels,  Our vision is to become one of the most trusted and respected travel companies by inspiring people to discover the beauty of the world. We aim to build lasting relationships with our clients through honesty, innovation, and a commitment to excellence, making Nyla Travels the first choice for every journey.</p>
                </HeadingMotion>
                  
                
                </div>
                <div className='relative md:w-1/2 py-10  flex  justify-end  md:items-center md:justify-end '>
                  <MotionImage
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src='/about/mission.png'
                    alt='Our Mission'
                    width={500}
                    height={500}
                    className='rounded-lg shadow-image w-60 h-40 sm:w-90 sm:h-65 lg:w-104 lg:h-80'
                  />
                  <MotionImage
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 ,rotateY: 25, rotateZ: 30}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8,delay:0.6 }}
                    src='/about/mission3.png'
                    alt='Our Mission'
                    width={220}
                    height={400}
                    className=' absolute rotate-y-25 rotate-z-30  sm:-left-15 sm:top-3 -left-5 w-35 h-50 sm:w-50 sm:h-72 lg:w-65 lg:h-89 lg:-left-0 object-cover rounded-lg shadow-image'
                  />
                </div>
              </div>
            </section>
    </>
  )
}

export default OverVision
 