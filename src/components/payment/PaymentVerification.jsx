'use client'
import { Check } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function PaymentVerification({ orderId, paymentId,bookingNumber }) {
  const router = useRouter()
  return (
    <div className='flex fixed inset-0 z-50 flex-col gap-4 bg-linear-to-bl from-green-200 to-green-400 justify-start items-center pt-10  h-screen'>
      <div className='flex justify-center items-center'>
        <div className='bg-green-800  text-white rounded-full w-30 h-30 shadow-2xl shadow-green-200 flex justify-center items-center '>
          <Check size={80} />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Payment successfully received!
        </h1>

        <p className="mt-2 text-gray-700">
          Your booking has been successfully completed and your payment has been received.
        </p>

        <div className="mt-6 rounded-lg bg-gray-100 p-4 text-left">
          <p className="text-sm text-gray-500">Booking Number</p>
          <p className="font-semibold">{bookingNumber}</p>

          <p className="mt-4 text-sm text-gray-500">Payment ID</p>
          <p className="font-semibold">{paymentId}</p>

          <p className="mt-4 text-sm text-gray-500">Order ID</p>
          <p className="font-semibold">{orderId}</p>
        </div>

        <p className="mt-4 text-sm text-gray-700">
          Your booking confirmation details will be sent to your registered email address.
        </p>
      </div>
      <Button onClick={() => router.replace('/')} >Home</Button>
    </div>
  )
}

export default PaymentVerification
