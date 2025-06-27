import { useState, useEffect } from 'react';
import { databaseService } from '@/services/database';
import { Database } from '@/types/supabase';
import { toast } from '@/components/ui/sonner';
import { testSupabaseConnection } from '@/lib/supabase';

type Tables = Database['public']['Tables'];

// Custom hooks for database operations
export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<Tables['hero_content']['Row'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await databaseService.getHeroContent();
      setHeroContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Gagal memuat konten hero');
    } finally {
      setIsLoading(false);
    }
  };

  const updateHeroContent = async (updates: Tables['hero_content']['Update']) => {
    try {
      const updatedData = await databaseService.updateHeroContent(updates);
      setHeroContent(updatedData);
      toast.success('Konten hero berhasil diperbarui');
      return updatedData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal memperbarui konten hero: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchHeroContent();
  }, []);

  return {
    heroContent,
    isLoading,
    error,
    updateHeroContent,
    refetch: fetchHeroContent
  };
};

export const useMosqueSettings = () => {
  const [mosqueSettings, setMosqueSettings] = useState<Tables['mosque_settings']['Row'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMosqueSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await databaseService.getMosqueSettings();
      setMosqueSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Gagal memuat pengaturan masjid');
    } finally {
      setIsLoading(false);
    }
  };

  const updateMosqueSettings = async (updates: Tables['mosque_settings']['Update']) => {
    try {
      const updatedData = await databaseService.updateMosqueSettings(updates);
      setMosqueSettings(updatedData);
      toast.success('Pengaturan masjid berhasil diperbarui');
      return updatedData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal memperbarui pengaturan masjid: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchMosqueSettings();
  }, []);

  return {
    mosqueSettings,
    isLoading,
    error,
    updateMosqueSettings,
    refetch: fetchMosqueSettings
  };
};

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<Tables['prayer_times']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await databaseService.getPrayerTimes();
      setPrayerTimes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Gagal memuat jadwal shalat');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrayerTimes = async (updates: Array<{ id: string; time: string }>) => {
    try {
      const updatedData = await databaseService.updatePrayerTimes(updates);
      setPrayerTimes(updatedData);
      toast.success('Jadwal shalat berhasil diperbarui');
      return updatedData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal memperbarui jadwal shalat: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  return {
    prayerTimes,
    isLoading,
    error,
    updatePrayerTimes,
    refetch: fetchPrayerTimes
  };
};

export const useKajian = () => {
  const [kajianList, setKajianList] = useState<Tables['kajian']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKajianList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await databaseService.getKajianList();
      setKajianList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Gagal memuat daftar kajian');
    } finally {
      setIsLoading(false);
    }
  };

  const createKajian = async (kajian: Tables['kajian']['Insert']) => {
    try {
      const newKajian = await databaseService.createKajian(kajian);
      setKajianList(prev => [newKajian, ...prev]);
      toast.success('Kajian berhasil ditambahkan');
      return newKajian;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal menambahkan kajian: ${errorMessage}`);
      throw err;
    }
  };

  const updateKajian = async (id: string, updates: Tables['kajian']['Update']) => {
    try {
      const updatedKajian = await databaseService.updateKajian(id, updates);
      setKajianList(prev => prev.map(k => k.id === id ? updatedKajian : k));
      toast.success('Kajian berhasil diperbarui');
      return updatedKajian;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal memperbarui kajian: ${errorMessage}`);
      throw err;
    }
  };

  const deleteKajian = async (id: string) => {
    try {
      await databaseService.deleteKajian(id);
      setKajianList(prev => prev.filter(k => k.id !== id));
      toast.success('Kajian berhasil dihapus');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal menghapus kajian: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchKajianList();
  }, []);

  return {
    kajianList,
    isLoading,
    error,
    createKajian,
    updateKajian,
    deleteKajian,
    refetch: fetchKajianList
  };
};

export const useActivities = () => {
  const [activities, setActivities] = useState<Tables['activities']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await databaseService.getActivities();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Gagal memuat daftar kegiatan');
    } finally {
      setIsLoading(false);
    }
  };

  const createActivity = async (activity: Tables['activities']['Insert']) => {
    try {
      const newActivity = await databaseService.createActivity(activity);
      setActivities(prev => [newActivity, ...prev]);
      toast.success('Kegiatan berhasil ditambahkan');
      return newActivity;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal menambahkan kegiatan: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    isLoading,
    error,
    createActivity,
    refetch: fetchActivities
  };
};

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Tables['announcements']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await databaseService.getActiveAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Gagal memuat pengumuman');
    } finally {
      setIsLoading(false);
    }
  };

  const createAnnouncement = async (announcement: Tables['announcements']['Insert']) => {
    try {
      const newAnnouncement = await databaseService.createAnnouncement(announcement);
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast.success('Pengumuman berhasil ditambahkan');
      return newAnnouncement;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Gagal menambahkan pengumuman: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    isLoading,
    error,
    createAnnouncement,
    refetch: fetchAnnouncements
  };
};

// Initialize default data hook
export const useInitializeApp = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setConnectionError(null);
        
        // Test Supabase connection first
        const isConnected = await testSupabaseConnection();
        if (!isConnected) {
          throw new Error('Tidak dapat terhubung ke Supabase. Periksa konfigurasi environment variables.');
        }

        await databaseService.initializeDefaultData();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        const errorMessage = error instanceof Error ? error.message : 'Gagal menginisialisasi aplikasi';
        setConnectionError(errorMessage);
        
        // Show user-friendly error message
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Supabase')) {
          toast.error('Tidak dapat terhubung ke database. Periksa konfigurasi Supabase Anda.');
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  return { isInitialized, isInitializing, connectionError };
};