import Hero from '@/components/about/Hero'
import OurMission from '@/components/about/OurMission'
import Stats from '@/components/about/Stats'
import WhyNyla from '@/components/home/WhyNyla'
import OverVision from '@/components/about/OverVision'
import React from 'react'

function page() {
  return (
    <>
      <Hero/>
      <Stats/>
      <OurMission/>
      <OverVision/>
      <WhyNyla />
      
    </>
  )
}

export default page
