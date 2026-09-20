import type { Lang, AqiBand, WeatherKind, City, ThaiRegion } from "./weather-data"

interface Bi {
  th: string
  en: string
}

export const t = (th: string, en: string): Bi => ({ th, en })

export const UI = {
  appName: t("WeatherAQI Sense", "WeatherAQI Sense"),
  subtitle: t("ระบบติดตามสภาพอากาศและคุณภาพอากาศประเทศไทย — Real-world Dashboard", "Thailand Weather & Air Quality Intelligence — Real-world Dashboard"),
  searchPlaceholder: t("ค้นหาจังหวัด หรือ อำเภอ (เช่น เชียงใหม่, ขอนแก่น, กรุงเทพ)...", "Search Thai provinces or districts (e.g. Chiang Mai, Phuket)..."),
  refresh: t("รีเฟรชข้อมูลสด", "Live Refresh"),
  liveUpdate: t("ข้อมูลสดล่าสุด", "Live Updated"),
  feelsLike: t("ความรู้สึกเหมือน", "Feels like"),
  humidity: t("ความชื้น", "Humidity"),
  wind: t("ความเร็วลม", "Wind"),
  windGust: t("ลมกระโชก", "Wind Gust"),
  pressure: t("ความกดอากาศ", "Barometer"),
  visibility: t("ทัศนวิสัย", "Visibility"),
  dewPoint: t("จุดน้ำค้าง", "Dew Point"),
  uvIndex: t("ดัชนี UV", "UV Index"),
  rainChance: t("โอกาสฝนตก", "Precipitation"),
  rainfall: t("ปริมาณฝนสะสม", "Rainfall"),
  sunrise: t("พระอาทิตย์ขึ้น", "Sunrise"),
  sunset: t("พระอาทิตย์ตก", "Sunset"),
  airQuality: t("ดัชนีคุณภาพอากาศ (US AQI)", "Air Quality Index (US AQI)"),
  pollutantsTitle: t("การตรวจวัดมลพิษในอากาศ (PCD Standard)", "Air Pollutant Concentrations (PCD Standard)"),
  hourlyTitle: t("พยากรณ์อากาศ 24 ชั่วโมงข้างหน้า", "24-Hour Hourly Forecast"),
  sevenDayTitle: t("พยากรณ์อากาศล่วงหน้า 7 วัน (ทั่วไทย)", "7-Day Thailand Weather Outlook"),
  lifestyleTitle: t("ดัชนีการใช้ชีวิตประจำวัน", "Daily Lifestyle & Living Index"),
  rankingsTitle: t("รายงานคุณภาพอากาศทั่วประเทศไทย (Rankings)", "Thailand National Air Quality Watchlist"),
  cleanestAir: t("5 อันดับอากาศดีที่สุดในไทย", "Top 5 Cleanest Air in Thailand"),
  mostPolluted: t("5 อันดับฝุ่นสะสมสูงสุด", "Top 5 Highest AQI in Thailand"),
  temperature: t("อุณหภูมิ", "Temperature"),
  healthAdvisory: t("คำแนะนำสุขภาพและกิจกรรม", "Health & Activity Advisory"),
  quickAsk: t("คำถามสุขภาพยอดนิยม", "Quick Health Assessment"),
  otherProvinces: t("เลือกดูจังหวัดอื่นในไทย", "Select Thailand Province"),
  allRegions: t("ทุกภาค", "All Regions"),
  team: t("ทีมพัฒนาโครงงาน CP352301", "CP352301 Project Team"),
  close: t("ปิด", "Close"),
  noResults: t("ไม่พบจังหวัดที่ค้นหา", "No matching provinces found"),
  viewMore: t("ดูรายละเอียดเพิ่มเติม", "View Details"),
  todayHighLow: t("สูงสุด / ต่ำสุด วันนี้", "Today's High / Low"),
  tmdSource: t("ที่มา: กรมอุตุนิยมวิทยา และ กรมควบคุมมลพิษ", "Source: Thai Meteorological Dept & Pollution Control Dept"),
}

export const REGION_NAMES: Record<ThaiRegion, Bi> = {
  central: t("ภาคกลาง", "Central"),
  northern: t("ภาคเหนือ", "Northern"),
  northeastern: t("ภาคตะวันออกเฉียงเหนือ", "Northeastern"),
  eastern: t("ภาคตะวันออก", "Eastern"),
  southern: t("ภาคใต้", "Southern"),
}

export const AQI_LABELS: Record<AqiBand, Bi> = {
  good: t("คุณภาพอากาศดี (Good)", "Good"),
  moderate: t("ปานกลาง (Moderate)", "Moderate"),
  unhealthy_sensitive: t("เริ่มมีผลต่อกลุ่มเสี่ยง (Unhealthy for Sensitive)", "Unhealthy for Sensitive"),
  unhealthy: t("มีผลกระทบต่อสุขภาพ (Unhealthy)", "Unhealthy"),
}

export const WEATHER_LABELS: Record<WeatherKind, Bi> = {
  sunny: t("ท้องฟ้าโปร่ง แดดจัด", "Sunny & Clear Sky"),
  partly_cloudy: t("มีเมฆบางส่วน", "Partly Cloudy"),
  cloudy: t("มีเมฆเป็นส่วนมาก", "Mostly Cloudy"),
  rain_light: t("มีฝนตกเล็กน้อยถึงปานกลาง", "Light to Moderate Rain"),
  rain_heavy: t("มีฝนตกหนักต่อเนื่อง", "Heavy Rain"),
  thunderstorm: t("พายุฝนฟ้าคะนองและลมกระโชกแรง", "Thunderstorms & Gusts"),
}

export function pick(bi: Bi, lang: Lang): string {
  return bi[lang]
}

export function cityName(city: City, lang: Lang): string {
  return lang === "th" ? city.th : city.en
}

export function districtName(city: City, lang: Lang): string {
  return lang === "th" ? city.districtTh : city.districtEn
}

export function uvDescription(uv: number, lang: Lang): { level: string; advice: string } {
  if (uv <= 2) {
    return {
      level: pick(t("ต่ำ (Low)", "Low"), lang),
      advice: pick(t("ปลอดภัย ไม่จำเป็นต้องป้องกันแดด", "Safe to be outdoors without protection."), lang),
    }
  }
  if (uv <= 5) {
    return {
      level: pick(t("ปานกลาง (Moderate)", "Moderate"), lang),
      advice: pick(t("สวมหมวกและทาครีมกันแดดหากอยู่กลางแดดนาน", "Wear a hat and apply SPF 30+ if staying in the sun."), lang),
    }
  }
  if (uv <= 7) {
    return {
      level: pick(t("สูง (High)", "High"), lang),
      advice: pick(t("แดดแรง ควรหลบแดดช่วง 11:00-15:00 ทากันแดด SPF 50+", "High UV risk. Seek shade from 11:00-15:00, use SPF 50+."), lang),
    }
  }
  if (uv <= 10) {
    return {
      level: pick(t("สูงมาก (Very High)", "Very High"), lang),
      advice: pick(t("แดดจัดมาก หลีกเลี่ยงแดดจัด สวมแว่นตากันแดดและเสื้อแขนยาว", "Very high burn risk. Limit sun exposure, wear UV sunglasses & sleeves."), lang),
    }
  }
  return {
    level: pick(t("อันตรายสูงสุด (Extreme)", "Extreme"), lang),
    advice: pick(t("รังสี UV รุนแรง ผิวไหม้ได้ใน 15 นาที หลีกเลี่ยงกิจกรรมกลางแจ้ง", "Extreme hazard. Unprotected skin can burn within 15 minutes."), lang),
  }
}

export function aqiHint(band: AqiBand, lang: Lang): string {
  const map: Record<AqiBand, Bi> = {
    good: t("คุณภาพอากาศสดใส เหมาะกับการทำกิจกรรมและออกกำลังกายกลางแจ้งทุกรูปแบบ", "Clean and fresh air. Ideal for all outdoor recreation and sports."),
    moderate: t("คุณภาพอากาศยอมรับได้ ผู้ป่วยภูมิแพ้หรือระบบทางเดินหายใจควรสังเกตอาการผิดปกติ", "Air quality is acceptable. Sensitive individuals should observe respiratory symptoms."),
    unhealthy_sensitive: t("ฝุ่นสะสมเพิ่มขึ้น กลุ่มเสี่ยง เด็ก ผู้สูงอายุ ควรลดกิจกรรมกลางแจ้งที่ใช้แรงมาก", "Elevated particulate levels. Vulnerable groups should reduce strenuous outdoor exertion."),
    unhealthy: t("อากาศเริ่มมีผลกระทบต่อสุขภาพ ประชาชนทุกคนควรสวมหน้ากาก N95 เมื่อออกนอกอาคาร", "Unhealthy air. General public should wear N95 masks when venturing outdoors."),
  }
  return pick(map[band], lang)
}

export function healthSummary(city: City, lang: Lang): string {
  const band = city.aqi <= 50 ? "good" : city.aqi <= 100 ? "moderate" : city.aqi <= 150 ? "us" : "un"
  const heatIndex = city.feelsLike
  const hot = heatIndex >= 38

  if (lang === "th") {
    const aqiPart =
      band === "good"
        ? "คุณภาพอากาศสดใส อยู่ในเกณฑ์ดีมาก"
        : band === "moderate"
          ? "ดัชนีคุณภาพอากาศอยู่ในระดับปานกลาง"
          : band === "us"
            ? "ระดับฝุ่นละออง PM2.5 เริ่มส่งผลกระทบต่อกลุ่มเปราะบาง"
            : "ระดับฝุ่น PM2.5 เกินเกณฑ์มาตรฐาน มีผลกระทบต่อระบบทางเดินหายใจ"

    const heatPart = hot
      ? `สภาพอากาศร้อนชื้น ดัชนีความร้อนจริงสูงถึง ${heatIndex}°C (ระดับเฝ้าระวังฮีทสโตรก)`
      : `อุณหภูมิกำลังเหมาะสม ความชื้นสัมพัทธ์ ${city.humidity}%`

    const advicePart =
      band === "good" && !hot
        ? "เหมาะกับการออกกำลังกายและเปิดหน้าต่างระบายอากาศภายในอาคาร"
        : hot
          ? "ควรดื่มน้ำสะอาดให้เพียงพอ 2-3 ลิตร เลี่ยงการทำงานกลางแดดจัดต่อเนื่อง"
          : "แนะนำสวมหน้ากากอนามัยป้องกันฝุ่นเมื่ออยู่กลางแจ้ง และใช้เครื่องฟอกอากาศ"

    return `${aqiPart} ${heatPart} — ${advicePart}`
  }

  const aqiPart =
    band === "good"
      ? "Air quality is excellent with healthy atmospheric readings."
      : band === "moderate"
        ? "Air quality is moderate with acceptable PM2.5 concentrations."
        : band === "us"
          ? "PM2.5 particulate levels may affect vulnerable individuals."
          : "Unhealthy particulate levels detected across the area."

  const heatPart = hot
    ? `Heat index is high at ${heatIndex}°C (extreme caution for heat exhaustion).`
    : `Pleasant thermal comfort with ${city.humidity}% relative humidity.`

  const advicePart =
    band === "good" && !hot
      ? "Great conditions for outdoor exercise and cross-ventilation."
      : hot
        ? "Stay well-hydrated with 2-3L of water and avoid unshaded midday sun."
        : "Wear a protective mask outdoors and consider indoor HEPA filtration."

  return `${aqiPart} ${heatPart} ${advicePart}`
}

export interface QuickAction {
  id: string
  label: Bi
  answer: (city: City, lang: Lang) => { title: string; summary: string; points: string[] }
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "exercise",
    label: t("วิ่ง / ออกกำลังกายกลางแจ้งได้ไหม?", "Can I exercise outdoors?"),
    answer: (c, lang) => {
      const goodAqi = c.aqi <= 50
      const moderateAqi = c.aqi <= 100
      const veryHot = c.feelsLike >= 38

      if (lang === "th") {
        if (goodAqi && !veryHot) {
          return {
            title: "การออกกำลังกายกลางแจ้ง: เหมาะสมมาก ✅",
            summary: "สภาพอากาศและคุณภาพอากาศอยู่ในเกณฑ์ดีเยี่ยม สามารถทำกิจกรรมกลางแจ้งได้อย่างเต็มที่",
            points: [
              "วิ่งกลางแจ้ง ปั่นจักรยาน หรือเล่นกีฬาได้ตามปกติ",
              "ช่วงเวลาที่ดีที่สุดคือช่วงเช้า 06:00 - 08:30 น. และช่วงเย็นหลัง 17:00 น.",
              "ดื่มน้ำชดเชยเหงื่อ 250 มล. ทุก 20-30 นาที",
            ],
          }
        }
        if (goodAqi && veryHot) {
          return {
            title: "การออกกำลังกายกลางแจ้ง: ระวังโรคลมแดด (Heat Index สูง) ⚠️",
            summary: `คุณภาพอากาศดี (AQI ${c.aqi}) แต่อุณหภูมิความรู้สึกจริงร้อนจัดถึง ${c.feelsLike}°C`,
            points: [
              "งดวิ่งหรือออกกำลังหนักกลางแดดช่วง 10:30 - 16:30 น. โดยเด็ดขาด",
              "แนะนำเปลี่ยนมาวิ่งช่วงเช้าตรู่ก่อนพระอาทิตย์ขึ้น หรือออกกำลังในห้องปรับอากาศ",
              "พกน้ำเกลือแร่หรือน้ำเย็นจิบบ่อยๆ ระวังอาการหน้ามืด ตะคริว หรือหัวใจเต้นเร็ว",
            ],
          }
        }
        if (moderateAqi) {
          return {
            title: "การออกกำลังกายกลางแจ้ง: ปานกลาง (ระวังสำหรับกลุ่มภูมิแพ้) 🟡",
            summary: `AQI อยู่ที่ ${c.aqi} ผู้ที่สุขภาพแข็งแรงสามารถออกกำลังกายเบาๆ ถึงปานกลางได้`,
            points: [
              "ลดความเข้มข้นของการคาร์ดิโอหนักต่อเนื่องไม่เกิน 45-60 นาที",
              "ผู้ป่วยโรคหอบหืด ภูมิแพ้ หรือโรคหัวใจ ควรสังเกตอาการแน่นหน้าอกหรือไอ",
              "เลือกสวนสาธารณะที่มีต้นไม้ปกคลุมหนาแน่นเพื่อช่วยกรองฝุ่น",
            ],
          }
        }
        return {
          title: "การออกกำลังกายกลางแจ้ง: ไม่แนะนำ (ควรออกกำลังในร่ม) ⛔",
          summary: `ค่าฝุ่น PM2.5 สูง (${c.pm25} µg/m³) การหายใจเร็วระหว่างเหนื่อยจะทำให้สูดมลพิษเข้าปอดลึกขึ้น`,
          points: [
            "งดวิ่งกลางแจ้งทุกกรณี ย้ายไปวิ่งบนลู่วิ่งไฟฟ้าในฟิตเนสหรือห้องปิด",
            "ยืดเหยียด โยคะ หรือเวทเทรนนิ่งในบ้านที่มีเครื่องฟอกอากาศ",
            "สวมหน้ากาก N95 ทันทีหากจำเป็นต้องเดินทางผ่านบริเวณริมถนนใหญ่",
          ],
        }
      }

      // English
      if (goodAqi && !veryHot) {
        return {
          title: "Outdoor Exercise: Highly Recommended ✅",
          summary: "Both air quality and thermal levels are optimal for all outdoor fitness activities.",
          points: [
            "Running, cycling, and group sports are fully safe.",
            "Prime workout windows: 06:00 - 08:30 and post 17:00.",
            "Drink 250ml of water every 20-30 minutes during activity.",
          ],
        }
      }
      return {
        title: "Outdoor Exercise: Caution Advised ⚠️",
        summary: `Current conditions (AQI ${c.aqi}, Heat Index ${c.feelsLike}°C) require safety adjustments.`,
        points: [
          "Avoid peak afternoon heat and unshaded pavements.",
          "Sensitive or asthma-prone athletes should train indoors.",
          "Keep emergency hydration and electrolyte fluids on hand.",
        ],
      }
    },
  },
  {
    id: "mask",
    label: t("ควรสวมหน้ากากเกรดไหนวันนี้?", "What mask protection level is needed?"),
    answer: (c, lang) => {
      const pm = c.pm25
      if (lang === "th") {
        if (pm <= 15) {
          return {
            title: "คำแนะนำหน้ากาก: ไม่จำเป็นต้องสวมหน้ากาก 🟢",
            summary: `ปริมาณฝุ่น PM2.5 อยู่ที่ ${pm.toFixed(1)} µg/m³ ซึ่งอยู่ในเกณฑ์มาตรฐานความปลอดภัย`,
            points: [
              "สูดอากาศธรรมชาติได้อย่างมั่นใจ",
              "ผู้ที่มีอาการหวัดหรือไอจาม ยังคงแนะนำสวมหน้ากากอนามัยทั่วไปเพื่อสุขอนามัยส่วนบุคคล",
            ],
          }
        }
        if (pm <= 37.5) {
          return {
            title: "คำแนะนำหน้ากาก: หน้ากากอนามัยทางการแพทย์ (ทางเลือก) 🟡",
            summary: `ฝุ่น PM2.5 อยู่ที่ ${pm.toFixed(1)} µg/m³ เริ่มมีละอองฝุ่นปานกลาง`,
            points: [
              "ประชาชนทั่วไปสามารถใช้ชีวิตปกติได้โดยไม่ต้องสวม N95",
              "กลุ่มเสี่ยงโรคทางเดินหายใจ หรือผู้ที่ขับขี่รถจักรยานยนต์ แนะนำสวมหน้ากากกรองฝุ่น",
            ],
          }
        }
        return {
          title: "คำแนะนำหน้ากาก: แนะนำสวมหน้ากาก N95 / KN95 / KF94 🟠",
          summary: `ค่าฝุ่น PM2.5 สูงถึง ${pm.toFixed(1)} µg/m³ หน้ากากผ้าธรรมดาไม่สามารถกรองอนุภาคขนาดเล็กได้`,
          points: [
            "สวมหน้ากาก N95 หรือ KN95 แนบกระชับกับใบหน้า ไม่มีช่องว่างข้างแก้ม",
            "หลีกเลี่ยงการนำหน้ากากใช้ซ้ำเกิน 3-5 วัน หากมีคราบสกปรกหรือหายใจติดขัด",
            "เด็กเล็กควรเลือกขนาดหน้ากากสำหรับเด็กโดยเฉพาะ (Kids Size) เพื่อความปลอดภัย",
          ],
        }
      }

      return {
        title: pm <= 15 ? "Mask: Not Required 🟢" : "Mask: N95 / KN95 Recommended 🟠",
        summary: `PM2.5 concentration is ${pm.toFixed(1)} µg/m³.`,
        points: [
          pm <= 15 ? "Air is within WHO safe thresholds." : "Standard cloth masks cannot filter fine PM2.5 particles.",
          "Ensure tight seal along the nose bridge and chin.",
          "Keep spare sealed masks in your commuter bag.",
        ],
      }
    },
  },
  {
    id: "vulnerable",
    label: t("เด็กเล็ก / ผู้สูงอายุ / กลุ่มเปราะบาง", "Children & Elderly Guidance"),
    answer: (c, lang) => {
      const pm = c.pm25
      const hot = c.feelsLike >= 38
      if (lang === "th") {
        return {
          title: "คำแนะนำการดูแลเด็กและผู้สูงอายุ 👶👴",
          summary: `สถานะปัจจุบัน: PM2.5 = ${pm.toFixed(1)} µg/m³, ความรู้สึกร้อน = ${c.feelsLike}°C`,
          points: [
            hot ? "ระวังโรคลมแดด (Heat Stroke): ให้จิบน้ำบ่อยๆ ไม่อยู่ในห้องปิดที่ไม่มีการระบายอากาศ" : "อุณหภูมิอยู่ในเกณฑ์ปลอดภัยสำหรับเด็กและคนชรา",
            pm > 25 ? "ลดการพาเด็กวิ่งเล่นกลางแจ้งริมถนนใหญ่ที่มีควันไอเสียหนาแน่น" : "สามารถทำกิจกรรมเสริมพัฒนาการกลางแจ้งได้",
            "ผู้ป่วยโรคปอดอุดกั้นเรื้อรัง (COPD) หรือโรคหลอดเลือดหัวใจ ควรเตรียมยาสูดพ่นหรือยาประจำตัวไว้ใกล้ตัวเสมอ",
          ],
        }
      }
      return {
        title: "Vulnerable Populations Guidance 👶👴",
        summary: `Current conditions: PM2.5 = ${pm.toFixed(1)} µg/m³, Heat Index = ${c.feelsLike}°C`,
        points: [
          hot ? "Hydration alert: Elderly individuals have reduced thirst sensation, ensure water intake." : "Comfortable thermal environment.",
          "Keep emergency asthma inhalers and prescription medicine within easy reach.",
          "Limit playground time during peak traffic and highest pollution hours.",
        ],
      }
    },
  },
  {
    id: "indoor",
    label: t("การดูแลสุขอนามัยในบ้าน & แอร์", "Indoor Air & Home Care"),
    answer: (c, lang) => {
      const aqiGood = c.aqi <= 50
      if (lang === "th") {
        return {
          title: "การจัดการคุณภาพอากาศในอาคาร 🏠",
          summary: `ดัชนีอากาศภายนอก AQI ${c.aqi} (${c.pm25.toFixed(1)} µg/m³)`,
          points: [
            aqiGood ? "เปิดหน้าต่างรับลมธรรมชาติและระบายอากาศ (Natural Ventilation) ช่วงเช้า 07:00-09:00 น." : "ปิดประตูหน้าต่างให้สนิทเพื่อป้องกันฝุ่นละอองเล็ดลอดเข้ามาในห้อง",
            "เปิดเครื่องฟอกอากาศที่มีแผ่นกรอง HEPA ระดับ H13 ในห้องนอนต่อเนื่อง",
            "ตั้งค่าเครื่องปรับอากาศในโหมดหมุนเวียนอากาศภายใน (Recirculation Mode) ไม่ดึงอากาศภายนอก",
            "หลีกเลี่ยงการจุดธูป จุดเทียน หรือทอดอาหารควันหนาแน่นโดยไม่มีเครื่องดูดควัน",
          ],
        }
      }
      return {
        title: "Indoor Air Quality & Home Management 🏠",
        summary: `Outdoor AQI is ${c.aqi} (${c.pm25.toFixed(1)} µg/m³)`,
        points: [
          aqiGood ? "Good time for cross-ventilation and opening windows." : "Keep all exterior windows and doors sealed tightly.",
          "Run True HEPA H13 purifiers continuously in bedrooms.",
          "Set HVAC to internal recirculation mode.",
          "Avoid indoor smoking, incense, or high-smoke cooking.",
        ],
      }
    },
  },
]
