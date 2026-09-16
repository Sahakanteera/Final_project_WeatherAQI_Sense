"""
refresh_provinces.py
====================
Script สำหรับดึงข้อมูลสภาพอากาศและ AQI ของทุก 78 จังหวัดในประเทศไทย
จาก Open-Meteo API (ฟรี ไม่ต้องใช้ API key) แล้ว upsert ลง Supabase

วิธีใช้งาน:
  python src/refresh_provinces.py

Environment Variables (ตั้งใน .env หรือ GitHub Secrets):
  SUPABASE_URL      - Supabase project URL
  SUPABASE_ANON_KEY - Supabase anon/service role key
"""

import asyncio
import aiohttp
import os
import json
import time
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

# ─── Supabase Config ──────────────────────────────────────────────────────────
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
BATCH_SIZE = 10          # จำนวนจังหวัดที่ดึงพร้อมกันในแต่ละรอบ
BATCH_DELAY_SEC = 1.5    # หน่วงเวลาระหว่าง batch (วินาที)

# ─── ข้อมูล 78 จังหวัด (ครบทุกจังหวัดในประเทศไทย) ──────────────────────────
PROVINCES = [
    # ภาคกลาง (Central)
    {"key": "bangkok",         "name_th": "กรุงเทพมหานคร", "name_en": "Bangkok",         "region": "central", "lat": 13.7563, "lon": 100.5018},
    {"key": "nonthaburi",      "name_th": "นนทบุรี",        "name_en": "Nonthaburi",      "region": "central", "lat": 13.8621, "lon": 100.5144},
    {"key": "pathum thani",    "name_th": "ปทุมธานี",       "name_en": "Pathum Thani",    "region": "central", "lat": 14.0208, "lon": 100.5253},
    {"key": "samut prakan",    "name_th": "สมุทรปราการ",    "name_en": "Samut Prakan",    "region": "central", "lat": 13.5991, "lon": 100.5998},
    {"key": "ayutthaya",       "name_th": "พระนครศรีอยุธยา","name_en": "Ayutthaya",       "region": "central", "lat": 14.3692, "lon": 100.5877},
    {"key": "ang thong",       "name_th": "อ่างทอง",        "name_en": "Ang Thong",       "region": "central", "lat": 14.5896, "lon": 100.4549},
    {"key": "lop buri",        "name_th": "ลพบุรี",         "name_en": "Lop Buri",        "region": "central", "lat": 14.7995, "lon": 100.6534},
    {"key": "sing buri",       "name_th": "สิงห์บุรี",      "name_en": "Sing Buri",       "region": "central", "lat": 14.8910, "lon": 100.3977},
    {"key": "chai nat",        "name_th": "ชัยนาท",         "name_en": "Chai Nat",        "region": "central", "lat": 15.1851, "lon": 100.1252},
    {"key": "saraburi",        "name_th": "สระบุรี",        "name_en": "Saraburi",        "region": "central", "lat": 14.5289, "lon": 100.9101},
    {"key": "nakhon nayok",    "name_th": "นครนายก",        "name_en": "Nakhon Nayok",    "region": "central", "lat": 14.2069, "lon": 101.2130},
    {"key": "nakhon pathom",   "name_th": "นครปฐม",         "name_en": "Nakhon Pathom",   "region": "central", "lat": 13.8199, "lon": 100.0443},
    {"key": "samut sakhon",    "name_th": "สมุทรสาคร",      "name_en": "Samut Sakhon",    "region": "central", "lat": 13.5475, "lon": 100.2747},
    {"key": "samut songkhram", "name_th": "สมุทรสงคราม",    "name_en": "Samut Songkhram", "region": "central", "lat": 13.4098, "lon": 100.0023},
    {"key": "ratchaburi",      "name_th": "ราชบุรี",        "name_en": "Ratchaburi",      "region": "central", "lat": 13.5282, "lon": 99.8134},
    {"key": "suphanburi",      "name_th": "สุพรรณบุรี",     "name_en": "Suphanburi",      "region": "central", "lat": 14.4744, "lon": 100.1177},
    {"key": "kanchanaburi",    "name_th": "กาญจนบุรี",      "name_en": "Kanchanaburi",    "region": "central", "lat": 14.0023, "lon": 99.5328},
    {"key": "phetchaburi",     "name_th": "เพชรบุรี",       "name_en": "Phetchaburi",     "region": "central", "lat": 13.1119, "lon": 99.9390},
    {"key": "prachuap khiri khan", "name_th": "ประจวบคีรีขันธ์", "name_en": "Prachuap Khiri Khan", "region": "central", "lat": 11.7941, "lon": 99.7976},

    # ภาคตะวันออก (Eastern)
    {"key": "chonburi",        "name_th": "ชลบุรี",         "name_en": "Chonburi",        "region": "eastern", "lat": 13.3611, "lon": 100.9847},
    {"key": "rayong",          "name_th": "ระยอง",          "name_en": "Rayong",          "region": "eastern", "lat": 12.6814, "lon": 101.2816},
    {"key": "chanthaburi",     "name_th": "จันทบุรี",       "name_en": "Chanthaburi",     "region": "eastern", "lat": 12.6111, "lon": 102.1038},
    {"key": "trat",            "name_th": "ตราด",           "name_en": "Trat",            "region": "eastern", "lat": 12.2427, "lon": 102.5153},
    {"key": "prachin buri",    "name_th": "ปราจีนบุรี",     "name_en": "Prachin Buri",    "region": "eastern", "lat": 14.0509, "lon": 101.3658},
    {"key": "sa kaeo",         "name_th": "สระแก้ว",        "name_en": "Sa Kaeo",         "region": "eastern", "lat": 13.8240, "lon": 102.0645},
    {"key": "chachoengsao",    "name_th": "ฉะเชิงเทรา",     "name_en": "Chachoengsao",    "region": "eastern", "lat": 13.6904, "lon": 101.0779},

    # ภาคเหนือ (Northern)
    {"key": "chiang mai",      "name_th": "เชียงใหม่",      "name_en": "Chiang Mai",      "region": "northern", "lat": 18.7883, "lon": 98.9853},
    {"key": "chiang rai",      "name_th": "เชียงราย",       "name_en": "Chiang Rai",      "region": "northern", "lat": 19.9105, "lon": 99.8406},
    {"key": "mae hong son",    "name_th": "แม่ฮ่องสอน",     "name_en": "Mae Hong Son",    "region": "northern", "lat": 19.3021, "lon": 97.9654},
    {"key": "lamphun",         "name_th": "ลำพูน",          "name_en": "Lamphun",         "region": "northern", "lat": 18.5746, "lon": 99.0087},
    {"key": "lampang",         "name_th": "ลำปาง",          "name_en": "Lampang",         "region": "northern", "lat": 18.2888, "lon": 99.4923},
    {"key": "phrae",           "name_th": "แพร่",           "name_en": "Phrae",           "region": "northern", "lat": 18.1446, "lon": 100.1408},
    {"key": "nan",             "name_th": "น่าน",           "name_en": "Nan",             "region": "northern", "lat": 18.7756, "lon": 100.7730},
    {"key": "phayao",          "name_th": "พะเยา",          "name_en": "Phayao",          "region": "northern", "lat": 19.1695, "lon": 99.9010},
    {"key": "uttaradit",       "name_th": "อุตรดิตถ์",      "name_en": "Uttaradit",       "region": "northern", "lat": 17.6200, "lon": 100.0993},
    {"key": "sukhothai",       "name_th": "สุโขทัย",        "name_en": "Sukhothai",       "region": "northern", "lat": 17.0068, "lon": 99.8267},
    {"key": "tak",             "name_th": "ตาก",            "name_en": "Tak",             "region": "northern", "lat": 16.8839, "lon": 99.1258},
    {"key": "kamphaeng phet",  "name_th": "กำแพงเพชร",      "name_en": "Kamphaeng Phet",  "region": "northern", "lat": 16.4827, "lon": 99.5228},
    {"key": "phichit",         "name_th": "พิจิตร",         "name_en": "Phichit",         "region": "northern", "lat": 16.4412, "lon": 100.3488},
    {"key": "phitsanulok",     "name_th": "พิษณุโลก",       "name_en": "Phitsanulok",     "region": "northern", "lat": 16.8211, "lon": 100.2659},
    {"key": "phetchabun",      "name_th": "เพชรบูรณ์",      "name_en": "Phetchabun",      "region": "northern", "lat": 16.4189, "lon": 101.1591},
    {"key": "nakhon sawan",    "name_th": "นครสวรรค์",      "name_en": "Nakhon Sawan",    "region": "northern", "lat": 15.7030, "lon": 100.1370},
    {"key": "uthai thani",     "name_th": "อุทัยธานี",      "name_en": "Uthai Thani",     "region": "northern", "lat": 15.3836, "lon": 100.0246},

    # ภาคตะวันออกเฉียงเหนือ / อีสาน (Northeastern)
    {"key": "khon kaen",       "name_th": "ขอนแก่น",        "name_en": "Khon Kaen",       "region": "northeastern", "lat": 16.4322, "lon": 102.8236},
    {"key": "udon thani",      "name_th": "อุดรธานี",       "name_en": "Udon Thani",      "region": "northeastern", "lat": 17.4138, "lon": 102.7872},
    {"key": "nong khai",       "name_th": "หนองคาย",        "name_en": "Nong Khai",       "region": "northeastern", "lat": 17.8782, "lon": 102.7421},
    {"key": "loei",            "name_th": "เลย",            "name_en": "Loei",            "region": "northeastern", "lat": 17.4860, "lon": 101.7223},
    {"key": "nong bua lamphu", "name_th": "หนองบัวลำภู",    "name_en": "Nong Bua Lam Phu","region": "northeastern", "lat": 17.2021, "lon": 102.4414},
    {"key": "sakon nakhon",    "name_th": "สกลนคร",         "name_en": "Sakon Nakhon",    "region": "northeastern", "lat": 17.1550, "lon": 104.1348},
    {"key": "nakhon phanom",   "name_th": "นครพนม",         "name_en": "Nakhon Phanom",   "region": "northeastern", "lat": 17.3921, "lon": 104.7739},
    {"key": "mukdahan",        "name_th": "มุกดาหาร",       "name_en": "Mukdahan",        "region": "northeastern", "lat": 16.5428, "lon": 104.7237},
    {"key": "kalasin",         "name_th": "กาฬสินธุ์",      "name_en": "Kalasin",         "region": "northeastern", "lat": 16.4314, "lon": 103.5059},
    {"key": "maha sarakham",   "name_th": "มหาสารคาม",      "name_en": "Maha Sarakham",   "region": "northeastern", "lat": 16.1851, "lon": 103.3003},
    {"key": "roi et",          "name_th": "ร้อยเอ็ด",       "name_en": "Roi Et",          "region": "northeastern", "lat": 16.0538, "lon": 103.6520},
    {"key": "yasothon",        "name_th": "ยโสธร",          "name_en": "Yasothon",        "region": "northeastern", "lat": 15.7927, "lon": 104.1452},
    {"key": "amnat charoen",   "name_th": "อำนาจเจริญ",     "name_en": "Amnat Charoen",   "region": "northeastern", "lat": 15.8656, "lon": 104.6262},
    {"key": "ubon ratchathani","name_th": "อุบลราชธานี",    "name_en": "Ubon Ratchathani","region": "northeastern", "lat": 15.2448, "lon": 104.8472},
    {"key": "si sa ket",       "name_th": "ศรีสะเกษ",       "name_en": "Si Sa Ket",       "region": "northeastern", "lat": 15.1186, "lon": 104.3220},
    {"key": "surin",           "name_th": "สุรินทร์",       "name_en": "Surin",           "region": "northeastern", "lat": 14.8825, "lon": 103.4937},
    {"key": "buri ram",        "name_th": "บุรีรัมย์",      "name_en": "Buri Ram",        "region": "northeastern", "lat": 14.9930, "lon": 103.1029},
    {"key": "nakhon ratchasima","name_th": "นครราชสีมา",    "name_en": "Nakhon Ratchasima","region": "northeastern", "lat": 14.9799, "lon": 102.0978},
    {"key": "chaiyaphum",      "name_th": "ชัยภูมิ",        "name_en": "Chaiyaphum",      "region": "northeastern", "lat": 15.8068, "lon": 102.0316},
    {"key": "bueng kan",       "name_th": "บึงกาฬ",         "name_en": "Bueng Kan",       "region": "northeastern", "lat": 18.3610, "lon": 103.6467},

    # ภาคใต้ (Southern)
    {"key": "surat thani",     "name_th": "สุราษฎร์ธานี",   "name_en": "Surat Thani",     "region": "southern", "lat": 9.1382, "lon": 99.3216},
    {"key": "nakhon si thammarat", "name_th": "นครศรีธรรมราช", "name_en": "Nakhon Si Thammarat", "region": "southern", "lat": 8.4320, "lon": 99.9633},
    {"key": "krabi",           "name_th": "กระบี่",         "name_en": "Krabi",           "region": "southern", "lat": 8.0863, "lon": 98.9063},
    {"key": "phang nga",       "name_th": "พังงา",          "name_en": "Phang Nga",       "region": "southern", "lat": 8.4509, "lon": 98.5253},
    {"key": "phuket",          "name_th": "ภูเก็ต",         "name_en": "Phuket",          "region": "southern", "lat": 7.8804, "lon": 98.3923},
    {"key": "trang",           "name_th": "ตรัง",           "name_en": "Trang",           "region": "southern", "lat": 7.5593, "lon": 99.6110},
    {"key": "phatthalung",     "name_th": "พัทลุง",         "name_en": "Phatthalung",     "region": "southern", "lat": 7.6166, "lon": 100.0740},
    {"key": "songkhla",        "name_th": "สงขลา",          "name_en": "Songkhla",        "region": "southern", "lat": 7.1897, "lon": 100.5952},
    {"key": "satun",           "name_th": "สตูล",           "name_en": "Satun",           "region": "southern", "lat": 6.6238, "lon": 100.0674},
    {"key": "pattani",         "name_th": "ปัตตานี",        "name_en": "Pattani",         "region": "southern", "lat": 6.8693, "lon": 101.2504},
    {"key": "yala",            "name_th": "ยะลา",           "name_en": "Yala",            "region": "southern", "lat": 6.5413, "lon": 101.2805},
    {"key": "narathiwat",      "name_th": "นราธิวาส",       "name_en": "Narathiwat",      "region": "southern", "lat": 6.4254, "lon": 101.8253},
    {"key": "chumphon",        "name_th": "ชุมพร",          "name_en": "Chumphon",        "region": "southern", "lat": 10.4930, "lon": 99.1800},
    {"key": "ranong",          "name_th": "ระนอง",          "name_en": "Ranong",          "region": "southern", "lat": 9.9528, "lon": 98.6083},
]


def wmo_code_to_text(code: int) -> tuple[str, str]:
    """แปลง WMO weather code เป็นข้อความ"""
    if code == 0:
        return "☀️ ท้องฟ้าโปร่ง แดดจัด", "☀️ Clear Sky & Sunny"
    elif 1 <= code <= 3:
        return "⛅ มีเมฆบางส่วนถึงเมฆมาก", "⛅ Partly to Highly Cloudy"
    elif 45 <= code <= 48:
        return "🌫️ มีหมอกควันหนาแน่น", "🌫️ Foggy & Hazy"
    elif 51 <= code <= 57:
        return "🌧️ มีฝนตกปรอยๆ", "🌧️ Light Drizzle"
    elif 61 <= code <= 67:
        return "🌧️ มีฝนตกเล็กน้อยถึงปานกลาง", "🌧️ Light to Moderate Rain"
    elif 80 <= code <= 82:
        return "🌧️ มีฝนตกชุกค่อนข้างหนัก", "🌧️ Heavy Rain Showers"
    elif 95 <= code <= 99:
        return "🌩️ มีพายุฝนฟ้าคะนอง", "🌩️ Thunderstorm Warning"
    return "☀️ อากาศโปร่งใส", "☀️ Clear Weather"


async def fetch_province(session: aiohttp.ClientSession, province: dict) -> dict | None:
    """ดึงข้อมูล weather + AQI สำหรับ 1 จังหวัด"""
    lat, lon = province["lat"], province["lon"]
    weather_url = (
        f"https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}&longitude={lon}"
        f"&current_weather=true"
        f"&hourly=temperature_2m,relativehumidity_2m"
        f"&forecast_days=1"
    )
    aqi_url = (
        f"https://air-quality-api.open-meteo.com/v1/air-quality"
        f"?latitude={lat}&longitude={lon}"
        f"&current=us_aqi,pm2_5"
        f"&hourly=us_aqi,pm2_5"
        f"&forecast_days=1"
    )
    try:
        async with session.get(weather_url, timeout=aiohttp.ClientTimeout(total=10)) as wr:
            weather = await wr.json()
        async with session.get(aqi_url, timeout=aiohttp.ClientTimeout(total=10)) as ar:
            aqi = await ar.json()

        cw = weather.get("current_weather", {})
        temp = float(cw.get("temperature", 30.0))
        wind = float(cw.get("windspeed", 10.0))
        wcode = int(cw.get("weathercode", 0))
        humidity = (weather.get("hourly", {}).get("relativehumidity_2m") or [65])[12]
        aqi_val = round((aqi.get("current", {}).get("us_aqi") or 45))
        pm25_val = round(float((aqi.get("current", {}).get("pm2_5") or 12.5)), 1)

        h_labels = [(t.split("T")[1]) for t in (weather.get("hourly", {}).get("time") or [])[:7]]
        h_temps  = (weather.get("hourly", {}).get("temperature_2m") or [28,29,31,32,30,29,28])[:7]
        h_aqis   = (aqi.get("hourly", {}).get("us_aqi") or [40,42,48,50,45,43,41])[:7]

        text_th, text_en = wmo_code_to_text(wcode)
        return {
            "city_key":       province["key"],
            "city_name_th":   province["name_th"],
            "city_name_en":   province["name_en"],
            "lat":            lat,
            "lon":            lon,
            "temperature":    round(temp, 1),
            "humidity":       int(humidity),
            "wind_speed":     round(wind, 1),
            "weather_code":   wcode,
            "weather_text_th": text_th,
            "weather_text_en": text_en,
            "aqi":            aqi_val,
            "pm25":           pm25_val,
            "hourly_labels":  h_labels,
            "hourly_temps":   h_temps,
            "hourly_aqis":    h_aqis,
            "fetched_at":     datetime.now(timezone.utc).isoformat(),
        }
    except Exception as e:
        print(f"  [WARN] {province['name_en']} ({province['key']}): {e}")
        return None


def upsert_to_supabase(records: list[dict]) -> int:
    """Upsert records ลง Supabase ใช้ REST API โดยตรง (ไม่ต้องพึ่ง supabase-py)"""
    import urllib.request
    import urllib.error

    url = f"{SUPABASE_URL}/rest/v1/weather_aqi_cache"
    headers = {
        "apikey":          SUPABASE_ANON_KEY,
        "Authorization":   f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type":    "application/json",
        "Prefer":          "resolution=merge-duplicates,return=minimal",
    }

    # แปลง JSONB fields ให้เป็น list จริงๆ (Supabase REST รับ JSON ได้เลย)
    body = json.dumps(records).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            print(f"  [Supabase] Upserted {len(records)} records → HTTP {status}")
            return len(records)
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        print(f"  [Supabase ERROR] HTTP {e.code}: {error_body}")
        return 0


async def run():
    """Main runner: ดึง API ทุก 78 จังหวัด แบบ batch แล้ว upsert Supabase"""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        print("[ERROR] กรุณาตั้งค่า SUPABASE_URL และ SUPABASE_ANON_KEY ใน .env")
        return

    total = len(PROVINCES)
    print(f"[START] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} — ดึงข้อมูล {total} จังหวัด")

    all_records = []
    failed = []

    async with aiohttp.ClientSession() as session:
        for i in range(0, total, BATCH_SIZE):
            batch = PROVINCES[i:i + BATCH_SIZE]
            batch_nums = f"{i+1}–{min(i+BATCH_SIZE, total)}"
            print(f"\n[Batch] จังหวัดที่ {batch_nums}/{total}")

            tasks = [fetch_province(session, p) for p in batch]
            results = await asyncio.gather(*tasks)

            for result, province in zip(results, batch):
                if result:
                    all_records.append(result)
                    print(f"  ✅ {province['name_en']:25s} | Temp: {result['temperature']}°C | AQI: {result['aqi']}")
                else:
                    failed.append(province["key"])

            if i + BATCH_SIZE < total:
                print(f"  ⏳ รอ {BATCH_DELAY_SEC}s ก่อน batch ถัดไป...")
                await asyncio.sleep(BATCH_DELAY_SEC)

    # Upsert ทั้งหมดใน 1 request
    if all_records:
        print(f"\n[Supabase] Upserting {len(all_records)} records...")
        upsert_to_supabase(all_records)

    print(f"\n[DONE] สำเร็จ {len(all_records)}/{total} จังหวัด", end="")
    if failed:
        print(f" | ล้มเหลว: {', '.join(failed)}")
    else:
        print(" | ทุกจังหวัดสำเร็จ ✅")


if __name__ == "__main__":
    asyncio.run(run())
