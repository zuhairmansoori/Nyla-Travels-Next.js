import {
  FileText,
  BadgeCheck,
  Users,
  Plane,
} from "lucide-react";

const steps = [
  {
    title: "Submit Your Request",
    description:
      "Complete the Airport Assistance form with your travel details.",
    icon: FileText,
  },
  {
    title: "Booking Confirmation",
    description:
      "Our team contacts you and confirms your airport assistance service.",
    icon: BadgeCheck,
  },
  {
    title: "Meet Our Representative",
    description:
      "A dedicated airport representative will welcome you on arrival or departure.",
    icon: Users,
  },
  {
    title: "Enjoy a Smooth Journey",
    description:
      "Relax while we handle check-in, baggage, immigration and airport guidance.",
    icon: Plane,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            Simple Process
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600">
            Book your airport assistance in just four simple steps.
          </p>
        </div>

        <div className="relative">

          {/* Line */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gray-200"></div>

          <div className="grid lg:grid-cols-4 gap-12 relative">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative text-center">

                  {/* Circle */}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                    <Icon size={28} />
                  </div>

                  {/* Step Number */}
                  <div className="mt-4 text-sm font-bold text-primary">
                    Step {index + 1}
                  </div>

                  <h3 className="mt-2 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}