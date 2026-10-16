'use client'
import { Car, Hotel, MoveRight, Plane, TicketsPlane } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const data = [
    {
        icon: <Plane size={40} />,
        title: 'Flight Booking',
        description: 'We provide hassle-free flight booking services for Hajj and Umrah pilgrims, ensuring a smooth travel experience.'
    },

    {
        icon: <TicketsPlane size={40} />,
        title: 'Visa Assistance',
        description: 'Our team assists pilgrims in obtaining the necessary visas for Hajj and Umrah, guiding them through the application process.'
    },

    {
        icon: <Hotel size={40} />,
        title: 'Accommodation',
        description: 'We offer comfortable and convenient accommodation options for pilgrims during their stay in Saudi Arabia.'
    },

    {
        icon: <Car size={40} />,
        title: 'Transportation',
        description: 'We arrange reliable transportation services for pilgrims, including airport transfers and local travel during their pilgrimage.'
    },

]

function HajjUmrahServices() {
    const ref = useRef(null)
    useGSAP(() => {
        const mm= gsap.matchMedia()
        // mm.add("(min-width:768)",()=>{
               const tl = gsap.timeline({
            scrollTrigger:{
                trigger:ref.current,
                start:"top top",
                end:"+=1000",
                scrub:1,
                pin:true,
                // markers:true,
             
               
            }
        })
        tl.from(".subheading",{
            opacity:0,
            y:100,
            ease:"power2.inOut"
        })
        tl.from(".h1heading",{
            opacity:0,
            y:100,
            ease:"power2.inOut"
        })
        tl.from(".ppera",{
            opacity:0,
            y:100,
            ease:"power2.inOut"
        })
        tl.from(".card", {
            opacity: 0,
            y: 100,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.inOut"
        })
        // })
     
    }, { scope: ref })
    return (
        <>
            <section ref={ref} className='py-25 bg-[url(/images/Kaaba.png)] overflow-hidden bg-contain bg-no-repeat lg:bg-cover'>
                <div className='mx-auto max-w-7xl px-6'>
                    <div className='mx-auto mb-14 max-w-2xl text-center'>
                        <span className='bg-primary/10 px-4 py-1 subheading rounded-2xl text-primary font-bold text-sm'>Your Trusted Hajj and Umrah Companion</span>
                        <h2 className='text-4xl h1heading  mt-8 font-bold text-primary'>
                            Everything You Need for Your Sacred Journey
                        </h2>
                        <p className=' mt-4 ppera  text-gray-900'>
                            Thoughtfully planned travel services for your Hajj & Umrah journey.
                        </p>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
                        {data.map((item) => (
                            <div key={item.title} className='card'>
                                <div className='group relative  mb-12 p-10 pb-20 h-120 shadow-sm rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2 hover:border-primary border-2 hover:shadow-xl'>
                                    <div className='flex flex-col items-center pb-10'>
                                        <div className='p-7  bg-primary text-white rounded-full transition duration-300 group-hover:scale-110'>{item.icon}</div>
                                        <h3 className='text-xl font-bold text-primary mt-4'>{item.title}</h3>
                                        <p className='text-gray-600 mt-2 text-center'>{item.description}</p>
                                    </div>
                                    <button className="text-primary w-full absolute bottom-15 left-20  flex items-center gap-2 font-semibold text-sm mt-10">More Details <MoveRight /></button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </section>
        </>
    )
}

export default HajjUmrahServices
