import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PLANS = [
  {
    id: "wellness",
    name: "Wellness Member",
    blurb: "Essential access for occasional retreats",
    priceLabel: "On request",
    highlights: [
      "Preferred booking windows",
      "Member rates on select stays",
      "Seasonal wellness updates",
    ],
    featured: false,
  },
  {
    id: "signature",
    name: "Signature Member",
    blurb: "Our most popular tier for regular guests",
    priceLabel: "On request",
    highlights: [
      "Priority reservations",
      "Complimentary room upgrades when available",
      "Spa & dining privileges",
      "Dedicated guest liaison",
    ],
    featured: true,
  },
  {
    id: "founders",
    name: "Founders Circle",
    blurb: "The fullest Eden experience",
    priceLabel: "On request",
    highlights: [
      "Highest priority across dates",
      "Exclusive events & previews",
      "Extended-stay flexibility",
      "Curated itinerary planning",
    ],
    featured: false,
  },
];

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

const MembershipPlans = () => (
  <section id="membership" className="section-padding bg-gradient-to-b from-white to-eden-beige/40">
    <div className="container-custom">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-eden-dark/70 mb-3">
          Eden Membership
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-eden-text mb-4">
          Three ways to belong
        </h2>
        <p className="text-stone-600 text-lg font-light leading-relaxed">
          Choose a membership that matches how you want to experience Eden—wellness getaways,
          signature stays, or our inner circle for the complete retreat lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col border-stone-200/80 shadow-sm overflow-hidden ${
              plan.featured ? "ring-2 ring-eden/40 md:scale-[1.02] bg-white" : "bg-white/90"
            }`}
          >
            {plan.featured ? (
              <Badge className="absolute top-4 right-4 bg-eden text-white hover:bg-eden-dark border-0">
                Popular
              </Badge>
            ) : null}
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-2xl text-eden-text">{plan.name}</CardTitle>
              <CardDescription className="text-stone-600 text-base">{plan.blurb}</CardDescription>
              <p className="text-2xl font-serif font-semibold text-eden-dark pt-2">{plan.priceLabel}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6 pt-0">
              <ul className="space-y-3 flex-1">
                {plan.highlights.map((line) => (
                  <li key={line} className="flex gap-2 text-stone-700 text-sm">
                    <Check className="w-5 h-5 text-eden shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full bg-eden hover:bg-eden-dark text-white"
                  type="button"
                  onClick={scrollToContact}
                >
                  Talk to our team
                </Button>
                <Button variant="outline" className="w-full border-eden/40 text-eden-dark" asChild>
                  <a href="mailto:info@edenwellnesshospitality.com?subject=Eden%20Membership%20Inquiry">
                    Email membership
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default MembershipPlans;
