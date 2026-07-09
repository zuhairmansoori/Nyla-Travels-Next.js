import MdkalimMessage from '@/components/about/MdkalimMessage'
import AirportAssistant from '@/components/airport-assistant/Airport-Assistant'
import AirportServices from '@/components/airport-assistant/AirportService'
import Hero from '@/components/airport-assistant/Hero'
import HowItWorks from '@/components/airport-assistant/HowItWorks'
import WhyChooseUs from '@/components/airport-assistant/WhyChooseUs'
import WhoCanUseService from '@/components/airport-assistant/WhoCanUseService'
import IncludedServices from '@/components/airport-assistant/IncludedServices'
import AssistanceFormSection from '@/components/airport-assistant/AssistanceFormSection'
import Faq from '@/components/airport-assistant/Faq'

export default function page(){
    return(
        <div>
         
            <Hero/>
            <AirportAssistant/>
            <AirportServices/>
            <WhyChooseUs/>
            <WhoCanUseService/>
            <IncludedServices/>
            <HowItWorks/>
            <AssistanceFormSection/>
            <MdkalimMessage/>
            <Faq/>
        </div>
    )
}