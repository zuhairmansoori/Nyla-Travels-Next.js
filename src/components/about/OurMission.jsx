'use client'
import Image from 'next/image'
import React from 'react'
import { IoIosContact } from "react-icons/io";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import { LiaHandshakeSolid } from "react-icons/lia";
import HeadingMotion from '../HeadingMotion';
import { motion } from 'motion/react'
const MotionImage = motion.create(Image);
function OurMission() {
  return (
    <>
      <section className='bg-gray-100 overflow-hidden'>
        <div className='flex flex-col md:flex-row items-center  justify-around md:items-center   gap-5 pt-10 px-4 md:px-20'>
          <div className='md:w-1/2'>
            <HeadingMotion>
               <h2 className='text-3xl  lg:text-5xl text-primary font-cinzel tracking-wider  font-bold mb-8'>Our Mission</h2>
            </HeadingMotion>
           
            <motion.p
            initial={{opacity:0 ,y:40}}
            whileInView={{opacity:1 , y:0}}
            viewport={{once:true}}
         transition={{duration:1}}
            className='text-lg md:text-xl text-gray-700 mt-4 text-center md:text-left'>At Nyla Travels, Our mission is to deliver seamless travel experiences through reliable services, personalized holiday planning, and dedicated customer support. We strive to help every traveler explore the world with confidence by offering carefully designed travel solutions that combine convenience, value, and unforgettable memories.</motion.p>
          </div>
          <div className=' py-10  flex items-center justify-center '>
            <MotionImage
              initial={{opacity:0 ,x:40}}
            whileInView={{opacity:1 , x:0}}
            viewport={{once:true}}
         transition={{duration:1}}
             src='/about/mission.png' alt='Our Mission' 
             loading="eager" width={500} height={500} className='w-80 h-50 sm:w-96 sm:h-70 lg:w-104 lg:h-80  rounded-lg shadow-image' />
            {/* <Image src='/about/mission3.png' alt='Our Mission' width={250} height={300} className=' absolute  md:top-3 sm:left-10  md:-left-10 w-40 h-60 sm:w-50 sm:h-70 lg:w-60 lg:h-90 object-cover rounded-lg shadow-image' /> */}
          </div>
        </div>
      <motion.div
      initial={{opacity:0 ,y:40}}
      whileInView={{opacity:1 , y:0}}
      viewport={{once:true}}
      transition={{duration:1}}
      className='flex flex-wrap items-end justify-center pt-20 lg:py-0  md:px-30 lg:px-40 lg:justify-start gap-10 pb-10'>
        <span className='text-secondary flex text-center flex-col justify-center items-center'><IoIosContact size={54} />Costumer First</span>
        <span className='text-secondary flex flex-col text-center justify-center items-center'><AiOutlineSafetyCertificate size={54} />Safe & Reliable</span>
        <span className='text-secondary flex flex-col justify-center text-center items-center'><GiWorld size={54} />Explore The World</span>
        <span className='text-secondary text-center flex text-sm flex-col justify-center items-center'><LiaHandshakeSolid size={54} />Trusted Services</span>
      </motion.div>
        
        
 
      </section> 
    </>
  ) 
}

export default OurMission
