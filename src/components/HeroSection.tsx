import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { useHeroContent } from '@/hooks/useDatabase';

const HeroSection = () => {
  const { heroContent, isLoading } = useHeroContent();

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-islamic opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in-up">
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
                <span className="ml-2 text-white">Memuat konten...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Use database content or fallback to default
  const title = heroContent?.title || "Takmir Pinter";
  const subtitle = heroContent?.subtitle || "Platform digital untuk mengelola masjid dengan lebih baik, menyediakan akses mudah ke kajian dan informasi kegiatan masjid.";
  const mosqueBadge = heroContent?.mosque_badge || "🕌 Masjid Al-Hidayah";
  const buttonPrimaryText = heroContent?.button_primary_text || "Lihat Jadwal Kegiatan";
  const buttonSecondaryText = heroContent?.button_secondary_text || "Tonton Kajian";

  return (
    <section className="relative overflow-hidden">
      {/* Background with Islamic gradient */}
      <div className="absolute inset-0 gradient-islamic opacity-90" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white animate-fade-in-up">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              {mosqueBadge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {title.includes("Pinter") ? (
                <>
                  {title.split("Pinter")[0]}
                  <span className="text-yellow-300 font-extrabold drop-shadow-lg">
                    Pinter
                  </span>
                  {title.split("Pinter")[1]}
                </>
              ) : (
                title
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-50 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {buttonPrimaryText}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-emerald-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {buttonSecondaryText}
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
                  <Button className="w-full gradient-islamic text-white hover:opacity-90 font-semibold shadow-lg">
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