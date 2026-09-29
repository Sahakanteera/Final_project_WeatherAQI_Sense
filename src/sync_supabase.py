"""
Fetch live weather and air quality for all 78 Thai provinces
using Open-Meteo batch multi-coordinate API and upsert directly to Supabase.
"""

import json
import urllib.request
import re
import os

SUPABASE_URL = "https://gufpmcpwqdgrtgincffa.supabase.co"
SUPABASE_ANON_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZnBtY3B3cWRncnRnaW5jZmZhIiw"
    "icm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NTgwNjgsImV4cCI6MjEwNTEzNDA2OH0."
    "XvGEp-3WoXUJzc0Zqkmf3Mz9GX9OGKf17c1Cb1C-RuU"
)


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
    index_file = os.path.join(root, "legacy_index.html")
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
        pattern = (
            r'key:"([^"]+)",\s*nameTh:"([^"]+)",\s*nameEn:"([^"]+)",\s*'
            r'region:"([^"]+)",\s*lat:([0-9.]+),\s*lon:([0-9.]+)'
        )
        m = re.search(pattern, line)
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

        weather_url = (
            f"https://api.open-meteo.com/v1/forecast?latitude={lats}&longitude={lons}"
            "&current_weather=true&hourly=temperature_2m,relativehumidity_2m,rain,precipitation_probability"
            "&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,sunrise,sunset"
            "&forecast_days=7&timezone=Asia%2FBangkok"
        )
        aqi_url = (
            f"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lats}&longitude={lons}"
            "&current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone"
            "&hourly=us_aqi,pm2_5&forecast_days=7&timezone=Asia%2FBangkok"
        )

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

            from datetime import datetime
            current_idx = 0
            current_time_str = datetime.now().strftime("%Y-%m-%dT%H:00")
            times = wj.get("hourly", {}).get("time", [])
            for i, t in enumerate(times):
                if t >= current_time_str:
                    current_idx = i
                    break
            
            hourly_times = []
            hourly_temps = []
            hourly_aqis = []
            hourly_rains = []
            
            t_list = wj.get("hourly", {}).get("time", [])
            temp_list = wj.get("hourly", {}).get("temperature_2m", [])
            aqi_list = aj.get("hourly", {}).get("us_aqi", [])
            rain_list = wj.get("hourly", {}).get("rain", [])
            prob_list = wj.get("hourly", {}).get("precipitation_probability", [])
            wcode_list = wj.get("hourly", {}).get("weathercode", [])
            
            for i in range(24):
                idx = current_idx + i
                if idx < len(t_list):
                    hourly_times.append(t_list[idx].split("T")[1])
                    hourly_temps.append(temp_list[idx] if idx < len(temp_list) else 0)
                    hourly_aqis.append(aqi_list[idx] if idx < len(aqi_list) else 0)
                    hourly_rains.append({
                        "time": t_list[idx].split("T")[1],
                        "prob": prob_list[idx] if idx < len(prob_list) else 0,
                        "rain": rain_list[idx] if idx < len(rain_list) else 0,
                        "wcode": wcode_list[idx] if idx < len(wcode_list) else 0
                    })

            wt = map_wmo_code_to_text(wcode)

            # --- New Data Extraction (Daily, Pollutants, Lifestyle) ---
            daily_weather = wj.get("daily", {})
            daily_times = daily_weather.get("time", [])
            
            uv_index = 0.0
            sunrise_time = ""
            sunset_time = ""
            
            if daily_times:
                uv_max_list = daily_weather.get("uv_index_max", [])
                uv_index = uv_max_list[0] if uv_max_list and uv_max_list[0] is not None else 0.0
                
                sunrise_list = daily_weather.get("sunrise", [])
                if sunrise_list and sunrise_list[0]:
                    sunrise_time = sunrise_list[0].split("T")[1]
                    
                sunset_list = daily_weather.get("sunset", [])
                if sunset_list and sunset_list[0]:
                    sunset_time = sunset_list[0].split("T")[1]

            daily_forecast = []
            if daily_times:
                wcodes = daily_weather.get("weathercode", [])
                t_max = daily_weather.get("temperature_2m_max", [])
                t_min = daily_weather.get("temperature_2m_min", [])
                p_sum = daily_weather.get("precipitation_sum", [])
                
                for d_idx, d_time in enumerate(daily_times):
                    d_wcode = wcodes[d_idx] if d_idx < len(wcodes) else 0
                    wt_info = map_wmo_code_to_text(d_wcode)
                    daily_forecast.append({
                        "date": d_time,
                        "temp_max": t_max[d_idx] if d_idx < len(t_max) else 0,
                        "temp_min": t_min[d_idx] if d_idx < len(t_min) else 0,
                        "rain_sum": p_sum[d_idx] if d_idx < len(p_sum) else 0,
                        "weather_code": d_wcode,
                        "weather_text_th": wt_info["th"],
                        "weather_text_en": wt_info["en"]
                    })

            pollutants_data = {
                "pm10": ca.get("pm10", 0),
                "co": ca.get("carbon_monoxide", 0),
                "no2": ca.get("nitrogen_dioxide", 0),
                "so2": ca.get("sulphur_dioxide", 0),
                "o3": ca.get("ozone", 0)
            }

            lifestyle_data = {
                "uv_advice": "ควรทาครีมกันแดด" if uv_index > 5 else "รังสี UV ปกติ",
                "air_advice": "สวมหน้ากาก N95" if aqi > 100 else "ทำกิจกรรมกลางแจ้งได้ปกติ",
                "running": "ไม่เหมาะสม" if aqi > 100 else "ดีมาก"
            }
            # ------------------------------------------------------------

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
                "hourly_aqis": hourly_aqis,
                "hourly_rains": hourly_rains,
                "daily_forecast": daily_forecast,
                "pollutants_data": pollutants_data,
                "lifestyle_data": lifestyle_data,
                "uv_index": uv_index,
                "sunrise_time": sunrise_time,
                "sunset_time": sunset_time
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
