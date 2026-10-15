import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faq =  [
  {
    "question": "What is the difference between Hajj and Umrah?",
    "answer": "Hajj is an obligatory pilgrimage for Muslims who meet the required conditions, and it takes place during specific dates in the Islamic month of Dhul Hijjah. Umrah is a pilgrimage that can generally be performed at different times of the year, subject to applicable regulations. The rituals, duration, and travel arrangements differ. Nyla Travels can help you understand the travel arrangements for either journey."
  },
  {
    "question": "What services does Nyla Travels offer for Hajj and Umrah?",
    "answer": "Nyla Travels offers travel assistance for services such as flight bookings, hotel accommodation, visa-related guidance, airport transfers, and Hajj or Umrah travel packages, depending on availability. Our aim is to help travellers organise their journey with greater clarity and convenience. The exact services included in a package will be explained before booking."
  },
  {
    "question": "What documents are required for an Umrah trip?",
    "answer": "Requirements may vary according to your nationality, visa type, and current Saudi Arabian regulations. Travellers may need a valid passport, the appropriate visa or travel authorisation, confirmed travel details, and any additional documents required by the authorities. Please contact our team before booking so that the current requirements can be checked for your situation."
  },
  {
    "question": "How can I book an Umrah package with Nyla Travels?",
    "answer": "You can contact Nyla Travels through our website or WhatsApp to discuss your preferred travel dates, departure city, number of travellers, and budget. Our team can help you explore available package options and explain the accommodation, flights, transfers, and other included services. Once you review the itinerary, price, terms, and availability, you can proceed with the booking and payment according to the agreed process."
  },
  {
    "question": "What is included in an Umrah package?",
    "answer": "Package inclusions depend on the option you select. Some packages may include return flights, hotel accommodation in Makkah and Madinah, airport transfers, and visa assistance. Other services may be available separately. Before confirming your booking, check the itinerary for hotel names or categories, room arrangements, meal plans, transport, baggage conditions, and exclusions."
  },
  {
    "question": "How much does an Umrah package cost?",
    "answer": "The cost depends on your departure city, travel dates, length of stay, airline, hotel category, room sharing arrangement, and included services. Prices may also change with seasonal demand and availability. Contact Nyla Travels with your travel dates, number of travellers, and preferred budget to request a suitable quotation. Always confirm the final price and inclusions before making a payment."
  },
  {
    "question": "Can Nyla Travels help with hotels in Makkah and Madinah?",
    "answer": "Hotel booking assistance may be available according to your requirements and availability. You can tell us your preferred budget, room type, travel dates, and accommodation preferences. Before booking, ask for the hotel name, location, room occupancy, and walking or transport arrangements to the Haram. Hotel availability and distance should be confirmed for your specific travel dates."
  },
  {
    "question": "Does Nyla Travels provide flight bookings and airport transfers?",
    "answer": "Flight booking and airport transfer assistance may be available depending on your itinerary and selected services. Share your departure airport, preferred dates, passenger details, and arrival plans with our team. Before confirming, review the airline, baggage allowance, ticket conditions, transfer route, vehicle arrangements, and any additional charges."
  },
  {
    "question": "Can I customise my Hajj or Umrah travel package?",
    "answer": "You can contact our team to discuss your preferred travel dates, trip duration, accommodation budget, room sharing, flights, and transfer requirements. Customisation depends on service availability, applicable regulations, and the package options offered at the time. Hajj arrangements may be subject to specific official booking channels and regulations, so availability and eligibility must be checked before any commitment is made."
  },
  {
    "question": "What should I do if I need to change or cancel my booking?",
    "answer": "If your travel plans change, contact Nyla Travels as soon as possible with your booking reference and requested changes. Amendments, cancellations, refunds, and applicable fees depend on the terms of your confirmed booking, airline rules, hotel policies, and visa conditions. Some services may be non-refundable. Please review the cancellation policy before payment and obtain written confirmation of any approved change or refund."
  }
]


function FAQ() {
  return (
     <section className="py-10 bg-white">
            <div className="container mx-auto max-w-6xl px-4">
               
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl text-secondary font-bold">

                            Frequently Asked Questions
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Find answers to common questions about our travel services.
                        </p>
                    </div>
            


                <Accordion
                    type="single"
                    collapsible
                    className="space-y-4 "
                >
                    {faq.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="rounded-2xl border px-6 hover:shadow-md
hover:border-blue-200
transition-all duration-300"
                        >
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>

                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
  )
}

export default FAQ
