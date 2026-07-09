'use client'
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
const MotionImage = motion.create(Image)

function ImageMotion({...props }) {
  return (
    <> 
      <MotionImage
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      {...props}
      />
    </>
  )
}

export default ImageMotion
