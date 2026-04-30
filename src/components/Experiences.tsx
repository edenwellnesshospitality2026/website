"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceProps {
  img: string;
  title: string;
  description: string;
  button: string;
  reverse?: boolean;
}

const ExperienceBlock: React.FC<ExperienceProps> = ({
  img,
  title,
  description,
  button,
  reverse = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-10`}
    >
      <div className="md:w-1/2">
        <img
          src={img}
          alt={title}
          width={600}
          height={400}
          className="rounded-2xl shadow-sm object-cover w-full h-[300px] md:h-[400px] transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
      <div className="md:w-1/2 text-left">
        <h3 className="text-2xl md:text-3xl font-serif text-eden-dark mb-3">
          {title}
        </h3>
        <p className="text-eden-text mb-6">{description}</p>
        {/* <button className="px-6 py-3 bg-eden-light/50 text-eden-dark rounded-lg font-medium hover:bg-eden hover:text-white transition-all duration-300">
          {button}
        </button> */}
      </div>
    </motion.div>
  );
};

const EdenExperiences: React.FC = () => {
  const experiences = [
    {
      title: "Indulge in Holistic Wellness & Spa Treatments",
      description:
        "Rejuvenate your mind and body with our full-service Spa and Salon Packages, including traditional massages, rejuvenating facials, and expert-led daily yoga and meditation classes. Our wellness programs blend ancient practices with modern therapies for lasting well-being.",
      img: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-spa.jpg",
      button: "Book a Spa Session",
    },
    {
      title: "Savor Gourmet Delights at Nouveau Table Restaurant",
      description:
        "Experience farm-to-table cuisine curated by top chefs in our 9th-floor restaurant overlooking the majestic Himalayas. Our menu features global flavors crafted with locally sourced, sustainable ingredients for an unforgettable dining experience.",
      img: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-resturant?updatedAt=1763400287475",
      button: "Explore Menu",
      reverse: true,
    },
    {
      title: "Relax and Socialize at The Nook Café & Community Spaces",
      description:
        "Unwind with artisanal coffee and fresh bakes in a cozy atmosphere designed for connection. The Nook Café is perfect for casual gatherings, creative brainstorming, or peaceful moments with a book.",
      img: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-bakery-nook-cafe?updatedAt=1763400266284",
      button: "Visit The Nook Café",
    },
    {
      title: "Explore Outdoor Adventures & Curated Day Trips",
      description:
        "Embrace nature with guided trekking, river rafting, and cultural tours to nearby spiritual and scenic destinations including Mussoorie, Rishikesh, and Haridwar. Perfect for adventure seekers and wellness travelers alike.",
      img: "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-scenic-view?updatedAt=1763400310434",
      button: "Discover Experiences",
      reverse: true,
    },
  ];

  return (
    <section
      id="experiences"
      className="section-padding bg-eden-beige/30 font-sans"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-eden-dark mb-4">
            Elevated Experiences: Wellness, Dining & Discovery
          </h2>
          <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
          <p className="text-eden-text text-lg">
            Immerse yourself in curated moments of rejuvenation, indulgence, and
            exploration — all within the Eden way of living.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <ExperienceBlock key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EdenExperiences;
