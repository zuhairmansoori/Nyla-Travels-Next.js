import Image from 'next/image'
import React from 'react'
import { IoIosContact } from "react-icons/io";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import { LiaHandshakeSolid } from "react-icons/lia";
function OurMission() {
  return (
    <>
      <section className='bg-gray-100'>
        <div className='flex flex-col md:flex-row items-center  justify-center md:items-center md:justify-end  gap-5 pt-10 px-4 md:px-20'>
          <div className='md:w-1/2'>
            <h2 className='text-secondary text-3xl md:text-5xl md:pb-10 font-bold text-center'>Our Mission</h2>
            <p className='text-lg md:text-xl text-gray-700 mt-4 text-center md:text-left'>At Nyla Travels, Our mission is to deliver seamless travel experiences through reliable services, personalized holiday planning, and dedicated customer support. We strive to help every traveler explore the world with confidence by offering carefully designed travel solutions that combine convenience, value, and unforgettable memories.</p>
          </div>
          <div className='relative md:w-1/2 py-10  flex md:items-center md:justify-end '>
            <Image src='/about/mission.png' alt='Our Mission' width={500} height={500} className='rounded-lg shadow-image' />
            <Image src='/about/mission3.png' alt='Our Mission' width={300} height={400} className=' absolute -top-1 md:top-3 left-0 w-50 h-80 md:w-70 md:h-100 object-cover rounded-lg shadow-image' />
          </div>
        </div>
      <div className='flex items-center px-4 md:px-30 gap-10 pb-10'>
        <span className='text-secondary flex flex-col justify-center items-center'><IoIosContact size={64} />Costumer First</span>
        <span className='text-secondary flex flex-col justify-center items-center'><AiOutlineSafetyCertificate size={64} />Safe & Reliable</span>
        <span className='text-secondary flex flex-col justify-center items-center'><GiWorld size={64} />Explore The World</span>
        <span className='text-secondary flex flex-col justify-center items-center'><LiaHandshakeSolid size={64} />Trusted Services</span>
      </div>
        
        

      </section>
    </>
  )
}

export default OurMission
