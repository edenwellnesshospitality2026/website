import React from "react";
import { CheckCircle } from "lucide-react";
const WhyChoose: React.FC = () => {
  const reasons = [
    {
      title: "Tailored Experiences for Every Traveler",
      description: "Whether you're a family, couple, solo explorer, or wellness enthusiast, Eden offers personalized services and curated experiences to meet your unique travel goals."
    },
    {
      title: "Prime Location in Dehradun Valley",
      description:
        "Eden's idyllic location provides easy access to popular Himalayan towns while offering serene, private luxury away from the bustle.",
    },
    {
      title: "Sustainable Luxury with “Fresh from Farm” Dining",
      description:
        "Our commitment to sustainability means every meal is crafted from fresh, organic ingredients sourced locally, reflecting our dedication to health and the environment.",
    },
    {
      title: "Comprehensive Hospitality Services",
      description:
        "Enjoy seamless concierge assistance, meticulous housekeeping, and 24/7 medical support ensuring a worry-free stay.",
    },
  ];
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
<div className="rounded-2xl overflow-hidden shadow-xl">
  <iframe
    className="w-full h-[250px] md:h-[400px] object-cover"
    src="https://www.youtube.com/embed/VI5nh8qqfgE?autoplay=1&mute=1&loop=1&playlist=VI5nh8qqfgE&controls=0&showinfo=0&modestbranding=1&rel=0"
    title="EDEN WELLNESS & HOSPITALITY - Where your mind checks in before your luggage."
    allow="autoplay; encrypted-media"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>




            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-eden-accent/30 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-eden-light rounded-lg -z-10"></div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
              Why Choose Eden Wellness Hospitality for Your Next Getaway?
            </h2>
            <div className="w-20 h-1 bg-eden mb-6"></div>

            <p className="text-eden-text mb-8 italic">
              Set in the quiet hills of Dehradun, Here, mornings are slow, the
              air is fresh, and the backdrop of mountains makes everyday feel
              like a retreat.
            </p>

            <ul className="space-y-6">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 text-eden mr-4">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-eden-dark mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-eden-text">{reason.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChoose;
