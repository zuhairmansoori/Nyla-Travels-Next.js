
import CarsForm from '@/components/admin/car/CarsForm'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import React from 'react'

async function page({params}) {
    await connectDB()
    const {slug} = await params
    const data = await carModel.findOne({slug:slug})
    const cardata = JSON.parse(JSON.stringify(data))
  
    
  return (
    <div>
      <CarsForm Cars={cardata} />
    </div>
  )
}

export default page
