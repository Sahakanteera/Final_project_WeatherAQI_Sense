-- ============================================================
-- SQL Script สำหรับอัปเดต Schema ฐานข้อมูลให้รองรับ Mockup ใหม่ และข้อมูล 24 ชั่วโมง
-- (นำไปรันใน Supabase SQL Editor -> New Query)
-- ============================================================

-- 1. เพิ่มคอลัมน์ใหม่สำหรับเก็บข้อมูลพยากรณ์ 7 วัน, มลพิษ, และดัชนีการใช้ชีวิต
ALTER TABLE public.weather_aqi_cache
ADD COLUMN IF NOT EXISTS daily_forecast JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS pollutants_data JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS lifestyle_data JSONB DEFAULT '{}'::jsonb;

-- 2. เพิ่มคอลัมน์เก็บข้อมูลทั่วไปเพิ่มเติม (สำหรับ Dashboard ตัวเต็ม)
ALTER TABLE public.weather_aqi_cache
ADD COLUMN IF NOT EXISTS uv_index NUMERIC(4,1) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS sunrise_time TEXT,
ADD COLUMN IF NOT EXISTS sunset_time TEXT;

-- 3. ยืนยันการสร้างคอลัมน์ราย 24 ชั่วโมง (ป้องกันกรณีที่หายไป)
ALTER TABLE public.weather_aqi_cache
ADD COLUMN IF NOT EXISTS hourly_labels JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hourly_temps JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hourly_aqis JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hourly_rains JSONB DEFAULT '[]'::jsonb;

-- ============================================================
-- เสร็จสิ้นการเพิ่ม Schema
-- ============================================================
