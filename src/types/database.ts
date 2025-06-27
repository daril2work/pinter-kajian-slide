
// Database Schema untuk Takmir Pinter

export interface MosqueSettings {
  id: string;
  name: string;
  address: string;
  contact: string;
  created_at: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  mosque_badge: string;
  button_primary_text: string;
  button_secondary_text: string;
  created_at: string;
  updated_at: string;
}

export interface PrayerTime {
  id: string;
  name: 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';
  time: string; // Format: "HH:MM"
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Kajian {
  id: string;
  title: string;
  description: string;
  speaker: string;
  date: string; // Format: "YYYY-MM-DD"
  start_time: string; // Format: "HH:MM"
  end_time: string; // Format: "HH:MM"
  location: string;
  image_url?: string;
  video_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'kajian' | 'event' | 'pengumuman' | 'kegiatan';
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  is_active: boolean;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

// Types untuk form input
export interface CreateKajianInput {
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
}

export interface UpdateHeroContentInput {
  title?: string;
  subtitle?: string;
  mosque_badge?: string;
  button_primary_text?: string;
  button_secondary_text?: string;
}

export interface UpdatePrayerTimeInput {
  id: string;
  time: string;
  is_active?: boolean;
}

// Database operations types (untuk nanti ketika konek ke Supabase)
export interface DatabaseOperations {
  // Hero Content
  getHeroContent: () => Promise<HeroContent>;
  updateHeroContent: (data: UpdateHeroContentInput) => Promise<HeroContent>;
  
  // Prayer Times
  getPrayerTimes: () => Promise<PrayerTime[]>;
  updatePrayerTime: (data: UpdatePrayerTimeInput) => Promise<PrayerTime>;
  
  // Kajian
  getKajianList: () => Promise<Kajian[]>;
  getKajianById: (id: string) => Promise<Kajian>;
  createKajian: (data: CreateKajianInput) => Promise<Kajian>;
  updateKajian: (id: string, data: Partial<CreateKajianInput>) => Promise<Kajian>;
  deleteKajian: (id: string) => Promise<void>;
  
  // Mosque Settings
  getMosqueSettings: () => Promise<MosqueSettings>;
  updateMosqueSettings: (data: Partial<MosqueSettings>) => Promise<MosqueSettings>;
  
  // Activities
  getActivities: () => Promise<Activity[]>;
  createActivity: (data: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) => Promise<Activity>;
  
  // Announcements
  getActiveAnnouncements: () => Promise<Announcement[]>;
  createAnnouncement: (data: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) => Promise<Announcement>;
}
