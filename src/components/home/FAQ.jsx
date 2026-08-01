import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/components/data/faqs";
import HeadingMotion from "../HeadingMotion";

export default function FAQ() {
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