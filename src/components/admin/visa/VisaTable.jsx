"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteVisa } from "@/Action/visa";
import Image from "next/image";

export default function VisaTable({ visas }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Country</th>
            <th className="p-3 text-left">Visa Type</th>
            <th className="p-3 text-left">Stay</th>
            <th className="p-3 text-left">Validity</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {visas.length > 0 ? (
            visas.map((visa) => (
              <tr
                key={visa._id}
                className="border-t hover:bg-gray-50 transition"
              >
               <td className="p-3 whitespace-nowrap">
                                 <div className="flex items-center gap-3">
                                   <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0 border">
                                     <Image
                                       src={visa?.imageUrl?.url}
                                       alt={visa.country}
                                       fill
                                       className="object-cover"
                                     />
                                   </div>
                                   <span className="font-medium">{visa.country}</span>
                                 </div>
                               </td>

                <td className="p-3 whitespace-nowrap">
                  {visa.visaType.join(", ")}
                </td>

                <td className="p-3">{visa.lengthOfStay}</td>

                <td className="p-3">{visa.validity}</td>

                <td className="p-3 font-medium">₹{visa.price}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/visa/${visa._id}`}>
                      <Button size="sm">Update</Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => DeleteVisa(visa._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="p-5 text-center text-gray-500"
              >
                No Visa Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}