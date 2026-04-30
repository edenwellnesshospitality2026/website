
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Accommodations from '@/components/Accommodations';
import Amenities from '@/components/Amenities';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Experiences from "@/components/Experiences"

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://pcrleaefqjoijrhydhis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmxlYWVmcWpvaWpyaHlkaGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTEyNzQsImV4cCI6MjA2NDc4NzI3NH0.YAU_W5cL1Y1xLJpoOCnQYGYdH4IFxwa-vOvku8l1_zU"
);

const Index = () => {


  async function SupabaseActive() {
    let { data: Contact, error } = await supabase
    .from('Contact Us')
    .select('id')
  }


  useEffect(()=>{
    let url =(window.location.href).split('#')[1];
    SupabaseActive()
    if(url){
      const element = document.getElementById(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Accommodations />
        <Experiences />
        <Amenities />
        <WhyChoose />
        <Testimonials />
        <Gallery />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
