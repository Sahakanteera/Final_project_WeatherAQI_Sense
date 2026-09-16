"""
Fetch live weather and air quality for all 78 Thai provinces
using Open-Meteo batch multi-coordinate API and upsert directly to Supabase.
"""

import json
import urllib.request
import re
import os

SUPABASE_URL = "https://gufpmcpwqdgrtgincffa.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZnBtY3B3cWRncnRnaW5jZmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NTgwNjgsImV4cCI6MjEwNTEzNDA2OH0.XvGEp-3WoXUJzc0Zqkmf3Mz9GX9OGKf17c1Cb1C-RuU"

def map_wmo_code_to_text(code: int):
    if code == 0:
        return {"th": "☀️ ท้องฟ้าโปร่ง แดดจัด", "en": "☀️ Clear Sky & Sunny"}
    elif 1 <= code <= 3:
        return {"th": "⛅ มีเมฆบางส่วนถึงเมฆมาก", "en": "⛅ Partly to Highly Cloudy"}
    elif 45 <= code <= 48:
        return {"th": "🌫️ มีหมอกควันหนาแน่น", "en": "🌫️ Foggy & Hazy"}
    elif 51 <= code <= 57:
        return {"th": "🌧️ มีฝนตกปรอยๆ", "en": "🌧️ Light Drizzle"}
    elif 61 <= code <= 67:
        return {"th": "🌧️ มีฝนตกเล็กน้อยถึงปานกลาง", "en": "🌧️ Light to Moderate Rain"}
    elif 80 <= code <= 82:
        return {"th": "🌧️ มีฝนตกชุกค่อนข้างหนัก", "en": "🌧️ Heavy Rain Showers"}
    elif 95 <= code <= 99:
        return {"th": "🌩️ มีพายุฝนฟ้าคะนอง", "en": "🌩️ Thunderstorm Warning"}
    return {"th": "☀️ อากาศโปร่งใส", "en": "☀️ Clear Weather"}

def get_provinces():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_file = os.path.join(root, "index.html")
    with open(index_file, "r", encoding="utf-8") as f:
        html = f.read()

    match = re.search(r"const PROVINCES = \[(.*?)\];", html, re.DOTALL)
    if not match:
        raise ValueError("Could not find PROVINCES in index.html")

    lines = match.group(1).split("\n")
    provinces = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith("//"):
            continue
        # e.g. {key:"bangkok", nameTh:"กรุงเทพมหานคร", nameEn:"Bangkok", region:"central", lat:13.7563, lon:100.5018},
        m = re.search(r'key:"([^"]+)",\s*nameTh:"([^"]+)",\s*nameEn:"([^"]+)",\s*region:"([^"]+)",\s*lat:([0-9.]+),\s*lon:([0-9.]+)', line)
        if m:
            provinces.append({
                "key": m.group(1),
                "nameTh": m.group(2),
                "nameEn": m.group(3),
                "region": m.group(4),
                "lat": float(m.group(5)),
                "lon": float(m.group(6))
            })
    return provinces

def sync():
    provinces = get_provinces()
    print(f"Loaded {len(provinces)} provinces from index.html.")

    # Split into 2 chunks of ~39 each to avoid excessively long URL query strings
    chunk_size = 39
    all_records = []

    for chunk_idx in range(0, len(provinces), chunk_size):
        chunk = provinces[chunk_idx:chunk_idx + chunk_size]
        lats = ",".join(str(p["lat"]) for p in chunk)
        lons = ",".join(str(p["lon"]) for p in chunk)

        print(f"Fetching Open-Meteo batch for chunk {chunk_idx // chunk_size + 1} ({len(chunk)} provinces)...")

        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lats}&longitude={lons}&current_weather=true&hourly=temperature_2m,relativehumidity_2m&forecast_days=1"
        aqi_url = f"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lats}&longitude={lons}&current=us_aqi,pm2_5&hourly=us_aqi,pm2_5&forecast_days=1"

        req_w = urllib.request.Request(weather_url, headers={"User-Agent": "WeatherAQISense/1.0"})
        req_a = urllib.request.Request(aqi_url, headers={"User-Agent": "WeatherAQISense/1.0"})

        with urllib.request.urlopen(req_w, timeout=15) as res_w:
            w_data = json.loads(res_w.read().decode("utf-8"))
        with urllib.request.urlopen(req_a, timeout=15) as res_a:
            a_data = json.loads(res_a.read().decode("utf-8"))

        if not isinstance(w_data, list):
            w_data = [w_data]
        if not isinstance(a_data, list):
            a_data = [a_data]

        for i, p in enumerate(chunk):
            wj = w_data[i]
            aj = a_data[i]
            cw = wj.get("current_weather", {})
            ca = aj.get("current", {})

            temp = float(cw.get("temperature", 30.0))
            wind = float(cw.get("windspeed", 10.0))
            wcode = int(cw.get("weathercode", 0))

            h_rh = wj.get("hourly", {}).get("relativehumidity_2m", [65])
            humidity = h_rh[12] if len(h_rh) > 12 else 65

            aqi = int(round(ca.get("us_aqi", 45)))
            pm25 = float(ca.get("pm2_5", 12.5))

            hourly_times = [t.split("T")[1] for t in wj.get("hourly", {}).get("time", [])[:7]]
            hourly_temps = wj.get("hourly", {}).get("temperature_2m", [])[:7]
            hourly_aqis = aj.get("hourly", {}).get("us_aqi", [])[:7]

            wt = map_wmo_code_to_text(wcode)

            record = {
                "city_key": p["key"],
                "city_name_th": f"{p['nameTh']} ({p['nameEn']})",
                "city_name_en": p["nameEn"],
                "lat": p["lat"],
                "lon": p["lon"],
                "temperature": round(temp, 1),
                "humidity": humidity,
                "wind_speed": round(wind, 1),
                "weather_code": wcode,
                "weather_text_th": wt["th"],
                "weather_text_en": wt["en"],
                "aqi": aqi,
                "pm25": round(pm25, 1),
                "hourly_labels": hourly_times,
                "hourly_temps": hourly_temps,
                "hourly_aqis": hourly_aqis
            }
            all_records.append(record)

    print(f"\nPrepared {len(all_records)} province records. Upserting into Supabase...")

    # Upsert to Supabase in batches of 20
    upsert_url = f"{SUPABASE_URL}/rest/v1/weather_aqi_cache?on_conflict=city_key"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }

    for b in range(0, len(all_records), 20):
        batch = all_records[b:b + 20]
        payload = json.dumps(batch).encode("utf-8")
        req = urllib.request.Request(upsert_url, data=payload, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=15) as res:
            print(f"Upserted records {b+1} to {min(b+20, len(all_records))} (Status {res.status})")

    print("\n[SUCCESS] All provinces successfully synced to Supabase!\n")

if __name__ == "__main__":
    sync()
