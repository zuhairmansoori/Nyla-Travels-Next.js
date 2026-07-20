"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteCarAction } from "@/Action/cars";

export default function CarTable({ cars }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
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
                        src={car?.imageUrl?.url}
                        alt={car.CarName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{car.CarName}</span>
                  </div>
                </td>

                <td className="p-3 whitespace-nowrap">{car.Doors}</td>

                <td className="p-3 whitespace-nowrap">{car.FuelType}</td>

                <td className="p-3">
                  <span className="font-medium">
                    ₹{car?.Rentday?.price}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {car?.Rentday?.Km}
                  </span>
                </td>

                <td className="p-3">
                  <span className="font-medium">
                    ₹{car?.Rentweek?.price}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {car?.Rentweek?.Km}
                  </span>
                </td>

                <td className="p-3 font-medium">₹{car.Deposit}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/cars/${car._id}`}>
                      <Button size="sm">Update</Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteCarAction(car._id)}
                    >
                      Delete
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