-- =========================================================================
-- VANTA AUTOMOTIVE PLATFORM DATABASE SCHEMA
-- Developed for 7P STUDIO
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  tagline TEXT,
  category VARCHAR(32) NOT NULL CHECK (category IN ('hypercars', 'supercars', 'performance', 'classics')),
  price_estimate NUMERIC(12, 2) NOT NULL,
  year INT NOT NULL,
  power_hp INT NOT NULL,
  torque_nm INT NOT NULL,
  acceleration_sec NUMERIC(3, 2) NOT NULL,
  top_speed_kmh INT NOT NULL,
  engine_desc TEXT NOT NULL,
  transmission_desc TEXT NOT NULL,
  weight_kg INT NOT NULL,
  drive_type VARCHAR(64) NOT NULL,
  downforce_kg INT,
  hero_image_url TEXT NOT NULL,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  benefits JSONB DEFAULT '[]'::jsonb,
  process_steps JSONB DEFAULT '[]'::jsonb,
  duration_label VARCHAR(64) NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  badge VARCHAR(64),
  faqs JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BOOKINGS & APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_ref VARCHAR(32) UNIQUE NOT NULL,
  booking_type VARCHAR(32) NOT NULL CHECK (booking_type IN ('service', 'test-drive', 'consultation')),
  service_id VARCHAR(64) REFERENCES services(id) ON DELETE SET NULL,
  vehicle_model VARCHAR(128) NOT NULL,
  vehicle_year VARCHAR(16),
  customer_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  whatsapp VARCHAR(32),
  scheduled_date DATE NOT NULL,
  scheduled_time_slot VARCHAR(32) NOT NULL,
  notes TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  estimated_price NUMERIC(10, 2) DEFAULT 0,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INQUIRIES & CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  phone VARCHAR(32),
  subject VARCHAR(256) NOT NULL,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  service_id VARCHAR(64) REFERENCES services(id) ON DELETE SET NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'in_progress', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public can view vehicles & services
CREATE POLICY "Public Read Vehicles" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);

-- Public can insert new bookings & inquiries
CREATE POLICY "Public Create Bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Create Inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Authenticated Admin staff can read & update all
CREATE POLICY "Admin All Bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Vehicles" ON vehicles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
