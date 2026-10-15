import AboutHajj from "@/components/hajjumrah/AboutHajj"
import FAQ from "@/components/hajjumrah/FAQ"
import HajjUmrahServices from "@/components/hajjumrah/HajjUmrahServices"
import Hero from "@/components/hajjumrah/Hero"
import UmrahPkgs from "@/components/hajjumrah/UmrahPkgs"


function page(){
    return(
        <>
      <Hero/>
      <AboutHajj/>
      <HajjUmrahServices/>
      <UmrahPkgs/>
      <FAQ/>

        </>
    )
}

export default page