
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Star } from 'lucide-react';

interface JourneyCTASectionProps {
  onStartJourney: () => void;
}

const JourneyCTASection = ({ onStartJourney }: JourneyCTASectionProps) => {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 mt-20 rounded-3xl overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-eden/10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-200/20 rounded-full translate-x-20 translate-y-20"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-8 h-8 text-eden fill-current" />
                      <Star className="w-6 h-6 text-amber-400 fill-current" />
                      <Heart className="w-8 h-8 text-eden fill-current" />
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
                    Your Wellness Journey 
                    <span className="block text-eden">Awaits</span>
                  </h2>
                  <p className="text-stone-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                    Step into a world where comfort meets wellness, where every moment is crafted for your peace and rejuvenation.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-eden/10 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="w-8 h-8 text-eden" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-stone-800">Personalized Care</h3>
                    <p className="text-stone-600 text-sm">Tailored wellness programs designed just for you</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-stone-800">Premium Comfort</h3>
                    <p className="text-stone-600 text-sm">Luxurious amenities in serene surroundings</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                      <ArrowRight className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-stone-800">Seamless Experience</h3>
                    <p className="text-stone-600 text-sm">Every detail thoughtfully planned for your stay</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-6">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-eden to-emerald-700 hover:from-emerald-700 hover:to-eden text-white px-12 py-6 rounded-2xl text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                    onClick={onStartJourney}
                  >
                    Begin Your Wellness Journey
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                  <p className="text-stone-500 text-sm">
                    Join hundreds of guests who have found their perfect sanctuary with us
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JourneyCTASection;
