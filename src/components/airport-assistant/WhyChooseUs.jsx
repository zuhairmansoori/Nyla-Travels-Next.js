import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import HeadingMotion from "../HeadingMotion";

const features = [
  "Professional airport representatives available 24/7",
  "Personalized assistance from arrival to departure",
  "Fast, safe and hassle-free airport experience",
  "Support for individuals, families and business travelers",
  "Available at major international and domestic airports",
  "Reliable service with dedicated customer support",
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative">
            <Image
              src="/AirportService.png"
              alt="Airport Assistance"
              width={500}
              height={550}
              className="w-full h-[550px] object-cover object-left rounded-3xl shadow-2xl"
            />
                  <HeadingMotion> 
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg px-6 py-4">
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-gray-600 text-sm">
               Airport Assistance Available
               
              </p>
            </div>
            </HeadingMotion>
          </div>

          {/* Content */}
          <div>
                   <HeadingMotion>  <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              Why Choose Us
            </span></HeadingMotion>
          
                      <HeadingMotion> <h2 className="mt-5 text-4xl font-bold leading-tight">
              Enjoy a Smooth & Stress-Free Airport Experience
            </h2></HeadingMotion>
           
                <HeadingMotion>  <p className="mt-6 text-gray-600 leading-8">
              Our Airport Assistance service is designed to make every journey
              easier and more comfortable. Whether you&apos;re arriving, departing,
              or connecting through an airport, our experienced representatives
              provide dedicated support every step of the way.
            </p></HeadingMotion>
          

            <div className="mt-8 grid sm:grid-cols-2 gap-5">

              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                <CheckCircle2
                    className="text-primary mt-1 shrink-0"
                    size={20}
                  />

                  <p className="text-gray-700">
                    {item}
                  </p>
               
                </div>
              ))}

            </div>
                 <HeadingMotion>  <a
              href="#airport-assistance-form"
              className="inline-flex mt-10 rounded-xl bg-primary px-7 py-4 font-semibold text-white hover:opacity-90 transition"
            >
              Book Airport Assistance
            </a></HeadingMotion>
          

          </div>

        </div>

      </div>
    </section>
  );
}