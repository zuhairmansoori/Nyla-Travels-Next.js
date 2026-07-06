import Hero from '@/components/about/Hero'
import OurMission from '@/components/about/OurMission'
import Stats from '@/components/about/Stats'
import WhyNyla from '@/components/home/WhyNyla'
import OverVision from '@/components/about/OverVision'
import MdkalimMessage from '@/components/about/MdkalimMessage'
import React from 'react'
import Faq from '@/components/about/ Faq'

function page() {
  return (
    <>
      <Hero/>
      <Stats/>
      <OurMission/>
      <OverVision/>
      <MdkalimMessage/>
      <WhyNyla />
      <Faq/>
      
    </>
  )
}

export default page
