import React from 'react'
import data from './data'
import Image from 'next/image'
import { li, p } from 'motion/react-client'
import { Button } from '../ui/button'

function UmrahPkgs() {
    
  return (
    <section className='bg-secondary/20 py-20 '>
      <div className='flex justify-center items-center'>
        <h2 className='text-2xl font-bold lg:4xl'>Our Best Umrah Packages</h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 justify-center items-center justify-items-center'>
        {data.map((itm)=>(
            <div key={itm.id} className='mt-10 bg-white w-100 h-190 rounded-2xl p-2'>
               <div>
                <div className='h-75 overflow-hidden'>
                     <Image
                src={'/images/95000.png'}
                alt='umrah image'
                width={400}
                height={200}
                className='rounded-2xl '
                />
                </div>
             
                <div className='py-5'>
                  <span className='flex justify-between items-center'>
                    {itm.highlights.map((h)=>(
                      <p className='p-2 text-[9px] bg-primary/10 rounded-2xl font-bold' key={h}>{h}</p>
                    ))}
                  </span>
                  <h3 className='font-bold my-3 text-center'>{itm.name}</h3>
                  <div className='flex justify-between items-baseline'>
                     <ol className='list-decimal ml-5'>
                    <h3 className='font-bold'>Ziyarat</h3>
                    {itm.ziyarat.map((z)=>(
                     <li key={z}>{z}</li>
                    ))}
                  </ol>

                  <div>
                    <h3 className='font-bold'>Included</h3>
                    {itm.includedServices.map((i)=>(
                      <p className='text-sm' key={i}>{i}</p>
                    ))}
                  </div>
                  </div>
                 <p className='font-bold m-5'>
                  Price: <strong>{itm.price}</strong>
                 </p>
                 
                </div>
                <div className='text-center pb-5'>
                            <Button>More Details</Button>
                </div>
      
               </div>
            </div>
        ))}

      </div>
    </section>
  )
}

export default UmrahPkgs
