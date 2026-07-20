"use client"
import React, { useState } from 'react'

import Image from 'next/image'

function VisaCard({visaDatas}) {

  
  
  console.log('filter card',visaDatas)

  return (
    <>
    <section>
      
     <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 justify-between items-center gap-2 lg:gap-10 py-10 px-3 max-w-7xl m-auto'>
      {visaDatas.map((visa)=>(
        <div  key={visa._id}>
          <div className="relative w-[180px] h-[300px] lg:w-[250px] lg:h-[400px] rounded-2xl overflow-hidden ">
             <Image
              src={visa.imageUrl.url}
              alt={visa.country}
              fill
              sizes="(max-width: 640px) 40vw"
              className='object-cover'
             />
             <input type="search"/>
            <div className='absolute inset-0 bg-black/20'></div>
          <div className='absolute inset-0 transform translate-y-2/4 lg:translate-y-3/5 flex flex-col transition-all duration-300 hover:translate-y-1/4 overflow-hidden items-center justify-start shadow-[0_-16px_11px_14px_rgba(0,0,0,0.64)] bg-black/20 backdrop-blur-[5px]'>
             <h3 className=" min-h-20 flex items-center justify-center  text-xl lg:text-3xl  pt-3 text-gray-300 font-bold font-cinzel text-center">{visa.country}</h3>
              <div className="h-[0.5px] w-[90%] bg-gray-300 my-3  "></div>
             <div className='flex justify-between items-center text-gray-300 gap-3'>
                <p className='flex flex-col justify-center font-bold items-center text-[14px] lg:text-[18px]'>Stay <span className='text-[12px] lg:text-[15px] text-semibold'>{visa.lengthOfStay} Days</span></p>
                <p className='flex flex-col justify-center font-bold items-center text-[14px] lg:text-[18px]'>Validity <span className='text-[12px] lg:text-[15px] text-semibold' >{visa.validity} days</span></p>
                <p className='flex flex-col justify-center font-bold items-center   text-[14px] lg:text-[18px]'>Fees <span className='text-[12px] lg:text-[15px] text-semibold'>₹{visa.price}</span></p>

              </div> 
             <div className="h-[0.5px]  bg-gray-300 my-3 w-[90%] "></div>
             <div className='flex flex-col items-start justify-center w-full '>
                   <h4 className='text-sm lg:text-[15px] text-left px-2 font-bold text-gray-300'>
              Documnet Needed :
             </h4>
             <ul className='flex justify-center items-center flex-wrap gap-3'>
              {visa.documents.map((doc)=>(
                <li key={doc} className='text-[14px] text-left lg:text-[15px] mx-2 py-2 px-3 rounded-2xl  bg-black/10 backdrop-blur-sm font-semibold  text-gray-300'>
                  {doc}
                </li>
              ))}
             </ul>

             </div>              
          </div>
          </div>
           </div>
      ))}
    </div>
    </section>
  </>
  )
}

export default VisaCard
