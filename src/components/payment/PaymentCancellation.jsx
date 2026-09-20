'use client'
import React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function PaymentCancellation({bookingNumber,orderId}) {
   const router = useRouter()
  return (
    <div className='flex fixed inset-0 z-50 flex-col gap-4 bg-linear-to-bl from-red-200 to-red-400 justify-start items-center pt-10  h-screen'>
      <div className='flex justify-center items-center'>
        <div className='bg-red-800  text-white rounded-full w-30 h-30 shadow-2xl shadow-red-200 flex justify-center items-center '>
         
          <X size={80}/>
        </div>
      </div>
       <div className="text-center">
        <h1 className="text-2xl font-bold">
  Payment Not Completed
</h1>

<p className="mt-2 text-gray-600">
  We couldn&apos;t confirm your payment.
</p>

<p className="mt-4 text-sm text-gray-500">
  If any amount was deducted from your account, please contact us.
</p>
  <div className="mt-6 rounded-lg bg-gray-100 p-4 text-left">
          <p className="text-sm text-gray-500">Booking Number</p>
          <p className="font-semibold">{bookingNumber}</p>

          <p className="mt-4 text-sm text-gray-500">order ID</p>
          <p className="font-semibold">{orderId}</p>
        </div>
        </div>
        <Button onClick={()=> router.replace('/')} >Home</Button>
    </div>
  )
}

export default PaymentCancellation
