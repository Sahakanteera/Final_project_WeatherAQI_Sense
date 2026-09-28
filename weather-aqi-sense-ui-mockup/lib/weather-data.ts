export type Lang = "th" | "en"

export type WeatherKind =
  | "sunny"
  | "partly_cloudy"
  | "cloudy"
  | "rain_light"
  | "rain_heavy"
  | "thunderstorm"

export type ThaiRegion = "central" | "northern" | "northeastern" | "eastern" | "southern"

export interface Pollutants {
  pm25: number
  pm10: number
  o3: number
  no2: number
  so2: number
  co: number
}

export interface DayForecast {
  dayNameTh: string
  dayNameEn: string
  date: string
  weather: WeatherKind
  tempMin: number
  tempMax: number
  rainChance: number
}

export interface HourPoint {
  time: string
  temp: number
  aqi: number
  rainChance: number
  wind: number
  weather: WeatherKind
}

export interface LifestyleIndex {
  running: { score: number; labelTh: string; labelEn: string; descTh: string; descEn: string }
  laundry: { score: number; labelTh: string; labelEn: string; descTh: string; descEn: string }
  carWash: { score: number; labelTh: string; labelEn: string; descTh: string; descEn: string }
  sunscreen: { score: number; labelTh: string; labelEn: string; descTh: string; descEn: string }
}

export interface City {
  key: string
  th: string
  en: string
  districtTh: string
  districtEn: string
  region: ThaiRegion
  lat: number
  lon: number
  temp: number
  tempMin: number
  tempMax: number
  feelsLike: number
  humidity: number
  wind: number
  windDirection: string
  windGust: number
  pressure: number
  visibility: number
  dewPoint: number
  uvIndex: number
  rainChance: number
  rainfallToday: number
  sunrise: string
  sunset: string
  aqi: number
  pm25: number
  weather: WeatherKind
  pollutants: Pollutants
  sevenDayForecast: DayForecast[]
  hourly: HourPoint[]
  lifestyle: LifestyleIndex
  alert?: {
    level: "warning" | "advisory" | "watch"
    titleTh: string
    titleEn: string
    descTh: string
    descEn: string
    sourceTh: string
    sourceEn: string
  }
}

export const REGIONS_META: Record<ThaiRegion, { th: string; en: string }> = {
  central: { th: "ภาคกลาง", en: "Central" },
  northern: { th: "ภาคเหนือ", en: "Northern" },
  northeastern: { th: "ภาคตะวันออกเฉียงเหนือ", en: "Northeastern" },
  eastern: { th: "ภาคตะวันออก", en: "Eastern" },
  southern: { th: "ภาคใต้", en: "Southern" },
}

export const DEMO_CITIES: City[] = [
  {
    "key": "bangkok",
    "th": "กรุงเทพมหานคร",
    "en": "Bangkok",
    "districtTh": "เขตพระนคร",
    "districtEn": "Phra Nakhon",
    "region": "central",
    "lat": 13.7713,
    "lon": 100.6201,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 66,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1010,
    "visibility": 9,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 50,
    "pm25": 16,
    "weather": "sunny",
    "pollutants": {
      "pm25": 16,
      "pm10": 33.6,
      "o3": 20,
      "no2": 10,
      "so2": 2,
      "co": 0.3
    },
    "alert": {
      "level": "advisory",
      "titleTh": "แจ้งเตือนสภาพอากาศ: ฝนฟ้าคะนองร้อยละ 40 ของพื้นที่",
      "titleEn": "Weather Advisory: 40% Chance of Thunderstorms",
      "descTh": "ลมตะวันตกเฉียงใต้พัดปกคลุมอ่าวไทยและภาคกลาง อาจมีลมกระโชกแรงช่วง 15:00 - 18:00 น.",
      "descEn": "Southwesterly wind prevails over Gulf of Thailand and Central plains. Gusts expected between 15:00 - 18:00.",
      "sourceTh": "กรมอุตุนิยมวิทยา (TMD Thailand)",
      "sourceEn": "Thai Meteorological Department (TMD)"
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 45,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 44,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 50,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 56,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 54,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 50,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 46,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 47,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nonthaburi",
    "th": "นนทบุรี",
    "en": "Nonthaburi",
    "districtTh": "อำเภอเมืองนนทบุรี",
    "districtEn": "Mueang Nonthaburi",
    "region": "central",
    "lat": 13.9267,
    "lon": 100.389,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 38,
    "humidity": 67,
    "wind": 12,
    "windDirection": "SW",
    "windGust": 22,
    "pressure": 1011,
    "visibility": 9.1,
    "dewPoint": 26,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 51,
    "pm25": 16.3,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16.3,
      "pm10": 34.2,
      "o3": 21,
      "no2": 11,
      "so2": 3,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 46,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 45,
        "rainChance": 15,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 51,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 57,
        "rainChance": 25,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 55,
        "rainChance": 35,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 51,
        "rainChance": 45,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 47,
        "rainChance": 30,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 48,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "pathum thani",
    "th": "ปทุมธานี",
    "en": "Pathum Thani",
    "districtTh": "อำเภอเมืองปทุมธานี",
    "districtEn": "Mueang Pathum Thani",
    "region": "central",
    "lat": 14.0615,
    "lon": 100.6792,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 39,
    "humidity": 68,
    "wind": 13,
    "windDirection": "SW",
    "windGust": 23,
    "pressure": 1012,
    "visibility": 9.2,
    "dewPoint": 27,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 52,
    "pm25": 16.6,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16.6,
      "pm10": 34.9,
      "o3": 22,
      "no2": 12,
      "so2": 4,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 47,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 46,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 52,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 58,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 56,
        "rainChance": 35,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 52,
        "rainChance": 45,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 48,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 49,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "samut prakan",
    "th": "สมุทรปราการ",
    "en": "Samut Prakan",
    "districtTh": "อำเภอเมืองสมุทรปราการ",
    "districtEn": "Mueang Samut Prakan",
    "region": "central",
    "lat": 13.5979,
    "lon": 100.706,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 69,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1013,
    "visibility": 9.3,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 53,
    "pm25": 17,
    "weather": "sunny",
    "pollutants": {
      "pm25": 17,
      "pm10": 35.7,
      "o3": 23,
      "no2": 13,
      "so2": 5,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 48,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 47,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 53,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 59,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 57,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 53,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 49,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 50,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "ayutthaya",
    "th": "พระนครศรีอยุธยา",
    "en": "Ayutthaya",
    "districtTh": "อำเภอเมืองพระนครศรีอยุธยา",
    "districtEn": "Mueang Ayutthaya",
    "region": "central",
    "lat": 14.3407,
    "lon": 100.5279,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 38,
    "humidity": 70,
    "wind": 12,
    "windDirection": "SW",
    "windGust": 22,
    "pressure": 1010,
    "visibility": 9.4,
    "dewPoint": 26,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 54,
    "pm25": 17.3,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 17.3,
      "pm10": 36.3,
      "o3": 24,
      "no2": 14,
      "so2": 2,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 49,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 48,
        "rainChance": 15,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 54,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 60,
        "rainChance": 25,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 58,
        "rainChance": 35,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 54,
        "rainChance": 45,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 50,
        "rainChance": 30,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 51,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "ang thong",
    "th": "อ่างทอง",
    "en": "Ang Thong",
    "districtTh": "อำเภอเมืองอ่างทอง",
    "districtEn": "Mueang Ang Thong",
    "region": "central",
    "lat": 14.6235,
    "lon": 100.3551,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 39,
    "humidity": 71,
    "wind": 13,
    "windDirection": "SW",
    "windGust": 23,
    "pressure": 1011,
    "visibility": 9.5,
    "dewPoint": 27,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 55,
    "pm25": 17.6,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 17.6,
      "pm10": 37,
      "o3": 25,
      "no2": 15,
      "so2": 3,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 50,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 49,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 55,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 61,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 59,
        "rainChance": 35,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 55,
        "rainChance": 45,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 51,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 52,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "lop buri",
    "th": "ลพบุรี",
    "en": "Lop Buri",
    "districtTh": "อำเภอเมืองลพบุรี",
    "districtEn": "Mueang Lop Buri",
    "region": "central",
    "lat": 15.0745,
    "lon": 100.9141,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 66,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1012,
    "visibility": 9.6,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 56,
    "pm25": 17.9,
    "weather": "sunny",
    "pollutants": {
      "pm25": 17.9,
      "pm10": 37.6,
      "o3": 26,
      "no2": 16,
      "so2": 4,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 51,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 50,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 56,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 62,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 60,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 56,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 52,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 53,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "sing buri",
    "th": "สิงห์บุรี",
    "en": "Sing Buri",
    "districtTh": "อำเภอเมืองสิงห์บุรี",
    "districtEn": "Mueang Sing Buri",
    "region": "central",
    "lat": 14.9213,
    "lon": 100.3529,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 38,
    "humidity": 67,
    "wind": 12,
    "windDirection": "SW",
    "windGust": 22,
    "pressure": 1013,
    "visibility": 9.7,
    "dewPoint": 26,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 57,
    "pm25": 18.2,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 18.2,
      "pm10": 38.2,
      "o3": 27,
      "no2": 17,
      "so2": 5,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 52,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 51,
        "rainChance": 15,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 57,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 63,
        "rainChance": 25,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 61,
        "rainChance": 35,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 57,
        "rainChance": 45,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 53,
        "rainChance": 30,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 54,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chai nat",
    "th": "ชัยนาท",
    "en": "Chai Nat",
    "districtTh": "อำเภอเมืองชัยนาท",
    "districtEn": "Mueang Chai Nat",
    "region": "central",
    "lat": 15.1364,
    "lon": 100.0253,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 39,
    "humidity": 68,
    "wind": 13,
    "windDirection": "SW",
    "windGust": 23,
    "pressure": 1010,
    "visibility": 9.8,
    "dewPoint": 27,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 58,
    "pm25": 18.6,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 18.6,
      "pm10": 39.1,
      "o3": 28,
      "no2": 18,
      "so2": 2,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 53,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 52,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 58,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 64,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 62,
        "rainChance": 35,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 58,
        "rainChance": 45,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 54,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 55,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "saraburi",
    "th": "สระบุรี",
    "en": "Saraburi",
    "districtTh": "อำเภอเมืองสระบุรี",
    "districtEn": "Mueang Saraburi",
    "region": "central",
    "lat": 14.5764,
    "lon": 100.9389,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 69,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1011,
    "visibility": 9.9,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 59,
    "pm25": 18.9,
    "weather": "sunny",
    "pollutants": {
      "pm25": 18.9,
      "pm10": 39.7,
      "o3": 29,
      "no2": 19,
      "so2": 3,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 54,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 53,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 59,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 65,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 63,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 59,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 55,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 56,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nakhon nayok",
    "th": "นครนายก",
    "en": "Nakhon Nayok",
    "districtTh": "อำเภอเมืองนครนายก",
    "districtEn": "Mueang Nakhon Nayok",
    "region": "central",
    "lat": 14.217,
    "lon": 101.1748,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 38,
    "humidity": 70,
    "wind": 12,
    "windDirection": "SW",
    "windGust": 22,
    "pressure": 1012,
    "visibility": 9,
    "dewPoint": 26,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 60,
    "pm25": 19.2,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 19.2,
      "pm10": 40.3,
      "o3": 30,
      "no2": 10,
      "so2": 4,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 55,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 54,
        "rainChance": 15,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 60,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 66,
        "rainChance": 25,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 64,
        "rainChance": 35,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 60,
        "rainChance": 45,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 56,
        "rainChance": 30,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 57,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nakhon pathom",
    "th": "นครปฐม",
    "en": "Nakhon Pathom",
    "districtTh": "อำเภอเมืองนครปฐม",
    "districtEn": "Mueang Nakhon Pathom",
    "region": "central",
    "lat": 13.9241,
    "lon": 100.1093,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 39,
    "humidity": 71,
    "wind": 13,
    "windDirection": "SW",
    "windGust": 23,
    "pressure": 1013,
    "visibility": 9.1,
    "dewPoint": 27,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 61,
    "pm25": 19.5,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 19.5,
      "pm10": 41,
      "o3": 31,
      "no2": 11,
      "so2": 5,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 56,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 55,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 61,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 67,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 65,
        "rainChance": 35,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 61,
        "rainChance": 45,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 57,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 58,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "samut sakhon",
    "th": "สมุทรสาคร",
    "en": "Samut Sakhon",
    "districtTh": "อำเภอเมืองสมุทรสาคร",
    "districtEn": "Mueang Samut Sakhon",
    "region": "central",
    "lat": 13.5707,
    "lon": 100.2159,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 66,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1010,
    "visibility": 9.2,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 62,
    "pm25": 19.8,
    "weather": "sunny",
    "pollutants": {
      "pm25": 19.8,
      "pm10": 41.6,
      "o3": 32,
      "no2": 12,
      "so2": 2,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 57,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 56,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 62,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 68,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 66,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 62,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 58,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 59,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "samut songkhram",
    "th": "สมุทรสงคราม",
    "en": "Samut Songkhram",
    "districtTh": "อำเภอเมืองสมุทรสงคราม",
    "districtEn": "Mueang Samut Songkhram",
    "region": "central",
    "lat": 13.3938,
    "lon": 99.9562,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 38,
    "humidity": 67,
    "wind": 12,
    "windDirection": "SW",
    "windGust": 22,
    "pressure": 1011,
    "visibility": 9.3,
    "dewPoint": 26,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 63,
    "pm25": 20.2,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 20.2,
      "pm10": 42.4,
      "o3": 33,
      "no2": 13,
      "so2": 3,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 58,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 57,
        "rainChance": 15,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 63,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 69,
        "rainChance": 25,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 67,
        "rainChance": 35,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 63,
        "rainChance": 45,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 59,
        "rainChance": 30,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 60,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "ratchaburi",
    "th": "ราชบุรี",
    "en": "Ratchaburi",
    "districtTh": "อำเภอเมืองราชบุรี",
    "districtEn": "Mueang Ratchaburi",
    "region": "central",
    "lat": 13.5318,
    "lon": 99.5738,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 39,
    "humidity": 68,
    "wind": 13,
    "windDirection": "SW",
    "windGust": 23,
    "pressure": 1012,
    "visibility": 9.4,
    "dewPoint": 27,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 64,
    "pm25": 20.5,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 20.5,
      "pm10": 43.1,
      "o3": 34,
      "no2": 14,
      "so2": 4,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 59,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 58,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 64,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 70,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 68,
        "rainChance": 35,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 64,
        "rainChance": 45,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 60,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 61,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "suphanburi",
    "th": "สุพรรณบุรี",
    "en": "Suphanburi",
    "districtTh": "อำเภอเมืองสุพรรณบุรี",
    "districtEn": "Mueang Suphanburi",
    "region": "central",
    "lat": 14.6079,
    "lon": 99.898,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 69,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1013,
    "visibility": 9.5,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 50,
    "pm25": 16,
    "weather": "sunny",
    "pollutants": {
      "pm25": 16,
      "pm10": 33.6,
      "o3": 20,
      "no2": 15,
      "so2": 5,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 45,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 44,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 50,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 56,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 54,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 50,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 46,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 47,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "kanchanaburi",
    "th": "กาญจนบุรี",
    "en": "Kanchanaburi",
    "districtTh": "อำเภอเมืองกาญจนบุรี",
    "districtEn": "Mueang Kanchanaburi",
    "region": "central",
    "lat": 14.5845,
    "lon": 99.0404,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 38,
    "humidity": 70,
    "wind": 12,
    "windDirection": "SW",
    "windGust": 22,
    "pressure": 1010,
    "visibility": 9.6,
    "dewPoint": 26,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 51,
    "pm25": 16.3,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16.3,
      "pm10": 34.2,
      "o3": 21,
      "no2": 16,
      "so2": 2,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 46,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 45,
        "rainChance": 15,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 51,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 57,
        "rainChance": 25,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 55,
        "rainChance": 35,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 51,
        "rainChance": 45,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 47,
        "rainChance": 30,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 48,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phetchaburi",
    "th": "เพชรบุรี",
    "en": "Phetchaburi",
    "districtTh": "อำเภอเมืองเพชรบุรี",
    "districtEn": "Mueang Phetchaburi",
    "region": "central",
    "lat": 12.9369,
    "lon": 99.6133,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 39,
    "humidity": 71,
    "wind": 13,
    "windDirection": "SW",
    "windGust": 23,
    "pressure": 1011,
    "visibility": 9.7,
    "dewPoint": 27,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 52,
    "pm25": 16.6,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16.6,
      "pm10": 34.9,
      "o3": 22,
      "no2": 17,
      "so2": 3,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 47,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 46,
        "rainChance": 15,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 52,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 58,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 56,
        "rainChance": 35,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 52,
        "rainChance": 45,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 48,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 49,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "prachuap khiri khan",
    "th": "ประจวบคีรีขันธ์",
    "en": "Prachuap Khiri Khan",
    "districtTh": "อำเภอเมืองประจวบคีรีขันธ์",
    "districtEn": "Mueang Prachuap Khiri Khan",
    "region": "central",
    "lat": 11.9215,
    "lon": 99.6265,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 66,
    "wind": 11,
    "windDirection": "SW",
    "windGust": 21,
    "pressure": 1012,
    "visibility": 9.8,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 53,
    "pm25": 17,
    "weather": "sunny",
    "pollutants": {
      "pm25": 17,
      "pm10": 35.7,
      "o3": 23,
      "no2": 18,
      "so2": 4,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 48,
        "rainChance": 15,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 47,
        "rainChance": 15,
        "wind": 6,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 53,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 59,
        "rainChance": 25,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 57,
        "rainChance": 35,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 53,
        "rainChance": 45,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 49,
        "rainChance": 30,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 50,
        "rainChance": 20,
        "wind": 9,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chonburi",
    "th": "ชลบุรี",
    "en": "Chonburi",
    "districtTh": "อำเภอเมืองชลบุรี",
    "districtEn": "Mueang Chonburi",
    "region": "eastern",
    "lat": 13.1971,
    "lon": 101.211,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 71,
    "wind": 16,
    "windDirection": "S",
    "windGust": 26,
    "pressure": 1013,
    "visibility": 9.9,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 54,
    "pm25": 17.3,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 17.3,
      "pm10": 36.3,
      "o3": 24,
      "no2": 19,
      "so2": 5,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 49,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 48,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 54,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 60,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 58,
        "rainChance": 35,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 54,
        "rainChance": 45,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 50,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 51,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "rayong",
    "th": "ระยอง",
    "en": "Rayong",
    "districtTh": "อำเภอเมืองระยอง",
    "districtEn": "Mueang Rayong",
    "region": "eastern",
    "lat": 12.8517,
    "lon": 101.4225,
    "temp": 32,
    "tempMin": 25,
    "tempMax": 35,
    "feelsLike": 36,
    "humidity": 72,
    "wind": 13,
    "windDirection": "S",
    "windGust": 23,
    "pressure": 1010,
    "visibility": 9,
    "dewPoint": 24,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 45,
    "pm25": 14.4,
    "weather": "cloudy",
    "pollutants": {
      "pm25": 14.4,
      "pm10": 30.2,
      "o3": 25,
      "no2": 10,
      "so2": 2,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "cloudy",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 36,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 35,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 27,
        "aqi": 40,
        "rainChance": 15,
        "wind": 9,
        "weather": "cloudy"
      },
      {
        "time": "03:00",
        "temp": 26,
        "aqi": 39,
        "rainChance": 15,
        "wind": 8,
        "weather": "cloudy"
      },
      {
        "time": "06:00",
        "temp": 26,
        "aqi": 45,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 30,
        "aqi": 51,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 34,
        "aqi": 49,
        "rainChance": 35,
        "wind": 15,
        "weather": "cloudy"
      },
      {
        "time": "15:00",
        "temp": 35,
        "aqi": 45,
        "rainChance": 45,
        "wind": 16,
        "weather": "cloudy"
      },
      {
        "time": "18:00",
        "temp": 31,
        "aqi": 41,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 29,
        "aqi": 42,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chanthaburi",
    "th": "จันทบุรี",
    "en": "Chanthaburi",
    "districtTh": "อำเภอเมืองจันทบุรี",
    "districtEn": "Mueang Chanthaburi",
    "region": "eastern",
    "lat": 12.8632,
    "lon": 102.12,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 73,
    "wind": 14,
    "windDirection": "S",
    "windGust": 24,
    "pressure": 1011,
    "visibility": 9.1,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 46,
    "pm25": 14.7,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 14.7,
      "pm10": 30.9,
      "o3": 26,
      "no2": 11,
      "so2": 3,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 41,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 40,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 46,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 52,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 50,
        "rainChance": 35,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 46,
        "rainChance": 45,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 42,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 43,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "trat",
    "th": "ตราด",
    "en": "Trat",
    "districtTh": "อำเภอเมืองตราด",
    "districtEn": "Mueang Trat",
    "region": "eastern",
    "lat": 12.3578,
    "lon": 102.5342,
    "temp": 32,
    "tempMin": 25,
    "tempMax": 35,
    "feelsLike": 36,
    "humidity": 74,
    "wind": 15,
    "windDirection": "S",
    "windGust": 25,
    "pressure": 1012,
    "visibility": 9.2,
    "dewPoint": 24,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 47,
    "pm25": 15,
    "weather": "cloudy",
    "pollutants": {
      "pm25": 15,
      "pm10": 31.5,
      "o3": 27,
      "no2": 12,
      "so2": 4,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "cloudy",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 36,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 35,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 27,
        "aqi": 42,
        "rainChance": 15,
        "wind": 11,
        "weather": "cloudy"
      },
      {
        "time": "03:00",
        "temp": 26,
        "aqi": 41,
        "rainChance": 15,
        "wind": 10,
        "weather": "cloudy"
      },
      {
        "time": "06:00",
        "temp": 26,
        "aqi": 47,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 30,
        "aqi": 53,
        "rainChance": 25,
        "wind": 15,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 34,
        "aqi": 51,
        "rainChance": 35,
        "wind": 17,
        "weather": "cloudy"
      },
      {
        "time": "15:00",
        "temp": 35,
        "aqi": 47,
        "rainChance": 45,
        "wind": 18,
        "weather": "cloudy"
      },
      {
        "time": "18:00",
        "temp": 31,
        "aqi": 43,
        "rainChance": 30,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 29,
        "aqi": 44,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "prachin buri",
    "th": "ปราจีนบุรี",
    "en": "Prachin Buri",
    "districtTh": "อำเภอเมืองปราจีนบุรี",
    "districtEn": "Mueang Prachin Buri",
    "region": "eastern",
    "lat": 14.0749,
    "lon": 101.6251,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 75,
    "wind": 16,
    "windDirection": "S",
    "windGust": 26,
    "pressure": 1013,
    "visibility": 9.3,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 48,
    "pm25": 15.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15.4,
      "pm10": 32.3,
      "o3": 28,
      "no2": 13,
      "so2": 5,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 43,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 42,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 48,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 54,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 52,
        "rainChance": 35,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 48,
        "rainChance": 45,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 44,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "sa kaeo",
    "th": "สระแก้ว",
    "en": "Sa Kaeo",
    "districtTh": "อำเภอเมืองสระแก้ว",
    "districtEn": "Mueang Sa Kaeo",
    "region": "eastern",
    "lat": 13.7773,
    "lon": 102.2935,
    "temp": 32,
    "tempMin": 25,
    "tempMax": 35,
    "feelsLike": 36,
    "humidity": 70,
    "wind": 13,
    "windDirection": "S",
    "windGust": 23,
    "pressure": 1010,
    "visibility": 9.4,
    "dewPoint": 24,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 49,
    "pm25": 15.7,
    "weather": "cloudy",
    "pollutants": {
      "pm25": 15.7,
      "pm10": 33,
      "o3": 29,
      "no2": 14,
      "so2": 2,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "cloudy",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 36,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 35,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 27,
        "aqi": 44,
        "rainChance": 15,
        "wind": 9,
        "weather": "cloudy"
      },
      {
        "time": "03:00",
        "temp": 26,
        "aqi": 43,
        "rainChance": 15,
        "wind": 8,
        "weather": "cloudy"
      },
      {
        "time": "06:00",
        "temp": 26,
        "aqi": 49,
        "rainChance": 20,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 30,
        "aqi": 55,
        "rainChance": 25,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 34,
        "aqi": 53,
        "rainChance": 35,
        "wind": 15,
        "weather": "cloudy"
      },
      {
        "time": "15:00",
        "temp": 35,
        "aqi": 49,
        "rainChance": 45,
        "wind": 16,
        "weather": "cloudy"
      },
      {
        "time": "18:00",
        "temp": 31,
        "aqi": 45,
        "rainChance": 30,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 29,
        "aqi": 46,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chachoengsao",
    "th": "ฉะเชิงเทรา",
    "en": "Chachoengsao",
    "districtTh": "อำเภอเมืองฉะเชิงเทรา",
    "districtEn": "Mueang Chachoengsao",
    "region": "eastern",
    "lat": 13.6039,
    "lon": 101.4463,
    "temp": 33,
    "tempMin": 26,
    "tempMax": 36,
    "feelsLike": 37,
    "humidity": 71,
    "wind": 14,
    "windDirection": "S",
    "windGust": 24,
    "pressure": 1011,
    "visibility": 9.5,
    "dewPoint": 25,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 50,
    "pm25": 16,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16,
      "pm10": 33.6,
      "o3": 30,
      "no2": 15,
      "so2": 3,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 26,
        "tempMax": 37,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 36,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 28,
        "aqi": 45,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 27,
        "aqi": 44,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 27,
        "aqi": 50,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 31,
        "aqi": 56,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 35,
        "aqi": 54,
        "rainChance": 35,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 36,
        "aqi": 50,
        "rainChance": 45,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 32,
        "aqi": 46,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 30,
        "aqi": 47,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chiang mai",
    "th": "เชียงใหม่",
    "en": "Chiang Mai",
    "districtTh": "อำเภอเมืองเชียงใหม่",
    "districtEn": "Mueang Chiang Mai",
    "region": "northern",
    "lat": 18.7905,
    "lon": 98.7342,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 74,
    "wind": 9,
    "windDirection": "N",
    "windGust": 19,
    "pressure": 1012,
    "visibility": 9.6,
    "dewPoint": 22,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 46,
    "pm25": 14.7,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 14.7,
      "pm10": 30.9,
      "o3": 31,
      "no2": 16,
      "so2": 4,
      "co": 0.4
    },
    "alert": {
      "level": "watch",
      "titleTh": "เฝ้าระวังน้ำป่าไหลหลากบริเวณเชิงเขา",
      "titleEn": "Flash Flood Watch in Foothill Areas",
      "descTh": "ฝนตกสะสมต่อเนื่องในเขตภูเขาและดอยสุเทพ ประชาชนควรระมัดระวังเส้นทางสัญจร",
      "descEn": "Continuous rainfall along mountain slopes. Drivers should take caution on winding roads.",
      "sourceTh": "ศูนย์อุตุนิยมวิทยาภาคเหนือ",
      "sourceEn": "Northern Meteorological Center"
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 41,
        "rainChance": 15,
        "wind": 5,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 40,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 46,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 52,
        "rainChance": 25,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 50,
        "rainChance": 35,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 46,
        "rainChance": 45,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 42,
        "rainChance": 30,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 43,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chiang rai",
    "th": "เชียงราย",
    "en": "Chiang Rai",
    "districtTh": "อำเภอเมืองเชียงราย",
    "districtEn": "Mueang Chiang Rai",
    "region": "northern",
    "lat": 19.8441,
    "lon": 99.8662,
    "temp": 28,
    "tempMin": 21,
    "tempMax": 31,
    "feelsLike": 32,
    "humidity": 75,
    "wind": 10,
    "windDirection": "N",
    "windGust": 20,
    "pressure": 1013,
    "visibility": 9.7,
    "dewPoint": 20,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 47,
    "pm25": 15,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15,
      "pm10": 31.5,
      "o3": 32,
      "no2": 17,
      "so2": 5,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 20,
        "tempMax": 30,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 21,
        "tempMax": 32,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 23,
        "aqi": 42,
        "rainChance": 15,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 22,
        "aqi": 41,
        "rainChance": 15,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 22,
        "aqi": 47,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 26,
        "aqi": 53,
        "rainChance": 25,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 30,
        "aqi": 51,
        "rainChance": 35,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 31,
        "aqi": 47,
        "rainChance": 45,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 27,
        "aqi": 43,
        "rainChance": 30,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 25,
        "aqi": 44,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "mae hong son",
    "th": "แม่ฮ่องสอน",
    "en": "Mae Hong Son",
    "districtTh": "อำเภอเมืองแม่ฮ่องสอน",
    "districtEn": "Mueang Mae Hong Son",
    "region": "northern",
    "lat": 18.7549,
    "lon": 98.0268,
    "temp": 29,
    "tempMin": 22,
    "tempMax": 32,
    "feelsLike": 33,
    "humidity": 76,
    "wind": 7,
    "windDirection": "N",
    "windGust": 17,
    "pressure": 1010,
    "visibility": 9.8,
    "dewPoint": 21,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 48,
    "pm25": 15.4,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 15.4,
      "pm10": 32.3,
      "o3": 33,
      "no2": 18,
      "so2": 2,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 33,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 24,
        "aqi": 43,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 23,
        "aqi": 42,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 23,
        "aqi": 48,
        "rainChance": 20,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 27,
        "aqi": 54,
        "rainChance": 25,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 31,
        "aqi": 52,
        "rainChance": 35,
        "wind": 9,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 32,
        "aqi": 48,
        "rainChance": 45,
        "wind": 10,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 28,
        "aqi": 44,
        "rainChance": 30,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 26,
        "aqi": 45,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "lamphun",
    "th": "ลำพูน",
    "en": "Lamphun",
    "districtTh": "อำเภอเมืองลำพูน",
    "districtEn": "Mueang Lamphun",
    "region": "northern",
    "lat": 18.1417,
    "lon": 98.9654,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 77,
    "wind": 8,
    "windDirection": "N",
    "windGust": 18,
    "pressure": 1011,
    "visibility": 9.9,
    "dewPoint": 22,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 49,
    "pm25": 15.7,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15.7,
      "pm10": 33,
      "o3": 34,
      "no2": 19,
      "so2": 3,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 44,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 43,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 49,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 55,
        "rainChance": 25,
        "wind": 8,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 53,
        "rainChance": 35,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 49,
        "rainChance": 45,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 45,
        "rainChance": 30,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 46,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "lampang",
    "th": "ลำปาง",
    "en": "Lampang",
    "districtTh": "อำเภอเมืองลำปาง",
    "districtEn": "Mueang Lampang",
    "region": "northern",
    "lat": 18.3523,
    "lon": 99.5255,
    "temp": 28,
    "tempMin": 21,
    "tempMax": 31,
    "feelsLike": 32,
    "humidity": 78,
    "wind": 9,
    "windDirection": "N",
    "windGust": 19,
    "pressure": 1012,
    "visibility": 9,
    "dewPoint": 20,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 35,
    "pm25": 11.2,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 11.2,
      "pm10": 23.5,
      "o3": 20,
      "no2": 10,
      "so2": 4,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 20,
        "tempMax": 30,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 21,
        "tempMax": 32,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 23,
        "aqi": 30,
        "rainChance": 15,
        "wind": 5,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 22,
        "aqi": 29,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 22,
        "aqi": 35,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 26,
        "aqi": 41,
        "rainChance": 25,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 30,
        "aqi": 39,
        "rainChance": 35,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 31,
        "aqi": 35,
        "rainChance": 45,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 27,
        "aqi": 31,
        "rainChance": 30,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 25,
        "aqi": 32,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phrae",
    "th": "แพร่",
    "en": "Phrae",
    "districtTh": "อำเภอเมืองแพร่",
    "districtEn": "Mueang Phrae",
    "region": "northern",
    "lat": 18.1947,
    "lon": 100.0648,
    "temp": 29,
    "tempMin": 22,
    "tempMax": 32,
    "feelsLike": 33,
    "humidity": 79,
    "wind": 10,
    "windDirection": "N",
    "windGust": 20,
    "pressure": 1013,
    "visibility": 9.1,
    "dewPoint": 21,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 36,
    "pm25": 11.5,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 11.5,
      "pm10": 24.2,
      "o3": 21,
      "no2": 11,
      "so2": 5,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 33,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 24,
        "aqi": 31,
        "rainChance": 15,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 23,
        "aqi": 30,
        "rainChance": 15,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 23,
        "aqi": 36,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 27,
        "aqi": 42,
        "rainChance": 25,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 31,
        "aqi": 40,
        "rainChance": 35,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 32,
        "aqi": 36,
        "rainChance": 45,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 28,
        "aqi": 32,
        "rainChance": 30,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 26,
        "aqi": 33,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nan",
    "th": "น่าน",
    "en": "Nan",
    "districtTh": "อำเภอเมืองน่าน",
    "districtEn": "Mueang Nan",
    "region": "northern",
    "lat": 18.8448,
    "lon": 100.8254,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 72,
    "wind": 7,
    "windDirection": "N",
    "windGust": 17,
    "pressure": 1010,
    "visibility": 9.2,
    "dewPoint": 22,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 37,
    "pm25": 11.8,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 11.8,
      "pm10": 24.8,
      "o3": 22,
      "no2": 12,
      "so2": 2,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 32,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 31,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 37,
        "rainChance": 20,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 43,
        "rainChance": 25,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 41,
        "rainChance": 35,
        "wind": 9,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 37,
        "rainChance": 45,
        "wind": 10,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 33,
        "rainChance": 30,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 34,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phayao",
    "th": "พะเยา",
    "en": "Phayao",
    "districtTh": "อำเภอเมืองพะเยา",
    "districtEn": "Mueang Phayao",
    "region": "northern",
    "lat": 19.228,
    "lon": 100.1853,
    "temp": 28,
    "tempMin": 21,
    "tempMax": 31,
    "feelsLike": 32,
    "humidity": 73,
    "wind": 8,
    "windDirection": "N",
    "windGust": 18,
    "pressure": 1011,
    "visibility": 9.3,
    "dewPoint": 20,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 38,
    "pm25": 12.2,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 12.2,
      "pm10": 25.6,
      "o3": 23,
      "no2": 13,
      "so2": 3,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 20,
        "tempMax": 30,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 21,
        "tempMax": 32,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 23,
        "aqi": 33,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 22,
        "aqi": 32,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 22,
        "aqi": 38,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 26,
        "aqi": 44,
        "rainChance": 25,
        "wind": 8,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 35,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 31,
        "aqi": 38,
        "rainChance": 45,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 27,
        "aqi": 34,
        "rainChance": 30,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 25,
        "aqi": 35,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "uttaradit",
    "th": "อุตรดิตถ์",
    "en": "Uttaradit",
    "districtTh": "อำเภอเมืองอุตรดิตถ์",
    "districtEn": "Mueang Uttaradit",
    "region": "northern",
    "lat": 17.7423,
    "lon": 100.5092,
    "temp": 29,
    "tempMin": 22,
    "tempMax": 32,
    "feelsLike": 33,
    "humidity": 74,
    "wind": 9,
    "windDirection": "N",
    "windGust": 19,
    "pressure": 1012,
    "visibility": 9.4,
    "dewPoint": 21,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 39,
    "pm25": 12.5,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 12.5,
      "pm10": 26.3,
      "o3": 24,
      "no2": 14,
      "so2": 4,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 33,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 24,
        "aqi": 34,
        "rainChance": 15,
        "wind": 5,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 23,
        "aqi": 33,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 23,
        "aqi": 39,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 27,
        "aqi": 45,
        "rainChance": 25,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 31,
        "aqi": 43,
        "rainChance": 35,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 32,
        "aqi": 39,
        "rainChance": 45,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 28,
        "aqi": 35,
        "rainChance": 30,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 26,
        "aqi": 36,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "sukhothai",
    "th": "สุโขทัย",
    "en": "Sukhothai",
    "districtTh": "อำเภอเมืองสุโขทัย",
    "districtEn": "Mueang Sukhothai",
    "region": "northern",
    "lat": 17.2479,
    "lon": 99.6987,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 75,
    "wind": 10,
    "windDirection": "N",
    "windGust": 20,
    "pressure": 1013,
    "visibility": 9.5,
    "dewPoint": 22,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 40,
    "pm25": 12.8,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 12.8,
      "pm10": 26.9,
      "o3": 25,
      "no2": 15,
      "so2": 5,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 35,
        "rainChance": 15,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 34,
        "rainChance": 15,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 40,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 46,
        "rainChance": 25,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 44,
        "rainChance": 35,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 40,
        "rainChance": 45,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 36,
        "rainChance": 30,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 37,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "tak",
    "th": "ตาก",
    "en": "Tak",
    "districtTh": "อำเภอเมืองตาก",
    "districtEn": "Mueang Tak",
    "region": "northern",
    "lat": 16.6981,
    "lon": 98.7962,
    "temp": 28,
    "tempMin": 21,
    "tempMax": 31,
    "feelsLike": 32,
    "humidity": 76,
    "wind": 7,
    "windDirection": "N",
    "windGust": 17,
    "pressure": 1010,
    "visibility": 9.6,
    "dewPoint": 20,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 41,
    "pm25": 13.1,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 13.1,
      "pm10": 27.5,
      "o3": 26,
      "no2": 16,
      "so2": 2,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 20,
        "tempMax": 30,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 21,
        "tempMax": 32,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 23,
        "aqi": 36,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 22,
        "aqi": 35,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 22,
        "aqi": 41,
        "rainChance": 20,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 26,
        "aqi": 47,
        "rainChance": 25,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 35,
        "wind": 9,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 31,
        "aqi": 41,
        "rainChance": 45,
        "wind": 10,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 27,
        "aqi": 37,
        "rainChance": 30,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 25,
        "aqi": 38,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "kamphaeng phet",
    "th": "กำแพงเพชร",
    "en": "Kamphaeng Phet",
    "districtTh": "อำเภอเมืองกำแพงเพชร",
    "districtEn": "Mueang Kamphaeng Phet",
    "region": "northern",
    "lat": 16.3294,
    "lon": 99.5026,
    "temp": 29,
    "tempMin": 22,
    "tempMax": 32,
    "feelsLike": 33,
    "humidity": 77,
    "wind": 8,
    "windDirection": "N",
    "windGust": 18,
    "pressure": 1011,
    "visibility": 9.7,
    "dewPoint": 21,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 42,
    "pm25": 13.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 13.4,
      "pm10": 28.1,
      "o3": 27,
      "no2": 17,
      "so2": 3,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 33,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 24,
        "aqi": 37,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 23,
        "aqi": 36,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 23,
        "aqi": 42,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 27,
        "aqi": 48,
        "rainChance": 25,
        "wind": 8,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 31,
        "aqi": 46,
        "rainChance": 35,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 32,
        "aqi": 42,
        "rainChance": 45,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 28,
        "aqi": 38,
        "rainChance": 30,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 26,
        "aqi": 39,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phichit",
    "th": "พิจิตร",
    "en": "Phichit",
    "districtTh": "อำเภอเมืองพิจิตร",
    "districtEn": "Mueang Phichit",
    "region": "northern",
    "lat": 16.2367,
    "lon": 100.3572,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 78,
    "wind": 9,
    "windDirection": "N",
    "windGust": 19,
    "pressure": 1012,
    "visibility": 9.8,
    "dewPoint": 22,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 43,
    "pm25": 13.8,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 13.8,
      "pm10": 29,
      "o3": 28,
      "no2": 18,
      "so2": 4,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 38,
        "rainChance": 15,
        "wind": 5,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 37,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 43,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 49,
        "rainChance": 25,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 47,
        "rainChance": 35,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 43,
        "rainChance": 45,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 39,
        "rainChance": 30,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 40,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phitsanulok",
    "th": "พิษณุโลก",
    "en": "Phitsanulok",
    "districtTh": "อำเภอเมืองพิษณุโลก",
    "districtEn": "Mueang Phitsanulok",
    "region": "northern",
    "lat": 16.9707,
    "lon": 100.53,
    "temp": 28,
    "tempMin": 21,
    "tempMax": 31,
    "feelsLike": 32,
    "humidity": 79,
    "wind": 10,
    "windDirection": "N",
    "windGust": 20,
    "pressure": 1013,
    "visibility": 9.9,
    "dewPoint": 20,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 44,
    "pm25": 14.1,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 14.1,
      "pm10": 29.6,
      "o3": 29,
      "no2": 19,
      "so2": 5,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 20,
        "tempMax": 30,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 21,
        "tempMax": 32,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 23,
        "aqi": 39,
        "rainChance": 15,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 22,
        "aqi": 38,
        "rainChance": 15,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 22,
        "aqi": 44,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 26,
        "aqi": 50,
        "rainChance": 25,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 30,
        "aqi": 48,
        "rainChance": 35,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 31,
        "aqi": 44,
        "rainChance": 45,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 27,
        "aqi": 40,
        "rainChance": 30,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 25,
        "aqi": 41,
        "rainChance": 20,
        "wind": 8,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phetchabun",
    "th": "เพชรบูรณ์",
    "en": "Phetchabun",
    "districtTh": "อำเภอเมืองเพชรบูรณ์",
    "districtEn": "Mueang Phetchabun",
    "region": "northern",
    "lat": 16.2692,
    "lon": 101.147,
    "temp": 29,
    "tempMin": 22,
    "tempMax": 32,
    "feelsLike": 33,
    "humidity": 72,
    "wind": 7,
    "windDirection": "N",
    "windGust": 17,
    "pressure": 1010,
    "visibility": 9,
    "dewPoint": 21,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 45,
    "pm25": 14.4,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 14.4,
      "pm10": 30.2,
      "o3": 30,
      "no2": 10,
      "so2": 2,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 33,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 32,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 24,
        "aqi": 40,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 23,
        "aqi": 39,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 23,
        "aqi": 45,
        "rainChance": 20,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 27,
        "aqi": 51,
        "rainChance": 25,
        "wind": 7,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 31,
        "aqi": 49,
        "rainChance": 35,
        "wind": 9,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 32,
        "aqi": 45,
        "rainChance": 45,
        "wind": 10,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 28,
        "aqi": 41,
        "rainChance": 30,
        "wind": 7,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 26,
        "aqi": 42,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nakhon sawan",
    "th": "นครสวรรค์",
    "en": "Nakhon Sawan",
    "districtTh": "อำเภอเมืองนครสวรรค์",
    "districtEn": "Mueang Nakhon Sawan",
    "region": "northern",
    "lat": 15.6924,
    "lon": 100.1321,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 73,
    "wind": 8,
    "windDirection": "N",
    "windGust": 18,
    "pressure": 1011,
    "visibility": 9.1,
    "dewPoint": 22,
    "uvIndex": 9,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 46,
    "pm25": 14.7,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 14.7,
      "pm10": 30.9,
      "o3": 31,
      "no2": 11,
      "so2": 3,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 41,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 40,
        "rainChance": 15,
        "wind": 4,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 46,
        "rainChance": 20,
        "wind": 5,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 52,
        "rainChance": 25,
        "wind": 8,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 50,
        "rainChance": 35,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 46,
        "rainChance": 45,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 42,
        "rainChance": 30,
        "wind": 8,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 43,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "uthai thani",
    "th": "อุทัยธานี",
    "en": "Uthai Thani",
    "districtTh": "อำเภอเมืองอุทัยธานี",
    "districtEn": "Mueang Uthai Thani",
    "region": "northern",
    "lat": 15.3389,
    "lon": 99.4601,
    "temp": 28,
    "tempMin": 21,
    "tempMax": 31,
    "feelsLike": 32,
    "humidity": 74,
    "wind": 9,
    "windDirection": "N",
    "windGust": 19,
    "pressure": 1012,
    "visibility": 9.2,
    "dewPoint": 20,
    "uvIndex": 9,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 47,
    "pm25": 15,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 15,
      "pm10": 31.5,
      "o3": 32,
      "no2": 12,
      "so2": 4,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 21,
        "tempMax": 31,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 20,
        "tempMax": 30,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 21,
        "tempMax": 32,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 22,
        "tempMax": 31,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 23,
        "aqi": 42,
        "rainChance": 15,
        "wind": 5,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 22,
        "aqi": 41,
        "rainChance": 15,
        "wind": 4,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 22,
        "aqi": 47,
        "rainChance": 20,
        "wind": 6,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 26,
        "aqi": 53,
        "rainChance": 25,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 30,
        "aqi": 51,
        "rainChance": 35,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 31,
        "aqi": 47,
        "rainChance": 45,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 27,
        "aqi": 43,
        "rainChance": 30,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 25,
        "aqi": 44,
        "rainChance": 20,
        "wind": 7,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "khon kaen",
    "th": "ขอนแก่น",
    "en": "Khon Kaen",
    "districtTh": "อำเภอเมืองขอนแก่น",
    "districtEn": "Mueang Khon Kaen",
    "region": "northeastern",
    "lat": 16.4038,
    "lon": 102.5878,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 58,
    "wind": 17,
    "windDirection": "NE",
    "windGust": 27,
    "pressure": 1013,
    "visibility": 9.3,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 47,
    "pm25": 15,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15,
      "pm10": 31.5,
      "o3": 33,
      "no2": 13,
      "so2": 5,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 15,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 41,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 47,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 53,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 51,
        "rainChance": 35,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 47,
        "rainChance": 45,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 43,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 44,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "udon thani",
    "th": "อุดรธานี",
    "en": "Udon Thani",
    "districtTh": "อำเภอเมืองอุดรธานี",
    "districtEn": "Mueang Udon Thani",
    "region": "northeastern",
    "lat": 17.4254,
    "lon": 102.8557,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 59,
    "wind": 14,
    "windDirection": "NE",
    "windGust": 24,
    "pressure": 1010,
    "visibility": 9.4,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 48,
    "pm25": 15.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15.4,
      "pm10": 32.3,
      "o3": 34,
      "no2": 14,
      "so2": 2,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 43,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 48,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 54,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 52,
        "rainChance": 35,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 48,
        "rainChance": 45,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 44,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 45,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nong khai",
    "th": "หนองคาย",
    "en": "Nong Khai",
    "districtTh": "อำเภอเมืองหนองคาย",
    "districtEn": "Mueang Nong Khai",
    "region": "northeastern",
    "lat": 17.9406,
    "lon": 102.8422,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 36,
    "humidity": 60,
    "wind": 15,
    "windDirection": "NE",
    "windGust": 25,
    "pressure": 1011,
    "visibility": 9.5,
    "dewPoint": 26,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 49,
    "pm25": 15.7,
    "weather": "sunny",
    "pollutants": {
      "pm25": 15.7,
      "pm10": 33,
      "o3": 20,
      "no2": 15,
      "so2": 3,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 44,
        "rainChance": 15,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 43,
        "rainChance": 15,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 49,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 55,
        "rainChance": 25,
        "wind": 15,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 53,
        "rainChance": 35,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 49,
        "rainChance": 45,
        "wind": 18,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 45,
        "rainChance": 30,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 46,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "loei",
    "th": "เลย",
    "en": "Loei",
    "districtTh": "อำเภอเมืองเลย",
    "districtEn": "Mueang Loei",
    "region": "northeastern",
    "lat": 17.4089,
    "lon": 101.6301,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 61,
    "wind": 16,
    "windDirection": "NE",
    "windGust": 26,
    "pressure": 1012,
    "visibility": 9.6,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 50,
    "pm25": 16,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16,
      "pm10": 33.6,
      "o3": 21,
      "no2": 16,
      "so2": 4,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 44,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 50,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 56,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 54,
        "rainChance": 35,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 50,
        "rainChance": 45,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 46,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 47,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nong bua lamphu",
    "th": "หนองบัวลำภู",
    "en": "Nong Bua Lam Phu",
    "districtTh": "อำเภอเมืองหนองบัวลำภู",
    "districtEn": "Mueang Nong Bua Lam Phu",
    "region": "northeastern",
    "lat": 17.1736,
    "lon": 102.2974,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 62,
    "wind": 17,
    "windDirection": "NE",
    "windGust": 27,
    "pressure": 1013,
    "visibility": 9.7,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 51,
    "pm25": 16.3,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16.3,
      "pm10": 34.2,
      "o3": 22,
      "no2": 17,
      "so2": 5,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 46,
        "rainChance": 15,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 51,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 57,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 55,
        "rainChance": 35,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 51,
        "rainChance": 45,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 47,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 48,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "sakon nakhon",
    "th": "สกลนคร",
    "en": "Sakon Nakhon",
    "districtTh": "อำเภอเมืองสกลนคร",
    "districtEn": "Mueang Sakon Nakhon",
    "region": "northeastern",
    "lat": 17.3888,
    "lon": 103.8213,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 36,
    "humidity": 55,
    "wind": 14,
    "windDirection": "NE",
    "windGust": 24,
    "pressure": 1010,
    "visibility": 9.8,
    "dewPoint": 26,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 40,
    "pm25": 12.8,
    "weather": "sunny",
    "pollutants": {
      "pm25": 12.8,
      "pm10": 26.9,
      "o3": 23,
      "no2": 18,
      "so2": 2,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 35,
        "rainChance": 15,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 34,
        "rainChance": 15,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 40,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 46,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 44,
        "rainChance": 35,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 40,
        "rainChance": 45,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 36,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 37,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nakhon phanom",
    "th": "นครพนม",
    "en": "Nakhon Phanom",
    "districtTh": "อำเภอเมืองนครพนม",
    "districtEn": "Mueang Nakhon Phanom",
    "region": "northeastern",
    "lat": 17.3724,
    "lon": 104.4349,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 56,
    "wind": 15,
    "windDirection": "NE",
    "windGust": 25,
    "pressure": 1011,
    "visibility": 9.9,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 41,
    "pm25": 13.1,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 13.1,
      "pm10": 27.5,
      "o3": 24,
      "no2": 19,
      "so2": 3,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 36,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 35,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 41,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 47,
        "rainChance": 25,
        "wind": 15,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 45,
        "rainChance": 35,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 41,
        "rainChance": 45,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 37,
        "rainChance": 30,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 38,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "mukdahan",
    "th": "มุกดาหาร",
    "en": "Mukdahan",
    "districtTh": "อำเภอเมืองมุกดาหาร",
    "districtEn": "Mueang Mukdahan",
    "region": "northeastern",
    "lat": 16.5568,
    "lon": 104.5253,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 57,
    "wind": 16,
    "windDirection": "NE",
    "windGust": 26,
    "pressure": 1012,
    "visibility": 9,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 42,
    "pm25": 13.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 13.4,
      "pm10": 28.1,
      "o3": 25,
      "no2": 10,
      "so2": 4,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 37,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 36,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 48,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 46,
        "rainChance": 35,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 42,
        "rainChance": 45,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 38,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 39,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "kalasin",
    "th": "กาฬสินธุ์",
    "en": "Kalasin",
    "districtTh": "อำเภอเมืองกาฬสินธุ์",
    "districtEn": "Mueang Kalasin",
    "region": "northeastern",
    "lat": 16.6316,
    "lon": 103.6283,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 36,
    "humidity": 58,
    "wind": 17,
    "windDirection": "NE",
    "windGust": 27,
    "pressure": 1013,
    "visibility": 9.1,
    "dewPoint": 26,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 43,
    "pm25": 13.8,
    "weather": "sunny",
    "pollutants": {
      "pm25": 13.8,
      "pm10": 29,
      "o3": 26,
      "no2": 11,
      "so2": 5,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 38,
        "rainChance": 15,
        "wind": 13,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 37,
        "rainChance": 15,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 43,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 49,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 47,
        "rainChance": 35,
        "wind": 19,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 43,
        "rainChance": 45,
        "wind": 20,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 39,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 40,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "maha sarakham",
    "th": "มหาสารคาม",
    "en": "Maha Sarakham",
    "districtTh": "อำเภอเมืองมหาสารคาม",
    "districtEn": "Mueang Maha Sarakham",
    "region": "northeastern",
    "lat": 15.9934,
    "lon": 103.1796,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 59,
    "wind": 14,
    "windDirection": "NE",
    "windGust": 24,
    "pressure": 1010,
    "visibility": 9.2,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 44,
    "pm25": 14.1,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 14.1,
      "pm10": 29.6,
      "o3": 27,
      "no2": 12,
      "so2": 2,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 39,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 38,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 44,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 50,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 48,
        "rainChance": 35,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 44,
        "rainChance": 45,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 40,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 41,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "roi et",
    "th": "ร้อยเอ็ด",
    "en": "Roi Et",
    "districtTh": "อำเภอเมืองร้อยเอ็ด",
    "districtEn": "Mueang Roi Et",
    "region": "northeastern",
    "lat": 15.9232,
    "lon": 103.8262,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 60,
    "wind": 15,
    "windDirection": "NE",
    "windGust": 25,
    "pressure": 1011,
    "visibility": 9.3,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 45,
    "pm25": 14.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 14.4,
      "pm10": 30.2,
      "o3": 28,
      "no2": 13,
      "so2": 3,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 40,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 39,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 51,
        "rainChance": 25,
        "wind": 15,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 49,
        "rainChance": 35,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 45,
        "rainChance": 45,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 41,
        "rainChance": 30,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 42,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "yasothon",
    "th": "ยโสธร",
    "en": "Yasothon",
    "districtTh": "อำเภอเมืองยโสธร",
    "districtEn": "Mueang Yasothon",
    "region": "northeastern",
    "lat": 15.8898,
    "lon": 104.3385,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 36,
    "humidity": 61,
    "wind": 16,
    "windDirection": "NE",
    "windGust": 26,
    "pressure": 1012,
    "visibility": 9.4,
    "dewPoint": 26,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 46,
    "pm25": 14.7,
    "weather": "sunny",
    "pollutants": {
      "pm25": 14.7,
      "pm10": 30.9,
      "o3": 29,
      "no2": 14,
      "so2": 4,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 41,
        "rainChance": 15,
        "wind": 12,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 40,
        "rainChance": 15,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 46,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 52,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 50,
        "rainChance": 35,
        "wind": 18,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 46,
        "rainChance": 45,
        "wind": 19,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 42,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 43,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "amnat charoen",
    "th": "อำนาจเจริญ",
    "en": "Amnat Charoen",
    "districtTh": "อำเภอเมืองอำนาจเจริญ",
    "districtEn": "Mueang Amnat Charoen",
    "region": "northeastern",
    "lat": 15.8702,
    "lon": 104.7681,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 62,
    "wind": 17,
    "windDirection": "NE",
    "windGust": 27,
    "pressure": 1013,
    "visibility": 9.5,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 47,
    "pm25": 15,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15,
      "pm10": 31.5,
      "o3": 30,
      "no2": 15,
      "so2": 5,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 15,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 41,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 47,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 53,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 51,
        "rainChance": 35,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 47,
        "rainChance": 45,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 43,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 44,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "ubon ratchathani",
    "th": "อุบลราชธานี",
    "en": "Ubon Ratchathani",
    "districtTh": "อำเภอเมืองอุบลราชธานี",
    "districtEn": "Mueang Ubon Ratchathani",
    "region": "northeastern",
    "lat": 15.1775,
    "lon": 105.1197,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 55,
    "wind": 14,
    "windDirection": "NE",
    "windGust": 24,
    "pressure": 1010,
    "visibility": 9.6,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 48,
    "pm25": 15.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 15.4,
      "pm10": 32.3,
      "o3": 31,
      "no2": 16,
      "so2": 2,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 43,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 15,
        "wind": 9,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 48,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 54,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 52,
        "rainChance": 35,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 48,
        "rainChance": 45,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 44,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 45,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "si sa ket",
    "th": "ศรีสะเกษ",
    "en": "Si Sa Ket",
    "districtTh": "อำเภอเมืองศรีสะเกษ",
    "districtEn": "Mueang Si Sa Ket",
    "region": "northeastern",
    "lat": 14.8569,
    "lon": 104.3788,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 36,
    "humidity": 56,
    "wind": 15,
    "windDirection": "NE",
    "windGust": 25,
    "pressure": 1011,
    "visibility": 9.7,
    "dewPoint": 26,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 49,
    "pm25": 15.7,
    "weather": "sunny",
    "pollutants": {
      "pm25": 15.7,
      "pm10": 33,
      "o3": 32,
      "no2": 17,
      "so2": 3,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 44,
        "rainChance": 15,
        "wind": 11,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 43,
        "rainChance": 15,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 49,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 55,
        "rainChance": 25,
        "wind": 15,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 53,
        "rainChance": 35,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 49,
        "rainChance": 45,
        "wind": 18,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 45,
        "rainChance": 30,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 46,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "surin",
    "th": "สุรินทร์",
    "en": "Surin",
    "districtTh": "อำเภอเมืองสุรินทร์",
    "districtEn": "Mueang Surin",
    "region": "northeastern",
    "lat": 14.8841,
    "lon": 103.6685,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 57,
    "wind": 16,
    "windDirection": "NE",
    "windGust": 26,
    "pressure": 1012,
    "visibility": 9.8,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 50,
    "pm25": 16,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16,
      "pm10": 33.6,
      "o3": 33,
      "no2": 18,
      "so2": 4,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 44,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 50,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 56,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 54,
        "rainChance": 35,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 50,
        "rainChance": 45,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 46,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 47,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "buri ram",
    "th": "บุรีรัมย์",
    "en": "Buri Ram",
    "districtTh": "อำเภอเมืองบุรีรัมย์",
    "districtEn": "Mueang Buri Ram",
    "region": "northeastern",
    "lat": 14.8233,
    "lon": 102.9718,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 58,
    "wind": 17,
    "windDirection": "NE",
    "windGust": 27,
    "pressure": 1013,
    "visibility": 9.9,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 51,
    "pm25": 16.3,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 16.3,
      "pm10": 34.2,
      "o3": 34,
      "no2": 19,
      "so2": 5,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 46,
        "rainChance": 15,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 45,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 51,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 57,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 55,
        "rainChance": 35,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 51,
        "rainChance": 45,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 47,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 48,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nakhon ratchasima",
    "th": "นครราชสีมา",
    "en": "Nakhon Ratchasima",
    "districtTh": "อำเภอเมืองนครราชสีมา",
    "districtEn": "Mueang Nakhon Ratchasima",
    "region": "northeastern",
    "lat": 14.9577,
    "lon": 102.1169,
    "temp": 34,
    "tempMin": 27,
    "tempMax": 37,
    "feelsLike": 36,
    "humidity": 59,
    "wind": 14,
    "windDirection": "NE",
    "windGust": 24,
    "pressure": 1010,
    "visibility": 9,
    "dewPoint": 26,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 40,
    "pm25": 12.8,
    "weather": "sunny",
    "pollutants": {
      "pm25": 12.8,
      "pm10": 26.9,
      "o3": 20,
      "no2": 10,
      "so2": 2,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 26,
        "tempMax": 36,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 27,
        "tempMax": 38,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 37,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 29,
        "aqi": 35,
        "rainChance": 15,
        "wind": 10,
        "weather": "sunny"
      },
      {
        "time": "03:00",
        "temp": 28,
        "aqi": 34,
        "rainChance": 15,
        "wind": 9,
        "weather": "sunny"
      },
      {
        "time": "06:00",
        "temp": 28,
        "aqi": 40,
        "rainChance": 20,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 32,
        "aqi": 46,
        "rainChance": 25,
        "wind": 14,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 36,
        "aqi": 44,
        "rainChance": 35,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "15:00",
        "temp": 37,
        "aqi": 40,
        "rainChance": 45,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "18:00",
        "temp": 33,
        "aqi": 36,
        "rainChance": 30,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 31,
        "aqi": 37,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chaiyaphum",
    "th": "ชัยภูมิ",
    "en": "Chaiyaphum",
    "districtTh": "อำเภอเมืองชัยภูมิ",
    "districtEn": "Mueang Chaiyaphum",
    "region": "northeastern",
    "lat": 16.0095,
    "lon": 101.8025,
    "temp": 35,
    "tempMin": 28,
    "tempMax": 38,
    "feelsLike": 37,
    "humidity": 60,
    "wind": 15,
    "windDirection": "NE",
    "windGust": 25,
    "pressure": 1011,
    "visibility": 9.1,
    "dewPoint": 27,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 41,
    "pm25": 13.1,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 13.1,
      "pm10": 27.5,
      "o3": 21,
      "no2": 11,
      "so2": 3,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 27,
        "tempMax": 37,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 28,
        "tempMax": 39,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 38,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 30,
        "aqi": 36,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 29,
        "aqi": 35,
        "rainChance": 15,
        "wind": 10,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 29,
        "aqi": 41,
        "rainChance": 20,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 33,
        "aqi": 47,
        "rainChance": 25,
        "wind": 15,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 37,
        "aqi": 45,
        "rainChance": 35,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 38,
        "aqi": 41,
        "rainChance": 45,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 34,
        "aqi": 37,
        "rainChance": 30,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 32,
        "aqi": 38,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "bueng kan",
    "th": "บึงกาฬ",
    "en": "Bueng Kan",
    "districtTh": "อำเภอเมืองบึงกาฬ",
    "districtEn": "Mueang Bueng Kan",
    "region": "northeastern",
    "lat": 18.146,
    "lon": 103.721,
    "temp": 36,
    "tempMin": 29,
    "tempMax": 39,
    "feelsLike": 38,
    "humidity": 61,
    "wind": 16,
    "windDirection": "NE",
    "windGust": 26,
    "pressure": 1012,
    "visibility": 9.2,
    "dewPoint": 28,
    "uvIndex": 10,
    "rainChance": 30,
    "rainfallToday": 0,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 42,
    "pm25": 13.4,
    "weather": "partly_cloudy",
    "pollutants": {
      "pm25": 13.4,
      "pm10": 28.1,
      "o3": 22,
      "no2": 12,
      "so2": 4,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 29,
        "tempMax": 39,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 28,
        "tempMax": 38,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 29,
        "tempMax": 40,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 30,
        "tempMax": 39,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 30,
        "tempMax": 40,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 31,
        "aqi": 37,
        "rainChance": 15,
        "wind": 12,
        "weather": "partly_cloudy"
      },
      {
        "time": "03:00",
        "temp": 30,
        "aqi": 36,
        "rainChance": 15,
        "wind": 11,
        "weather": "partly_cloudy"
      },
      {
        "time": "06:00",
        "temp": 30,
        "aqi": 42,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 34,
        "aqi": 48,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 38,
        "aqi": 46,
        "rainChance": 35,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "15:00",
        "temp": 39,
        "aqi": 42,
        "rainChance": 45,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "18:00",
        "temp": 35,
        "aqi": 38,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 33,
        "aqi": 39,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "surat thani",
    "th": "สุราษฎร์ธานี",
    "en": "Surat Thani",
    "districtTh": "อำเภอเมืองสุราษฎร์ธานี",
    "districtEn": "Mueang Surat Thani",
    "region": "southern",
    "lat": 9.0311,
    "lon": 99.0627,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 78,
    "wind": 19,
    "windDirection": "W",
    "windGust": 29,
    "pressure": 1013,
    "visibility": 9.3,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 25,
    "pm25": 8,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 8,
      "pm10": 16.8,
      "o3": 23,
      "no2": 13,
      "so2": 5,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 20,
        "rainChance": 15,
        "wind": 15,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 19,
        "rainChance": 15,
        "wind": 14,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 25,
        "rainChance": 20,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 31,
        "rainChance": 25,
        "wind": 19,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 29,
        "rainChance": 35,
        "wind": 21,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 25,
        "rainChance": 45,
        "wind": 22,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 21,
        "rainChance": 30,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 22,
        "rainChance": 20,
        "wind": 17,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "nakhon si thammarat",
    "th": "นครศรีธรรมราช",
    "en": "Nakhon Si Thammarat",
    "districtTh": "อำเภอเมืองนครศรีธรรมราช",
    "districtEn": "Mueang Nakhon Si Thammarat",
    "region": "southern",
    "lat": 8.3727,
    "lon": 99.7779,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 79,
    "wind": 20,
    "windDirection": "W",
    "windGust": 30,
    "pressure": 1010,
    "visibility": 9.4,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 26,
    "pm25": 8.3,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 8.3,
      "pm10": 17.4,
      "o3": 24,
      "no2": 14,
      "so2": 2,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 21,
        "rainChance": 15,
        "wind": 16,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 20,
        "rainChance": 15,
        "wind": 15,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 26,
        "rainChance": 20,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 32,
        "rainChance": 25,
        "wind": 20,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 30,
        "rainChance": 35,
        "wind": 22,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 26,
        "rainChance": 45,
        "wind": 23,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 22,
        "rainChance": 30,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 23,
        "rainChance": 20,
        "wind": 18,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "krabi",
    "th": "กระบี่",
    "en": "Krabi",
    "districtTh": "อำเภอเมืองกระบี่",
    "districtEn": "Mueang Krabi",
    "region": "southern",
    "lat": 8.1532,
    "lon": 99.0141,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 80,
    "wind": 21,
    "windDirection": "W",
    "windGust": 31,
    "pressure": 1011,
    "visibility": 9.5,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 27,
    "pm25": 8.6,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 8.6,
      "pm10": 18.1,
      "o3": 25,
      "no2": 15,
      "so2": 3,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 22,
        "rainChance": 15,
        "wind": 17,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 21,
        "rainChance": 15,
        "wind": 16,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 27,
        "rainChance": 20,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 33,
        "rainChance": 25,
        "wind": 21,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 31,
        "rainChance": 35,
        "wind": 23,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 27,
        "rainChance": 45,
        "wind": 24,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 23,
        "rainChance": 30,
        "wind": 21,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 24,
        "rainChance": 20,
        "wind": 19,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phang nga",
    "th": "พังงา",
    "en": "Phang Nga",
    "districtTh": "อำเภอเมืองพังงา",
    "districtEn": "Mueang Phang Nga",
    "region": "southern",
    "lat": 8.6796,
    "lon": 98.4235,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 81,
    "wind": 16,
    "windDirection": "W",
    "windGust": 26,
    "pressure": 1012,
    "visibility": 9.6,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 28,
    "pm25": 9,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 9,
      "pm10": 18.9,
      "o3": 26,
      "no2": 16,
      "so2": 4,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 23,
        "rainChance": 15,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 22,
        "rainChance": 15,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 28,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 34,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 32,
        "rainChance": 35,
        "wind": 18,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 28,
        "rainChance": 45,
        "wind": 19,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 24,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 25,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phuket",
    "th": "ภูเก็ต",
    "en": "Phuket",
    "districtTh": "อำเภอเมืองภูเก็ต",
    "districtEn": "Mueang Phuket",
    "region": "southern",
    "lat": 7.9747,
    "lon": 98.3415,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 82,
    "wind": 17,
    "windDirection": "W",
    "windGust": 27,
    "pressure": 1013,
    "visibility": 9.7,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:15",
    "sunset": "18:27",
    "aqi": 29,
    "pm25": 9.3,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 9.3,
      "pm10": 19.5,
      "o3": 27,
      "no2": 17,
      "so2": 5,
      "co": 0.5
    },
    "alert": {
      "level": "warning",
      "titleTh": "เตือนภัยคลื่นลมแรงบริเวณทะเลอันดามัน",
      "titleEn": "Strong Wind and High Waves Warning in Andaman Sea",
      "descTh": "คลื่นลมทะเลอันดามันมีคลื่นสูง 2-3 เมตร บริเวณที่มีฝนฟ้าคะนองคลื่นสูงมากกว่า 3 เมตร เรือเล็กควรงดออกจากฝั่ง",
      "descEn": "Waves 2-3 meters high in Andaman Sea; above 3m in stormy areas. Small boats should remain ashore.",
      "sourceTh": "กรมอุตุนิยมวิทยา ศูนย์ภูเก็ต",
      "sourceEn": "TMD Southern Weather Station Phuket"
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 24,
        "rainChance": 15,
        "wind": 13,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 23,
        "rainChance": 15,
        "wind": 12,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 29,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 35,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 33,
        "rainChance": 35,
        "wind": 19,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 29,
        "rainChance": 45,
        "wind": 20,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 25,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 26,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "trang",
    "th": "ตรัง",
    "en": "Trang",
    "districtTh": "อำเภอเมืองตรัง",
    "districtEn": "Mueang Trang",
    "region": "southern",
    "lat": 7.5279,
    "lon": 99.6167,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 83,
    "wind": 18,
    "windDirection": "W",
    "windGust": 28,
    "pressure": 1010,
    "visibility": 9.8,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:16",
    "sunset": "18:28",
    "aqi": 30,
    "pm25": 9.6,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 9.6,
      "pm10": 20.2,
      "o3": 28,
      "no2": 18,
      "so2": 2,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 25,
        "rainChance": 15,
        "wind": 14,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 24,
        "rainChance": 15,
        "wind": 13,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 30,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 36,
        "rainChance": 25,
        "wind": 18,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 34,
        "rainChance": 35,
        "wind": 20,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 30,
        "rainChance": 45,
        "wind": 21,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 26,
        "rainChance": 30,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 27,
        "rainChance": 20,
        "wind": 16,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "phatthalung",
    "th": "พัทลุง",
    "en": "Phatthalung",
    "districtTh": "อำเภอเมืองพัทลุง",
    "districtEn": "Mueang Phatthalung",
    "region": "southern",
    "lat": 7.513,
    "lon": 100.0321,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 84,
    "wind": 19,
    "windDirection": "W",
    "windGust": 29,
    "pressure": 1011,
    "visibility": 9.9,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:17",
    "sunset": "18:29",
    "aqi": 31,
    "pm25": 9.9,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 9.9,
      "pm10": 20.8,
      "o3": 29,
      "no2": 19,
      "so2": 3,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 26,
        "rainChance": 15,
        "wind": 15,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 25,
        "rainChance": 15,
        "wind": 14,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 31,
        "rainChance": 20,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 37,
        "rainChance": 25,
        "wind": 19,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 35,
        "rainChance": 35,
        "wind": 21,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 31,
        "rainChance": 45,
        "wind": 22,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 27,
        "rainChance": 30,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 28,
        "rainChance": 20,
        "wind": 17,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "songkhla",
    "th": "สงขลา",
    "en": "Songkhla",
    "districtTh": "อำเภอเมืองสงขลา",
    "districtEn": "Mueang Songkhla",
    "region": "southern",
    "lat": 6.804,
    "lon": 100.5818,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 78,
    "wind": 20,
    "windDirection": "W",
    "windGust": 30,
    "pressure": 1012,
    "visibility": 9,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:08",
    "sunset": "18:20",
    "aqi": 32,
    "pm25": 10.2,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 10.2,
      "pm10": 21.4,
      "o3": 30,
      "no2": 10,
      "so2": 4,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 27,
        "rainChance": 15,
        "wind": 16,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 26,
        "rainChance": 15,
        "wind": 15,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 32,
        "rainChance": 20,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 38,
        "rainChance": 25,
        "wind": 20,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 36,
        "rainChance": 35,
        "wind": 22,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 32,
        "rainChance": 45,
        "wind": 23,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 28,
        "rainChance": 30,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 29,
        "rainChance": 20,
        "wind": 18,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "satun",
    "th": "สตูล",
    "en": "Satun",
    "districtTh": "อำเภอเมืองสตูล",
    "districtEn": "Mueang Satun",
    "region": "southern",
    "lat": 6.8502,
    "lon": 99.9644,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 79,
    "wind": 21,
    "windDirection": "W",
    "windGust": 31,
    "pressure": 1013,
    "visibility": 9.1,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:09",
    "sunset": "18:21",
    "aqi": 33,
    "pm25": 10.6,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 10.6,
      "pm10": 22.3,
      "o3": 31,
      "no2": 11,
      "so2": 5,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 28,
        "rainChance": 15,
        "wind": 17,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 27,
        "rainChance": 15,
        "wind": 16,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 33,
        "rainChance": 20,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 39,
        "rainChance": 25,
        "wind": 21,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 37,
        "rainChance": 35,
        "wind": 23,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 33,
        "rainChance": 45,
        "wind": 24,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 29,
        "rainChance": 30,
        "wind": 21,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 30,
        "rainChance": 20,
        "wind": 19,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "pattani",
    "th": "ปัตตานี",
    "en": "Pattani",
    "districtTh": "อำเภอเมืองปัตตานี",
    "districtEn": "Mueang Pattani",
    "region": "southern",
    "lat": 6.7305,
    "lon": 101.3526,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 80,
    "wind": 16,
    "windDirection": "W",
    "windGust": 26,
    "pressure": 1010,
    "visibility": 9.2,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:10",
    "sunset": "18:22",
    "aqi": 22,
    "pm25": 7,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 7,
      "pm10": 14.7,
      "o3": 32,
      "no2": 12,
      "so2": 2,
      "co": 0.5
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 17,
        "rainChance": 15,
        "wind": 12,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 16,
        "rainChance": 15,
        "wind": 11,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 22,
        "rainChance": 20,
        "wind": 13,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 28,
        "rainChance": 25,
        "wind": 16,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 26,
        "rainChance": 35,
        "wind": 18,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 22,
        "rainChance": 45,
        "wind": 19,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 18,
        "rainChance": 30,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 19,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "yala",
    "th": "ยะลา",
    "en": "Yala",
    "districtTh": "อำเภอเมืองยะลา",
    "districtEn": "Mueang Yala",
    "region": "southern",
    "lat": 6.1833,
    "lon": 101.2248,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 81,
    "wind": 17,
    "windDirection": "W",
    "windGust": 27,
    "pressure": 1011,
    "visibility": 9.3,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:11",
    "sunset": "18:23",
    "aqi": 23,
    "pm25": 7.4,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 7.4,
      "pm10": 15.5,
      "o3": 33,
      "no2": 13,
      "so2": 3,
      "co": 0.6
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 18,
        "rainChance": 15,
        "wind": 13,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 17,
        "rainChance": 15,
        "wind": 12,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 23,
        "rainChance": 20,
        "wind": 14,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 29,
        "rainChance": 25,
        "wind": 17,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 27,
        "rainChance": 35,
        "wind": 19,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 23,
        "rainChance": 45,
        "wind": 20,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 19,
        "rainChance": 30,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 20,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "narathiwat",
    "th": "นราธิวาส",
    "en": "Narathiwat",
    "districtTh": "อำเภอเมืองนราธิวาส",
    "districtEn": "Mueang Narathiwat",
    "region": "southern",
    "lat": 6.1719,
    "lon": 101.7215,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 82,
    "wind": 18,
    "windDirection": "W",
    "windGust": 28,
    "pressure": 1012,
    "visibility": 9.4,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:12",
    "sunset": "18:24",
    "aqi": 24,
    "pm25": 7.7,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 7.7,
      "pm10": 16.2,
      "o3": 34,
      "no2": 14,
      "so2": 4,
      "co": 0.7
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 19,
        "rainChance": 15,
        "wind": 14,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 18,
        "rainChance": 15,
        "wind": 13,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 24,
        "rainChance": 20,
        "wind": 15,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 30,
        "rainChance": 25,
        "wind": 18,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 28,
        "rainChance": 35,
        "wind": 20,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 24,
        "rainChance": 45,
        "wind": 21,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 20,
        "rainChance": 30,
        "wind": 18,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 21,
        "rainChance": 20,
        "wind": 16,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "chumphon",
    "th": "ชุมพร",
    "en": "Chumphon",
    "districtTh": "อำเภอเมืองชุมพร",
    "districtEn": "Mueang Chumphon",
    "region": "southern",
    "lat": 10.3666,
    "lon": 99.0698,
    "temp": 31,
    "tempMin": 24,
    "tempMax": 34,
    "feelsLike": 35,
    "humidity": 83,
    "wind": 19,
    "windDirection": "W",
    "windGust": 29,
    "pressure": 1013,
    "visibility": 9.5,
    "dewPoint": 23,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:13",
    "sunset": "18:25",
    "aqi": 25,
    "pm25": 8,
    "weather": "rain_heavy",
    "pollutants": {
      "pm25": 8,
      "pm10": 16.8,
      "o3": 20,
      "no2": 15,
      "so2": 5,
      "co": 0.3
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_heavy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 35,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 25,
        "tempMax": 34,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 25,
        "tempMax": 35,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 26,
        "aqi": 20,
        "rainChance": 15,
        "wind": 15,
        "weather": "rain_heavy"
      },
      {
        "time": "03:00",
        "temp": 25,
        "aqi": 19,
        "rainChance": 15,
        "wind": 14,
        "weather": "rain_heavy"
      },
      {
        "time": "06:00",
        "temp": 25,
        "aqi": 25,
        "rainChance": 20,
        "wind": 16,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 29,
        "aqi": 31,
        "rainChance": 25,
        "wind": 19,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 33,
        "aqi": 29,
        "rainChance": 35,
        "wind": 21,
        "weather": "rain_heavy"
      },
      {
        "time": "15:00",
        "temp": 34,
        "aqi": 25,
        "rainChance": 45,
        "wind": 22,
        "weather": "rain_heavy"
      },
      {
        "time": "18:00",
        "temp": 30,
        "aqi": 21,
        "rainChance": 30,
        "wind": 19,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 28,
        "aqi": 22,
        "rainChance": 20,
        "wind": 17,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  },
  {
    "key": "ranong",
    "th": "ระนอง",
    "en": "Ranong",
    "districtTh": "อำเภอเมืองระนอง",
    "districtEn": "Mueang Ranong",
    "region": "southern",
    "lat": 10.0009,
    "lon": 98.7192,
    "temp": 30,
    "tempMin": 23,
    "tempMax": 33,
    "feelsLike": 34,
    "humidity": 84,
    "wind": 20,
    "windDirection": "W",
    "windGust": 30,
    "pressure": 1010,
    "visibility": 9.6,
    "dewPoint": 22,
    "uvIndex": 8,
    "rainChance": 65,
    "rainfallToday": 5.5,
    "sunrise": "06:14",
    "sunset": "18:26",
    "aqi": 26,
    "pm25": 8.3,
    "weather": "rain_light",
    "pollutants": {
      "pm25": 8.3,
      "pm10": 17.4,
      "o3": 21,
      "no2": 16,
      "so2": 2,
      "co": 0.4
    },
    "sevenDayForecast": [
      {
        "dayNameTh": "วันนี้",
        "dayNameEn": "Today",
        "date": "20 ก.ย.",
        "weather": "rain_light",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 60
      },
      {
        "dayNameTh": "พรุ่งนี้",
        "dayNameEn": "Tomorrow",
        "date": "21 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 23,
        "tempMax": 33,
        "rainChance": 40
      },
      {
        "dayNameTh": "พ.",
        "dayNameEn": "Wed",
        "date": "22 ก.ย.",
        "weather": "rain_light",
        "tempMin": 22,
        "tempMax": 32,
        "rainChance": 55
      },
      {
        "dayNameTh": "พฤ.",
        "dayNameEn": "Thu",
        "date": "23 ก.ย.",
        "weather": "sunny",
        "tempMin": 23,
        "tempMax": 34,
        "rainChance": 25
      },
      {
        "dayNameTh": "ศ.",
        "dayNameEn": "Fri",
        "date": "24 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 20
      },
      {
        "dayNameTh": "ส.",
        "dayNameEn": "Sat",
        "date": "25 ก.ย.",
        "weather": "partly_cloudy",
        "tempMin": 24,
        "tempMax": 33,
        "rainChance": 30
      },
      {
        "dayNameTh": "อา.",
        "dayNameEn": "Sun",
        "date": "26 ก.ย.",
        "weather": "sunny",
        "tempMin": 24,
        "tempMax": 34,
        "rainChance": 15
      }
    ],
    "hourly": [
      {
        "time": "00:00",
        "temp": 25,
        "aqi": 21,
        "rainChance": 15,
        "wind": 16,
        "weather": "rain_light"
      },
      {
        "time": "03:00",
        "temp": 24,
        "aqi": 20,
        "rainChance": 15,
        "wind": 15,
        "weather": "rain_light"
      },
      {
        "time": "06:00",
        "temp": 24,
        "aqi": 26,
        "rainChance": 20,
        "wind": 17,
        "weather": "partly_cloudy"
      },
      {
        "time": "09:00",
        "temp": 28,
        "aqi": 32,
        "rainChance": 25,
        "wind": 20,
        "weather": "sunny"
      },
      {
        "time": "12:00",
        "temp": 32,
        "aqi": 30,
        "rainChance": 35,
        "wind": 22,
        "weather": "rain_light"
      },
      {
        "time": "15:00",
        "temp": 33,
        "aqi": 26,
        "rainChance": 45,
        "wind": 23,
        "weather": "rain_light"
      },
      {
        "time": "18:00",
        "temp": 29,
        "aqi": 22,
        "rainChance": 30,
        "wind": 20,
        "weather": "partly_cloudy"
      },
      {
        "time": "21:00",
        "temp": 27,
        "aqi": 23,
        "rainChance": 20,
        "wind": 18,
        "weather": "partly_cloudy"
      }
    ],
    "lifestyle": {
      "running": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.",
        "descEn": "Best for morning runs (05:30-07:30)."
      },
      "laundry": {
        "score": 8,
        "labelTh": "ดีมาก",
        "labelEn": "Very Good",
        "descTh": "แดดแรง ผ้าแห้งไว",
        "descEn": "Strong sunlight, clothes dry fast."
      },
      "carWash": {
        "score": 7,
        "labelTh": "ดี",
        "labelEn": "Good",
        "descTh": "โอกาสฝนปานกลาง ล้างรถได้",
        "descEn": "Moderate rain risk."
      },
      "sunscreen": {
        "score": 9,
        "labelTh": "จำเป็น",
        "labelEn": "Required",
        "descTh": "ทาครีมกันแดด SPF 50+ สม่ำเสมอ",
        "descEn": "Apply SPF 50+ sunscreen."
      }
    }
  }
]

export type AqiBand = "good" | "moderate" | "unhealthy_sensitive" | "unhealthy"

export function aqiBand(aqi: number): AqiBand {
  if (aqi <= 50) return "good"
  if (aqi <= 100) return "moderate"
  if (aqi <= 150) return "unhealthy_sensitive"
  return "unhealthy"
}

export const AQI_COLORS: Record<AqiBand, string> = {
  good: "#34a853",
  moderate: "#fbbc04",
  unhealthy_sensitive: "#ff8c00",
  unhealthy: "#ea4335",
}

export function aqiPercent(aqi: number): number {
  return Math.min(100, Math.max(0, (aqi / 200) * 100))
}

export function buildHourly(city: City): HourPoint[] {
  if (city.hourly && city.hourly.length) return city.hourly
  const result: HourPoint[] = []
  for (let i = 0; i < 24; i++) {
    const time = `${i.toString().padStart(2, '0')}:00`
    const hourOffset = (i - 14) / 12 * Math.PI
    const tempOffset = Math.cos(hourOffset) * 4
    const aqiOffset = Math.sin(hourOffset) * -5
    result.push({
      time,
      temp: Math.round(city.temp + tempOffset),
      aqi: Math.max(0, Math.round(city.aqi + aqiOffset)),
      rainChance: Math.max(0, Math.min(100, Math.round(city.rainChance + (i % 3 === 0 ? 10 : 0)))),
      wind: city.wind,
      weather: city.weather,
    })
  }
  return result
}

export function getThailandRankings(cities: City[]) {
  const sorted = [...cities].sort((a, b) => a.aqi - b.aqi)
  const cleanest = sorted.slice(0, 5)
  const polluted = [...sorted].reverse().slice(0, 5)
  return { cleanest, polluted }
}
