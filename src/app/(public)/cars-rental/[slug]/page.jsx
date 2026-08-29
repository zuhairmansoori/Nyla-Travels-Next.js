import CarDeatls from '@/components/car/CarDeatls'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import React from 'react'

async function page({params}) {
    await connectDB()
    const {slug} = await params
    const cars = await carModel.findOne({slug}).lean()
    const data = JSON.parse(JSON.stringify(cars))

  return (
    <div>
      <CarDeatls car={data} />
    </div>
  )
}

export default page
