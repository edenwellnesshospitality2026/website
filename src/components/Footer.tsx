import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-eden-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <a href="/" className="flex items-center">
                <span className="text-2xl font-serif font-semibold text-white">
                  <img
                    src="https://ik.imagekit.io/sxe8qsgazl/edenwellness/Eden-logo.png?updatedAt=1757394157718"
                    alt="Eden Logo"
                    className="w-24"
                  />
                </span>
                <span className="text-md text-eden-light ml-1 font-light text-sm">
                  Wellness & Hospitality
                </span>
              </a>
            </div>
            <p className="text-eden-light/90 mb-4">
              Premium senior residences offering graceful living experiences in
              Dehradun.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577096236840"
                target="_blank"
                className="text-eden-light hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/eden_wellness_hospitality/?hl=en"
                target="_blank"
                className="text-eden-light hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@EdenWellnessHospitality-10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-eden-light hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h-.102C3.617 1.999 2.002 2.284 2.002 2.284A1.94 1.94 0 0 0 .646 3.64 20.03 20.03 0 0 0 .334 8c0 1.743.104 3.486.312 4.36.178.697.73 1.249 1.356 1.356 0 0 1.615.285 5.947.285h.102c4.332 0 5.947-.285 5.947-.285a1.94 1.94 0 0 0 1.356-1.356c.208-.874.312-2.617.312-4.36a20.03 20.03 0 0 0-.312-4.36 1.94 1.94 0 0 0-1.356-1.356S12.383 2 8.051 2zM6.4 5.8 10.2 8 6.4 10.2V5.8z" />
                </svg>
              </a>
            </div>
            <a
                href="https://www.tripadvisor.in/Hotel_Review-g23875250-d32950333-Reviews-Eden_Wellness_Hospitality-Salan_Gaon_Dehradun_District_Uttarakhand.html"
                target="_blank"
                className="-ml-2"
              >
                <img
                  src="https://ik.imagekit.io/sxe8qsgazl/edenwellness/images_q=tbn:ANd9GcSliNDctWP9V1QrrBm6S4MRXXfjZnnnMBXPFoxjg5B9h1FlrhH8Vrqo0hOcV7sejUGj_0E&usqp=CAU"
                  className="rounded-lg w-28"
                  alt="Tripadvisor"
                />
              </a>
          </div>

          <div>
            <h5 className="font-serif text-lg mb-4 text-white">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#about"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#choose-your-sanctuary"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Explore Rooms
                </a>
              </li>
              <li>
                <a
                  href="/book-now"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Book Now
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Check availability
                </a>
              </li>
              <li>
                <a
                  href="/#membership"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Membership
                </a>
              </li>
              <li>
                <a
                  href="/#amenities"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/live-at-eden"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Live at Eden
                </a>
              </li>
            </ul>

            <h5 className="font-serif text-lg mb-4 mt-8 text-white">
              Our residences
            </h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/studio"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Eden Haven
                </a>
              </li>
              <li>
                <a
                  href="/1bhk"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Eden Residence
                </a>
              </li>
              <li>
                <a
                  href="/2bhk"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Eden Grand
                </a>
              </li>
              <li>
                <a
                  href="/presidential"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Presidential Suite
                </a>
              </li>
            </ul>

            <h5 className="font-serif text-lg mb-4 mt-8 text-white">Legal</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cancellation-policy"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-lg mb-4 text-white">Contact</h5>
            <ul className="space-y-2">
              <li className="text-eden-light/90">
                Khasra 39 & 40, Near Vaibhav Farms, <br />
                Purkul Road, Bhagwantpur,
                <br />
                Dehradun 248 009, Uttarakhand, India
              </li>
              <li>
                <a
                  href="tel:+917533909333"
                  className="text-eden-light/90 hover:text-white transition-colors"
                >
                  +91-7533909333
                </a>
              </li>
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=reservations@edenwellnesshospitality.com"
                  target="_blank"
                  className="text-eden-light/90 hover:text-white transition-colors break-all"
                >
                  reservations@edenwellnesshospitality.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-lg mb-4 text-white">
              Connect With Us
            </h5>
            <p className="text-eden-light/90 mb-4">
              Have questions or ready to book your stay? Reach out to us
              directly.
            </p>
            <a
              href="tel:+917533909333"
              className="text-eden-light/90 hover:text-white transition-colors"
            >
              <Button className="bg-white hover:bg-eden-light text-eden-dark w-full flex items-center justify-center space-x-2">
                <Phone size={18} />
                <span>Call Now</span>
              </Button>
            </a>
            <div className="mt-2 flex justify-center">
              <img
                className="h-auto w-full max-w-[200px] md:max-w-[220px] rounded-xl"
                src="https://ik.imagekit.io/sxe8qsgazl/edenwellness/insta-qr.png"
                alt="instagram qr code"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-eden-dark border-t border-eden-light/10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-eden-light/80 text-sm mb-2 md:mb-0">
              © {new Date().getFullYear()} Eden Wellness & Hospitality. All
              rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm justify-center md:justify-end">
              <a
                href="/privacy-policy"
                className="text-eden-light/90 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-eden-light/40 hidden sm:inline" aria-hidden>
                |
              </span>
              <a
                href="/cancellation-policy"
                className="text-eden-light/90 hover:text-white transition-colors"
              >
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA Button (Fixed) */}
      <a
        href="https://wa.me/917533909333"
        target="_blank"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-50 transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
