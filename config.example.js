// ============================================================
//  WeatherAQI Sense — Config EXAMPLE
//  📋 คัดลอกไฟล์นี้เป็น config.js แล้วใส่ค่าจริง
//  cp config.example.js config.js
//
//  วิธีดู credentials:
//  Supabase Dashboard → Project Settings → API
//    - Project URL  → ใส่ใน SUPABASE_URL
//    - anon public  → ใส่ใน SUPABASE_ANON_KEY
// ============================================================

const APP_CONFIG = {
    SUPABASE_URL:      'https://YOUR_PROJECT_ID.supabase.co',
    SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
    CACHE_TTL_MINUTES: 30
};
