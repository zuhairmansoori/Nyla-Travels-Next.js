'use client'
import React from 'react'
import {
  Plane,
  CalendarCheck,
  Hotel,
  TicketsPlane,
  Headset,
  Globe,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { motion } from 'motion/react';

const benefits = [
  {
    title: "Best Flight Deals",
    icon: Plane,
    description: "Find affordable flights to destinations worldwide.",
  },
  {
    title: "Easy Booking",
    icon: CalendarCheck,
    description: "Book flights, hotels, and packages in minutes.",
  },
  {
    title: "Visa Assistance",
    icon: TicketsPlane,
    description: "Complete support for tourist and business visas.",
  },
  {
    title: "Premium Hotels",
    icon: Hotel,
    description: "Stay in carefully selected hotels and resorts.",
  },
  {
    title: "24/7 Support",
    icon: Headset,
    description: "Our travel experts are always ready to help.",
  },
  {
    title: "Global Destinations",
    icon: Globe,
    description: "Explore amazing destinations across the world.",
  },

];

function WhyNyla() {
  return (
    <div>
      <section className="pt-10 px-4 md:px-20">
        <div className="container mx-auto px-4">
          <div

            className="mx-auto mb-12 max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl text-secondary font-bold">
              Why Choose Nyla Travels
            </motion.h2>
            <p className="mt-4 text-muted-foreground">
              From flight bookings to visa assistance, we make every
              journey smooth, affordable, and unforgettable.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  key={benefit.title}
                  className="group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center justify-center bg-white/80"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground text-center">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyNyla
