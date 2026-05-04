"use client";

import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { getMembershipTiers, getSiteContent, type MembershipTierDoc } from "@/lib/cms-api";

const PLANS_FALLBACK = [
  {
    title: "Wellness Member",
    description: "Essential access for occasional retreats",
    priceLabel: "On request",
    features: ["Preferred booking windows", "Member rates on select stays", "Seasonal wellness updates"],
    isPopular: false,
    primaryCtaLabel: "Talk to our team",
    primaryCtaHref: "/#contact",
  },
  {
    title: "Signature Member",
    description: "Our most popular tier for regular guests",
    priceLabel: "On request",
    features: [
      "Priority reservations",
      "Complimentary room upgrades when available",
      "Spa & dining privileges",
      "Dedicated guest liaison",
    ],
    isPopular: true,
    primaryCtaLabel: "Talk to our team",
    primaryCtaHref: "/#contact",
  },
  {
    title: "Founders Circle",
    description: "The fullest Eden experience",
    priceLabel: "On request",
    features: [
      "Highest priority across dates",
      "Exclusive events & previews",
      "Extended-stay flexibility",
      "Curated itinerary planning",
    ],
    isPopular: false,
    primaryCtaLabel: "Talk to our team",
    primaryCtaHref: "/#contact",
  },
];

const MembershipPlans = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToBookATable = useCallback(() => {
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ pathname: "/", hash: "contact" });
    }
  }, [location.pathname, navigate]);

  const handleTierCta = useCallback(
    (plan: MembershipTierDoc | (typeof PLANS_FALLBACK)[number]) => {
      const raw =
        "primaryCtaHref" in plan && plan.primaryCtaHref ? plan.primaryCtaHref : "";
      const href = raw.trim();
      const h = href.toLowerCase();

      if (!href || h === "#contact" || h === "/#contact" || h.startsWith("tel:") || h.startsWith("mailto:")) {
        goToBookATable();
        return;
      }
      if (href.startsWith("#")) {
        if (location.pathname === "/") {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate({ pathname: "/", hash: href.slice(1) });
        }
        return;
      }
      if (/^https?:\/\//i.test(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      window.location.assign(href);
    },
    [goToBookATable, location.pathname, navigate]
  );

  const { data: tiers } = useQuery({
    queryKey: ["cms", "membership-tiers"],
    queryFn: getMembershipTiers,
    staleTime: 60_000,
  });

  const { data: site } = useQuery({
    queryKey: ["cms", "site-content", "homepage"],
    queryFn: () => getSiteContent("homepage"),
    staleTime: 60_000,
  });

  const plans: MembershipTierDoc[] | typeof PLANS_FALLBACK =
    tiers && tiers.length > 0 ? tiers : PLANS_FALLBACK;

  const introParagraph =
    site?.membershipIntro?.trim() ||
    "Choose a membership that matches how you want to experience Eden—wellness getaways, signature stays, or our inner circle for the complete retreat lifestyle.";

  return (
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
            {introParagraph}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, idx) => {
            const key =
              "_id" in plan ? plan._id : `${plan.title}-${idx}`;
            const featured =
              "isPopular" in plan ? Boolean(plan.isPopular) : false;
            const name = plan.title;
            const blurb = plan.description;
            const priceLabel = plan.priceLabel ?? "On request";
            const highlights =
              "features" in plan && Array.isArray(plan.features) ?
                plan.features
              : [];
            const ctaLabel =
              "primaryCtaLabel" in plan && plan.primaryCtaLabel ?
                plan.primaryCtaLabel
              : "Talk to our team";

            return (
              <Card
                key={key}
                className={`relative flex flex-col border-stone-200/80 shadow-sm overflow-hidden ${
                  featured ? "ring-2 ring-eden/40 md:scale-[1.02] bg-white" : "bg-white/90"
                }`}
              >
                {featured ? (
                  <Badge className="absolute top-4 right-4 bg-eden text-white hover:bg-eden-dark border-0">
                    Popular
                  </Badge>
                ) : null}
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-2xl text-eden-text">{name}</CardTitle>
                  <CardDescription className="text-stone-600 text-base">{blurb}</CardDescription>
                  <p className="text-2xl font-serif font-semibold text-eden-dark pt-2">{priceLabel}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-6 pt-0">
                  <ul className="space-y-3 flex-1">
                    {highlights.map((line) => (
                      <li key={line} className="flex gap-2 text-stone-700 text-sm">
                        <Check className="w-5 h-5 text-eden shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-eden hover:bg-eden-dark text-white"
                    type="button"
                    onClick={() => handleTierCta(plan)}
                  >
                    {ctaLabel}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
