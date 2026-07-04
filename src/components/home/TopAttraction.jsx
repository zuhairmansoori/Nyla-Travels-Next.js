'use client'
import React from 'react'
import {motion} from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
// import { id } from 'zod/locales'


const destination = [
  {
    id: 1,
    name:'Dubai',
    img:'/images/dubai.jpg'
  },
    {
    id: 2,
    name:'India',
    img:'/images/Mahal.jpg'
  },
    {
    id: 3,
    name:'Thailand',
    img:'/images/Thailand.jpg'
  },
    {
    id: 4,
    name:'Vietnam',
    img:'/images/veatnam.jpg'
  },
    {
    id: 5,
    name:'Kazakistan',
    img:'/images/Almaty.jpg'
  },
    {
    id: 6,
    name:'Malaysia',
    img:'/images/malasia.jpg'
  },
  {
    id:7,
    name:'Maldives',
    img:'/images/maldives.jpg'
  }

]

function TopAttraction() {

  const cname = destination.map((item)=>item.name.toLocaleLowerCase)
  return (
    <>
    <motion.div
    // initial={{opacity: 0, y:50}}
    // whileInView={{opacity: 1,y: 0}}
    // transition={{duration:1,delay:0.3}}
    className=' container mx-auto px-4 pt-20 overflow-hidden '>
      <motion.div
          initial={{opacity: 0, y:50}}
           whileInView={{opacity: 1,y: 0}} 
          transition={{duration:0.5}}
          className='mx-auto mb-12 pt-20 max-w-2xl text-center'
      >
         <h2 className=' text-4xl font-bold text-secondary'>Top Attraction</h2>
         <p className="mt-4 text-muted-foreground">
           `Explore the world's most loved destinations`
          </p>
      </motion.div>
     <motion.ul 
         initial={{opacity: 1, x:300}}
            whileInView={{opacity: 1,x: 0}}
            transition={{duration:1}}
     
     className='flex overflow-x-scroll  no-scrollbar gap-4  scroll-smooth p-7 mb-[90px] '>
         {destination.map((pkg)=>(
          <motion.li 
          
            // viewport={{once:true,amount:0.2}}
          key={pkg.id} className=' rounded-2xl min-w-62.5 duration-300 shaows md:min-w-68.75 overflow-hidden  hover:-translate-y-4 transition-all duration-300 active:scale-110'>
           <Link href={`/packages/${pkg.name}`}><div className='relative h-[350px] md:h-[400px]  overflow-hidden rounded-2xl '>
              <Image className=' h-full  w-full  object-center  duration-500 transition-transform hover:scale-110'  width={400}
  height={600} src={pkg.img} alt={pkg.name} />
              <h2 className='absolute left-6 bottom-8 text-2xl text-gray-300 font-semibold '>{pkg.name}</h2>
            </div>
            </Link> 
            </motion.li>
         ))}
     </motion.ul>
     <div>

     </div>
    </motion.div>
    </>
  )
} 

export default TopAttraction

