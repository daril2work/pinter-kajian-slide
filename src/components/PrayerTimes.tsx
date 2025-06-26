
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

const PrayerTimes = () => {
  const prayerTimes = [
    { name: "Subuh", time: "04:45", status: "completed" },
    { name: "Dzuhur", time: "12:15", status: "completed" },
    { name: "Ashar", time: "15:30", status: "current" },
    { name: "Maghrib", time: "18:45", status: "upcoming" },
    { name: "Isya", time: "20:00", status: "upcoming" },
  ];

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="py-12 px-4 bg-white/50 backdrop-blur-sm border-t border-emerald-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jadwal Shalat Hari Ini</h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Jakarta, Indonesia</span>
            <span>•</span>
            <span>{currentDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {prayerTimes.map((prayer, index) => (
            <Card 
              key={prayer.name}
              className={`text-center card-hover border-0 shadow-md animate-fade-in-up ${
                prayer.status === 'current' 
                  ? 'gradient-islamic text-white' 
                  : 'bg-white/80 backdrop-blur-sm'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2">
                  <Clock className={`w-6 h-6 ${
                    prayer.status === 'current' ? 'text-white' : 'text-emerald-600'
                  }`} />
                  <h3 className={`font-bold text-lg ${
                    prayer.status === 'current' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {prayer.name}
                  </h3>
                  <p className={`text-xl font-mono ${
                    prayer.status === 'current' ? 'text-white' : 'text-gray-700'
                  }`}>
                    {prayer.time}
                  </p>
                  {prayer.status === 'current' && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      Waktu Shalat
                    </Badge>
                  )}
                  {prayer.status === 'completed' && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
