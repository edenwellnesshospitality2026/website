import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InquiryFormComponent from "@/components/accommodations/InquiryFormComponent";
import DatePackageSelector from "@/components/accommodations/DateSelector";
import { BookingDetails } from "@/types/accommodation";
import {
  CheckCircle,
  Users,
  Calendar,
  ArrowLeft,
  ShieldCheck,
  Accessibility,
  Activity,
} from "lucide-react";

const TwoBHKPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDatePackage, setShowDatePackage] = useState(false);
  const [selectedSanctuary, setSelectedSanctuary] = useState<string>("");
  const [packageDetails, setPackageDetails] = useState<any>(null);

  const collections = [
    {
      name: "VICTORIA",
      image:
        "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Accommodations/2%20BHK/Victoria/_DSC1929-Color-Grade.jpg?updatedAt=1749656576701",
      description:
        "Victoria is a well-planned apartment that offers all the essentials for a smooth stay. Each bedroom comes with its own bathroom. There’s a cozy living area with a dining space, a workspace, and a fully equipped kitchen. It’s perfect for families or small groups who want a clean, functional, and easy-to-settle-in space with everything you need, and nothing you don’t.",
      features: [
        "2 Bedrooms with Bathrooms",
        "Fully Furnished",
        "Equipped Kitchen",
        "Wi-Fi",
        "Air Conditioning (Hot & Cold)",
        "Laundry Service",
        "Complimentary Breakfast",
      ],
      recommendation:
        "Recommended for: Small families or groups seeking a comfortable, reliable apartment with clearly separated living and sleeping areas.",
    },
    {
      name: "RENAISSANCE",
      image:
        "https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Accommodations/2%20BHK/Renaissance/Copy%20of%202BHK.jpg?updatedAt=1749656521388",
      description:
        "Renaissance is a larger, high-end suite that gives you more space, more comfort, and a beautiful view from the balcony. It includes two spacious bedrooms, a stylish living area, and separate spaces to relax, eat, or work. If you’re looking to stay longer or want something extra special, Renaissance gives you the best of everything with peace, privacy, and the mountains right outside.",
      features: [
        "2 Bedrooms with Bathrooms",
        "Fully Furnished",
        "Equipped Kitchen",
        "Wi-Fi",
        "Air Conditioning (Hot & Cold)",
        "Laundry Service",
        "Complimentary Breakfast",
        "Access to Amenities",
      ],
      recommendation:
        "Recommended for: Families who want top-tier design, extra room to unwind, and a more luxurious living experience for longer stays.",
    },
  ];

  const handleSelectSanctuary = (sanctuaryName: string) => {
    setSelectedSanctuary(sanctuaryName);
    setShowDatePackage(true);
    setTimeout(() => {
      console.log("scrolling...");

      const element = document.getElementById("Stay_Packages");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleDatePackageSelect = (details: Partial<BookingDetails>) => {
    console.log("Package details selected:", details);
    setPackageDetails(details);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with sanctuary:", selectedSanctuary, formData);
    window.open("/thank-you", "_blank");
  };

  const handleBackToSanctuary = () => {
    window.location.href = "/#pick-your-apartment";
  };

  if (showForm) {
    const mockBookingDetails: any = {
      roomType: {
        id: "2bhk",
        name: "2 BHK Apartment",
        image:
          collections.find((c) => c.name === selectedSanctuary)?.image || "",
        size: "1600 sq ft",
        guests: 4,
        startingPrice: 15000,
        VICTORIA: 15000,
        RENAISSANCE: 25000,
        description: "Spacious 2BHK apartment",
        amenities: [],
      },
      roomCategory: {
        id: selectedSanctuary.toLowerCase(),
        name: selectedSanctuary,
        image:
          collections.find((c) => c.name === selectedSanctuary)?.image || "",
        description:
          collections.find((c) => c.name === selectedSanctuary)?.description ||
          "",
        size: "1600 sq ft",
        guests: 4,
        startingPrice: 15000,
        VICTORIA: 15000,
        RENAISSANCE: 25000,
        amenities:
          collections.find((c) => c.name === selectedSanctuary)?.features || [],
        roomTypeId: "2bhk",
      },
      nights: packageDetails?.nights || 1,
      isPackage: packageDetails?.isPackage || false,
      packageDetails: packageDetails?.packageDetails || packageDetails,
      totalPrice: packageDetails?.totalPrice || 15000,
    };

    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <InquiryFormComponent
            bookingDetails={mockBookingDetails}
            onSubmit={handleFormSubmit}
            onBack={() => setShowForm(false)}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (showDatePackage) {
    const mockRoomCategory = {
      id: selectedSanctuary.toLowerCase(),
      name: selectedSanctuary,
      image: collections.find((c) => c.name === selectedSanctuary)?.image || "",
      description:
        collections.find((c) => c.name === selectedSanctuary)?.description ||
        "",
      size: "1600 sq ft",
      guests: 4,
      startingPrice: 15000,
      VICTORIA: 15000,
      RENAISSANCE: 25000,
      amenities:
        collections.find((c) => c.name === selectedSanctuary)?.features || [],
      roomTypeId: "2bhk",
    };

    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <DatePackageSelector
            roomCategory={mockRoomCategory}
            onSelect={handleDatePackageSelect}
            onBack={() => setShowDatePackage(false)}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Banner Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/sjuj0rpud/Eden%20Gallery/Accommodations/2%20BHK/Cover%20-%20to%20be%20extracted%20fom%20the%20video%20cOLOR%20GRADE.jpg?updatedAt=1749656472985')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-serif font-bold mb-4">
            Choose Your 2BHK Collection
          </h1>
          <p className="text-xl font-light">
            Discover our premium 2BHK collections designed for luxurious living
          </p>
        </div>
      </section>

      <main className="section-padding">
        {/* Back Button */}
        <div className="container-custom mb-8">
          <Button
            variant="outline"
            onClick={handleBackToSanctuary}
            className="border-stone-300 text-stone-600 hover:bg-stone-50 rounded-xl px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Choose Your Appartment
          </Button>
        </div>

        {/* Collections */}
        <section className="container-custom space-y-16">
          {collections.map((collection, index) => (
            <div key={collection.name} className="space-y-8">
              <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0`}>
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-96 lg:h-full object-cover"
                      style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)" }}
                    />
                  </div>
                  <div
                    className={`p-12 flex flex-col justify-center bg-gradient-to-br from-stone-50 to-white ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <Badge className="bg-eden/10 text-eden border-eden px-4 py-2 rounded-full mr-4 text-sm font-medium">
                        2BHK Collection
                      </Badge>
                    </div>

                    <h2 className="text-4xl font-serif font-bold text-stone-800 mb-6">
                      {collection.name}
                    </h2>
                    <p className="text-stone-600 leading-relaxed mb-8 text-lg font-light">
                      {collection.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {collection.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-stone-600"
                        >
                          <CheckCircle className="w-5 h-5 text-eden mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {collection.recommendation && (
                      <p className="text-center text-stone-600 mb-8 text-sm italic">
                        <span className="font-bold">Recommended for:</span>{" "}
                        {collection.recommendation.replace(
                          "Recommended for: ",
                          ""
                        )}
                      </p>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        size="lg"
                        className="flex-1 bg-eden hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300"
                        onClick={() => handleSelectSanctuary(collection.name)}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Choose stay options
                      </Button>
                      {/* <Button 
                        variant="outline"
                        size="lg"
                        className="flex-1 border-eden text-eden hover:bg-eden hover:text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Virtual Tour
                      </Button> */}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        {/* Safety & Accessibility Features Section */}
        <section className="bg-gradient-to-r from-stone-50 to-stone-100 py-16 mt-20 rounded-3xl">
          <div className="container-custom text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-stone-800">
              Safety & Accessibility Features
            </h2>
            <div className="w-full flex justify-center">
              <div className=" flex justify-center mb-4 text-eden bg-eden-light/50 w-12 h-12 rounded-full  items-center  group-hover:bg-eden group-hover:text-white transition-all duration-300">
                <ShieldCheck />
              </div>
            </div>
            <p className="text-stone-600 text-lg mb-8 max-w-2xl mx-auto font-light">
              All our residences are designed with senior safety and
              accessibility in mind.
            </p>
          </div>

          <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white border-0">
              <div className="w-full flex justify-center">
                <div className=" flex justify-center mb-4 text-eden bg-eden-light/50 w-12 h-12 rounded-full  items-center  group-hover:bg-eden group-hover:text-white transition-all duration-300">
                  <Activity />
                </div>
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3 text-stone-800">
                Emergency Systems
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                All units equipped with emergency call systems that connect
                directly to our 24/7 medical team.
              </p>
            </Card>

            <Card className="p-6 text-center bg-white border-0">
              <div className="w-full flex justify-center">
                <div className=" flex justify-center mb-4 text-eden bg-eden-light/50 w-12 h-12 rounded-full  items-center  group-hover:bg-eden group-hover:text-white transition-all duration-300">
                  <Accessibility />
                </div>
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3 text-stone-800">
                Accessible Design
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Wider doorways, grab bars, and step-free entrances for ease of
                movement and enhanced accessibility.
              </p>
            </Card>

            <Card className="p-6 text-center bg-white border-0">
              <div className="w-full flex justify-center">
                <div className=" flex justify-center mb-4 text-eden bg-eden-light/50 w-12 h-12 rounded-full  items-center  group-hover:bg-eden group-hover:text-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-droplet-off-icon lucide-droplet-off"
                  >
                    <path d="M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586" />
                    <path d="m2 2 20 20" />
                    <path d="M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3 text-stone-800">
                Anti-Slip Flooring
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                High-quality anti-slip flooring throughout, particularly in
                bathrooms and other wet areas.
              </p>
            </Card>

            <Card className="p-6 text-center bg-white border-0">
              {/* <div className="w-12 h-12 bg-eden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-eden rounded-sm"><ShieldCheck color='#fff'  /></div>
              </div> */}
              <div className="w-full flex justify-center">
                <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
              </div>

              <h3 className="text-lg font-serif font-semibold mb-3 text-stone-800">
                24/7 Security
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Round-the-clock security personnel, CCTV monitoring, and secure
                access to all areas of the property.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TwoBHKPage;
