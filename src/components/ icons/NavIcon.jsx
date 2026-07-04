'use client'
import React from 'react'
import WhatsappSvg from './WhatsappSvg'
import InstagramSvg from './InstagramSvg'
import { Instagram, Whatsapp } from '@/helper/IconsFnx'
import { ChevronRight } from "lucide-react";
import FacebookSvg from './FacebookSvg'

function NavIcon() {
  return (
    <div className='flex flex-col items-start justify-center gap-3'>
      <div onClick={()=> Whatsapp()} className='border transition-all duration-300 hover:bg-secondary/40 cursor-pointer p-3 w-full max-w-sm rounded-2xl  transition-all duration-400 active:scale-95 flex items-center justify-between gap-2 '>
        <div className='flex justify-center items-center gap-3' >
            <WhatsappSvg/> Whatsapp
            </div>
            <ChevronRight className='text-secondary' />
      </div>
      <div onClick={()=>Instagram()} className='border  cursor-pointer p-3 w-full max-w-sm rounded-2xl  transition-all duration-400 active:scale-95 flex items-center justify-between gap-2'>
        
       <div className='flex justify-center items-center gap-3'>
        <InstagramSvg/> Instagram
        </div> 
        <ChevronRight className='text-secondary' />
      </div>
      <div onClick={()=>Instagram()} className='border  cursor-pointer p-3 w-full max-w-sm rounded-2xl  transition-all duration-400 active:scale-95 flex items-center justify-between gap-2'>
        
       <div className='flex justify-center items-center gap-3'>
        <FacebookSvg/> Facebook
        </div> 
        <ChevronRight className='text-secondary' />
      </div>
    </div>
  )
}

export default NavIcon
