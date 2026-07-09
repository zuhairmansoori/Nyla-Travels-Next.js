import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


import HeadingMotion from "../HeadingMotion";

const faqs = [
  {
    question: "What is Meet & Greet Airport Assistance?",
    answer:
      "Meet & Greet Airport Assistance is a premium airport service where our representative welcomes you at the airport and assists with check-in, immigration, security, baggage, and navigation through the terminal."
  },
  {
    question: "Which airports do you provide assistance at?",
    answer:
      "We offer airport assistance at major international and domestic airports across multiple countries. Contact us to confirm availability for your preferred airport."
  },
  {
    question: "Can I book the service for arrivals, departures, or transit?",
    answer:
      "Yes. Our services are available for arriving passengers, departing passengers, and transit travelers requiring seamless airport assistance."
  },
  {
    question: "Is wheelchair assistance available?",
    answer:
      "Yes. Wheelchair assistance can be arranged upon request for elderly passengers, travelers with reduced mobility, or anyone needing additional support."
  },
  {
    question: "How early should I book Airport Assistance?",
    answer:
      "We recommend booking at least 24 to 48 hours before your flight to ensure availability. Last-minute bookings may also be possible depending on the airport."
  },
  {
    question: "Does the service include Fast Track Immigration?",
    answer:
      "Fast Track Immigration is available at selected airports where permitted by local authorities. Availability varies by airport and destination."
  },
  {
    question: "Can I book assistance for elderly passengers or children?",
    answer:
      "Absolutely. Our Airport Assistance service is ideal for senior citizens, children traveling alone, families, first-time travelers, and passengers requiring extra care."
  },
  {
    question: "How do I book Airport Assistance?",
    answer:
      "Simply fill out the booking form with your travel details, preferred assistance type, and contact information. Our team will confirm your booking shortly."
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes. Booking modifications and cancellations are possible based on our cancellation policy and the requested airport's service conditions."
  },
  {
    question: "How will I recognize your airport representative?",
    answer:
      "Our representative will meet you at the designated meeting point holding a personalized name board or will contact you before your arrival with complete meeting instructions."
  }
];


export default function Faq() {
    return (
        <section className="py-10 bg-slate-100">
            <div className="container mx-auto max-w-6xl px-4">
                <HeadingMotion>
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl text-secondary font-bold">

                            Frequently Asked Questions
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Find answers to common questions about our travel services.
                        </p>
                    </div>
                </HeadingMotion>


                <Accordion
                    type="single"
                    collapsible
                    className="space-y-4 "
                >
                    {faqs.map((faq, index) => (
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
    );
}