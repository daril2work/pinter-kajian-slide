
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, MapPin, Users } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ActivitySlider from "@/components/ActivitySlider";
import KajianPlayer from "@/components/KajianPlayer";
import PrayerTimes from "@/components/PrayerTimes";

const Index = () => {
  const [selectedKajian, setSelectedKajian] = useState(null);

  // Sample data - in real app, this would come from API
  const upcomingActivities = [
    {
      id: 1,
      title: "Kajian Fiqh Muamalah",
      date: "2024-01-15",
      time: "19:30",
      speaker: "Ustadz Ahmad Syahid",
      location: "Masjid Al-Hidayah",
      thumbnail: "https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=400&h=250&fit=crop",
      category: "Fiqh",
      description: "Pembahasan mendalam tentang hukum-hukum muamalah dalam Islam kontemporer"
    },
    {
      id: 2,
      title: "Tafsir Al-Qur'an Surah Al-Baqarah",
      date: "2024-01-16",
      time: "20:00",
      speaker: "Ustadz Muhammad Hasan",
      location: "Masjid Al-Hidayah",
      thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=250&fit=crop",
      category: "Tafsir",
      description: "Mempelajari makna dan hikmah dari ayat-ayat dalam Surah Al-Baqarah"
    },
    {
      id: 3,
      title: "Sirah Nabawiyah",
      date: "2024-01-17",
      time: "19:00",
      speaker: "Ustadz Abdullah Rahman",
      location: "Masjid Al-Hidayah",
      thumbnail: "https://images.unsplash.com/photo-1584286595398-a59f21d47def?w=400&h=250&fit=crop",
      category: "Sirah",
      description: "Mengkaji kehidupan Rasulullah SAW sebagai teladan umat"
    }
  ];

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

  const kajianVideos = [
    {
      id: 1,
      title: "Keutamaan Ilmu dalam Islam",
      speaker: "Ustadz Ahmad Syahid",
      duration: "45:23",
      views: "1.2K",
      thumbnail: "https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=400&h=250&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Akhlak"
    },
    {
      id: 2,
      title: "Manajemen Waktu dalam Islam",
      speaker: "Ustadz Muhammad Hasan",
      duration: "38:15",
      views: "856",
      thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=250&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Motivasi"
    },
    {
      id: 3,
      title: "Adab Bermuamalah",
      speaker: "Ustadz Abdullah Rahman",
      duration: "52:10",
      views: "2.1K",
      thumbnail: "https://images.unsplash.com/photo-1584286595398-a59f21d47def?w=400&h=250&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Fiqh"
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
        <ActivitySlider activities={upcomingActivities} />
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kajianVideos.map((kajian) => (
            <Card 
              key={kajian.id} 
              className="group cursor-pointer card-hover bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              onClick={() => setSelectedKajian(kajian)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={kajian.thumbnail} 
                    alt={kajian.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <Play className="w-6 h-6 text-emerald-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-700">
                    {kajian.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {kajian.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{kajian.title}</h3>
                  <p className="text-sm text-emerald-600 mb-2">{kajian.speaker}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    {kajian.views} views
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Kajian Player Modal */}
      {selectedKajian && (
        <KajianPlayer 
          kajian={selectedKajian} 
          onClose={() => setSelectedKajian(null)}
          relatedKajian={kajianVideos.filter(k => k.id !== selectedKajian.id)}
        />
      )}
    </div>
  );
};

export default Index;
