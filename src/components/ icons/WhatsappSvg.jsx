'use client'
import { Whatsapp } from '@/helper/IconsFnx'
import React from 'react'
import Image from 'next/image'

function WhatsappSvg({width=25,height=25}) {
  return (
    <div onClick={()=>Whatsapp()}>
      <Image
             src='/whatsapp.svg'
             alt='instagram logo'
             width={width}
             height={height}
            />
    </div>
  )
}

export default WhatsappSvg
