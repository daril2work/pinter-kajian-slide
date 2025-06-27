import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MapPin, RefreshCw, Settings, Globe, Clock } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { prayerTimesService, LocationCoordinates, PrayerTime } from '@/services/prayerTimesApi';

interface PrayerTimesSettingsProps {
  onPrayerTimesUpdate: (prayerTimes: PrayerTime[], location: LocationCoordinates) => void;
}

const PrayerTimesSettings: React.FC<PrayerTimesSettingsProps> = ({ onPrayerTimesUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [useApi, setUseApi] = useState(true);
  const [autoLocation, setAutoLocation] = useState(true);
  const [city, setCity] = useState('Jakarta');
  const [country, setCountry] = useState('Indonesia');
  const [calculationMethod, setCalculationMethod] = useState('20'); // Indonesia method
  const [currentLocation, setCurrentLocation] = useState<LocationCoordinates | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const calculationMethods = prayerTimesService.getCalculationMethods();

  useEffect(() => {
    // Load prayer times on component mount
    if (useApi) {
      loadPrayerTimes();
    }
  }, []);

  const loadPrayerTimes = async () => {
    setIsLoading(true);
    try {
      let result;
      
      if (autoLocation) {
        result = await prayerTimesService.getPrayerTimesForCurrentLocation();
        setCurrentLocation(result.location);
        setCity(result.location.city);
        setCountry(result.location.country);
      } else {
        const prayerTimes = await prayerTimesService.getPrayerTimesByCity(
          city, 
          country, 
          parseInt(calculationMethod)
        );
        result = {
          prayerTimes,
          location: { latitude: 0, longitude: 0, city, country }
        };
      }
      
      onPrayerTimesUpdate(result.prayerTimes, result.location);
      setLastUpdate(new Date());
      toast.success('Jadwal shalat berhasil diperbarui dari API');
    } catch (error) {
      console.error('Error loading prayer times:', error);
      toast.error('Gagal memuat jadwal shalat dari API. Menggunakan jadwal default.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (useApi) {
      loadPrayerTimes();
    }
  };

  const handleLocationToggle = (enabled: boolean) => {
    setAutoLocation(enabled);
    if (enabled && useApi) {
      loadPrayerTimes();
    }
  };

  const handleApiToggle = (enabled: boolean) => {
    setUseApi(enabled);
    if (enabled) {
      loadPrayerTimes();
    } else {
      toast.info('Beralih ke mode manual. Anda dapat mengatur jadwal shalat secara manual.');
    }
  };

  const handleManualUpdate = () => {
    if (!autoLocation && useApi) {
      loadPrayerTimes();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Pengaturan Jadwal Shalat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-medium">Gunakan API Jadwal Shalat</Label>
            <p className="text-sm text-gray-500">
              Otomatis mengambil jadwal shalat akurat berdasarkan lokasi
            </p>
          </div>
          <Switch
            checked={useApi}
            onCheckedChange={handleApiToggle}
          />
        </div>

        {useApi && (
          <>
            {/* Auto Location Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Deteksi Lokasi Otomatis</Label>
                <p className="text-sm text-gray-500">
                  Gunakan GPS untuk mendeteksi lokasi Anda
                </p>
              </div>
              <Switch
                checked={autoLocation}
                onCheckedChange={handleLocationToggle}
              />
            </div>

            {/* Manual Location Input */}
            {!autoLocation && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Kota</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Jakarta"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Negara</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Indonesia"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleManualUpdate}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Update Berdasarkan Kota
                </Button>
              </div>
            )}

            {/* Calculation Method */}
            <div className="space-y-2">
              <Label>Metode Perhitungan</Label>
              <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode perhitungan" />
                </SelectTrigger>
                <SelectContent>
                  {calculationMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id.toString()}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Untuk Indonesia, disarankan menggunakan "Kementerian Agama, Indonesia"
              </p>
            </div>

            {/* Current Location Info */}
            {currentLocation && (
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Lokasi Saat Ini</span>
                </div>
                <div className="space-y-1 text-sm text-emerald-700">
                  <p><strong>Kota:</strong> {currentLocation.city}</p>
                  <p><strong>Negara:</strong> {currentLocation.country}</p>
                  {currentLocation.latitude !== 0 && (
                    <p>
                      <strong>Koordinat:</strong> {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Last Update Info */}
            {lastUpdate && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Terakhir diperbarui: {lastUpdate.toLocaleString('id-ID')}</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  API Aktif
                </Badge>
              </div>
            )}

            {/* Refresh Button */}
            <Button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="w-full gradient-islamic text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Memperbarui...' : 'Perbarui Jadwal Shalat'}
            </Button>
          </>
        )}

        {!useApi && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">Mode Manual</span>
            </div>
            <p className="text-sm text-yellow-700">
              API dinonaktifkan. Anda dapat mengatur jadwal shalat secara manual di tabel di bawah.
            </p>
          </div>
        )}

        {/* API Info */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">Tentang API</span>
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Menggunakan API Aladhan untuk jadwal shalat yang akurat</p>
            <p>• Mendukung berbagai metode perhitungan internasional</p>
            <p>• Otomatis menyesuaikan dengan lokasi dan zona waktu</p>
            <p>• Data diperbarui setiap hari secara otomatis</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesSettings;