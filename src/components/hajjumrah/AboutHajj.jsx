'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

function AboutHajj() {
  const ref = useRef(null)
  useGSAP(() => {
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: 'bottom center',
          // markers:true,
          toggleActions: "play none none none"
        }
      }
    )
    tl.from('.spanp', {
      y: 40,
      opacity: 0,
      duration: 0.3
    }).from(".tt", {
      y: 40,
      opacity: 0,
      duration: 0.3
    }).from(".main", {
      opacity: 0,
      y: 40,
      duration: 0.3
    }).from(".btn", {
      opacity: 0,
      scale: 1.5,
      duration: 0.3
    })
  }, { scope: ref })
  return (
    <>
      <section ref={ref} className='w-full py-30  '>

        <div className='w-full flex flex-col gap-4 max-w-8xl m-auto bg-transparent items-center h-90vh justify-center lg:items-between lg:justify-center '>
          <div className='flex flex-col justify-center items-center gap-10'>
            <span className='bg-primary/10 spanp -ske text-sm font-bold py-1 px-5 text-primary   rounded-full'>A journay of fath</span>
            <h2 className='text-2xl text-center  lg:text-4xl tt font-bold  max-w-full '>
              Where Faith Meets a Journey of a Lifetime
            </h2>
          </div>

          <div className='flex main flex-col lg:flex-row justify-center items-center h-full'>
            <div className='flex h-full  w-full lg:w-1/2 justify-center items-center'>
              <div
                className=" relative size-100 lg:size-150 overflow-hidden border border-gray-500 "
                style={{
                  borderRadius: "60% 40% 35% 65% / 55% 35% 65% 45%",

                }}
              >
                <Image
                  src='/images/meccamadina.png'
                  alt='kaaba'
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-left"
                  priority
                />
              </div>
            </div>


            <div className='w-full lg:w-1/2 text-xl flex h-full flex-col px-2 gap-10 justify-center items-center '>
              <p>Discover the spiritual beauty of Makkah and Madinah with Nyla Travels. From the blessed surroundings of Masjid al-Haram to the serene beauty of Masjid an-Nabawi, we help you experience a comfortable, meaningful, and memorable Umrah journey with thoughtfully planned travel arrangements.</p>
              <div className='btn'>
                <Button className={'text-xl py-5 px-6'}>Explore Umrah Packages <ArrowRight /></Button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default AboutHajj
