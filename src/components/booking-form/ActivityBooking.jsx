
'use client'
import React, { useState } from 'react'
import { clientAuth } from '@/lib/client-auth'
import { Button } from '../ui/button';
import Script from 'next/script';
import optionHandler from '@/helper/razorpatoption';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';


const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]


function Field({ label, required, children }) {

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}


function ActivityBooking({ activity, bookingForm }) {
  const router = useRouter()
  const userSession = clientAuth.useSession()
  const [form, setForm] = useState(
    {
      name: userSession?.data?.user?.name || '',
      email: userSession?.data?.user?.email || '',
      phone: '',
      address: '',
      activityDate: today,
      person: 1

    }
  )
  const [error, setError] = useState("")
  const [isPanding, setIsPanding] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition";

  const handleBookNow = async (e) => {
    e.preventDefault();
    setIsPanding(true)
    if (!form.name) {
      setError("Name is not define")
      return
    }
    if (!form.address) {
      setError("fill address")
      return
    }
    if (!form.phone) {
      setError("Please enter phone number")
      return
    }
    if(form.person <=0){
      setError('Atlest on person selected')
      return
    }
    if (!form.email || !form.activityDate) {
      setError("be careful you enter all details")
    }
    if(activity.price * form.person + activity.price * form.person * 18 / 100 >= 500000){
           const wamsg = `Hello! I'm interested in ${activity}. Could you please provide me with more information?`
        window.open(`https://wa.me/9213909942?text=${encodeURIComponent(wamsg)}`,'_blank')
    }
    try {
      const res = await fetch('/api/booking/create-booking', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          form,
          bookingType: 'package',
          itemId: activity._id
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // Booking created successfully, now initiate Razorpay payment
        const orderRes = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bookingId: data.booking._id })
        });
        const order = await orderRes.json();
        // console.log('Order',order)
        if (orderRes.ok) {
          // Open Razorpay payment modal
          optionHandler(order.order, data.booking._id,router);
          setIsPanding(false)
        } else {
          console.error('Error creating order', order.message)
          setIsPanding(false)
        }
      }
      setIsPanding(false)
      setError(data.message)


    } catch (error) {
      setIsPanding(false)
      console.error('Error creating booking:', error);
    }
  }

  return (
    <div className='   bg-transparent backdrop-blur-sm  mb-10  p-4'>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className='bg-white w-full sm:w-2/3 lg:w-2/4 p-5 rounded-2xl m-auto'>
        <div className='flex justify-between items-center'>
          <div className='text-secondary text-xl sm:text-3xl  text-center'>Booking Form</div>
          <span onClick={() => bookingForm(false)} className='p-2 px-4 rounded-full  cursor-pointer text-red-700 font-bold text-xl' >x</span>
        </div>


        <h2 className='p-4 pb-10 text-xl lg:text-2xl'>{activity.title}</h2>
        <form onSubmit={handleBookNow}>
          {error && <p className='text-center pb-4 text-red-700 text-xl'>{error}</p>}
          <div className='grid sm:grid-cols-2 gap-3'>
            <div>
              <Field label={'Name'} required>
                <input className={inputClass} required type="text" name='name' value={form.name} onChange={handleChange} />
              </Field>

            </div>
            <div>
              <Field label={'Email'} required>
                <input type="email" required name="email" value={form.email} onChange={handleChange} className={inputClass} />
              </Field>
            </div>
           
          </div>

          <div className='grid sm:grid-cols-2 gap-3'>
            <div>
              <Field label={'Activity Date'} required>
                <input type="date"
                  min={today}
                  required
                  name="activityDate" value={form.activityDate} onChange={handleChange} className={inputClass} />
              </Field>
            </div>
             <div>
              <Field label={'Number'} required>
                <input type="tel" required name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
              </Field>
            </div>
             
          </div>
          <div>
            <div>
              <Field label={'Address'} required>
                <textarea required name="address" value={form.address} onChange={handleChange} className={`${inputClass} resize-none`} placeholder='Full address' rows="6"></textarea>
              </Field>
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
             <div className='flex text-secondary font-bold justify-center items-center gap-12' >
                <div
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      person: Math.max(1, prev.person - 1),
                    }))
                  }
                  className="p-4 rounded-full cursor-pointer select-none"
                >
                <Minus/>
                </div>
                <div className='w-10 text-center select-none text-xl'>
                  {form.person}
                </div>

                <div onClick={()=> setForm((prev) => (
                  {...prev,person:prev.person + 1}
                )) }
                className="p-4 rounded-full cursor-pointer select-none"
                >
                  <Plus/>
                </div>
              </div>
                <div className='text-center bg-gray-200 shadow-2xs border border-secondary rounded-3xl p-5'>
              <div className='flex justify-between gap-5 items-center'>
                <p>Subtoal :</p>


                <p className='text-sm text-secondary'>{activity.price * form.person} INR/ {form.person} person</p>


              </div>
              <div className='flex justify-between gap-5 items-center'>
                <p>Tex :</p>
                <p className='text-gray-800 text-[12px]'>18% GST</p>


                <p className='text-sm text-secondary'>{activity.price * form.person * 18 / 100} GST </p>


              </div>
              <div className='flex justify-between gap-5 items-center'>
                <p>Total :</p>

                <p className='text-sm text-secondary'>{activity.price * form.person + activity.price * form.person * 18 / 100}</p>


              </div>


            </div>
          </div>
          <div className='text-center mt-3'>
          

            <Button disabled={isPanding} type="submit" className={'sm:text-2xl py-6 px-8 mt-5 '} >{isPanding ? 'Booking...' : 'Book Now'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}



export default ActivityBooking
