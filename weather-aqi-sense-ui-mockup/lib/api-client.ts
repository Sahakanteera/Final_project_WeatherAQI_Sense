/**
 * API Client & Data Provider for WeatherAQI Sense Modern Dashboard
 * Integrates:
 * 1. Open-Meteo Weather API (Real-time temperature, rain, wind, WMO weather codes, 7-day forecast)
 * 2. Open-Meteo Air Quality API (US AQI, PM2.5, PM10, O3, NO2, SO2, CO)
 * 3. Supabase Cloud Database (PostgreSQL 'weather_aqi_cache' for fast cached reads & automated upsert)
 * 4. Fallback system ensuring 100% uptime with rich offline province baseline data
 */

import type { City, DayForecast, HourPoint, LifestyleIndex, Pollutants, WeatherKind } from "./weather-data"

export const SUPABASE_URL = "https://gufpmcpwqdgrtgincffa.supabase.co"
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZnBtY3B3cWRncnRnaW5jZmZhIiw" +
  "icm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NTgwNjgsImV4cCI6MjEwNTEzNDA2OH0." +
  "XvGEp-3WoXUJzc0Zqkmf3Mz9GX9OGKf17c1Cb1C-RuU"

export function mapWmoCodeToKind(code: number): WeatherKind {
  if (code === 0) return "sunny"
  if (code >= 1 && code <= 2) return "partly_cloudy"
  if (code === 3 || (code >= 45 && code <= 48)) return "cloudy"
  if (code >= 51 && code <= 67) return "rain_light"
  if (code >= 80 && code <= 82) return "rain_heavy"
  if (code >= 95 && code <= 99) return "thunderstorm"
  return "partly_cloudy"
}

export function degreesToCompass(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  const index = Math.round(deg / 22.5) % 16
  return dirs[index] || "SW"
}

export function calculateLifestyle(temp: number, aqi: number, rainChance: number): LifestyleIndex {
  let runScore = 90
  if (temp > 35) runScore -= 30
  else if (temp > 32) runScore -= 15
  if (aqi > 150) runScore -= 45
  else if (aqi > 100) runScore -= 25
  else if (aqi > 50) runScore -= 10
  if (rainChance > 50) runScore -= 35
  else if (rainChance > 20) runScore -= 15
  runScore = Math.max(10, Math.min(100, runScore))

  let laundryScore = 85
  if (rainChance > 60) laundryScore -= 50
  else if (rainChance > 30) laundryScore -= 25
  if (temp > 30) laundryScore += 10
  laundryScore = Math.max(10, Math.min(100, laundryScore))

  const carScore = rainChance > 40 ? 30 : rainChance > 20 ? 60 : 95
  const sunScore = temp > 32 ? 90 : temp > 28 ? 70 : 45

  return {
    running: {
      score: runScore,
      labelTh: runScore >= 80 ? "เหมาะมาก" : runScore >= 50 ? "ปานกลาง" : "ไม่แนะนำ",
      labelEn: runScore >= 80 ? "Great" : runScore >= 50 ? "Moderate" : "Avoid",
      descTh:
        aqi > 100
          ? "มลพิษอากาศสูง ควรงดออกกำลังกายกลางแจ้ง"
          : rainChance > 40
            ? "ระวังฝนตก เสี่ยงเปียกชื้น"
            : "สภาพอากาศเหมาะสมกับการออกกำลังกาย",
      descEn:
        aqi > 100
          ? "High pollution. Avoid outdoor cardio."
          : rainChance > 40
            ? "Rain likely, plan indoors."
            : "Ideal weather for running.",
    },
    laundry: {
      score: laundryScore,
      labelTh: laundryScore >= 75 ? "เหมาะมาก" : laundryScore >= 45 ? "พอใช้" : "ไม่แนะนำ",
      labelEn: laundryScore >= 75 ? "Excellent" : laundryScore >= 45 ? "Fair" : "Poor",
      descTh: rainChance > 50 ? "โอกาสฝนตกสูง ตากผ้าในร่มดีกว่า" : "แดดและลมดี ผ้าแห้งเร็วแน่นอน",
      descEn: rainChance > 50 ? "High rain risk, dry indoors." : "Sunny and breezy, fast drying.",
    },
    carWash: {
      score: carScore,
      labelTh: carScore >= 75 ? "เหมาะมาก" : "รอก่อน",
      labelEn: carScore >= 75 ? "Great" : "Wait",
      descTh: carScore < 75 ? "มีโอกาสฝนตกใน 24 ชม. เสี่ยงเปื้อน" : "ไม่มีแนวโน้มฝน ล้างรถได้สบายใจ",
      descEn: carScore < 75 ? "Rain expected in 24h, wait." : "Dry outlook, good for car wash.",
    },
    sunscreen: {
      score: sunScore,
      labelTh: sunScore >= 75 ? "จำเป็นมาก" : "ควรทา",
      labelEn: sunScore >= 75 ? "Very High" : "Moderate",
      descTh: temp >= 33 ? "ดัชนีแดดแรง ควรทา SPF 50+ และสวมหมวก" : "แดดปานกลาง ทา SPF 30 ป้องกันผิว",
      descEn: temp >= 33 ? "Strong UV, apply SPF 50+ & shades." : "Moderate UV, apply SPF 30.",
    },
  }
}

export function computeAiAlert(aqi: number, temp: number, rainChance: number, rainMm: number) {
  if (rainMm >= 5.0 || rainChance >= 75) {
    return {
      level: "warning" as const,
      titleTh: "🌧️ แจ้งเตือนฝนฟ้าคะนองและฝนตกหนัก",
      titleEn: "🌧️ Heavy Rain & Thunderstorm Warning",
      descTh: `มีโอกาสเกิดฝนตกหนัก (${rainMm} มม.) หรือฝนฟ้าคะนองในพื้นที่ ควรพกร่มและระวังการขับขี่`,
      descEn: `Heavy precipitation alert (${rainMm} mm). High probability of thunderstorms. Drive safely.`,
      sourceTh: "กรมอุตุนิยมวิทยา / Open-Meteo",
      sourceEn: "TMD / Open-Meteo Live",
    }
  }

  if (aqi >= 151) {
    return {
      level: "warning" as const,
      titleTh: "😷 แจ้งเตือนคุณภาพอากาศ: มีผลกระทบต่อสุขภาพ (AQI " + aqi + ")",
      titleEn: "😷 Air Quality Alert: Unhealthy Level (AQI " + aqi + ")",
      descTh: "ดัชนีมลพิษฝุ่น PM2.5 สูงเกินเกณฑ์มาตรฐาน แนะนำสวมหน้ากาก N95 และหลีกเลี่ยงกิจกรรมกลางแจ้ง",
      descEn: "Elevated PM2.5 index exceeding safe limits. Wear N95 masks and restrict outdoor activities.",
      sourceTh: "กรมควบคุมมลพิษ / AI Advisory",
      sourceEn: "PCD / AI Advisory",
    }
  }

  if (temp >= 36) {
    return {
      level: "advisory" as const,
      titleTh: "☀️ แจ้งเตือนอุณหภูมิสูงจัด (High Heat Warning)",
      titleEn: "☀️ High Temperature & Heat Advisory",
      descTh: `อุณหภูมิแตะระดับ ${temp}°C อากาศร้อนจัด ควรดื่มน้ำบ่อยๆ และระวังโรคลมแดด (Heatstroke)`,
      descEn: `Extreme temperature at ${temp}°C. Stay well-hydrated and protect against heat exhaustion.`,
      sourceTh: "ระบบวิเคราะห์สุขภาพ AI",
      sourceEn: "AI Health Diagnostics",
    }
  }

  return undefined
}

/**
 * Fetch live data from Open-Meteo (Weather & Air Quality)
 */
export async function fetchOpenMeteoLive(lat: number, lon: number): Promise<Partial<City> | null> {
  try {
    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code` +
      `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,weather_code,uv_index,dew_point_2m,visibility` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&forecast_days=7&timezone=Asia%2FBangkok`

    const aqiUrl =
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}` +
      `&current=us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide` +
      `&hourly=us_aqi,pm2_5&forecast_days=1&timezone=Asia%2FBangkok`

    const [wRes, aRes] = await Promise.all([
      fetch(weatherUrl, { headers: { Accept: "application/json" } }),
      fetch(aqiUrl, { headers: { Accept: "application/json" } }),
    ])

    if (!wRes.ok || !aRes.ok) {
      throw new Error(`Open-Meteo HTTP error: weather ${wRes.status}, aqi ${aRes.status}`)
    }

    const wData = await wRes.json()
    const aData = await aRes.json()

    const currW = wData.current || {}
    const currA = aData.current || {}

    const temp = Math.round((currW.temperature_2m ?? 30.0) * 10) / 10
    const humidity = Math.round(currW.relative_humidity_2m ?? 65)
    const pressure = Math.round(currW.surface_pressure ?? 1010)
    const windSpeed = Math.round((currW.wind_speed_10m ?? 10.0) * 10) / 10
    const windDeg = currW.wind_direction_10m ?? 200
    const windGust = Math.round((currW.wind_gusts_10m ?? 15.0) * 10) / 10
    const wmoCode = currW.weather_code ?? 0
    const weatherKind = mapWmoCodeToKind(wmoCode)

    const aqi = Math.round(currA.us_aqi ?? 45)
    const pm25 = Math.round((currA.pm2_5 ?? 12.0) * 10) / 10
    const pm10 = Math.round((currA.pm10 ?? 25.0) * 10) / 10
    const o3 = Math.round((currA.ozone ?? 30.0) * 10) / 10
    const no2 = Math.round((currA.nitrogen_dioxide ?? 15.0) * 10) / 10
    const so2 = Math.round((currA.sulphur_dioxide ?? 2.0) * 10) / 10
    const co = Math.round(((currA.carbon_monoxide ?? 200.0) / 1000) * 10) / 10

    const pollutants: Pollutants = { pm25, pm10, o3, no2, so2, co }

    // Hourly 24 hours
    const hourlyPoints: HourPoint[] = []
    const hTime: string[] = wData.hourly?.time || []
    const hTemp: number[] = wData.hourly?.temperature_2m || []
    const hRainProb: number[] = wData.hourly?.precipitation_probability || []
    const hWmo: number[] = wData.hourly?.weather_code || []
    const hAqi: number[] = aData.hourly?.us_aqi || []

    const now = new Date()
    let startIdx = hTime.findIndex((t) => new Date(t).getTime() >= now.getTime())
    if (startIdx === -1) startIdx = 0

    for (let i = 0; i < 24 && startIdx + i < hTime.length; i++) {
      const idx = startIdx + i
      const tStr = hTime[idx] ? hTime[idx].split("T")[1].slice(0, 5) : `${idx}:00`
      hourlyPoints.push({
        time: tStr,
        temp: Math.round(hTemp[idx] ?? temp),
        aqi: Math.round(hAqi[idx] ?? aqi),
        rainChance: Math.round(hRainProb[idx] ?? 20),
        wind: windSpeed,
        weather: mapWmoCodeToKind(hWmo[idx] ?? 0),
      })
    }

    // 7-day forecast
    const sevenDay: DayForecast[] = []
    const dTime: string[] = wData.daily?.time || []
    const dMax: number[] = wData.daily?.temperature_2m_max || []
    const dMin: number[] = wData.daily?.temperature_2m_min || []
    const dProb: number[] = wData.daily?.precipitation_probability_max || []
    const dWmo: number[] = wData.daily?.weather_code || []

    const thDays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
    const enDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    for (let i = 0; i < dTime.length && i < 7; i++) {
      const d = new Date(dTime[i])
      const dayIdx = d.getDay()
      const dStr = `${d.getDate()}/${d.getMonth() + 1}`
      sevenDay.push({
        dayNameTh: i === 0 ? "วันนี้" : thDays[dayIdx],
        dayNameEn: i === 0 ? "Today" : enDays[dayIdx],
        date: dStr,
        weather: mapWmoCodeToKind(dWmo[i] ?? 0),
        tempMin: Math.round(dMin[i] ?? 24),
        tempMax: Math.round(dMax[i] ?? 34),
        rainChance: Math.round(dProb[i] ?? 20),
      })
    }

    const currentRainProb = hourlyPoints[0]?.rainChance ?? 20
    const rainMm = (wData.hourly?.rain && wData.hourly.rain[startIdx]) ? Math.round(wData.hourly.rain[startIdx] * 10) / 10 : 0.0

    const lifestyle = calculateLifestyle(temp, aqi, currentRainProb)
    const alert = computeAiAlert(aqi, temp, currentRainProb, rainMm)

    return {
      temp,
      tempMin: sevenDay[0]?.tempMin ?? 25,
      tempMax: sevenDay[0]?.tempMax ?? 35,
      feelsLike: Math.round((temp + (humidity > 70 ? 2 : 0)) * 10) / 10,
      humidity,
      pressure,
      wind: windSpeed,
      windDirection: degreesToCompass(windDeg),
      windGust,
      rainChance: currentRainProb,
      rainfallToday: rainMm,
      aqi,
      pm25,
      weather: weatherKind,
      pollutants,
      hourly: hourlyPoints.length > 0 ? hourlyPoints : undefined,
      sevenDayForecast: sevenDay.length > 0 ? sevenDay : undefined,
      lifestyle,
      alert,
    }
  } catch (err) {
    console.warn("[Open-Meteo] Live fetch error:", err)
    return null
  }
}

/**
 * Fetch cached province snapshot from Supabase PostgreSQL
 */
export async function fetchSupabaseData(cityKey: string): Promise<Partial<City> | null> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/weather_aqi_cache?city_key=eq.${encodeURIComponent(cityKey)}&select=*`
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) return null
    const rows = await res.json()
    if (!rows || rows.length === 0) return null

    const row = rows[0]
    const temp = Number(row.temperature) || 30.0
    const aqi = Number(row.aqi) || 45
    const pm25 = Number(row.pm25) || 12.0
    const humidity = Number(row.humidity) || 65
    const wind = Number(row.wind_speed) || 10.0
    const weatherKind = mapWmoCodeToKind(row.weather_code || 0)

    let hourlyPoints: HourPoint[] | undefined = undefined;
    if (row.hourly_rains && row.hourly_temps && row.hourly_labels && row.hourly_aqis) {
      const hRains = typeof row.hourly_rains === 'string' ? JSON.parse(row.hourly_rains) : row.hourly_rains;
      const hTemps = typeof row.hourly_temps === 'string' ? JSON.parse(row.hourly_temps) : row.hourly_temps;
      const hLabels = typeof row.hourly_labels === 'string' ? JSON.parse(row.hourly_labels) : row.hourly_labels;
      const hAqis = typeof row.hourly_aqis === 'string' ? JSON.parse(row.hourly_aqis) : row.hourly_aqis;

      if (hRains.length > 0) {
        hourlyPoints = [];
        for (let i = 0; i < Math.min(24, hRains.length, hTemps.length, hLabels.length, hAqis.length); i++) {
          hourlyPoints.push({
            time: hLabels[i],
            temp: hTemps[i],
            aqi: hAqis[i],
            rainChance: hRains[i].prob || 0,
            wind: wind,
            weather: weatherKind
          });
        }
      }
    }

    return {
      temp,
      aqi,
      pm25,
      humidity,
      wind,
      weather: weatherKind,
      feelsLike: Math.round(temp + 1),
      tempMin: Math.round(temp - 3),
      tempMax: Math.round(temp + 3),
      lifestyle: calculateLifestyle(temp, aqi, 20),
      hourly: hourlyPoints,
    }
  } catch (err) {
    console.warn("[Supabase] Cache fetch error:", err)
    return null
  }
}

/**
 * Upsert live data snapshot back into Supabase PostgreSQL
 */
export async function saveSupabaseData(cityKey: string, city: City, raw: Partial<City>): Promise<void> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/weather_aqi_cache?on_conflict=city_key`
    const payload = {
      city_key: cityKey,
      city_name_th: city.th,
      city_name_en: city.en,
      temperature: raw.temp ?? city.temp,
      humidity: raw.humidity ?? city.humidity,
      wind_speed: raw.wind ?? city.wind,
      weather_code: 0,
      aqi: raw.aqi ?? city.aqi,
      pm25: raw.pm25 ?? city.pm25,
      fetched_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.warn("[Supabase] Upsert error:", err)
  }
}

/**
 * Fetch all 77 provinces at once from Supabase Cloud cache
 */
export async function fetchAllSupabaseCities(): Promise<Record<string, Partial<City>>> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/weather_aqi_cache?select=city_key,temperature,aqi,pm25,humidity,wind_speed,weather_code,hourly_labels,hourly_temps,hourly_aqis,hourly_rains`
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) return {}
    const rows = await res.json()
    const map: Record<string, Partial<City>> = {}
    for (const r of rows) {
      if (!r.city_key) continue
      const k = String(r.city_key).toLowerCase().trim()
      const temp = Number(r.temperature) || 30.0
      const aqi = Number(r.aqi) || 40
      const pm25 = Number(r.pm25) || 12.0
      map[k] = {
        temp,
        aqi,
        pm25,
        humidity: Number(r.humidity) || 65,
        wind: Number(r.wind_speed) || 10,
        weather: mapWmoCodeToKind(r.weather_code || 0),
        feelsLike: Math.round(temp + 1),
        tempMin: Math.round(temp - 3),
        tempMax: Math.round(temp + 3),
      }

      if (r.hourly_rains && r.hourly_temps && r.hourly_labels && r.hourly_aqis) {
        const hRains = typeof r.hourly_rains === 'string' ? JSON.parse(r.hourly_rains) : r.hourly_rains;
        const hTemps = typeof r.hourly_temps === 'string' ? JSON.parse(r.hourly_temps) : r.hourly_temps;
        const hLabels = typeof r.hourly_labels === 'string' ? JSON.parse(r.hourly_labels) : r.hourly_labels;
        const hAqis = typeof r.hourly_aqis === 'string' ? JSON.parse(r.hourly_aqis) : r.hourly_aqis;

        if (hRains.length > 0) {
          const hourlyPoints: HourPoint[] = [];
          for (let i = 0; i < Math.min(24, hRains.length, hTemps.length, hLabels.length, hAqis.length); i++) {
            hourlyPoints.push({
              time: hLabels[i],
              temp: hTemps[i],
              aqi: hAqis[i],
              rainChance: hRains[i].prob || 0,
              wind: map[k].wind || 10,
              weather: map[k].weather || "sunny"
            });
          }
          map[k].hourly = hourlyPoints;
        }
      }
    }
    return map
  } catch (err) {
    console.warn("[Supabase] Bulk fetch error:", err)
    return {}
  }
}

/**
 * Hybrid City Provider:
 * 1. Try Supabase Cache first for lightning-fast loads
 * 2. Fall back to Open-Meteo Live API
 * 3. Fall back to pre-compiled offline baseline data
 */
export async function getCityDataWithFallback(
  city: City,
  forceLive: boolean = false
): Promise<{ data: Partial<City>; source: "live" | "supabase" | "cache" | "demo" }> {
  // If not forcing live, try Supabase cache
  if (!forceLive) {
    const cached = await fetchSupabaseData(city.key)
    if (cached) {
      return { data: cached, source: "supabase" }
    }
  }

  // Fetch live Open-Meteo
  const live = await fetchOpenMeteoLive(city.lat, city.lon)
  if (live) {
    // Background save to Supabase
    saveSupabaseData(city.key, city, live).catch(() => {})
    return { data: live, source: "live" }
  }

  return { data: {}, source: "demo" }
}
