'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Menu, Luggage, TicketsPlane, Car, TowerControl, Contact, House, PlaneTakeoff, Hotel } from 'lucide-react'
import Image from 'next/image'
import { } from 'lucide-react';
import SideMenu from './SideMenu'
import { Button } from './ui/button'


const link = [
    { name: "Home", href: "/", icon: <House /> },
    { name: "Flight", href: "/flights", icon: <PlaneTakeoff /> },
    { name: 'Hotels', href: '/hotels', icon: <Hotel /> },
    { name: 'Packages', href: '/packages', icon: <Luggage /> },
    { name: 'Visa', href: '/visa', icon: <TicketsPlane /> },
    { name: 'Cars Rental', href: "/cars-rental", icon: <Car /> },
    { name: "Airport Assistant", href: '/airport-assistent', icon: <TowerControl /> },
    { name: 'About Us', href: '/about', icon: <Contact /> },

]

function Nav() {
    const [ismobile, setismobile] = useState(false)
    const [scroll, setscroll] = useState(false)
    let pathname = usePathname()
    const opicity = pathname === '/'
    useEffect(() => {

        const handlescroll = () => {
            if (!opicity || window.scrollY > 100) {
                setscroll(true)
            }
            else {
                setscroll(false)
            }
        }
        handlescroll()
        window.addEventListener('scroll', handlescroll)
        return () => {
            window.removeEventListener('scroll', handlescroll)
        }
    }, [])



    return (
        <div className='relative z-50'>
            <div className={`${opicity ? "fixed top-0 left-0 right-0 z-50" : "sticky top-0 left-0 right-0 z-50"}`} >
                <div className={`${scroll ? " bg-white/30 backdrop-blur-md shadow-white shadow" : "bg-transparent"} z-50 transition-all duration-300 p-3`}>
                    <div className='flex items-center justify-between '>
                        <div className='flex items-center justify-center gap-3'>
                            <div onClick={() => setismobile(!ismobile)} className='md:hidden'>
                                <Menu />
                            </div>
                            <div className='flex justify-center items-center'>
                                <Image src={'/NylaTravels.svg'} alt='Nyla Travels' width={60} height={60} loading='eager' />
                                <h2 className='text-xl'>
                                    <span className='text-primary'>Nayla</span><span className='text-secondary'>Travels</span>
                                </h2>
                            </div>

                        </div>
                        <div >
                             <div className='hidden md:block'>
                                <div className='flex items-center justify-center gap-3 lg:gap-5'>
                                    {link.map((itm) => (
                                        <Link className={` relative inline-block ${pathname === itm.href && "text-primary after:absolute after:-bottom-1 after:h-1  after:w-full after:rounded-full after:bg-primary after:content-['']"} transition-all duration-300 hover:text-secondary `} key={itm.name} href={itm.href}><div
                                        className='flex flex-col items-center justify-center'>{itm.icon}<span>{itm.name}</span></div></Link>
                                    ))}
                            </div>
                            </div> 
                    </div> 
                    <div>
                        <Button>Login</Button>
                    </div>

                </div>

                <div>

                </div>

                <SideMenu ismobile={ismobile} setismobile={setismobile} link={link} />
            </div>
        </div>
        </div >
    )
}

export default Nav
