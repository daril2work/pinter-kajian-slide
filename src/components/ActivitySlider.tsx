
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useRef } from "react";

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  speaker: string;
  location: string;
  thumbnail: string;
  category: string;
  description: string;
}

interface ActivitySliderProps {
  activities: Activity[];
}

const ActivitySlider = ({ activities }: ActivitySliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of one card plus gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-6 hover:translate-x-0"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right scroll button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-6 hover:translate-x-0"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activities.map((activity, index) => (
          <Card 
            key={activity.id}
            className="flex-shrink-0 w-80 group/card cursor-pointer card-hover bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={activity.thumbnail} 
                  alt={activity.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                  {activity.category}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                    {activity.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                    {activity.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                    {activity.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2 text-emerald-600" />
                    {activity.speaker}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                    {activity.location}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    ID: {activity.id}
                  </span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivitySlider;
