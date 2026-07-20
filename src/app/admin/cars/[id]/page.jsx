import { carAction } from '@/Action/cars'
import CarForm from '@/components/admin/car/CarForm'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import React from 'react'

async function page({params}) {
    await connectDB()
    const idparam = await params
    const id = idparam.id
    console.log('cardid',id);
    
    const data = await carModel.findById(id)
    console.log('cardform',data);
    
    const cardata = JSON.parse(JSON.stringify(data))
    console.log('plaincard form',cardata);
    
  return (
    <div>
      <CarForm action={carAction} Defaultlvalue={cardata} />
    </div>
  )
}

export default page
