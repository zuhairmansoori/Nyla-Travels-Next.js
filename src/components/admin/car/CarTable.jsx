"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteCarAction } from "@/Action/cars";
import { useState } from "react";

export default function CarTable({ cars }) {
   const [pending, setPending] = useState(false)
   const [message,setMesaage]=useState(null)

   async function handledelete(id) {
    setPending(true)
    setMesaage(null)
       try {
          const deletecar = await deleteCarAction(id)
          if(deletecar.success) {
            return setMesaage('car seccsessfully deleted')
          }
          setPending(false)
       } catch (error) {
           return setMesaage('somthing went wrong')
           setPending(false)
       } finally{
        setPending(fasle)
       }
   }

  return (
    <div className="overflow-x-auto rounded-lg border">
      {message && (<p className="text-red-600" >{message}</p>)}
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Car</th>
            <th className="p-3 text-left">Doors</th>
            <th className="p-3 text-left">Fuel Type</th>
            <th className="p-3 text-left">Rent / Day</th>
            <th className="p-3 text-left">Rent / Week</th>
            <th className="p-3 text-left">Deposit</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr
                key={car._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0 border">
                      <Image
                        src={car?.imageUrl[0]?.url}
                        alt={car.carName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{car.carName}</span>
                  </div>
                </td>

                <td className="p-3 whitespace-nowrap">{car.doors}</td>

                <td className="p-3 whitespace-nowrap">{car.fuelType}</td>

                <td className="p-3">
                  <span className="font-medium">
                    ₹{car?.rentDay?.price}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {car?.rentDay?.km}/km
                  </span>
                </td>

                <td className="p-3">
                  <span className="font-medium">
                    ₹{car?.rentWeek?.price}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {car?.rentWeek?.km}/km
                  </span>
                </td>

                <td className="p-3 font-medium">₹{car.deposit}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/cars/${car.slug}/edit`}>
                      <Button size="sm">Update</Button>
                    </Link>

                    <Button
                    disabled={pending}
                      size="sm"
                      variant="destructive"
                      onClick={() => handledelete(car._id)}
                    >
                    {pending ? 'Deleting..' : 'Deleted'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-5 text-center text-gray-500">
                No Car Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}