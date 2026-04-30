import React from "react";
const About: React.FC = () => {
  return (
    <section id="about" className=" bg-eden-beige/30 mt-10">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4 text-eden-dark md:text-5xl">
            Your Hill Stay Awaits
          </h2>
          <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-serif text-eden mb-6"></h3>
            <p className="text-eden-text mb-6">
              At Eden, you step into a world designed for ease, thoughtfully
              crafted apartments, quiet hillside surroundings, and a community
              where you can truly belong. Here, life slows down just enough for
              you to breathe deeper, move at your own pace, and enjoy every day
              with dignity, care, and independence.
            </p>

            <h4 className="text-lg font-serif text-eden mb-4">
              What you'll enjoy at Eden:
            </h4>
            <ul className="text-eden-text mb-6 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Beautifully furnished residences, maintained to perfection
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Personalized services that feel natural, not intrusive
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
                A wellness-rich environment: yoga, gym, jacuzzi, spa, and more
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Seamless support for your everyday housekeeping, maintenance,
                dining
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-eden rounded-full mt-2 mr-3 flex-shrink-0"></span>
                A warm, private community where neighbors become lifelong
                friends
              </li>
            </ul>

            <p className="text-eden-text italic"></p>
          </div>

          <div className="order-1 md:order-2 relative ">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <div className="h-auto md:h-[490px]">
  <div className="w-full h-full rounded-lg overflow-hidden">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/HeOyO0b3BzI?autoplay=1&mute=1&loop=1&playlist=HeOyO0b3BzI&controls=0&modestbranding=1&showinfo=0&rel=0"
    title="Eden Wellness & Hospitality Property Video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>

</div>

            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-eden-light rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-eden-accent/30 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
