'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import TestimonialCard from '@/components/home/TeastimonialCard';
import { testimonials } from "@/components/data/testimonial";
import { motion } from "motion/react";

export default function Testimonials() {
  return (
    <section className="overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center">
          <h2 className="text-4xl text-secondary font-bold animation-">
            What Our Travelers Say
          </h2>

          <p className="mt-4 text-muted-foreground">
            Hear from travelers who trusted Nyla Travels.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard
                  testimonial={testimonial}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-5 md:left-5 md:size-12 rounded-full shadow-lg" />
          <CarouselNext className="-right-5 md:right-5 md:  size-12 rounded-full shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
}




