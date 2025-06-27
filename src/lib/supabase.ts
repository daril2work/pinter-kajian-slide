import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL format:', supabaseUrl);
  throw new Error('Invalid Supabase URL format. Please check your VITE_SUPABASE_URL in .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Handle network errors specifically
  if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
    return 'Tidak dapat terhubung ke database. Periksa koneksi internet atau konfigurasi Supabase.';
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.error_description) {
    return error.error_description;
  }
  
  return 'Terjadi kesalahan pada database';
};

// Helper function to format dates for Supabase
export const formatDateForSupabase = (date: Date | string): string => {
  if (typeof date === 'string') {
    return date;
  }
  return date.toISOString().split('T')[0];
};

// Helper function to format time for Supabase
export const formatTimeForSupabase = (time: string): string => {
  // Ensure time is in HH:MM format
  if (time.length === 5 && time.includes(':')) {
    return time;
  }
  return time;
};

// Test connection function
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('mosque_settings').select('count').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
};