
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const policySections = [
  {
    id: "introduction",
    title: "Introduction",
    content: [
      "Placeholder: Add a clear introduction describing Eden Wellness & Hospitality's commitment to privacy, transparency, and responsible data handling.",
      "Placeholder: Clarify who this policy applies to, which services are covered, and when this policy is effective.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "Placeholder: Describe categories of data collected directly from guests, website visitors, and enquiry forms.",
      "Placeholder: Include examples for identity, contact, booking preferences, and service-related information.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content: [
      "Placeholder: Explain how information supports reservations, guest services, communication, safety, and site improvements.",
      "Placeholder: List lawful and operational purposes in concise, reader-friendly language.",
    ],
  },
  {
    id: "booking-and-enquiry-data",
    title: "Booking and Enquiry Data",
    content: [
      "Placeholder: Define what booking and enquiry details are retained from forms, calls, and direct interactions.",
      "Placeholder: Mention operational uses such as reservation confirmation, pre-arrival support, and follow-up communication.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    content: [
      "Placeholder: Summarize cookie usage for functionality, analytics, and experience optimization.",
      "Placeholder: Add details on cookie controls and browser settings once finalized.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: [
      "Placeholder: Identify third-party tools used for hosting, analytics, maps, payment, and communication.",
      "Placeholder: Clarify that each provider manages data under its own privacy terms.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content: [
      "Placeholder: Explain when data may be shared with trusted service partners for core operations.",
      "Placeholder: Clearly state that personal information is not sold and is shared only where necessary or legally required.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      "Placeholder: Define retention timelines based on business, legal, accounting, and guest support needs.",
      "Placeholder: Include criteria for deletion, anonymization, or archival handling.",
    ],
  },
  {
    id: "data-protection",
    title: "Data Protection",
    content: [
      "Placeholder: Describe safeguards for secure processing, restricted access, and system-level protection.",
      "Placeholder: Add internal control practices and risk-reduction measures as finalized by the team.",
    ],
  },
  {
    id: "user-rights",
    title: "User Rights",
    content: [
      "Placeholder: List rights to access, correction, deletion, objection, and withdrawal of consent where applicable.",
      "Placeholder: Include the process and expected response timeline for privacy-related requests.",
    ],
  },
  {
    id: "updates-to-this-policy",
    title: "Updates to This Policy",
    content: [
      "Placeholder: Explain how policy changes are published and how users are informed of material updates.",
      "Placeholder: Keep version history and effective date references easy to scan.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: [
      "Placeholder: Add official privacy contact channels for requests, concerns, or clarification.",
      "Placeholder: Confirm operational hours and preferred contact workflow once available.",
    ],
  },
];

const TermsPrivacyPage = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="pt-24 pb-16 md:pb-24">
        <section className="container-custom py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-flex items-center rounded-full border border-eden/20 bg-white px-4 py-1.5 text-xs tracking-[0.16em] text-eden-dark uppercase">
              Privacy and Data Protection
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl font-serif font-semibold text-eden-dark leading-tight">
              Privacy Policy
            </h1>
            <div className="w-20 h-1 bg-eden mx-auto my-6" />
            <p className="text-stone-600 text-base md:text-lg leading-relaxed">
              We are preparing this policy text for legal publication. The
              structure below reflects the final reading experience and makes
              each section simple to review and replace.
            </p>
            <p className="mt-5 text-sm text-stone-500">
              Last updated: Placeholder date
            </p>
          </div>
        </section>

        <section className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-eden/15 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-xl text-eden-dark">
                  On This Page
                </h2>
                <div className="mt-3 h-px bg-eden/15" />
                <nav className="mt-4">
                  <ul className="space-y-2.5">
                    {policySections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="inline-flex text-sm text-stone-600 transition-colors hover:text-eden-dark"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <div className="space-y-6">
              {policySections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-3xl border border-stone-200/80 bg-[#FFFCF7] p-6 md:p-8"
                >
                  <h2 className="text-2xl md:text-[1.75rem] font-serif font-semibold text-eden-dark">
                    {section.title}
                  </h2>
                  <div className="mt-3 h-px w-12 bg-eden/40" />
                  <div className="mt-5 space-y-4">
                    {section.content.map((paragraph, index) => (
                      <p
                        key={`${section.id}-paragraph-${index}`}
                        className="text-stone-600 text-[15px] md:text-base leading-7"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="rounded-3xl border border-eden/20 bg-gradient-to-br from-white to-[#F6F3E8] p-7 md:p-9">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-eden-dark">
                  Need Help With a Privacy Request?
                </h2>
                <p className="mt-4 text-stone-600 leading-7">
                  Our guest support and privacy team can assist with policy
                  questions, account-related concerns, and data requests.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <a
                    href="tel:+917533909333"
                    className="rounded-2xl border border-eden/20 bg-white p-4 transition-colors hover:border-eden/40"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-eden-dark/70">
                      Phone
                    </p>
                    <p className="mt-2 text-stone-700">+91-7533909333</p>
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@edenwellnesshospitality.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-eden/20 bg-white p-4 transition-colors hover:border-eden/40"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-eden-dark/70">
                      Email
                    </p>
                    <p className="mt-2 break-all text-stone-700">
                      info@edenwellnesshospitality.com
                    </p>
                  </a>
                </div>
                <div className="mt-4 rounded-2xl border border-eden/15 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-eden-dark/70">
                    Address
                  </p>
                  <p className="mt-2 text-stone-700 leading-7">
                    Khasra 39 and 40, Near Vaibhav Farms, Purkul Road,
                    Bhagwantpur, Dehradun 248 009, Uttarakhand, India
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPrivacyPage;
