import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";
import { pushToDataLayer } from "@/lib/utils";
import { Phone, Mail, ShieldCheck } from "lucide-react";

// Create a single supabase client for interacting with your database
// Note: this matches the existing lead insertion pattern used elsewhere in the app.
const supabase = createClient(
  "https://pcrleaefqjoijrhydhis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmxlYWVmcWpvaWpyaHlkaGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTEyNzQsImV4cCI6MjA2NDc4NzI3NH0.YAU_W5cL1Y1xLJpoOCnQYGYdH4IFxwa-vOvku8l1_zU"
);

const durationOptions = [
  { value: "30-60", label: "30-60 days" },
  { value: "60-90", label: "60-90 days" },
  { value: "90+", label: "90+ days" },
];

const benefitCards = [
  {
    title: "Stay Like Home, Live in Comfort",
    body: "Elegant studio, 1BHK & 2BHK fully serviced residences — thoughtfully designed for long-term senior living. Each space blends comfort, functionality, and refined interiors to create a home that feels both secure and effortlessly luxurious.",
    mediaSrc: "/assets/Room Image.png",
  },
  {
    title: "Wellness, Every Day",
    body: "A lifestyle centered around well-being, with daily yoga, guided meditation, rejuvenating spa therapies, and dedicated physiotherapy support — helping you maintain balance, mobility, and overall vitality.",
    mediaSrc: "/assets/Yoga.png",
  },
  {
    title: "Care You Can Trust",
    body: "Round-the-clock assistance with access to professional medical support, ensuring safety, comfort, and peace of mind for you.",
    mediaSrc: "/assets/Medical.JPG",
  },
  {
    title: "Dining & Meaningful Community",
    body: "Enjoy nutritious, thoughtfully prepared meals along with inviting café spaces and curated social experiences — creating opportunities for connection, conversation.",
    mediaSrc: "/assets/Dinning.png",
  },
  {
    title: "Refined Lifestyle Amenities",
    body: "From a serene swimming pool and modern fitness centre to a relaxing jacuzzi and leisure spaces, every amenity is designed to support a lifestyle of comfort, relaxation, and graceful living.",
    mediaSrc: "/assets/Swimming Pool.png",
  },
];

const WhatIsEden = [
  "Set in the serene foothills of Dehradun, Eden is a luxury senior living destination crafted for extended stays. Blending refined residences with holistic wellness and personalized care, it offers a lifestyle where every detail is designed for comfort, dignity, and ease — whether for a few weeks or a long-term stay.",
];

const GoogleAdsLandingPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(durationOptions[0].value);
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [guests, setGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const durationEstimate = useMemo(() => {
    switch (duration) {
      case "30-60":
        return { checkInDaysOffset: 7, checkOutDaysOffset: 37 };
      case "60-90":
        return { checkInDaysOffset: 7, checkOutDaysOffset: 97 };
      case "90+":
      default:
        return { checkInDaysOffset: 7, checkOutDaysOffset: 127 };
    }
  }, [duration]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCtaClick = (event: string) => {
    pushToDataLayer(event, { page: "live-at-eden" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitted(false);

    try {
      handleCtaClick("ga_lead_form_submit_start");

      const now = new Date();
      const checkIn = new Date(
        now.getTime() + durationEstimate.checkInDaysOffset * 24 * 60 * 60 * 1000
      );
      const checkOut = new Date(
        now.getTime() + durationEstimate.checkOutDaysOffset * 24 * 60 * 60 * 1000
      );

      const payload = {
        name: fullName,
        email: email || null,
        phone,
        number_of_guests: guests,
        check_in: checkIn.toDateString(),
        check_out: checkOut.toDateString(),
        stay_package: "Long Stay",
        room_type: "Long Stay Serviced Residence",
        room_description: duration,
        special_request: specialNeeds,
        source: "google-ads",
      };

      const { error } = await supabase.from("Leads").insert([payload]);
      if (error) throw error;

      handleCtaClick("ga_lead_form_submit_success");
      setSubmitted(true);
      // Give users a calm confirmation moment before redirecting.
      setTimeout(() => navigate("/thank-you"), 800);
    } catch (err) {
      handleCtaClick("ga_lead_form_submit_error");
      // Keep UI simple; we will not block the user with alerts.
      console.error(err);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* HERO */}
      <header className="pt-24">
        <section className="relative overflow-hidden">
          <img
            src="/assets/Building.jpg"
            alt="Eden building exterior"
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className="max-w-2xl mx-auto text-center text-white">
                <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
                  Luxury Living
                  <br />
                  <span className="block sm:whitespace-nowrap">
                    Thoughtfully Designed for Seniors
                  </span>
                </h1>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="btn-primary"
                    onClick={() => {
                      handleCtaClick("ga_cta_book_your_stay_click");
                      scrollToId("lead-form");
                    }}
                  >
                    Book Your Stay
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/15"
                    onClick={() => {
                      handleCtaClick("ga_cta_explore_long_stay_click");
                      scrollToId("lead-form");
                    }}
                  >
                    Explore Long Stay Living
                  </Button>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center min-h-[52px] flex items-center justify-center">
                    <p className="font-serif text-sm font-semibold leading-5">
                      Luxury Living
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center min-h-[52px] flex items-center justify-center">
                    <p className="font-serif text-sm font-semibold leading-5">
                      Wellness
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center min-h-[52px] flex items-center justify-center">
                    <p className="font-serif text-sm font-semibold leading-5">
                      24/7 Medical Support &amp; Security
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </header>

      {/* WHAT IS EDEN + KEY BENEFITS */}
      <main className="space-y-10 md:space-y-14">
        {/* What is Eden */}
        <section className="container-custom py-10 md:py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Left media */}
              <div className="rounded-3xl overflow-hidden border border-eden-light/50 bg-[#FFFCF7]">
                <div className="aspect-[4/3] w-full">
                  <img
                    src="/assets/Lobby.png"
                    alt="Eden living spaces"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right text */}
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-eden-dark">
                  About Eden
                </h2>
                <div className="w-20 h-1 bg-eden my-6" />

                <Card className="border-eden/20 bg-white/90">
                  <CardContent className="p-6 md:p-8">
                    <p className="text-stone-700 text-base md:text-lg leading-7">
                      {WhatIsEden[0]}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Long-Stay Highlight */}
        <section className="container-custom py-10 md:py-14">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-eden-light/50 bg-white/90 p-6 md:p-10 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-eden-dark leading-tight">
                Make Eden Your Home — For As Long As You Wish
              </h2>
              <div className="w-20 h-1 bg-eden my-6" />

              <div className="space-y-5">
                <p className="text-stone-700 text-base md:text-lg leading-7">
                  At Eden, every detail is designed with long-term living in
                  mind — especially for those who value comfort, care, and a
                  more considered pace of life.
                </p>
                <p className="text-stone-700 text-base md:text-lg leading-7">
                  Everything is thoughtfully managed for you — from
                  housekeeping and wellness to dining and daily assistance — so
                  you can focus on living fully, without concern.
                </p>
                <p className="text-stone-700 text-base md:text-lg leading-7">
                  Created as a refined senior living environment, Eden offers
                  the independence of your own private residence, with the
                  reassurance of support always close at hand.
                </p>
                <p className="text-stone-700 text-base md:text-lg leading-7">
                  This is long-term living, reimagined with care, dignity, and
                  quiet luxury.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="container-custom py-10 md:py-14 bg-eden-beige/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-eden-dark">
                Key Benefits
              </h2>
              <div className="w-20 h-1 bg-eden mx-auto my-6" />
            </div>

            <div className="mt-10 space-y-8 md:space-y-12">
              {benefitCards.map((b, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={b.title}
                    className="rounded-3xl border border-eden-light/50 bg-white/80 shadow-sm overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Media */}
                      <div
                        className={`p-6 md:p-8 ${
                          isEven ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <div className="rounded-3xl border border-eden/20 bg-[#FFFCF7] overflow-hidden">
                          <div className="aspect-[4/3] w-full bg-[#FFFCF7]">
                            {b.mediaSrc ? (
                              <img
                                src={b.mediaSrc}
                                alt={b.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-full w-full bg-gradient-to-br from-eden-beige/50 via-white to-eden-light/20" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Text */}
                      <div
                        className={`p-6 md:p-8 ${
                          isEven ? "md:order-2" : "md:order-1"
                        } flex h-full flex-col justify-center`}
                      >
                        <p className="font-serif text-2xl md:text-3xl font-semibold text-eden-dark leading-tight">
                          {b.title}
                        </p>
                        <div className="mt-4 h-px w-16 bg-eden/70" />
                        <p className="mt-5 text-stone-600 leading-7 text-base md:text-lg">
                          {b.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section
          id="lead-form"
          className="container-custom py-10 md:py-14 bg-eden-beige/20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-eden-dark">
                Request Your Long-Stay Details
              </h2>
              <div className="w-20 h-1 bg-eden mx-auto my-6" />
              <p className="text-stone-600 text-base md:text-lg leading-7">
                Fill out the form below and our team will contact you with a suggested long-stay plan.
              </p>
              <p className="mt-4 text-sm text-stone-500">
                We’ll only use your details to respond to your enquiry.
              </p>
            </div>

            <Card className="mt-10 rounded-3xl border border-eden/20 bg-white/90 shadow-sm">
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="rounded-2xl border border-eden/30 bg-eden/10 p-5">
                    <p className="font-serif text-eden-dark text-lg font-semibold">
                      Thank you.
                    </p>
                    <p className="mt-2 text-stone-600 leading-6">
                      Thanks—our team will contact you soon.
                    </p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        type="tel"
                        autoComplete="tel"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email (optional)"
                        type="email"
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-base">
                        Preferred Duration *
                      </Label>
                      <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                        required
                      >
                        {durationOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="guests"
                        className="text-base"
                      >
                        Number of Guests (Optional)
                      </Label>
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="specialNeeds"
                        className="text-base"
                      >
                        Any special needs? *
                      </Label>
                      <Textarea
                        id="specialNeeds"
                        value={specialNeeds}
                        onChange={(e) => setSpecialNeeds(e.target.value)}
                        placeholder="For example: mobility support, dietary preferences, calm environment, or caregiver assistance."
                        required
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Book Your Stay"}
                    </Button>
                    <p className="text-xs text-stone-500 leading-5">
                      By submitting, you agree to be contacted about long-stay living plans at Eden.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container-custom py-10 md:py-14">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-eden/20 bg-[#FFFCF7] p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-serif font-semibold text-3xl md:text-4xl text-eden-dark">
                    Ready for a Refined Long Stay?
                  </h2>
                  <p className="mt-4 text-stone-600 leading-7">
                    Book your stay inquiry today. We’ll help match seniors and families with the right plan in Dehradun.
                  </p>
                  <div className="mt-6 flex items-start gap-3">
                    <div className="rounded-full w-11 h-11 bg-eden/10 flex items-center justify-center">
                      <ShieldCheck className="text-eden-dark" size={20} />
                    </div>
                    <div>
                      <p className="font-serif text-eden-dark font-semibold">Trust-first hospitality</p>
                      <p className="text-sm text-stone-600 leading-6">
                        Placeholder trust line: replace with verified credentials and certifications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className="btn-primary w-full"
                    onClick={() => {
                      handleCtaClick("ga_final_cta_book_click");
                      scrollToId("lead-form");
                    }}
                  >
                    Book Your Stay
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-eden/30 text-eden-dark hover:bg-eden-light"
                    onClick={() => {
                      handleCtaClick("ga_final_cta_explore_longstay_click");
                      scrollToId("long-stay");
                    }}
                  >
                    Explore Long Stay Living
                  </Button>

                  <div className="rounded-2xl border border-eden/15 bg-white/70 p-4">
                    <p className="text-sm text-stone-700 font-medium">
                      Prefer to speak first?
                    </p>
                    <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-3">
                      <a
                        href="tel:+917533909333"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                      >
                        <Phone size={16} /> +91-7533909333
                      </a>
                      <a
                        href="tel:+918448194646"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                      >
                        <Phone size={16} /> +91-8448194646
                      </a>
                      <a
                        href="mailto:reservations@edenwellnesshospitality.com"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                      >
                        <Mail size={16} /> Email Us
                      </a>
                    </div>
                    <div className="mt-3 text-xs text-stone-500">
                      Contact details are shown for convenience and trust-building.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default GoogleAdsLandingPage;

