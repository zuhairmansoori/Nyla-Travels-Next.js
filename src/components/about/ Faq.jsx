export const aboutFaqs = [
    {
        id: 1,
        question: "What services does Nyla Travels provide?",
        answer:
            "Nyla Travels offers a complete range of travel and business support services, including holiday packages, flight bookings, hotel reservations, visa assistance, airport transfers, travel insurance guidance, and customized travel planning. We also provide document assistance, business support, and real estate guidance for clients looking to establish themselves in Dubai."
    },
    {
        id: 2,
        question: "Why should I choose Nyla Travels?",
        answer:
            "We focus on delivering personalized travel solutions with transparent pricing, reliable support, and exceptional customer service. Every trip is planned according to your budget, preferences, and travel goals to ensure a smooth and memorable experience from start to finish."
    },
    {
        id: 3,
        question: "Do you provide visa assistance?",
        answer:
            "Yes. We assist with various visa services by guiding you through the required documentation, application process, and travel requirements. Our team ensures that your paperwork is handled efficiently to make your visa application process as smooth as possible."
    },
    {
        id: 4,
        question: "Can you help with business opportunities in Dubai?",
        answer:
            "Yes. Nyla Travels supports entrepreneurs and professionals who are interested in exploring business opportunities in Dubai. We provide guidance, connect clients with trusted resources, and assist throughout the initial process to help them move forward with confidence."
    },
    {
        id: 5,
        question: "Do you offer real estate guidance in Dubai?",
        answer:
            "Yes. We help clients connect with trusted real estate professionals in Dubai for residential and commercial property requirements. Whether you're looking to invest, rent, or purchase property, we provide reliable guidance based on your needs."
    },
    {
        id: 6,
        question: "Can I customize my holiday package?",
        answer:
            "Absolutely. Every traveler has different preferences, so we create customized travel packages based on your destination, travel dates, accommodation preferences, sightseeing plans, and budget to give you a personalized travel experience."
    },
    {
        id: 7,
        question: "Do you assist first-time international travelers?",
        answer:
            "Yes. We understand that traveling abroad for the first time can be overwhelming. Our team provides complete guidance on travel planning, required documents, visa procedures, itinerary planning, and essential travel tips so you can travel with confidence."
    },
    {
        id: 8,
        question: "How does Nyla Travels ensure customer satisfaction?",
        answer:
            "Customer satisfaction is at the heart of everything we do. We maintain clear communication, provide honest guidance, work with trusted travel partners, and offer dedicated support before, during, and after your journey to ensure the best possible experience."
    },
    {
        id: 9,
        question: "Can Nyla Travels help with document assistance in Dubai?",
        answer:
            "Yes. We provide guidance and assistance for various document-related requirements in Dubai by helping clients understand the process and connecting them with reliable service providers. Our goal is to make documentation simple, accurate, and hassle-free."
    },
    {
        id: 10,
        question: "How can I contact Nyla Travels?",
        answer:
            "You can reach us through our website, phone, WhatsApp, or email. Our friendly team is always ready to answer your questions, discuss your travel plans, and help you choose the right services based on your requirements."
    }
];

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


import HeadingMotion from "../HeadingMotion";

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
                    {aboutFaqs.map((faq, index) => (
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