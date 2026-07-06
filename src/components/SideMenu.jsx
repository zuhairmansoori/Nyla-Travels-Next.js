import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { InstagramIcon, WhatsappIcon } from './ icons/Icons'
import { lenisInstance } from "@/components/SmoothScroll";
import WhatsappSvg from './ icons/WhatsappSvg'
import InstagramSvg from './ icons/InstagramSvg'
import NavIcon from './ icons/NavIcon'

function SideMenu({ ismobile, setismobile, link }) {
    let pathname = usePathname()
  useEffect(() => {
  if (ismobile) {
    document.body.style.overflow = "hidden";
    lenisInstance?.stop();
  } else {
    document.body.style.overflow = "";
    lenisInstance?.start();
  }

  return () => {
    document.body.style.overflow = "";
    lenisInstance?.start();
  };
}, [ismobile]);

    return (
        <div className=''>
            <div data-lenis-prevent className={`${ismobile && "w-full fixed inset-0 bg-black/40 z-40 "} `} onClick={() => setismobile(false)}>
                <div className={`fixed top-0  scrollbar-none left-0 h-screen w-4/5 z-50 bg-white text-gray-800 transform transition-all  overflow-y-auto  duration-600  ease-in-out shadow-2xl
                               ${ismobile ? "translate-x-0" : "-translate-x-full"}`}>
                    <div  className='flex items-center justify-between p-2'>
                        <div>
                            <Image src={'/NylaTravels.svg'} alt='Nyla Travels' width={60} height={60} loading='eager' />
                        </div>
                        <button type='button' onClick={() => setismobile(false)} className='flex h-10 w-10 items-center justify-center rounded-full'>
                            <X />
                        </button>

                    </div>
                    <div>
                        <div className='flex flex-col justify-center items-start p-5 pr-15 gap-3'>

                            {link.map((itm) => (
                                <div key={itm.name} className={`border ${pathname === itm.href ? "border-sky-800 text-sky-700 bg-linear-to-br from-sky-200 to-white scale-105" : "border-gray-700 text-gray-800 "}  cursor-pointer p-3 w-full max-w-sm rounded-2xl  transition-all duration-400 active:scale-95 `}>
                                    <Link className={`text-[16px] `} href={itm.href}> <div className='flex items-center justify-between'>
                                        <div className='flex items-center justify-between gap-2'>
                                            {itm.icon}
                                            <span className='text-gray-900'>
                                                {itm.name}
                                            </span>

                                        </div>

                                        <ChevronRight className='text-secondary' />
                                    </div>      </Link>
                                </div>

                            ))}
                            <div className='w-full border border-gray-700 rounded-2xl py-4 mt-5 flex flex-col justify-center gap-4'>
                                <NavIcon/>

                            </div>
                           


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu
