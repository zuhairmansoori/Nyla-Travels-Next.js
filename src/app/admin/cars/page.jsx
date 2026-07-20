import CarTable from '@/components/admin/car/CarTable'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import React from 'react'

 async function page({searchParams}) {
   await connectDB()

    const params = await searchParams
    const search = params.search || ""
    const page = Number(params.page) || 1
    const limit = 10
    const skip = (page - 1) * limit
     const query =  search?{
        CarName:{
            $regex:search,
            $options:'i'
        }
    }:{}
    const cars = await carModel.find(query).limit(limit).skip(skip).lean()
    const total = await carModel.countDocuments(query)
    const totalPage = Math.ceil(total/limit)
    const plainCarData = JSON.parse(JSON.stringify(cars))
  return (
    <div className='p-5'>
       <CarTable  cars={plainCarData} />
    </div>
  )
}

export default page
