"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does it work?",
      answer:
        "Our platform connects job seekers with opportunities tailored to their skills and location. By filtering job listings based on your preferences, we streamline the application process. Simply enter your criteria and explore the best matches.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes, it's completely free for job seekers. You can search, apply, and manage your applications without any charges. We believe in providing accessible job opportunities for everyone.",
    },
    {
      question: "How to apply?",
      answer:
        "Once you find a position that interests you, click the application link and follow the prompts. Ensure your resume is updated to increase your chances of success.",
    },
    {
      question: "Can I save jobs?",
      answer:
        "Absolutely! You can save job listings to review later. This feature helps you keep track of opportunities that catch your eye, making your job search more organized.",
    },
    {
      question: "How to contact Support?",
      answer:
        "If you have any questions or need assistance, our support team is here to help. You can reach out via our contact form or email us directly, and we'll respond as soon as possible.",
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to your most pressing questions about our job platform and its features.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-background/50 animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
