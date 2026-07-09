import About from '@/components/about/About'
import Hero from '@/components/about/Hero'
import OurMission from '@/components/about/OurMission'
import Stats from '@/components/about/Stats'
import WhyNyla from '@/components/home/WhyNyla'
import OverVision from '@/components/about/OverVision'
import MdkalimMessage from '@/components/about/MdkalimMessage'
import React from 'react'
import Faq from '@/components/about/ Faq'
import Testimonials from '@/components/home/Testimonials'

function page() {
  return (
    <>
      <Hero/>
      <About/>
      <Stats/>
      <MdkalimMessage/>
      <OurMission/>
      <OverVision/>
      <WhyNyla />
      <Testimonials/>
      <Faq/>
      
    </>
  )
}

export default page
