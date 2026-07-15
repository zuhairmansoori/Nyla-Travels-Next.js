"use client"
import { div, h2 } from 'motion/react-client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'

function VisaCard({visaDatas}) {
  const [inputvalue,setinputvalue] = useState('')
  const [filterdata, setfilterdata] = useState('')
  
  const filter = visaDatas.filter((f)=>{
     return f.country.toLowerCase().includes(inputvalue.toLowerCase()) 
  })
  console.log('filter card',visaDatas)

  return (
    <>
    <section>
        <div>
          <Input value={inputvalue} type={'search'} onChange={(e)=> setinputvalue(e.target.value)} />
        </div>
     <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 justify-between items-center gap-2 lg:gap-10 py-10 px-3'>
      {filter.map((visa)=>(
        <div  key={visa._id}>
          <div className="relative w-[180px] h-[300px] lg:w-[250px] lg:h-[400px] rounded-2xl overflow-hidden ">
             <Image
              src={visa.imageUrl}
              alt={visa.country}
              fill
              className='object-cover'
             />
             <input type="search"/>
            <div className='absolute inset-0 bg-black/20'></div>
          <div className='absolute inset-0 transform translate-y-2/4 lg:translate-y-3/5 flex flex-col transition-all duration-300 hover:translate-y-1/4 overflow-hidden items-center justify-start shadow-[0_-16px_11px_14px_rgba(0,0,0,0.64)] bg-black/20 backdrop-blur-[5px]'>
             <h3 className=" min-h-20 flex items-center justify-center  text-xl lg:text-3xl  pt-3 text-gray-300 font-bold font-cinzel text-center">{visa.country}</h3>
              <div className="h-[0.5px] w-full bg-gray-300 my-3 px-2 "></div>
             <div className='flex justify-between items-center text-gray-300 gap-3'>
                <p className='flex flex-col justify-center font-bold items-center text-[14px] lg:text-[18px]'>Stay <span className='text-[12px] lg:text-[15px] text-semibold'>{visa.lengthOfStay}</span></p>
                <p className='flex flex-col justify-center font-bold items-center text-[14px] lg:text-[18px]'>Validity <span className='text-[12px] lg:text-[15px] text-semibold' >{visa.validity}</span></p>
                <p className='md:flex flex-col justify-center font-bold items-center hidden  text-[14px] lg:text-[18px]'>Fees <span className='text-[12px] lg:text-[15px] text-semibold'>₹{visa.price}</span></p>

              </div> 
             <div className="h-[0.5px]  bg-gray-300 my-3 mx-[20px] "></div>

             <h4 className='text-sm  text-gray-300'>
              Documnet Needed :
             </h4>
             <ul>
              {visa.documents.map((doc)=>(
                <li key={doc} className='text-[12px] text-gray-300'>
                  {doc}
                </li>
              ))}
             </ul>

              
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
