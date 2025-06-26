
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with Islamic pattern */}
      <div className="absolute inset-0 gradient-islamic opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white animate-fade-in-up">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🕌 Masjid Al-Hidayah
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Takmir{" "}
              <span className="text-gradient bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                Pinter
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-50 leading-relaxed">
              Platform digital untuk mengelola masjid dengan lebih baik, 
              menyediakan akses mudah ke kajian dan informasi kegiatan masjid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
                Lihat Jadwal Kegiatan
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                Tonton Kajian
              </Button>
            </div>
          </div>

          {/* Right content - Featured Activity Card */}
          <div className="animate-scale-in">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=500&h=280&fit=crop"
                    alt="Featured Kajian"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                    Kajian Terbaru
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Keutamaan Menuntut Ilmu dalam Islam
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                      Senin, 15 Januari 2024
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                      19:30 - 21:00 WIB
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                      Masjid Al-Hidayah
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ustadz Ahmad Syahid akan membahas tentang pentingnya menuntut ilmu 
                    dalam perspektif Islam dan bagaimana mengaplikasikannya dalam kehidupan sehari-hari.
                  </p>
                  <Button className="w-full gradient-islamic text-white hover:opacity-90">
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
