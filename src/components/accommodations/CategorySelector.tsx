
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronLeft, Home } from "lucide-react";
import { RoomType, RoomCategory } from "@/types/accommodation";
import { roomCategories } from "../../data/packageData";

interface RoomCategorySelectorProps {
  roomType: RoomType;
  onSelect: (category: RoomCategory) => void;
  onBack: () => void;
}

const RoomCategorySelector = ({ roomType, onSelect, onBack }: RoomCategorySelectorProps) => {
  const categories = roomCategories.filter(cat => cat.roomTypeId === roomType.id);

  return (
    <div className="space-y-10">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex items-center space-x-2 border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-stone-400 rounded-xl"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Button>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Home className="w-8 h-8 text-eden mr-3" />
          <h2 className="text-4xl font-serif font-bold text-stone-800">
            Choose Your {roomType.name} Collection
          </h2>
        </div>
        <p className="text-stone-600 text-lg font-light">Select from our curated sanctuary categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.id} className="group hover:-translate-y-2 transition-all duration-700 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <Badge className="absolute top-6 left-6 bg-white/90 text-stone-700 hover:bg-white border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                {category.size}
              </Badge>
            </div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-serif font-bold text-stone-800">
                {category.name}
              </CardTitle>
              <CardDescription className="text-stone-600 leading-relaxed font-light">
                {category.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium text-stone-800">Sanctuary Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-stone-100 text-stone-700 border-0 rounded-full">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-stone-600">
                  <Users className="w-5 h-5 text-eden" />
                  <span className="font-medium">{category.guests} guests</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500 font-medium">Starting from</p>
                  <p className="text-2xl font-serif font-bold text-emerald-700">
                    ₹{category.startingPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-stone-500">per night</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-eden hover:bg-emerald-700 text-white border-0 py-6 text-lg font-medium transition-all duration-300 rounded-xl"
                onClick={() => onSelect(category)}
              >
                Choose stay options
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomCategorySelector;
