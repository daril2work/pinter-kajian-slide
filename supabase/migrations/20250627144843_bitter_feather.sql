/*
  # Initial Schema for Takmir Pinter

  1. New Tables
    - `mosque_settings` - Pengaturan umum masjid
    - `hero_content` - Konten hero section
    - `prayer_times` - Jadwal shalat
    - `kajian` - Data kajian/ceramah
    - `activities` - Kegiatan masjid
    - `announcements` - Pengumuman

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- Table untuk pengaturan masjid
CREATE TABLE IF NOT EXISTS mosque_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  address text,
  contact varchar(100),
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table untuk konten hero section
CREATE TABLE IF NOT EXISTS hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  subtitle text,
  mosque_badge varchar(255),
  button_primary_text varchar(100) DEFAULT 'Lihat Jadwal Kegiatan',
  button_secondary_text varchar(100) DEFAULT 'Tonton Kajian',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table untuk jadwal shalat
CREATE TABLE IF NOT EXISTS prayer_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(20) NOT NULL CHECK (name IN ('subuh', 'dzuhur', 'ashar', 'maghrib', 'isya')),
  time time NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name)
);

-- Table untuk kajian
CREATE TABLE IF NOT EXISTS kajian (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text,
  speaker varchar(255) NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  location varchar(255) NOT NULL,
  image_url text,
  video_url text,
  status varchar(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table untuk kegiatan/aktivitas
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text,
  date date NOT NULL,
  time time,
  location varchar(255),
  category varchar(50) DEFAULT 'kegiatan' CHECK (category IN ('kajian', 'event', 'pengumuman', 'kegiatan')),
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table untuk pengumuman
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  content text NOT NULL,
  priority varchar(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  is_active boolean DEFAULT true,
  start_date date NOT NULL,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_kajian_date ON kajian(date);
CREATE INDEX IF NOT EXISTS idx_kajian_status ON kajian(status);
CREATE INDEX IF NOT EXISTS idx_kajian_featured ON kajian(is_featured);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
CREATE INDEX IF NOT EXISTS idx_activities_active ON activities(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_dates ON announcements(start_date, end_date);

-- Enable Row Level Security
ALTER TABLE mosque_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE kajian ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access to mosque_settings"
  ON mosque_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to hero_content"
  ON hero_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to prayer_times"
  ON prayer_times FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to kajian"
  ON kajian FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to activities"
  ON activities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to announcements"
  ON announcements FOR SELECT
  TO public
  USING (true);

-- Policies for admin write access (for now, allow all operations)
CREATE POLICY "Allow all operations on mosque_settings"
  ON mosque_settings FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on hero_content"
  ON hero_content FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on prayer_times"
  ON prayer_times FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on kajian"
  ON kajian FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on activities"
  ON activities FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on announcements"
  ON announcements FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert data default
INSERT INTO mosque_settings (name, address, contact) 
VALUES ('Masjid Al-Hidayah', 'Jakarta, Indonesia', '+62 xxx xxx xxx')
ON CONFLICT DO NOTHING;

INSERT INTO hero_content (title, subtitle, mosque_badge) 
VALUES (
  'Takmir Pinter', 
  'Platform digital untuk mengelola masjid dengan lebih baik, menyediakan akses mudah ke kajian dan informasi kegiatan masjid.', 
  '🕌 Masjid Al-Hidayah'
)
ON CONFLICT DO NOTHING;

INSERT INTO prayer_times (name, time) VALUES 
('subuh', '04:45'),
('dzuhur', '12:15'),
('ashar', '15:30'),
('maghrib', '18:45'),
('isya', '20:00')
ON CONFLICT (name) DO NOTHING;

INSERT INTO kajian (title, description, speaker, date, start_time, end_time, location, image_url, is_featured) 
VALUES (
  'Keutamaan Menuntut Ilmu dalam Islam', 
  'Ustadz Ahmad Syahid akan membahas tentang pentingnya menuntut ilmu dalam perspektif Islam dan bagaimana mengaplikasikannya dalam kehidupan sehari-hari.', 
  'Ustadz Ahmad Syahid', 
  '2024-01-15', 
  '19:30', 
  '21:00', 
  'Masjid Al-Hidayah', 
  'https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=500&h=280&fit=crop', 
  true
)
ON CONFLICT DO NOTHING;