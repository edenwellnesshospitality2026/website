import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is Eden Wellness & Hospitality?",
      answer:
        "Eden Wellness & Hospitality offers premium, wellness-oriented stays designed especially for seniors and their families. Located in the serene hills of Dehradun, Eden provides fully furnished Eden Haven, Eden Residence, and Eden Grand apartments with access to amenities like a spa, yoga, gym, jacuzzi, and medical services.",
    },
    {
      question: "Who can book a stay at Eden?",
      answer:
        "While Eden is tailored for seniors aged 50+, we welcome families, caregivers, and companions who value wellness living. Whether you're traveling with parents, recovering post-surgery, or simply seeking a peaceful vacation you're welcome here.",
    },
    {
      question: "What types of accommodations are available?",
      answer: (
        <div>
          <p className="mb-3">We offer:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Eden Haven</strong> – Ideal for solo guests or
                couples
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Eden Residence</strong> – Great for short- to mid-term stays
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Eden Grand</strong> – Perfect for families or guests
                needing more space
              </span>
            </li>
          </ul>
          <p className="mt-3">
            All units are fully serviced, senior-friendly, and elegantly
            furnished.
          </p>
        </div>
      ),
    },
    {
      question: "Can I book for short stays, or is it only long-term?",
      answer:
        "You can book short stays, long stays, or get a customized duration. Whether it's a weekend, a month, or longer, we tailor the experience based on your needs.",
    },
    {
      question: "What wellness amenities are included with the stay?",
      answer: (
        <div>
          <p className="mb-3">Guests enjoy access to:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Rooftop infinity swimming pool</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Jacuzzi, steam room, and sauna</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Yoga & meditation studio</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Spa and therapy rooms</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Fully-equipped gym</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Recreational terrace</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Access to on-call medical support</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Is Eden wheelchair accessible and senior-safe?",
      answer:
        "Yes. All apartments, common areas, and facilities are wheelchair-friendly with thoughtful design features like anti-slip flooring, grab bars, and elevator access, ensuring a safe, comfortable experience for every guest.",
    },
    {
      question: "What is the cancellation and refund policy?",
      answer: (
        <div>
          <p className="mb-3">
            At Eden Wellness & Hospitality, we offer a fair and transparent
            cancellation policy:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>100% Refund:</strong> If the reservation is cancelled at
                least 48 hours before the scheduled check-in time (12:00 noon on
                arrival date).
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>No Refund:</strong> If the cancellation is made less
                than 48 hours before check-in or in case of a no-show.
              </span>
            </li>
          </ul>
          <p className="mt-3">
            Refunds (where applicable) are processed within 7–10 business days
            to the original mode of payment.
          </p>
        </div>
      ),
    },
    {
      question: "Where is Eden located and how do I get there?",
      answer:
        "We're located at: Khasra 39 & 40, Near Vaibhav Farms, Purkul Road, Bhagwantpur, Dehradun – 248009, Uttarakhand, India. Just a short drive from Rajpur Road and well-connected by local transport, cabs, and intercity taxis.",
    },
    {
      question: "Are group or community activities offered at Eden?",
      answer: (
        <div>
          <p className="mb-3">
            Yes. We periodically organize light social activities like:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Wellness workshops</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Movie nights</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Guided nature walks</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Guest speaker sessions</span>
            </li>
          </ul>
          <p className="mt-3">
            These are optional and designed to help guests socialize in a calm,
            enriching environment.
          </p>
        </div>
      ),
    },
    {
      question: "Is there parking available for guests or visitors?",
      answer:
        "Yes, we offer designated parking spaces for both short-term and long-term guests. Visitor parking is also available on prior request.",
    },
    {
      question: "Can I extend my stay after checking in?",
      answer:
        "Yes, subject to availability. Please inform our front desk or guest services team at least 24 hours in advance if you'd like to extend your stay, and we'll do our best to accommodate you.",
    },
    {
      question: "Can international guests book a stay at Eden?",
      answer:
        "Yes. International guests are welcome at Eden. We recommend informing us in advance for any special requirements related to meals, climate adjustments, or airport assistance.",
    },
    {
      question: "Are there discounts for longer stays or multiple bookings?",
      answer: (
        <div>
          <p className="mb-3">Yes. We offer special rates for:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Long-term bookings (7 days or more)</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Multiple apartment bookings</span>
            </li>
          </ul>
          <p className="mt-3">
            Please contact our reservations team to discuss a tailored package.
          </p>
        </div>
      ),
    },
    {
      question: "Are pets allowed at Eden?",
      answer: (
        <div>
          <p className="mb-3">
            Yes, pets are allowed at Eden Wellness & Hospitality, but with a few
            important conditions to ensure comfort and safety for all residents:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Advance notice is required at the time of booking</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                A pet fee will be charged based on the type, size, and duration
                of stay
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                Guests must bring their pet's bedding, food, and essentials
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                Only well-behaved and house-trained pets are permitted
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                Pets are not allowed in shared wellness areas (pool, spa, yoga
                studio)
              </span>
            </li>
          </ul>
          <p className="mt-3">
            We welcome pets as part of your family, but also prioritize a calm,
            allergy-conscious environment suited for senior guests.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
          <p className="text-eden-text">
            Find answers to commonly asked questions about Eden Wellness &
            Hospitality's accommodations and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-eden-light/50 rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-serif text-eden-dark hover:text-eden py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-eden-text pt-2 pb-4">
                  {typeof faq.answer === "string" ? faq.answer : faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
