import React from 'react'
import { carAction } from '@/Action/cars'
import CarForm from '@/components/admin/car/CarForm'

function page() {
  return (
    <div>
      <CarForm action={carAction}/>
    </div>
  )
}

export default page
