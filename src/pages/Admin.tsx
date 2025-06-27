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
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import EnhancedKajianForm from '@/components/EnhancedKajianForm';
import PrayerTimesSettings from '@/components/PrayerTimesSettings';
import { toast } from "@/components/ui/sonner";
import { PrayerTime, LocationCoordinates } from '@/services/prayerTimesApi';
import { 
  useHeroContent, 
  useMosqueSettings, 
  usePrayerTimes, 
  useKajian,
  useInitializeApp 
} from '@/hooks/useDatabase';
import { Database } from '@/types/supabase';

type KajianRow = Database['public']['Tables']['kajian']['Row'];

const Admin = () => {
  const { isInitialized, isInitializing } = useInitializeApp();
  const { heroContent, updateHeroContent, isLoading: heroLoading } = useHeroContent();
  const { mosqueSettings, updateMosqueSettings, isLoading: settingsLoading } = useMosqueSettings();
  const { prayerTimes: dbPrayerTimes, updatePrayerTimes, isLoading: prayerLoading } = usePrayerTimes();
  const { kajianList, createKajian, updateKajian, deleteKajian, isLoading: kajianLoading } = useKajian();

  const [showKajianForm, setShowKajianForm] = useState(false);
  const [editingKajian, setEditingKajian] = useState<KajianRow | null>(null);
  const [localHeroContent, setLocalHeroContent] = useState({
    title: '',
    subtitle: '',
    mosque_badge: ''
  });
  const [localMosqueSettings, setLocalMosqueSettings] = useState({
    name: '',
    address: '',
    contact: ''
  });

  // Update local state when data is loaded
  React.useEffect(() => {
    if (heroContent) {
      setLocalHeroContent({
        title: heroContent.title || '',
        subtitle: heroContent.subtitle || '',
        mosque_badge: heroContent.mosque_badge || ''
      });
    }
  }, [heroContent]);

  React.useEffect(() => {
    if (mosqueSettings) {
      setLocalMosqueSettings({
        name: mosqueSettings.name || '',
        address: mosqueSettings.address || '',
        contact: mosqueSettings.contact || ''
      });
    }
  }, [mosqueSettings]);

  const handleSaveHero = async () => {
    try {
      await updateHeroContent(localHeroContent);
    } catch (error) {
      console.error('Error saving hero content:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateMosqueSettings(localMosqueSettings);
    } catch (error) {
      console.error('Error saving mosque settings:', error);
    }
  };

  const handlePrayerTimesUpdate = (newPrayerTimes: PrayerTime[], location: LocationCoordinates) => {
    // This is handled by the PrayerTimesSettings component
    console.log('Prayer times updated:', newPrayerTimes, location);
  };

  const handleAddKajian = () => {
    setEditingKajian(null);
    setShowKajianForm(true);
  };

  const handleEditKajian = (kajian: KajianRow) => {
    setEditingKajian(kajian);
    setShowKajianForm(true);
  };

  const handleDeleteKajian = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kajian ini?')) {
      try {
        await deleteKajian(id);
      } catch (error) {
        console.error('Error deleting kajian:', error);
      }
    }
  };

  const handleKajianSubmit = async (data: any) => {
    try {
      if (editingKajian) {
        await updateKajian(editingKajian.id, data);
      } else {
        await createKajian(data);
      }
      setShowKajianForm(false);
      setEditingKajian(null);
    } catch (error) {
      console.error('Error saving kajian:', error);
    }
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

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Menginisialisasi aplikasi...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              Database Connected
            </Badge>
            <Badge variant="outline">
              {kajianList.length} Kajian
            </Badge>
          </div>
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
                {heroLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="ml-2">Memuat data...</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="title">Judul Utama</Label>
                      <Input
                        id="title"
                        value={localHeroContent.title}
                        onChange={(e) => setLocalHeroContent({...localHeroContent, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Textarea
                        id="subtitle"
                        value={localHeroContent.subtitle}
                        onChange={(e) => setLocalHeroContent({...localHeroContent, subtitle: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="badge">Badge Masjid</Label>
                      <Input
                        id="badge"
                        value={localHeroContent.mosque_badge}
                        onChange={(e) => setLocalHeroContent({...localHeroContent, mosque_badge: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSaveHero} className="gradient-islamic text-white">
                      Simpan Perubahan
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayer">
            <div className="space-y-6">
              <PrayerTimesSettings onPrayerTimesUpdate={handlePrayerTimesUpdate} />
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
                  {kajianLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="ml-2">Memuat kajian...</span>
                    </div>
                  ) : (
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
                                {kajian.status === 'upcoming' ? 'Akan Datang' : 
                                 kajian.status === 'ongoing' ? 'Berlangsung' :
                                 kajian.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
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
                        {kajianList.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              Belum ada kajian. Klik "Tambah Kajian" untuk menambahkan kajian pertama.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
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
                {settingsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="ml-2">Memuat pengaturan...</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="mosque-name">Nama Masjid</Label>
                      <Input 
                        id="mosque-name" 
                        value={localMosqueSettings.name}
                        onChange={(e) => setLocalMosqueSettings({...localMosqueSettings, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mosque-address">Alamat Masjid</Label>
                      <Input 
                        id="mosque-address" 
                        value={localMosqueSettings.address}
                        onChange={(e) => setLocalMosqueSettings({...localMosqueSettings, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Kontak</Label>
                      <Input 
                        id="contact" 
                        value={localMosqueSettings.contact}
                        onChange={(e) => setLocalMosqueSettings({...localMosqueSettings, contact: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSaveSettings} className="gradient-islamic text-white">
                      Simpan Pengaturan
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;