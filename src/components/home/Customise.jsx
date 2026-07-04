'use client'
import Image from 'next/image'
import React from 'react'
import Container from '../Container'
import { Button } from '../ui/button'
import { Whatsapp } from '@/helper/IconsFnx'

function Customise() {
  return (
    <>
      <section className=' p-10  '>
        <div className='relative h-[400px] lg:min-h-screen  overflow-hidden rounded-4xl'>
          <Image
            src='/customizeimg.png'
            alt=''
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-black/40">
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-start ">
            <div className="max-w-2xl p-4 md:pl-20">
              <h2 className="text-2xl md:text-6xl font-bold text-white">
                Your Journey, Designed Just for You
              </h2>

              <p className="mt-6 text-sm  md:text-xl text-gray-200">
                Whether you're planning a honeymoon, family vacation,
                business trip, or group tour...
              </p>

              <Button className="mt-8 text-sm px-6 py-5    md:text-2xl md:px-12 md:py-8 hover:bg-secondary" onClick={()=>Whatsapp()}>
                Start Planning Now
              </Button>
            </div>
          </div>
        </div>




      </section>
    </>
  )
}

export default Customise
