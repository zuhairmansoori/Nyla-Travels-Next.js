import { Quote, Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="h-full rounded-3xl border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Quote className="mb-4 size-8 text-primary/30" />

      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <p className="mb-6 text-muted-foreground">
        {testimonial.review}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <h4 className="font-semibold">
            {testimonial.name}
          </h4>

          <p className="text-sm text-muted-foreground">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}