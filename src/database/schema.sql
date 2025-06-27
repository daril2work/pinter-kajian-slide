
-- Database Schema untuk Takmir Pinter
-- Untuk digunakan dengan PostgreSQL (Supabase)

-- Table untuk pengaturan masjid
CREATE TABLE mosque_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  contact VARCHAR(100),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table untuk konten hero section
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  mosque_badge VARCHAR(255),
  button_primary_text VARCHAR(100) DEFAULT 'Lihat Jadwal Kegiatan',
  button_secondary_text VARCHAR(100) DEFAULT 'Tonton Kajian',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table untuk jadwal shalat
CREATE TABLE prayer_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(20) NOT NULL CHECK (name IN ('subuh', 'dzuhur', 'ashar', 'maghrib', 'isya')),
  time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name)
);

-- Table untuk kajian
CREATE TABLE kajian (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  speaker VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  image_url TEXT,
  video_url TEXT,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table untuk kegiatan/aktivitas
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location VARCHAR(255),
  category VARCHAR(50) DEFAULT 'kegiatan' CHECK (category IN ('kajian', 'event', 'pengumuman', 'kegiatan')),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table untuk pengumuman
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  is_active BOOLEAN DEFAULT true,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table untuk user admin (nanti untuk authentication)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes untuk performa
CREATE INDEX idx_kajian_date ON kajian(date);
CREATE INDEX idx_kajian_status ON kajian(status);
CREATE INDEX idx_kajian_featured ON kajian(is_featured);
CREATE INDEX idx_activities_date ON activities(date);
CREATE INDEX idx_activities_active ON activities(is_active);
CREATE INDEX idx_announcements_active ON announcements(is_active);
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);

-- Triggers untuk auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mosque_settings_updated_at BEFORE UPDATE ON mosque_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_times_updated_at BEFORE UPDATE ON prayer_times FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kajian_updated_at BEFORE UPDATE ON kajian FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert data default
INSERT INTO mosque_settings (name, address, contact) VALUES 
('Masjid Al-Hidayah', 'Jakarta, Indonesia', '+62 xxx xxx xxx');

INSERT INTO hero_content (title, subtitle, mosque_badge) VALUES 
('Takmir Pinter', 'Platform digital untuk mengelola masjid dengan lebih baik, menyediakan akses mudah ke kajian dan informasi kegiatan masjid.', '🕌 Masjid Al-Hidayah');

INSERT INTO prayer_times (name, time) VALUES 
('subuh', '04:45'),
('dzuhur', '12:15'),
('ashar', '15:30'),
('maghrib', '18:45'),
('isya', '20:00');

INSERT INTO kajian (title, description, speaker, date, start_time, end_time, location, image_url, is_featured) VALUES 
('Keutamaan Menuntut Ilmu dalam Islam', 'Ustadz Ahmad Syahid akan membahas tentang pentingnya menuntut ilmu dalam perspektif Islam dan bagaimana mengaplikasikannya dalam kehidupan sehari-hari.', 'Ustadz Ahmad Syahid', '2024-01-15', '19:30', '21:00', 'Masjid Al-Hidayah', 'https://images.unsplash.com/photo-1591604021695-0c50b32e98db?w=500&h=280&fit=crop', true);
