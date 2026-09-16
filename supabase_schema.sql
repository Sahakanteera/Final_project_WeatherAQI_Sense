-- ============================================================
--  WeatherAQI Sense — Supabase Schema
--  รันสคริปต์นี้ใน Supabase SQL Editor
--  Dashboard → SQL Editor → New Query → วาง แล้วกด Run
-- ============================================================

-- 1. สร้างตาราง weather_aqi_cache
CREATE TABLE IF NOT EXISTS public.weather_aqi_cache (
    id              BIGSERIAL PRIMARY KEY,
    city_key        TEXT        NOT NULL UNIQUE,   -- เช่น "khon kaen", "bangkok"
    city_name_th    TEXT        NOT NULL,
    city_name_en    TEXT        NOT NULL,
    lat             NUMERIC(9,4) NOT NULL,
    lon             NUMERIC(9,4) NOT NULL,

    -- Weather fields
    temperature     NUMERIC(5,1),                  -- Celsius
    humidity        INTEGER,                        -- %
    wind_speed      NUMERIC(5,1),                  -- km/h
    weather_code    INTEGER,                        -- WMO weather code
    weather_text_th TEXT,
    weather_text_en TEXT,

    -- Air Quality fields
    aqi             INTEGER,                        -- US AQI
    pm25            NUMERIC(6,1),                   -- µg/m³

    -- Hourly trend data (stored as JSON arrays)
    hourly_labels   JSONB DEFAULT '[]'::jsonb,     -- ["09:00","11:00",...]
    hourly_temps    JSONB DEFAULT '[]'::jsonb,     -- [28.5, 29.1, ...]
    hourly_aqis     JSONB DEFAULT '[]'::jsonb,     -- [40, 42, ...]

    -- Timestamps
    fetched_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Index สำหรับ query เร็วตาม city_key และ fetched_at
CREATE INDEX IF NOT EXISTS idx_weather_aqi_cache_city_key
    ON public.weather_aqi_cache (city_key);

CREATE INDEX IF NOT EXISTS idx_weather_aqi_cache_fetched_at
    ON public.weather_aqi_cache (fetched_at DESC);

-- 3. Auto-update updated_at เมื่อมีการ UPDATE
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_weather_aqi_cache_updated_at
    BEFORE UPDATE ON public.weather_aqi_cache
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 4. Row Level Security (RLS)
--    เปิด RLS แล้วสร้าง policy ให้ anon (frontend) อ่าน/เขียนได้
-- ============================================================

ALTER TABLE public.weather_aqi_cache ENABLE ROW LEVEL SECURITY;

-- Policy: anon อ่านได้ทุก row
CREATE POLICY "allow_anon_select"
    ON public.weather_aqi_cache
    FOR SELECT
    TO anon
    USING (true);

-- Policy: anon insert ได้
CREATE POLICY "allow_anon_insert"
    ON public.weather_aqi_cache
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: anon update ได้ (สำหรับ upsert)
CREATE POLICY "allow_anon_update"
    ON public.weather_aqi_cache
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- 5. Seed ข้อมูลเริ่มต้น (optional)
--    ลบ comment ถ้าต้องการ seed ข้อมูลทดสอบ
-- ============================================================

/*
INSERT INTO public.weather_aqi_cache
    (city_key, city_name_th, city_name_en, lat, lon,
     temperature, humidity, wind_speed, weather_code,
     weather_text_th, weather_text_en, aqi, pm25,
     hourly_labels, hourly_temps, hourly_aqis, fetched_at)
VALUES
    ('khon kaen', 'ขอนแก่น (Khon Kaen)', 'Khon Kaen', 16.4322, 102.8236,
     30.5, 62, 12.0, 0,
     '☀️ ท้องฟ้าโปร่ง แดดจัด', '☀️ Clear Sky & Sunny', 42, 10.2,
     '["09:00","11:00","13:00","15:00","17:00","19:00","21:00"]'::jsonb,
     '[28,29,31,32,30,29,28]'::jsonb,
     '[38,40,45,50,48,44,42]'::jsonb,
     NOW() - INTERVAL '1 hour'),

    ('bangkok', 'กรุงเทพฯ (Bangkok)', 'Bangkok', 13.7563, 100.5018,
     32.0, 70, 8.0, 1,
     '⛅ มีเมฆบางส่วนถึงเมฆมาก', '⛅ Partly Cloudy', 65, 18.5,
     '["09:00","11:00","13:00","15:00","17:00","19:00","21:00"]'::jsonb,
     '[30,32,34,35,33,31,30]'::jsonb,
     '[55,60,68,72,65,62,60]'::jsonb,
     NOW() - INTERVAL '1 hour'),

    ('chiang mai', 'เชียงใหม่ (Chiang Mai)', 'Chiang Mai', 18.7883, 98.9853,
     28.0, 75, 5.0, 45,
     '🌫️ มีหมอกควันหนาแน่น', '🌫️ Foggy & Hazy', 110, 35.0,
     '["09:00","11:00","13:00","15:00","17:00","19:00","21:00"]'::jsonb,
     '[25,27,29,30,28,27,26]'::jsonb,
     '[90,100,115,120,112,108,105]'::jsonb,
     NOW() - INTERVAL '1 hour'),

    ('phuket', 'ภูเก็ต (Phuket)', 'Phuket', 7.8804, 98.3923,
     29.0, 80, 15.0, 80,
     '🌧️ มีฝนตกชุกค่อนข้างหนัก', '🌧️ Heavy Rain Showers', 35, 8.0,
     '["09:00","11:00","13:00","15:00","17:00","19:00","21:00"]'::jsonb,
     '[27,28,29,28,27,27,26]'::jsonb,
     '[30,32,35,38,36,34,32]'::jsonb,
     NOW() - INTERVAL '1 hour');
*/

-- ============================================================
-- Done! ตอนนี้ table พร้อมใช้งานแล้ว
-- ขั้นต่อไป: ใส่ SUPABASE_URL และ SUPABASE_ANON_KEY ใน index.html
-- ============================================================
