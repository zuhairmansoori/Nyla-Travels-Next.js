import Hero from "@/components/home/Hero";
import Nav from "@/components/Nav";

import WhyNyla from "@/components/home/WhyNyla";
import TopAttraction from "@/components/home/TopAttraction";
import PopularPackages from "@/components/home/PopularPackages";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Customise from "@/components/home/Customise";

export default function Home() {
  return (
   <>
   <Nav/>
   <Hero/>
   <TopAttraction/>
   <PopularPackages/>
   <WhyNyla/>
   <Testimonials/>
   <FAQ/>
   <Customise/>
   </>
  );
}
