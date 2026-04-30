import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Home, Calendar, Phone } from "lucide-react";
const ThankYouPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">
                Thank You for Your Interest!
              </h1>

              <p className="text-lg text-center text-stone-600 leading-relaxed">
                We’re glad to help you plan your stay at Eden.
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-stone-200 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-stone-800">
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-stone-600 text-sm text-center">
                  Our team will review your preferences and get in touch within
                  24 hours.
                </p>

                <div className="flex items-start space-x-4">
                  <div className="text-left"></div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-left"></div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 mb-8">
              <h3 className="font-semibold text-emerald-800 mb-2">
              Need Help Right Now?
              </h3>
              <p className="text-emerald-700 text-sm mb-4">
              If you have urgent questions or want to speak with someone immediately, feel free to reach out.
              </p>
              <div className="flex items-center justify-center space-x-2 text-emerald-700">
                <Phone className="w-4 h-4" />
                <a href="tel:+917533909333" ><span className="font-medium">+91-7533909333</span></a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default ThankYouPage;
