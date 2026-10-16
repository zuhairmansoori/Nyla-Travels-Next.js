'use client'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import React,{useRef} from 'react'
import { Button } from '../ui/button'
import { MoveUpRight } from 'lucide-react'

function Hero() {
    const ref = useRef(null)
    useGSAP(()=>{
        const tl = gsap.timeline()
        tl.from(".img",{
            opacity:0,
            duration:0.2,
            ease:"power2.inOut"
        })
        tl.from(".heading",{
            opacity:0,
            filter: "blur(10px)",
            x:-200,
            duration:0.5,
            ease:"power2.inOut"
        }).from(".pera",{
             opacity:0,
            x:200,
            filter:"blur(10px)",
            duration:0.5,
            ease:"power2.inOut"
        })

    },[])
  return (
    <>
      <section ref={ref} className='overflow-hidden'>
        <div className='relative h-[90vh] pb-32'>
            <Image
            src='/images/Kaaba.png'
            alt='Kaaba'
            fill
            priority
            unoptimized
            sizes="100vw"
            className='object-cover img'
            />
            <div className='absolute  h-auto inset-0 bg-black/45  z-10'></div>

            

            <div className="relative mx-auto  flex min-h-[90vh] max-w-full  px-4 lg:px-20 z-20">
                <div className="w-full flex flex-col items-center  md:flex-row md:items-start md:justify-between ">
                                   <div className="w-full mt-15 md:mt-5">
                    <div className='md:py-10 pt-40 md:pt-20 md:m-0 z-40'>
                        <h1 className="mb-4 heading max-w-full text-shadow-accent-foreground  font-cinzel text-3xl font-bold text-center lg:text-left lg:w-3/4 text-white md:text-4xl lg:text-5xl">
                           Experience Hajj & Umrah with Peace of Mind
                        </h1>
                    </div>

                </div>
                <div className='relative mt-30 md:mt-0 h-full w-full'>
                    <div style={{
                        color:'white !important'
                    }} className='md:absolute text-center md:bottom-50 md:right-0'>
                          <p className="text-xl pera max-w-full font-bold text-white text-center lg:text-right md:ml-auto font-cinzel lg:text-2xl text-shadow-accent-foreground md:w-2/3"> Enjoy comfortable hotel stays, smooth airport transfers, well-planned Hajj & Umrah packages, and dedicated travel assistance throughout your sacred journey.</p>
                    </div>
                </div>
                </div>
                <div className='absolute inline rounded-3xl p-2 w-full bottom-1/5  left-10 md:left-20 z-50'>
                               <Button className={'md:text-2xl bg-primary py-7  rounded-3xl px-5'} >Talk to Our Travel Expert <span ><MoveUpRight size={65} /></span></Button>
                            

                </div>
          

            </div>
        </div>
      </section>
    </> 
  )
}

export default Hero
