import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Settings, 
  Calendar, 
  BookOpen, 
  Clock, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Video,
  Image as ImageIcon
} from "lucide-react";
import EnhancedKajianForm from '@/components/EnhancedKajianForm';
import PrayerTimesSettings from '@/components/PrayerTimesSettings';
import { toast } from "@/components/ui/sonner";
import { PrayerTime, LocationCoordinates } from '@/services/prayerTimesApi';

// Mock data - nanti akan diganti dengan data dari database
const mockHeroContent = {
  title: "Takmir Pinter",
  subtitle: "Platform digital untuk mengelola masjid dengan lebih baik, menyediakan akses mudah ke kajian dan informasi kegiatan masjid.",
  mosqueBadge: "🕌 Masjid Al-Hidayah"
};

const mockKajian = [
  {
    id: 1,
    title: "Keutamaan Menuntut Ilmu dalam Islam",
    speaker: "Ustadz Ahmad Syahid",
    date: "2024-01-15",
    start_time: "19:30",
    end_time: "21:00",
    location: "Masjid Al-Hidayah",
    description: "Ustadz Ahmad Syahid akan membahas tentang pentingnya menuntut ilmu dalam perspektif Islam dan bagaimana mengaplikasikannya dalam kehidupan sehari-hari.",
    image_url: "https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=500&h=280&fit=crop",
    video_url: "https://www.facebook.com/watch/?v=123456789",
    status: "upcoming",
    is_featured: true
  },
  {
    id: 2,
    title: "Tafsir Al-Qur'an Surah Al-Baqarah",
    speaker: "Ustadz Muhammad Hasan",
    date: "2024-01-20",
    start_time: "20:00",
    end_time: "21:30",
    location: "Masjid Al-Hidayah",
    description: "Mempelajari makna dan hikmah dari ayat-ayat dalam Surah Al-Baqarah",
    image_url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&h=280&fit=crop",
    video_url: "",
    status: "upcoming",
    is_featured: false
  }
];

const Admin = () => {
  const [heroContent, setHeroContent] = useState(mockHeroContent);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationCoordinates | null>(null);
  const [kajianList, setKajianList] = useState(mockKajian);
  const [showKajianForm, setShowKajianForm] = useState(false);
  const [editingKajian, setEditingKajian] = useState(null);

  const handleSaveHero = () => {
    console.log('Saving hero content:', heroContent);
    toast.success('Hero section berhasil disimpan');
  };

  const handlePrayerTimesUpdate = (newPrayerTimes: PrayerTime[], location: LocationCoordinates) => {
    setPrayerTimes(newPrayerTimes);
    setCurrentLocation(location);
  };

  const handleSavePrayerTimes = () => {
    console.log('Saving prayer times:', prayerTimes);
    toast.success('Jadwal shalat berhasil disimpan');
  };

  const updatePrayerTime = (id: number, field: string, value: string) => {
    setPrayerTimes(prev => prev.map(prayer => 
      prayer.id === id ? { ...prayer, [field]: value } : prayer
    ));
  };

  const handleAddKajian = () => {
    setEditingKajian(null);
    setShowKajianForm(true);
  };

  const handleEditKajian = (kajian: any) => {
    setEditingKajian(kajian);
    setShowKajianForm(true);
  };

  const handleDeleteKajian = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kajian ini?')) {
      setKajianList(prev => prev.filter(k => k.id !== id));
      toast.success('Kajian berhasil dihapus');
    }
  };

  const handleKajianSubmit = (data: any) => {
    if (editingKajian) {
      // Update existing kajian
      setKajianList(prev => prev.map(k => 
        k.id === editingKajian.id ? { ...k, ...data } : k
      ));
      toast.success('Kajian berhasil diupdate');
    } else {
      // Add new kajian
      const newKajian = {
        ...data,
        id: Date.now(), // Simple ID generation
        status: 'upcoming'
      };
      setKajianList(prev => [...prev, newKajian]);
      toast.success('Kajian berhasil ditambahkan');
    }
    setShowKajianForm(false);
    setEditingKajian(null);
  };

  const handleKajianCancel = () => {
    setShowKajianForm(false);
    setEditingKajian(null);
  };

  const formatTime = (time: string) => {
    return time ? `${time}` : '-';
  };

  const formatDate = (date: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (showKajianForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <EnhancedKajianForm
            kajian={editingKajian}
            onSubmit={handleKajianSubmit}
            onCancel={handleKajianCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Kelola konten aplikasi Takmir Pinter</p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="prayer" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Jadwal Shalat
            </TabsTrigger>
            <TabsTrigger value="kajian" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Kajian
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Edit Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Utama</Label>
                  <Input
                    id="title"
                    value={heroContent.title}
                    onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="badge">Badge Masjid</Label>
                  <Input
                    id="badge"
                    value={heroContent.mosqueBadge}
                    onChange={(e) => setHeroContent({...heroContent, mosqueBadge: e.target.value})}
                  />
                </div>
                <Button onClick={handleSaveHero} className="gradient-islamic text-white">
                  Simpan Perubahan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayer">
            <div className="space-y-6">
              {/* Prayer Times Settings */}
              <PrayerTimesSettings onPrayerTimesUpdate={handlePrayerTimesUpdate} />
              
              {/* Manual Prayer Times Table */}
              {prayerTimes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Jadwal Shalat Saat Ini</CardTitle>
                    {currentLocation && (
                      <p className="text-sm text-gray-600">
                        Lokasi: {currentLocation.city}, {currentLocation.country}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Waktu Shalat</TableHead>
                          <TableHead>Jam</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prayerTimes.map((prayer) => (
                          <TableRow key={prayer.id}>
                            <TableCell className="font-medium">{prayer.name}</TableCell>
                            <TableCell>
                              <Input
                                type="time"
                                value={prayer.time}
                                onChange={(e) => updatePrayerTime(prayer.id, 'time', e.target.value)}
                                className="w-32"
                              />
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={prayer.status === 'current' ? 'default' : 'outline'}
                                className={prayer.status === 'current' ? 'bg-emerald-600' : ''}
                              >
                                {prayer.status === 'current' ? 'Sekarang' : 
                                 prayer.status === 'completed' ? 'Selesai' : 'Akan Datang'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button onClick={handleSavePrayerTimes} className="mt-4 gradient-islamic text-white">
                      Simpan Perubahan Manual
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="kajian">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Kelola Kajian</h2>
                <Button onClick={handleAddKajian} className="gradient-islamic text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kajian
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kajian</TableHead>
                        <TableHead>Pemateri</TableHead>
                        <TableHead>Jadwal</TableHead>
                        <TableHead>Media</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {kajianList.map((kajian) => (
                        <TableRow key={kajian.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{kajian.title}</div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span className="text-sm text-gray-500">{kajian.location}</span>
                              </div>
                              {kajian.is_featured && (
                                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                  Unggulan
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{kajian.speaker}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <span className="text-sm">{formatDate(kajian.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-500" />
                                <span className="text-sm">
                                  {formatTime(kajian.start_time)} - {formatTime(kajian.end_time)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {kajian.image_url && (
                                <Badge variant="outline" className="text-xs">
                                  <ImageIcon className="w-3 h-3 mr-1" />
                                  Flyer
                                </Badge>
                              )}
                              {kajian.video_url && (
                                <Badge variant="outline" className="text-xs">
                                  <Video className="w-3 h-3 mr-1" />
                                  Video
                                </Badge>
                              )}
                              {!kajian.image_url && !kajian.video_url && (
                                <span className="text-xs text-gray-400">Tidak ada</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={kajian.status === 'upcoming' ? 'default' : 'secondary'}>
                              {kajian.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditKajian(kajian)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600"
                                onClick={() => handleDeleteKajian(kajian.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mosque-name">Nama Masjid</Label>
                  <Input id="mosque-name" defaultValue="Masjid Al-Hidayah" />
                </div>
                <div>
                  <Label htmlFor="mosque-address">Alamat Masjid</Label>
                  <Input id="mosque-address" defaultValue="Jakarta, Indonesia" />
                </div>
                <div>
                  <Label htmlFor="contact">Kontak</Label>
                  <Input id="contact" defaultValue="+62 xxx xxx xxx" />
                </div>
                <Button className="gradient-islamic text-white">
                  Simpan Pengaturan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;