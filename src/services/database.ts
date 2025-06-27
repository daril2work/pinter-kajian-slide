import { supabase, handleSupabaseError, formatDateForSupabase, formatTimeForSupabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Tables = Database['public']['Tables'];
type HeroContent = Tables['hero_content']['Row'];
type HeroContentInsert = Tables['hero_content']['Insert'];
type HeroContentUpdate = Tables['hero_content']['Update'];
type MosqueSettings = Tables['mosque_settings']['Row'];
type MosqueSettingsUpdate = Tables['mosque_settings']['Update'];
type PrayerTime = Tables['prayer_times']['Row'];
type PrayerTimeUpdate = Tables['prayer_times']['Update'];
type Kajian = Tables['kajian']['Row'];
type KajianInsert = Tables['kajian']['Insert'];
type KajianUpdate = Tables['kajian']['Update'];
type Activity = Tables['activities']['Row'];
type ActivityInsert = Tables['activities']['Insert'];
type Announcement = Tables['announcements']['Row'];
type AnnouncementInsert = Tables['announcements']['Insert'];

export class DatabaseService {
  // Hero Content Operations
  async getHeroContent(): Promise<HeroContent | null> {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async updateHeroContent(updates: HeroContentUpdate): Promise<HeroContent> {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .update(updates)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating hero content:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async createHeroContent(content: HeroContentInsert): Promise<HeroContent> {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .insert(content)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating hero content:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Mosque Settings Operations
  async getMosqueSettings(): Promise<MosqueSettings | null> {
    try {
      const { data, error } = await supabase
        .from('mosque_settings')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching mosque settings:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async updateMosqueSettings(updates: MosqueSettingsUpdate): Promise<MosqueSettings> {
    try {
      const { data, error } = await supabase
        .from('mosque_settings')
        .update(updates)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating mosque settings:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Prayer Times Operations
  async getPrayerTimes(): Promise<PrayerTime[]> {
    try {
      const { data, error } = await supabase
        .from('prayer_times')
        .select('*')
        .eq('is_active', true)
        .order('id');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async updatePrayerTime(id: string, updates: PrayerTimeUpdate): Promise<PrayerTime> {
    try {
      const { data, error } = await supabase
        .from('prayer_times')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating prayer time:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async updatePrayerTimes(prayerTimes: Array<{ id: string; time: string }>): Promise<PrayerTime[]> {
    try {
      const updates = prayerTimes.map(pt => ({
        id: pt.id,
        time: formatTimeForSupabase(pt.time)
      }));

      const promises = updates.map(update =>
        this.updatePrayerTime(update.id, { time: update.time })
      );

      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error('Error updating prayer times:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Kajian Operations
  async getKajianList(): Promise<Kajian[]> {
    try {
      const { data, error } = await supabase
        .from('kajian')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching kajian list:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async getKajianById(id: string): Promise<Kajian | null> {
    try {
      const { data, error } = await supabase
        .from('kajian')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching kajian:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async createKajian(kajian: KajianInsert): Promise<Kajian> {
    try {
      const formattedKajian = {
        ...kajian,
        date: formatDateForSupabase(kajian.date),
        start_time: formatTimeForSupabase(kajian.start_time),
        end_time: formatTimeForSupabase(kajian.end_time)
      };

      const { data, error } = await supabase
        .from('kajian')
        .insert(formattedKajian)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating kajian:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async updateKajian(id: string, updates: KajianUpdate): Promise<Kajian> {
    try {
      const formattedUpdates = {
        ...updates,
        ...(updates.date && { date: formatDateForSupabase(updates.date) }),
        ...(updates.start_time && { start_time: formatTimeForSupabase(updates.start_time) }),
        ...(updates.end_time && { end_time: formatTimeForSupabase(updates.end_time) })
      };

      const { data, error } = await supabase
        .from('kajian')
        .update(formattedUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating kajian:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async deleteKajian(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('kajian')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting kajian:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async getFeaturedKajian(): Promise<Kajian[]> {
    try {
      const { data, error } = await supabase
        .from('kajian')
        .select('*')
        .eq('is_featured', true)
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured kajian:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async getUpcomingKajian(): Promise<Kajian[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('kajian')
        .select('*')
        .eq('status', 'upcoming')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching upcoming kajian:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Activities Operations
  async getActivities(): Promise<Activity[]> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async createActivity(activity: ActivityInsert): Promise<Activity> {
    try {
      const formattedActivity = {
        ...activity,
        date: formatDateForSupabase(activity.date)
      };

      const { data, error } = await supabase
        .from('activities')
        .insert(formattedActivity)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Announcements Operations
  async getActiveAnnouncements(): Promise<Announcement[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', today)
        .or(`end_date.is.null,end_date.gte.${today}`)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  async createAnnouncement(announcement: AnnouncementInsert): Promise<Announcement> {
    try {
      const formattedAnnouncement = {
        ...announcement,
        start_date: formatDateForSupabase(announcement.start_date),
        ...(announcement.end_date && { 
          end_date: formatDateForSupabase(announcement.end_date) 
        })
      };

      const { data, error } = await supabase
        .from('announcements')
        .insert(formattedAnnouncement)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Utility Methods
  async initializeDefaultData(): Promise<void> {
    try {
      // Check if hero content exists
      const heroContent = await this.getHeroContent();
      if (!heroContent) {
        await this.createHeroContent({
          title: 'Takmir Pinter',
          subtitle: 'Platform digital untuk mengelola masjid dengan lebih baik, menyediakan akses mudah ke kajian dan informasi kegiatan masjid.',
          mosque_badge: '🕌 Masjid Al-Hidayah',
          button_primary_text: 'Lihat Jadwal Kegiatan',
          button_secondary_text: 'Tonton Kajian'
        });
      }

      // Check if mosque settings exist
      const mosqueSettings = await this.getMosqueSettings();
      if (!mosqueSettings) {
        await supabase
          .from('mosque_settings')
          .insert({
            name: 'Masjid Al-Hidayah',
            address: 'Jakarta, Indonesia',
            contact: '+62 xxx xxx xxx'
          });
      }

      // Check if prayer times exist
      const prayerTimes = await this.getPrayerTimes();
      if (prayerTimes.length === 0) {
        const defaultPrayerTimes = [
          { name: 'subuh' as const, time: '04:45' },
          { name: 'dzuhur' as const, time: '12:15' },
          { name: 'ashar' as const, time: '15:30' },
          { name: 'maghrib' as const, time: '18:45' },
          { name: 'isya' as const, time: '20:00' }
        ];

        await supabase
          .from('prayer_times')
          .insert(defaultPrayerTimes);
      }
    } catch (error) {
      console.error('Error initializing default data:', error);
      throw new Error(handleSupabaseError(error));
    }
  }
}

export const databaseService = new DatabaseService();