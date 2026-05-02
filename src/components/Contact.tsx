import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import "@/Styles/Contact.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { pushToDataLayer } from "@/lib/utils";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8090";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 30.4022508,
  lng: 78.069287,
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
}> = ({ icon, title, content }) => {
  return (
    <div className="flex items-start">
      <div className="text-eden mr-4">{icon}</div>
      <div>
        <h4 className="font-medium text-eden-dark">{title}</h4>
        <div className="text-eden-text">{content}</div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [Name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [roomType, setRoomType] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Name || !Email || !phone || !roomType) {
      setErrorMsg("Please fill in all the required fields.");
      return;
    }
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/contact-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: Name,
          email: Email,
          phone,
          bookingType: roomType || undefined,
          message: [Message, duration ? `Duration / stay: ${duration}` : ""]
            .filter(Boolean)
            .join("\n"),
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(typeof err.error === "string" ? err.error : "Could not send enquiry. Try again.");
        return;
      }

      pushToDataLayer("contact_button_click", { button_location: "lead-successful" });
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
      setRoomType("");
      window.open("/thank-you", "_blank");
    } catch {
      setErrorMsg("Network error. Please try again.");
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setErrorMsg("");
    }, 5000);
  };

  useEffect(() => {
    if (Email && roomType && Name && phone) {
      setErrorMsg("");
    }
  }, [Name, Email, phone, roomType]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA88wFERvzQy58u2VisFUP2ddNXxKj_wP0",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <section id="contact" className="section-padding bg-eden-beige/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-eden-dark">
            Book a Table
          </h2>
          <div className="w-20 h-1 bg-eden mx-auto mb-6"></div>
          <p className="text-eden-text">
            Have questions or ready to explore Eden? We'd love to hear from you
            and help plan your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="border-eden-light/50 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-serif text-eden-dark mb-6">
                Enquiry Form
              </h3>
              <form
                onSubmit={handleSubmit}
                className="ContactUsForm space-y-6 "
              >
                {errorMsg && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-type">Corporate Bookings/ Book Table</Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select booking type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nouveau-table">Nouveau Table</SelectItem>
                        <SelectItem value="nook-book">The Nook Cafe</SelectItem>
                        <SelectItem value="corporate-booking">Corporate Booking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Preferred Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1week">1 Night</SelectItem>
                        <SelectItem value="2weeks">2 Night</SelectItem>
                        <SelectItem value="3weeks">3 Night</SelectItem>
                        <SelectItem value="4weeks">1 Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message or specific requirements"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="btn-primary w-full">
                  Send Enquiry
                </Button>

                <div
                  className={
                    isSubmitted
                      ? "mt-4 p-4 bg-green-50 border border-green-200 rounded-lg active"
                      : "mt-4 p-4 bg-green-50 border border-green-200 rounded-lg inactive"
                  }
                >
                  <p className="text-green-800 font-medium text-center">
                    Thank You for contacting Eden, We will reach out to you
                    shortly.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-eden-dark mb-6">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <ContactInfo
                  icon={<MapPin />}
                  title="Location"
                  content={
                    <address className="not-italic">
                      Khasra 39 & 40, Near Vaibhav Farms,
                      <br />
                      Purkul Road, Bhagwantpur,
                      <br />
                      Dehradun 248 009, Uttarakhand, India
                    </address>
                  }
                />

                <ContactInfo
                  icon={<Phone />}
                  title="Phone"
                  content={
                    <div className="space-y-1">
                      <a href="tel:+917533909333" className="hover:text-eden block">
                        +91-7533909333
                      </a>
                      <a href="tel:+918448194646" className="hover:text-eden block">
                        +91-8448194646
                      </a>
                    </div>
                  }
                />

                <ContactInfo
                  icon={<Mail />}
                  title="Email"
                  content={
                    <div className="space-y-1">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=reservations@edenwellnesshospitality.com"
                        target="_blank"
                        className="hover:text-eden block"
                      >
                        reservations@edenwellnesshospitality.com
                      </a>
                    </div>
                  }
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg h-80 shadow-md">
              {/* This is a placeholder for a map. In a real implementation, you would use Google Maps or similar */}
              <div className="w-full h-full bg-eden-light/50 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.973118789161!2d78.0668453!3d30.4022508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d781c32e1e33%3A0xc44581aeff8d738a!2sEden%20-%20Senior%20Living%20%26%20Wellness!5e0!3m2!1sen!2sin!4v1718088888888"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "5px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* <div className="text-center p-6">
                  <MapPin className="mx-auto mb-4 text-eden" size={32} />
                  <h4 className="text-xl font-serif text-eden-dark mb-1">
                    Eden Wellness & Hospitality
                  </h4>
                  <p className="text-eden-text">Dehradun, Uttarakhand</p>
                </div> */}
                {/* {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full text-eden-dark">
                    Loading map...
                  </div>
                )} */}
                <div className="overflow-hidden rounded-lg h-80 shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
