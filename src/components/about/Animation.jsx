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
        const vision = ref.current?.querySelector(".vision")
        const md = ref.current?.querySelector(".md")
        const mm = gsap.matchMedia()

        // mobile
  //       mm.add("(max-width: 785px)", () => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ref.current,
  //       start: "top 80%",
  //       end: "bottom 20%",
  //       scrub: 1,
  //     }
  //   })

  //   tl.from(".md", {
  //     y: 50,
  //     opacity: 0,
  //     duration: 1,
  //   })
  //   .from(".mission", {
  //     y: 50,
  //     opacity: 0,
  //     duration: 1,
  //   })
  //   .from(".vision", {
  //     y: 50,
  //     opacity: 0,
  //     duration: 1,
  //   })
  // })

  //desktop
        mm.add("(min-width: 786px)",()=>{
           const tl = gsap.timeline({
            scrollTrigger:{
                trigger:ref.current,
            start:"top top",
            end:"+=1000",
            scrub:1,
            pin:true,
            // markers:true
            }
        })
        tl.from(md,{
            y:100,
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
       
    return ()=> mm.revert()
    },{scope:ref})
    
  return (
    <div>
      <section  ref={ref} className='relative w-full md:h-screen overflow-x-hidden'>
        <div className='md pt-20 md:absolute md:inset-0 md:z-10'>
             <MdkalimMessage  />
        </div>
    
     <div className=' pt-10 lg:pt-0 mission md:absolute md:inset-0 md:z-20'>
       <OurMission  />
     </div>
     <div className='vision md:h-screen  md:absolute md:inset-0 md:z-30'>
            <OverVision  />
     </div>
      
     
      </section>
    </div>
  )
}

export default Animation
