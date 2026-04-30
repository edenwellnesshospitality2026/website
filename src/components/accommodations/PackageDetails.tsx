
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Gift, ChevronLeft } from "lucide-react";
import { packages } from "../../data/packageData";
import { PackageInfo } from "@/types/accommodation";

interface PackageDetailsProps {
  selectedPackage: PackageInfo;
  onSelect: () => void;
  onBack: () => void;
}

const PackageDetails = ({ selectedPackage, onSelect, onBack }: PackageDetailsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center space-x-2 border-stone-300 text-stone-600 hover:bg-stone-50 rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Packages</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-eden rounded-full"></div>
              <h1 className="text-3xl font-serif font-bold text-stone-800">{selectedPackage.name}</h1>
              <Badge className="bg-teal-100 text-teal-800 rounded-full">
                Save {selectedPackage.savings}%
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-stone-600 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{selectedPackage.duration}</span>
              </div>
            </div>
            <p className="text-stone-600 text-lg leading-relaxed font-light">
              {selectedPackage.description}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-stone-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 font-serif text-stone-800">
                <Check className="w-5 h-5 text-eden" />
                <span>What's Included</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-eden rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stone-700 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 font-serif text-emerald-800">
                <Gift className="w-5 h-5 text-emerald-600" />
                <span>Complimentary Add-ons</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPackage.addOns.map((addOn, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-emerald-800 font-light">{addOn}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8 bg-white/90 backdrop-blur-sm border-stone-200 shadow-xl">
            <CardHeader className="text-center">
              <div className="text-4xl font-serif font-bold text-emerald-700 mb-2">
                ₹{selectedPackage.total.toLocaleString()}
              </div>
              <CardDescription className="font-light text-stone-600">
                Total package value
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h4 className="font-medium text-stone-800 mb-3">Package Highlights</h4>
                <div className="space-y-2 text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-medium">{selectedPackage.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Savings</span>
                    <span className="font-medium text-emerald-600">{selectedPackage.savings}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Features Included</span>
                    <span className="font-medium">{selectedPackage.features.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complimentary Add-ons</span>
                    <span className="font-medium">{selectedPackage.addOns.length}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={onSelect}
                className="w-full bg-eden hover:bg-emerald-700 text-white rounded-xl py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Select This Package
              </Button>

              <p className="text-xs text-stone-500 text-center font-light">
                All prices are inclusive of taxes. Final pricing may vary based on availability and customization.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
