
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Users, Star } from 'lucide-react';
import { accomodation_data } from '../Data';

interface Package {
  id: string;
  name: string;
  duration: string;
  price: number;
  savings: number;
  description: string;
  features: string[];
  avgPerNight: string;
}

interface PackageSelectorProps {
  values: any;
  onPackageSelect: (packageData: Package) => void;
  onBack: () => void;
}

const PackageSelector = ({
  values,
  onPackageSelect,
  onBack
}: PackageSelectorProps) => {
  let packages:any = accomodation_data[values.roomTypeId][values.id];
  return (
    <div className="space-y-8 mb-16" id='pick_plans'>
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">
          Pick Your Perfect Stay Plan
        </h2>
        <p className="text-stone-600 font-light">
          Choose a plan that fits your time and lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Object.keys(packages).map((pkg, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm relative min-h-[500px] md:min-h-[600px] flex flex-col ${index === 1 ? 'border-2 border-eden shadow-lg' : ''}`}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-eden text-white border-eden px-3 md:px-4 py-1 rounded-full flex items-center text-xs md:text-sm">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            )}
            <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 pb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-eden/10 text-eden border-eden px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                  Save {Math.ceil((
                    ((parseInt(packages[pkg].orignal_per_night) *packages[pkg].days)
                     - (parseInt(packages[pkg].price) - parseInt(packages[pkg].voucher)))
                     /(parseInt(packages[pkg].orignal_per_night) *parseInt(pkg.split(" ")[0])))*100)}%
                </Badge>
                {/* ((packages[pkg].days* packages[pkg].orignal_per_night) + packages[pkg].voucher)/packages[pkg].orignal_per_night  */}
                <div className="flex items-center text-stone-600">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  <span className="text-xs md:text-sm">{packages[pkg].days} Days</span>
                </div>
              </div>
              <CardTitle className="text-lg md:text-xl font-serif text-stone-800">{pkg} Plan</CardTitle>
              <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                ₹{packages[pkg].price.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-stone-600">
               Savings worth <b>
               ₹{(((parseInt(packages[pkg].orignal_per_night) *packages[pkg].days)
                     - (parseInt(packages[pkg].price) - parseInt(packages[pkg].voucher)))).toLocaleString()}
               </b>
              </div>
            </CardHeader>
            <CardContent className="pt-4 md:pt-6 flex flex-col flex-grow px-4 md:px-6">
              <p className="text-stone-600 mb-4 md:mb-6 font-light text-sm md:text-base">
                {packages[pkg].days== 7 ? "Perfect for short getaways" : ""  }
                {packages[pkg].days== 14 ? "Perfect for longer renewal" : ""  }
                {packages[pkg].days== 30 ? "Ideal for deep restoration" : ""  }
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 flex-grow">
                {packages[pkg].features.map((feature:any, idx:any) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-eden mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-stone-600 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full bg-eden hover:bg-emerald-700 text-white rounded-xl py-2 md:py-3 mt-auto text-sm md:text-base font-medium" 
                onClick={() =>{
                  onPackageSelect(packages[pkg])
                  setTimeout(() => {
                    let element = document.getElementById("book-now");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 300);
                }}
              >
                Select Package
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageSelector;
