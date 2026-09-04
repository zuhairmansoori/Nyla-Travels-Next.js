'use client'

import React from 'react'
import ActivityGallery from '../ActivityGallery'
import { Button } from '@/components/ui/button'


function CarDeatls({ car }) {
    const handleWhatssapp = () => {
  const msg = `Hello, I want to book a car.

🚗 Car: ${car.carName}
⛽ Fuel: ${car.fuelType}
🚪 Doors: ${car.doors}

💰 Per Day: ₹${car?.rentDay?.price} (${car?.rentDay?.km} Km)
💰 Per Week: ₹${car?.rentWeek?.price} (${car?.rentWeek?.km} Km)

💵 Deposit: ₹${car.deposit}

Please let me know about the availability and booking process.`;

  const phoneNumber = "919213909942"; // apna WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;

  window.open(whatsappUrl, "_blank");
};

    const classNameDetails = 'flex justify-between items-center border-b border-gray-600 pb-4'
    const cellClass = "border-b border-r w-1/3 border-gray-400 border-dashed p-3 py-3 text-gray-600 text-sm text-center"
    const cellhead = "border-b border-r border-gray-400 border-dashed p-2 py-5 font-bold text-[15px]"
    return (
        <div className="max-w-screen lg:max-w-7xl mx-auto px-4 py-10">
            <section>
                <div>
                    <div className='mb-10'>
                         <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-3">
                        {car.categorie}
                    </span>
                        <h1 className='text-3xl font-bold  text-secondary'>{car.carName}</h1>
                    </div>
                   
                    <div>
                        <ActivityGallery images={car.imageUrl} title={car.carName}/>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-10 mt-10'>
                        <div className='col-span-2 space-y-10'>
                            <section>
                                  <h2 className='font-bold'>Overview</h2>
                                <p className="text-gray-600 text-[17px] leading-relaxed whitespace-pre-line">{car.description}</p>
                            </section>
                            <section className=' mt-10 shadow-2xs shadow-gray-300  rounded-2xl  p-10 bg-white'>
                            <h2 className='pb-5 text-2xl font-bold'>Car Details</h2>
                                <div className='grid gap-5'>
                                    <div className='flex justify-between items-center border-b border-gray-600 pb-4'>
                                        <h3>Car Model</h3>
                                        <p className='text-gray-600'>{car.carModel}</p>
                                    </div>
                                    <div className={classNameDetails}>
                                        <h3>Doors</h3>
                                        <p className='text-gray-600'>{car.doors}</p>
                                    </div>
                                    <div className={classNameDetails}>
                                        <h3>Fuel Type</h3>
                                        <p className='text-gray-600'>{car.fuelType.toUpperCase()}</p>
                                    </div>
                                    <div className={classNameDetails}>
                                        <h3>Air Bags</h3>
                                        <p className='text-gray-600'> {car.airbag}</p>
                                    </div>
                                    <div className={classNameDetails}>
                                        <h3>Transmission</h3>
                                        <p className='text-gray-600'>{car.transmission.toUpperCase()}</p>
                                    </div>
                                    <div className={classNameDetails}>
                                        <h3>Passenger</h3>
                                        <p className='text-gray-600'>{car.passengers}</p>
                                    </div>
                                     <div className={classNameDetails}>
                                        <h3>Body Type</h3>
                                        <p className='text-gray-600'>{car.bodyType}</p>
                                    </div>
                                </div>
                            </section>
                            <section className=' mt-10  rounded-2xl  p-10 bg-white'>
                                  <h2 className='pb-5 text-2xl font-bold'>Car Features</h2>
                                <ul className='grid gap-4'>
                                     {car?.features?.map((fet)=>(
                                     <li
                                            key={fet}
                                            className="flex items-start gap-5 text-[17px] text-gray-700"
                                        >
                                            <span className="mt-0.5 text-blue-600">✦</span>
                                            {fet}
                                        </li>
                                ))}
                                </ul>
                               
                            </section>
                          
                        </div>
                        <section className='col-span-1'>
                                <div className='bg-white w-full p-5 shadow-2xs shadow-gray-300 rounded-xl sticky -top-60  lg:-top-30'>
                                    <div>
                                        <h3 className='truncate text-xl text-primary font-semibold'>Pricing</h3>
                                    </div>
                                    <div>
                                        <table className="w-full border-collapse" >
                                       <thead>
                                         <tr>
                                            <th className={`${cellhead} `}>Rental Period</th>
                                            <th className={cellhead}>Mileage Limit</th>
                                            <th className={`${cellhead} border-r-0`}>Rental Cost</th>
                                         </tr>
                                       </thead>
                                       <tbody>
                                         <tr>
                                            <td className={cellClass}>Day-basis</td>
                                            <td className={cellClass}>{car.rentDay.km}</td>
                                            <td className={`${cellClass} border-r-0`}>{car.rentDay.price}  INR</td>
                                         </tr>
                                         <tr>
                                            <td className={cellClass}>Weekly</td>
                                            <td className={cellClass}>{car.rentWeek.km}</td>
                                            <td className={`${cellClass} border-r-0`}>{car.rentWeek.price} INR</td>
                                         </tr>
                                       </tbody>
                                        </table>
                                    </div>
                                    <div className='flex justify-between items-center bg-emerald-200 p-3 rounded-2xl my-5'>
                                        <h4 className='text-[12px]'>Booking Price (60% Refunadable if cancel):</h4>
                                        <p className='text-primary text-sm'>12000 INR</p>
                                    </div>
                                    <div className='flex flex-col justify-between items-center gap-5 '>
                                        <Button className={'w-full text-xl py-6'}>Book Now</Button>
                                        <Button onClick={handleWhatssapp} className={'w-full text-xl py-6 bg-green-500'}>Enquiry on Whatsapp</Button>
                                    </div>
                                </div>
                                <div className='bg-white p-5 shadow-2xs shadow-gray-300 rounded-xl my-5'>
                                    <div>
                                         <h3 className='truncate text-xl text-primary font-semibold'>Advance payment</h3>
                                         <p className='text-gray-800 text-sm'>(Refundable based upon damage/ lost)</p>
                                    </div>
                                    <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Security Deposit :</h4>
                                        <p className='text-secondary'>{car.deposit} INR</p>
                                    </div>
                                   
                                </div>
                                <div className='bg-white p-5 shadow-2xs shadow-gray-300 rounded-xl my-5'>
                                    <div>
                                         <h3 className='truncate text-xl text-primary font-semibold'>Additional charges</h3>
                                         <p className='text-gray-800 text-sm'>(Will be charged on car Return)</p>
                                    </div>
                                     <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Additional mileage charge :</h4>
                                        <p className='text-secondary'>5000 INR /Km</p>
                                    </div>
                                      <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Salik / Toll Charges :</h4>
                                        <p className='text-secondary'>125 INR</p>
                                    </div>
                                     <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Excess Claim :</h4>
                                        <p className='text-secondary'>based on damage/lost</p>
                                    </div>
                                </div>
                                 <div className='bg-white shadow-2xs shadow-gray-300 p-5 rounded-xl my-5'>
                                    <div>
                                         <h3 className='truncate text-xl text-primary font-semibold'>Requirements</h3>
                                    </div>
                                     <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Minimum Driver’s Age :</h4>
                                        <p className='text-gray-600'>21 years</p>
                                    </div>
                                      <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>24/7 Service :</h4>
                                        <p className='text-gray-600'>Valid</p>
                                    </div>
                                     <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Free Delivery :</h4>
                                        <p className='text-gray-600'>Valid</p>
                                    </div>
                                    <div className='flex justify-between items-center border-b mt-5 pb-5'>
                                        <h4>Valid ID or Passport:</h4>
                                        <p className='text-gray-600'>6 Months</p>
                                    </div>
                                </div>
                            </section>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default CarDeatls
