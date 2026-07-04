'use client'
import { Instagram } from '@/helper/IconsFnx'
import React from 'react'
import Image from 'next/image'

function InstagramSvg() {
  return (
    <div onClick={()=>Instagram()} >
      <Image
       src='/instagram.svg'
       alt='instagram logo'
       width={25}
       height={25}
      />
    </div>
  )
}

export default InstagramSvg
