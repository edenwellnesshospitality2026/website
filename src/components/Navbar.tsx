import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pushToDataLayer } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    let currentURL = window.location.href;
    if (currentURL.includes("#") || currentURL.split("/")[3] == "") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = window.location.origin + "/#" + sectionId;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }

    // setTimeout(() => {

    // }, 100);

    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white py-3`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center">
          {/* <span className="text-2xl font-serif font-semibold text-eden-dark">Eden</span>
          <span className="text-md text-eden ml-1 font-light">Gracious Living</span> */}
          <img
            src="https://ik.imagekit.io/sxe8qsgazl/edenwellness/Eden-logo.png?updatedAt=1757394157718"
            alt="logo"
            className="w-20"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-eden-text hover:text-eden transition-colors bg-transparent border-none cursor-pointer"
          >
            About
          </button>

          {/* <a href="/#choose-your-sanctuary" className="text-eden-text hover:text-eden transition-colors">Accommodations</a> */}
          <button
            onClick={() => scrollToSection("choose-your-sanctuary")}
            className="text-eden-text hover:text-eden transition-colors bg-transparent border-none cursor-pointer"
          >
            Explore Rooms
          </button>
          <button
            onClick={() => scrollToSection("amenities")}
            className="text-eden-text hover:text-eden transition-colors"
          >
            Amenities
          </button>
          {/* <a href="/#faq" className="text-eden-text hover:text-eden transition-colors">FAQs</a> */}
          <button
            onClick={() => scrollToSection("faq")}
            className="text-eden-text hover:text-eden transition-colors bg-transparent border-none cursor-pointer"
          >
            FAQs
          </button>

          <a
            href="/gallery"
            className="text-eden-text hover:text-eden transition-colors"
          >
            Gallery
          </a>

          {/* 🌟 Highlighted Blog Button */}
          <a href="https://edenwellnesshospitality.blogspot.com/" className="text-eden-text hover:text-eden" target="_blank">
              Blog
          </a>

          <a href="/#contact">
            <Button
              onClick={() => pushToDataLayer("contact_button_click", { button_location: "navbar" })}
              variant="outline"
              className="border-eden text-eden hover:bg-eden hover:text-white"
            >
              Contact Us
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-eden-dark duration-300"
          onClick={toggleMobileMenu}
          aria-label="Open Menu"
        >
          <motion.div
            key={isMobileMenuOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 z-50"
          >
            <div className="container-custom flex flex-col space-y-4">
              <a
                href="/#about"
                className="text-eden-text hover:text-eden py-2 px-4"
                onClick={toggleMobileMenu}
              >
                About
              </a>

              <button
                onClick={() => scrollToSection("choose-your-sanctuary")}
                className="text-eden-text hover:text-eden py-2 px-4 text-left bg-transparent border-none cursor-pointer"
              >
                Explore Rooms
              </button>

              <a
                href="/#amenities"
                className="text-eden-text hover:text-eden py-2 px-4"
                onClick={toggleMobileMenu}
              >
                Amenities
              </a>

              <button
                onClick={() => scrollToSection("faq")}
                className="text-eden-text hover:text-eden py-2 px-4 text-left bg-transparent border-none cursor-pointer"
              >
                FAQs
              </button>

              <a
                href="/gallery"
                className="text-eden-text hover:text-eden py-2 px-4"
                onClick={toggleMobileMenu}
              >
                Gallery
              </a>

              {/* 🌟 Highlighted Blog Button in Mobile */}
              <a
                href="https://edenwellnesshospitality.blogspot.com/" target="_blank"
                className="py-2 px-4 text-eden-text hover:text-eden"
                onClick={toggleMobileMenu}
              >
                  Blog
              </a>

              <a
                href="/#contact"
                className="py-2 px-4"
                onClick={toggleMobileMenu}
              >
                <Button className="bg-eden text-white w-full" onClick={() => pushToDataLayer("contact_button_click", { button_location: "navbar-mobile" })}>
                  Contact Us
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
