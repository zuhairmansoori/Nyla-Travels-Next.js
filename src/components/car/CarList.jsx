import React from 'react'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import SearchInput from '../admin/SearchInput'
import CardCards from './CardCards'

async function CarList({params}) {
    const search = params.search || ''
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
    <div>
       <CardCards carsData={plainCarData}/>

    </div>
  )
}

export default CarList
