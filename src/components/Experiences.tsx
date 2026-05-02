"use client";

import React from "react";
import { motion } from "framer-motion";

const WELLNESS_IMG =
  "https://ik.imagekit.io/sxe8qsgazl/edenwellness/eden-spa.jpg";

const EdenExperiences: React.FC = () => {
  return (
    <section
      id="experiences"
      className="section-padding bg-eden-beige/30 font-sans"
    >
      <div className="container-custom max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-eden-dark mb-4">
            Wellness & Spa
          </h2>
          <div className="w-20 h-1 bg-eden mx-auto mb-6" />
          <p className="text-eden-text text-lg">
            Holistic care and restorative therapies in a serene setting.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
        >
          <div className="md:w-1/2 w-full shrink-0">
            <img
              src={WELLNESS_IMG}
              alt="Holistic wellness and spa treatments at Eden"
              width={600}
              height={400}
              className="rounded-2xl shadow-sm object-cover w-full h-[300px] md:h-[400px] transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-eden mb-4 tracking-tight">
              Indulge in Holistic Wellness & Spa Treatments
            </h3>
            <p className="text-eden-text leading-relaxed text-base md:text-lg">
              Rejuvenate your mind and body with our full-service Spa and Salon
              Packages, including traditional massages, rejuvenating facials, and
              expert-led daily yoga and meditation classes. Our wellness programs
              blend ancient practices with modern therapies for lasting
              well-being.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EdenExperiences;
