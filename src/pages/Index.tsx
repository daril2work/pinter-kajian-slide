import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, MapPin, Users, Loader2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ActivitySlider from "@/components/ActivitySlider";
import KajianPlayer from "@/components/KajianPlayer";
import PrayerTimes from "@/components/PrayerTimes";
import { useKajian, useActivities, useInitializeApp } from '@/hooks/useDatabase';
import { databaseService } from '@/services/database';

const Index = () => {
  const { isInitialized, isInitializing } = useInitializeApp();
  const { kajianList, isLoading: kajianLoading } = useKajian();
  const { activities, isLoading: activitiesLoading } = useActivities();
  const [selectedKajian, setSelectedKajian] = useState(null);
  const [featuredKajian, setFeaturedKajian] = useState([]);
  const [upcomingKajian, setUpcomingKajian] = useState([]);

  // Load featured and upcoming kajian
  useEffect(() => {
    const loadKajianData = async () => {
      try {
        const [featured, upcoming] = await Promise.all([
          databaseService.getFeaturedKajian(),
          databaseService.getUpcomingKajian()
        ]);
        setFeaturedKajian(featured);
        setUpcomingKajian(upcoming);
      } catch (error) {
        console.error('Error loading kajian data:', error);
      }
    };

    if (isInitialized) {
      loadKajianData();
    }
  }, [isInitialized]);

  // Transform database kajian to component format
  const transformKajianToActivity = (kajian: any) => ({
    id: kajian.id,
    title: kajian.title,
    date: kajian.date,
    time: kajian.start_time,
    speaker: kajian.speaker,
    location: kajian.location,
    thumbnail: kajian.image_url || "https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=400&h=250&fit=crop",
    category: "Kajian",
    description: kajian.description || "Kajian Islam yang bermanfaat"
  });

  const transformKajianToVideo = (kajian: any) => ({
    id: kajian.id,
    title: kajian.title,
    speaker: kajian.speaker,
    duration: "45:23", // Default duration
    views: "1.2K", // Default views
    thumbnail: kajian.image_url || "https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=400&h=250&fit=crop",
    videoUrl: kajian.video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Kajian"
  });

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  // Sample weekly activities (static for now)
  const weeklyActivities = [
    {
      id: 4,
      title: "Tahsin Al-Qur'an",
      date: "Setiap Rabu",
      time: "16:00",
      speaker: "Ustadzah Fatimah",
      location: "Masjid Al-Hidayah",
      thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=250&fit=crop",
      category: "Tahsin",
      description: "Belajar membaca Al-Qur'an dengan tartil dan benar"
    },
    {
      id: 5,
      title: "Kajian Akhlak",
      date: "Setiap Jumat",
      time: "20:00",
      speaker: "Ustadz Yusuf Ali",
      location: "Masjid Al-Hidayah",
      thumbnail: "https://images.unsplash.com/photo-1596508073457-bbf05b0b9d37?w=400&h=250&fit=crop",
      category: "Akhlak",
      description: "Pembinaan akhlak mulia dalam kehidupan sehari-hari"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Prayer Times */}
      <PrayerTimes />
      
      {/* Upcoming Activities Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Kegiatan Mendatang</h2>
          <p className="text-gray-600">Jangan lewatkan kajian dan kegiatan menarik minggu ini</p>
        </div>
        
        {kajianLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="ml-2 text-gray-600">Memuat kegiatan...</span>
          </div>
        ) : (
          <ActivitySlider 
            activities={upcomingKajian.map(transformKajianToActivity)} 
          />
        )}
      </section>

      {/* Weekly Activities Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Kegiatan Rutin</h2>
          <p className="text-gray-600">Program mingguan yang bisa Anda ikuti secara konsisten</p>
        </div>
        <ActivitySlider activities={weeklyActivities} />
      </section>

      {/* Kajian Videos Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Kajian Terpopuler</h2>
          <p className="text-gray-600">Tonton kembali kajian-kajian yang paling banyak ditonton</p>
        </div>
        
        {kajianLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="ml-2 text-gray-600">Memuat kajian...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kajianList
              .filter(kajian => kajian.video_url) // Only show kajian with videos
              .slice(0, 6) // Limit to 6 items
              .map((kajian) => {
                const videoData = transformKajianToVideo(kajian);
                return (
                  <Card 
                    key={kajian.id} 
                    className="group cursor-pointer card-hover bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                    onClick={() => setSelectedKajian(videoData)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={videoData.thumbnail} 
                          alt={videoData.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                            <Play className="w-6 h-6 text-emerald-600 ml-1" fill="currentColor" />
                          </div>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-700">
                          {videoData.category}
                        </Badge>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {videoData.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{videoData.title}</h3>
                        <p className="text-sm text-emerald-600 mb-2">{videoData.speaker}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {videoData.views} views
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            
            {kajianList.filter(kajian => kajian.video_url).length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Belum ada kajian dengan video tersedia.</p>
                <p className="text-sm">Video akan muncul setelah admin menambahkan link video Facebook.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Kajian Player Modal */}
      {selectedKajian && (
        <KajianPlayer 
          kajian={selectedKajian} 
          onClose={() => setSelectedKajian(null)}
          relatedKajian={kajianList
            .filter(k => k.video_url && k.id !== selectedKajian.id)
            .map(transformKajianToVideo)
            .slice(0, 5)
          }
        />
      )}
    </div>
  );
};

export default Index;