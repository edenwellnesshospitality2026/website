import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GoogleLogo from "../images/Google__G__logo.svg.png";

interface GoogleReview {
  author_url: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  review: GoogleReview;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  return (
    <Card className="shadow-sm border-eden-light/50 h-[340px] flex flex-col justify-between radius-md ml-2 mr-2">
      <CardContent className="flex flex-col h-full justify-between p-6">
        {/* Top: Google logo */}
        <div className="flex flex-col items-center">
          <img src={GoogleLogo} alt="Google" className="w-10 h-10 mb-2" />
          {/* Star rating */}
          <div className="flex justify-center mb-2">
            <span className="text-yellow-500 text-lg">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
          </div>
        </div>
        {/* Review text + see on Google */}
        <div className="flex-1 flex flex-col justify-between min-h-[90px]">
          <p className="text-center text-eden-text mb-2 line-clamp-3">
            "{review.text}"
          </p>
          <a
            href={review?.author_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center hover:underline text-eden-dark text-sm hover:text-eden hover:font-semibold"
            style={{ marginTop: "auto" }}
          >
            See on Google
          </a>
        </div>
        {/* Bottom: User image and name */}
        <div className="flex items-center mt-4 justify-center">
          <img
            src={review.profile_photo_url || "../images/user2-test.png"}
            alt={review.author_name}
            className="h-12 w-12 rounded-full object-cover border mr-3"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "../images/user2-test.png";
            }}
          />
          <span className="font-semibold text-eden-dark text-xs">
            {review.author_name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("https://edenbackend-be8s.onrender.com/api/google-reviews")
      .then((res) => res.json())
      .then((data) => setTestimonials(data.reviews || []));
  }, []);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
<section className="section-padding bg-eden-beige/30">
  <div className="container-custom text-center">
    {/* Heading */}
    <div className="max-w-3xl mx-auto text-center mb-12 px-4">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
        Guest Stories
      </h2>
      <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
      <p className="text-eden-text text-base md:text-lg">
        Hear from families and guests who have experienced the warmth and care
        at Eden Wellness and Hospitality.
      </p>
    </div>

    {/* 🎥 Feedback Videos Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center px-4">
      {/* Video 1 */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-eden-light/30">
        <div className="aspect-[9/12] w-full">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/ZTl765h14VA?loop=1&playlist=ZTl765h14VA&controls=0&modestbranding=1&rel=0"
            title="Our Guests STORY @ Eden Wellness & Hospitality"
            frameBorder="0"
            allow="encrypted-media; clipboard-write; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Video 2 */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-eden-light/30">
        <div className="aspect-[9/12] w-full">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/l2jyahTbs50?loop=1&playlist=l2jyahTbs50&controls=0&modestbranding=1&rel=0"
            title="Guest Feedback - Himalayan Retreat"
            frameBorder="0"
            allow="encrypted-media; clipboard-write; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Video 3 */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-eden-light/30">
        <div className="aspect-[9/12] w-full">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/1D79YhyHLVY?loop=1&playlist=1D79YhyHLVY&controls=0&modestbranding=1&rel=0"
            title="Where every stay feels like coming home to peace"
            frameBorder="0"
            allow="encrypted-media; clipboard-write; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

  );


};

export default Testimonials;

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { CircleUser } from "lucide-react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// interface TestimonialProps {
//   quote: string;
//   name: string;
//   title: string;
// }

// const TestimonialCard: React.FC<TestimonialProps> = ({
//   quote,
//   name,
//   title,
// }) => {
//   return (
//     <Card className="border-eden-light/50 shadow-sm">
//       <CardContent className="p-6">
//         <div className="flex justify-center mb-6">
//           <CircleUser className="text-eden h-12 w-12" />
//         </div>
//         <blockquote className="text-center">
//           <p className="text-eden-text italic mb-4">"{quote}"</p>
//           <footer>
//             <div className="font-medium text-eden-dark">{name}</div>
//             <div className="text-sm text-muted-foreground">{title}</div>
//           </footer>
//         </blockquote>
//       </CardContent>
//     </Card>
//   );
// };

// const Testimonials: React.FC = () => {
//   const testimonials = [
//     {
//       quote:
//         "Eden has given my father a beautiful and comfortable place to stay during his visits to Dehradun. The attention to detail and care from the staff is exceptional.",
//       name: "Priya Sharma",
//       title: "Daughter of a Resident",
//     },
//     {
//       quote:
//         "I've stayed at several senior accommodations, but Eden stands out for its warmth and hospitality. It truly feels like a home away from home.",
//       name: "Dr. Rajesh Khanna",
//       title: "Regular Guest",
//     },
//     {
//       quote:
//         "My wife and I enjoy our regular weekend visits to Eden. The wellness programs, quiete space and serene environment help us rejuvenate completely.",
//       name: "Amrit Singh",
//       title: "Recurring Guest",
//     },
//     {
//       quote:
//         "Booked Eden for my parents' anniversery trip. I wanted this to be a special experience. They were raving about the pool, spa, the food, and the hospitality",
//       name: "Sameer",
//       title: "Booked for Parents",
//     },
//     {
//       quote:
//         "Our daughter booked Eden for us as a surprise. The apartment had everything we needed. We extended our stay by a week. It was peaceful, green, and quiet.",
//       name: "Farida & Anwar",
//       title: "Late 50s",
//     },
//     {
//       quote:
//         "I booked Eden to finish a writing project. The apartment was well-designed, there was no noise, no rush. It’s rare to find places that respect silence like this.",
//       name: "Rakesh",
//       title: "Writer",
//     },
//   ];

//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <section className="section-padding bg-eden-beige/30">
//       <div className="container-custom">
//         <div className="max-w-3xl mx-auto text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
//             Guest Stories
//           </h2>
//           <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
//           <p className="text-eden-text">
//             Hear from families and guests who have experienced the warmth and
//             care at Eden Wellness and Hospitality.
//           </p>
//         </div>

//         <Carousel responsive={responsive}>
//           {testimonials.map((testimonial, index) => (
//             <TestimonialCard
//               key={index}
//               quote={testimonial.quote}
//               name={testimonial.name}
//               title={testimonial.title}
//             />
//           ))}
//         </Carousel>
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
