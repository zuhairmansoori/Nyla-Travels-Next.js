"use client"
import React from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import  { useGSAP }from '@gsap/react'
import OurMission from './OurMission'
import OverVision from './OverVision'
import MdkalimMessage from './MdkalimMessage'

gsap.registerPlugin(ScrollTrigger)


function Animation() {
    const ref = useRef(null)
    useGSAP(()=>{
        const mission = ref.current?.querySelector(".mission")
        console.log('ye mission', mission)
        const vision = ref.current?.querySelector(".vision")
        console.log('ye vision', vision)
        const md = ref.current?.querySelector(".md")
        gsap.matchMedia(                                              )
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:ref.current,
            start:"top top",
            end:"+=2000",
            scrub:1,
            pin:true,
            // markers:true
            }
        })
        tl.from(md,{
            opacity:1,
            y:100,
            duration:0.2,
            ease:"power2.inOut",

        })
        tl.from(mission,{
            x:1500,
            opacity:1,
        }).from(vision,{
            x:-1000,
            opacity:0
        },"+=0.5")

    })
    
  return (
    <div>
      <section  ref={ref} className='relative w-full h-screen overflow-hidden'>
        <div className='md pt-20 absolute inset-0 z-10'>
             <MdkalimMessage  />
        </div>
    
     <div className=' pt-20 lg:pt-0 mission absolute inset-0 z-20'>
       <OurMission  />
     </div>
     <div className='vision h-screen  absolute inset-0 z-30'>
            <OverVision  />
     </div>
      
     
      </section>
    </div>
  )
}

export default Animation
