export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      mosque_settings: {
        Row: {
          id: string
          name: string
          address: string | null
          contact: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          contact?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          contact?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hero_content: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          mosque_badge: string | null
          button_primary_text: string
          button_secondary_text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          mosque_badge?: string | null
          button_primary_text?: string
          button_secondary_text?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          mosque_badge?: string | null
          button_primary_text?: string
          button_secondary_text?: string
          created_at?: string
          updated_at?: string
        }
      }
      prayer_times: {
        Row: {
          id: string
          name: 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya'
          time: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya'
          time: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya'
          time?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      kajian: {
        Row: {
          id: string
          title: string
          description: string | null
          speaker: string
          date: string
          start_time: string
          end_time: string
          location: string
          image_url: string | null
          video_url: string | null
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          speaker: string
          date: string
          start_time: string
          end_time: string
          location: string
          image_url?: string | null
          video_url?: string | null
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          speaker?: string
          date?: string
          start_time?: string
          end_time?: string
          location?: string
          image_url?: string | null
          video_url?: string | null
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          time: string | null
          location: string | null
          category: 'kajian' | 'event' | 'pengumuman' | 'kegiatan'
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          time?: string | null
          location?: string | null
          category?: 'kajian' | 'event' | 'pengumuman' | 'kegiatan'
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          time?: string | null
          location?: string | null
          category?: 'kajian' | 'event' | 'pengumuman' | 'kegiatan'
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          priority: 'low' | 'medium' | 'high'
          is_active: boolean
          start_date: string
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          priority?: 'low' | 'medium' | 'high'
          is_active?: boolean
          start_date: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          priority?: 'low' | 'medium' | 'high'
          is_active?: boolean
          start_date?: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}