"use client";

import Image from "next/image";
import { Fuel, DoorOpen, ShieldCheck, Clock3, Truck } from "lucide-react";

function CardCards({ carsData }) {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {carsData?.map((itm) => (
          <div
            key={itm._id}
            className="group bg-card rounded-3xl overflow-hidden border border-border shadow-[0px_0px_10px_4px_#abaead] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={itm?.imageUrl?.url}
                alt={itm.CarName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* gradient so badges stay readable on any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* For Rent badge */}
              <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full shadow">
                For Rent
              </span>

              {/* Fuel type badge, top right, like the "5D/4N" tag on the package cards */}
              <span className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                {itm.FuelType}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-heading text-primary mb-1">
                {itm.CarName}
              </h2>

              {/* quick specs row, mirrors the pill tags under the package images */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-md">
                  <DoorOpen className="w-3.5 h-3.5" />
                  {itm.Doors} Doors
                </span>
                <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-md">
                  <Fuel className="w-3.5 h-3.5" />
                  {itm.FuelType}
                </span>
              </div>

              {/* pricing */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-accent rounded-xl px-3 py-2.5">
                  <p className="text-[11px] text-muted-foreground mb-0.5">
                    Per Day
                  </p>
                  <p className="text-lg font-bold text-primary leading-tight">
                    ₹{itm?.Rentday?.price}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {itm?.Rentday?.Km}
                  </p>
                </div>
                <div className="bg-accent rounded-xl px-3 py-2.5">
                  <p className="text-[11px] text-muted-foreground mb-0.5">
                    Per Week
                  </p>
                  <p className="text-lg font-bold text-primary leading-tight">
                    ₹{itm?.Rentweek?.price}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {itm?.Rentweek?.Km}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-3 mb-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5 text-secondary" />
                  24/7 Service
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                  Deposit ₹{itm.Deposit}
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-secondary" />
                  Free Delivery
                </span>
              </div>

              <button className="w-full bg-primary hover:bg-secondary text-primary-foreground font-semibold py-2.5 rounded-xl transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardCards;








// import { div } from 'motion/react-client'
// import Image from 'next/image'
// import React from 'react'

// function CardCards({carsData}) {
//   return (
//     <section>
//        <div>
//          {carsData?.map((itm,inx)=>(
//             <div key={itm._id}> 
//                <div>
//                 <Image
//                 src={itm?.imageUrl?.url}
//                 alt={itm.CarName}
//                 width={300}
//                 height={500}
//                 />
//                </div>
//                <div>
//                 <h2>{itm.CarName}</h2>
//                  <div>
//                     <div>
//                         <p>{itm?.Rentday?.price} <span>/ Day</span></p>
//                         <p>{itm?.Rentday?.Km}</p>
//                     </div>
//                     <div>
//                         <p>{itm?.Rentweek?.price} <span>/ Day</span></p>
//                         <p>{itm?.Rentweek?.Km}</p>
//                     </div>
//                  </div>
//                  <div>
//                     <p>{itm.Doors}</p>
//                     <p>{itm.FuelType}</p>
//                  </div>
//                  <div>
//                     <h3>24/7 Service</h3>
//                     <h3>Deposit <span>{itm.Deposit}</span> Rupee</h3>
//                     <h3>Free Delivery</h3>
//                  </div>
//                </div>
//             </div>
//          ))}
//        </div>
//     </section>
//   )
// }

// export default CardCards
