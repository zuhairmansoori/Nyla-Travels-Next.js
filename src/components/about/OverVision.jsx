import React from 'react'
import Image from 'next/image'
function OverVision() {
  return (
    <>
      <section className='bg-gray-100 pt-20'>
              <div className='flex flex-col md:flex-row-reverse items-center  justify-center md:items-center md:justify-end  gap-5 py-10 px-4 md:px-20'>
                <div className='md:w-1/2'>
                  <h2 className='text-secondary text-3xl md:text-5xl md:pb-10 font-bold text-center'>Our Vision</h2>
                  <p className='text-lg md:text-xl text-gray-700 mt-4 text-center md:text-left'>At Nyla Travels,  Our vision is to become one of the most trusted and respected travel companies by inspiring people to discover the beauty of the world. We aim to build lasting relationships with our clients through honesty, innovation, and a commitment to excellence, making Nyla Travels the first choice for every journey.</p>
                </div>
                <div className='relative md:w-1/2 py-10  flex md:items-center md:justify-end '>
                  <Image src='/about/mission.png' alt='Our Mission' width={500} height={500} className='rounded-lg shadow-image' />
                  <Image src='/about/mission3.png' alt='Our Mission' width={300} height={400} className=' absolute rotate-y-25 rotate-z-30  -top-1 md:top-3 left-0 w-50 h-80 md:w-70 md:h-100 object-cover rounded-lg shadow-image' />
                </div>
              </div>
            </section>
    </>
  )
}

export default OverVision
