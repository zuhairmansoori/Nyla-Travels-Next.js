import CardCards from '@/components/car/CardCards'
import CarDeatls from '@/components/car/CarDeatls'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import React from 'react'

async function page({params}) {
    await connectDB()
    const {slug} = await params
    const cars = await carModel.findOne({slug}).lean()
    const data = JSON.parse(JSON.stringify(cars))
    const recomanded = await carModel.find({
      _id:{$ne:data._id},
      isActive:true,
      categorie: data.categorie
    })
    const recomandedData = JSON.parse(JSON.stringify(recomanded))

  return (
    <div>
      <CarDeatls car={data} />
      <div>
        <h2 className='text-center text-2xl'>Similar Cars</h2>
        <CardCards carsData={recomandedData} />
      </div>
    </div>
  )
}

export default page
