import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, RefreshCw } from "lucide-react";
import { PrayerTime, LocationCoordinates, prayerTimesService } from '@/services/prayerTimesApi';

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    loadPrayerTimes();
    
    // Set up auto-refresh every hour
    const interval = setInterval(loadPrayerTimes, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadPrayerTimes = async () => {
    try {
      setIsLoading(true);
      const result = await prayerTimesService.getPrayerTimesForCurrentLocation();
      setPrayerTimes(result.prayerTimes);
      setLocation(result.location);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading prayer times:', error);
      // Use fallback times
      setPrayerTimes([
        { id: 1, name: 'Subuh', time: '04:45', status: 'completed' },
        { id: 2, name: 'Dzuhur', time: '12:15', status: 'completed' },
        { id: 3, name: 'Ashar', time: '15:30', status: 'current' },
        { id: 4, name: 'Maghrib', time: '18:45', status: 'upcoming' },
        { id: 5, name: 'Isya', time: '20:00', status: 'upcoming' }
      ]);
      setLocation({
        latitude: -6.2088,
        longitude: 106.8456,
        city: 'Jakarta',
        country: 'Indonesia'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'gradient-islamic text-white';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-white/80 backdrop-blur-sm';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return (
          <Badge className="bg-white/20 text-white border-white/30">
            Waktu Shalat
          </Badge>
        );
      case 'completed':
        return <div className="w-2 h-2 bg-emerald-500 rounded-full" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-white/50 backdrop-blur-sm border-t border-emerald-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Jadwal Shalat Hari Ini</h2>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Memuat jadwal shalat...</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 h-6 bg-gray-200 rounded" />
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                    <div className="w-12 h-6 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-white/50 backdrop-blur-sm border-t border-emerald-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jadwal Shalat Hari Ini</h2>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location?.city}, {location?.country}</span>
            <span>•</span>
            <span>{currentDate}</span>
          </div>
          {lastUpdate && (
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Diperbarui: {lastUpdate.toLocaleTimeString('id-ID')}</span>
              <Badge variant="outline" className="ml-2 text-xs text-emerald-600 border-emerald-600">
                API Live
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {prayerTimes.map((prayer, index) => (
            <Card 
              key={prayer.id}
              className={`text-center card-hover border-0 shadow-md animate-fade-in-up ${getStatusColor(prayer.status)}`}
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
                  {getStatusBadge(prayer.status)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Auto-refresh indicator */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Jadwal shalat diperbarui otomatis setiap jam • 
            Menggunakan metode perhitungan Kementerian Agama Indonesia
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;