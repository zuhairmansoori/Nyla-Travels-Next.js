import React from 'react'
import AirportAssistanceForm from './AirportAssistanceForm'
import Image from 'next/image'
import { Meera_Inimai } from 'next/font/google'
import { li } from 'motion/react-client'
import { Check } from 'lucide-react';




const list = [
    'Meet & Greet Services', "Fast Track Immigration", "Wheelchair Assistance", "Baggage Assistance", "VIP Lounge Access", "24/7 Support"
]
function AssistanceFormSection() {
    return (
        <>
            <section>
                <div className=' bg-linear-to-br from-[#003069] to-[#0d7fd6]'>
                    {/* <Image
               src="/airport-assistant-form.webp"
               alt="Airport Assistance Form"
               fill
               className="w-full h-162.5 object-cover object-right rounded-3xl shadow-2xl"
               /> */}
                    <div className='grid lg:grid-cols-2 gap-16 items-start px-6 lg:px-20 py-24'>

                        <div className='py-10'>
                            <h3 className="max-w-[600px] text-3xl lg:text-4xl font-medium leading-tight text-white">
                                Enjoy a Smooth & Stress-Free <br />
                                Airport Experience <br />
                                with Premium <span className="font-bold">Meet &amp; Greet Services</span>
                            </h3>
                            <ul>
                                {list.map((itm) => (
                                    <li key={itm}>
                                        <div className='flex items-center justify-start my-5 gap-10 text-white'>
                                            <span className='p-2 rounded bg-black text-white'><Check /></span>
                                            {itm}
                                        </div>
                                    </li>
                                ))}
                            </ul>


                        </div>
                        <div>
                            <AirportAssistanceForm />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default AssistanceFormSection
