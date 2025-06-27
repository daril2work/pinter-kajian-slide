
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
  Trash2
} from "lucide-react";

// Mock data - nanti akan diganti dengan data dari database
const mockHeroContent = {
  title: "Takmir Pinter",
  subtitle: "Platform digital untuk mengelola masjid dengan lebih baik, menyediakan akses mudah ke kajian dan informasi kegiatan masjid.",
  mosqueBadge: "🕌 Masjid Al-Hidayah"
};

const mockPrayerTimes = [
  { id: 1, name: "Subuh", time: "04:45" },
  { id: 2, name: "Dzuhur", time: "12:15" },
  { id: 3, name: "Ashar", time: "15:30" },
  { id: 4, name: "Maghrib", time: "18:45" },
  { id: 5, name: "Isya", time: "20:00" }
];

const mockKajian = [
  {
    id: 1,
    title: "Keutamaan Menuntut Ilmu dalam Islam",
    speaker: "Ustadz Ahmad Syahid",
    date: "2024-01-15",
    time: "19:30 - 21:00",
    description: "Ustadz Ahmad Syahid akan membahas tentang pentingnya menuntut ilmu dalam perspektif Islam dan bagaimana mengaplikasikannya dalam kehidupan sehari-hari.",
    image: "https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=500&h=280&fit=crop",
    status: "upcoming"
  }
];

const Admin = () => {
  const [heroContent, setHeroContent] = useState(mockHeroContent);
  const [prayerTimes, setPrayerTimes] = useState(mockPrayerTimes);
  const [kajianList, setKajianList] = useState(mockKajian);

  const handleSaveHero = () => {
    console.log('Saving hero content:', heroContent);
    // TODO: Save to database
  };

  const handleSavePrayerTimes = () => {
    console.log('Saving prayer times:', prayerTimes);
    // TODO: Save to database
  };

  const updatePrayerTime = (id: number, field: string, value: string) => {
    setPrayerTimes(prev => prev.map(prayer => 
      prayer.id === id ? { ...prayer, [field]: value } : prayer
    ));
  };

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
            <Card>
              <CardHeader>
                <CardTitle>Edit Jadwal Shalat</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Waktu Shalat</TableHead>
                      <TableHead>Jam</TableHead>
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
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button onClick={handleSavePrayerTimes} className="mt-4 gradient-islamic text-white">
                  Simpan Jadwal Shalat
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kajian">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Kelola Kajian</h2>
                <Button className="gradient-islamic text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kajian
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Pemateri</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {kajianList.map((kajian) => (
                        <TableRow key={kajian.id}>
                          <TableCell className="font-medium">{kajian.title}</TableCell>
                          <TableCell>{kajian.speaker}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              {kajian.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={kajian.status === 'upcoming' ? 'default' : 'secondary'}>
                              {kajian.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
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
