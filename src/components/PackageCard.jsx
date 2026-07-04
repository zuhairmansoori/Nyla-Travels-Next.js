'use client'
import Image from "next/image";
import { Clock3 } from "lucide-react";
import { div } from "motion/react-client";
import Link from "next/link";
import { motion } from "motion/react";

export default function PackageCard({ pkg }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes='true'
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {pkg.duration && <div className="absolute bottom-0 right-0 bg-secondary p-1 pl-2 rounded rounded-br-none">
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-200">
            <span>{pkg.duration}</span>
          </div>
        </div>}
      </div>

      <ul className="space-y-2 flex justify-center items-baseline mt-4 gap-1.5 sm:gap-4 list-none">
        {pkg.highlights.map((highlight) => (
          <div className="p-2 bg-gray-200/40 rounded border border-gray-200 hover:bg-gray-300 " key={highlight}>
            <li
              key={highlight}
              className="flex items-center gap-2 text-[10px] md:text-sm "
            >
              {highlight}
            </li>
          </div>

        ))}
      </ul>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold">
            {pkg.name}
          </h3>


        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {pkg.description}
        </p>



        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Starting From
            </p>

            <p className="text-2xl font-bold text-primary">
              {pkg.price}
            </p>
          </div>

          <button className="rounded bg-secondary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <Link href={`/packages/${pkg.name}`}>View details</Link>
          </button>
        </div>
      </div>
    </motion.div>
  );
}