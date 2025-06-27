
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface KajianFormProps {
  kajian?: {
    id?: string;
    title: string;
    description: string;
    speaker: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    image_url?: string;
    video_url?: string;
    is_featured?: boolean;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const KajianForm: React.FC<KajianFormProps> = ({ kajian, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: kajian?.title || '',
    description: kajian?.description || '',
    speaker: kajian?.speaker || '',
    date: kajian?.date || '',
    start_time: kajian?.start_time || '',
    end_time: kajian?.end_time || '',
    location: kajian?.location || 'Masjid Al-Hidayah',
    image_url: kajian?.image_url || '',
    video_url: kajian?.video_url || '',
    is_featured: kajian?.is_featured || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {kajian?.id ? 'Edit Kajian' : 'Tambah Kajian Baru'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Judul Kajian *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Masukkan judul kajian"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Deskripsi kajian..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="speaker" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Pemateri *
              </Label>
              <Input
                id="speaker"
                value={formData.speaker}
                onChange={(e) => handleChange('speaker', e.target.value)}
                placeholder="Nama pemateri"
                required
              />
            </div>

            <div>
              <Label htmlFor="date" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Tanggal *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="start_time" className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Waktu Mulai *
              </Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => handleChange('start_time', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="end_time">Waktu Selesai *</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) => handleChange('end_time', e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Lokasi *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Lokasi kajian"
                required
              />
            </div>

            <div>
              <Label htmlFor="image_url">URL Gambar</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => handleChange('image_url', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="video_url">URL Video</Label>
              <Input
                id="video_url"
                type="url"
                value={formData.video_url}
                onChange={(e) => handleChange('video_url', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="md:col-span-2 flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleChange('is_featured', checked)}
              />
              <Label htmlFor="is_featured">Tampilkan sebagai kajian unggulan</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="gradient-islamic text-white">
              {kajian?.id ? 'Update Kajian' : 'Simpan Kajian'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default KajianForm;
