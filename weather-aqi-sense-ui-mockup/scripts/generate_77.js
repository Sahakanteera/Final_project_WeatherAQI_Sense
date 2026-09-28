const fs = require('fs');

const html = fs.readFileSync('C:/Users/tonkla/Downloads/Final_project_WeatherAQI_Sense/index.html', 'utf8');
const match = html.match(/const PROVINCES = (\[[\s\S]*?\]);/);
const rawProvinces = eval(match[1]);

function generateCity(p, i) {
  const reg = p.region;
  let baseTemp = 33;
  let baseAqi = 50;
  let weather = 'partly_cloudy';
  let humidity = 68;
  let wind = 12;
  let windDir = 'SW';

  if (reg === 'northern') {
    baseTemp = 28 + (i % 3);
    baseAqi = 35 + (i % 15);
    weather = i % 2 === 0 ? 'rain_light' : 'partly_cloudy';
    humidity = 72 + (i % 8);
    wind = 7 + (i % 4);
    windDir = 'N';
  } else if (reg === 'northeastern') {
    baseTemp = 34 + (i % 3);
    baseAqi = 40 + (i % 12);
    weather = i % 3 === 0 ? 'sunny' : 'partly_cloudy';
    humidity = 55 + (i % 8);
    wind = 14 + (i % 4);
    windDir = 'NE';
  } else if (reg === 'southern') {
    baseTemp = 30 + (i % 2);
    baseAqi = 22 + (i % 12);
    weather = i % 2 === 0 ? 'rain_light' : 'rain_heavy';
    humidity = 78 + (i % 7);
    wind = 16 + (i % 6);
    windDir = 'W';
  } else if (reg === 'eastern') {
    baseTemp = 32 + (i % 2);
    baseAqi = 45 + (i % 10);
    weather = i % 2 === 0 ? 'cloudy' : 'partly_cloudy';
    humidity = 70 + (i % 6);
    wind = 13 + (i % 4);
    windDir = 'S';
  } else {
    // central
    baseTemp = 33 + (i % 3);
    baseAqi = 50 + (i % 15);
    weather = i % 3 === 0 ? 'sunny' : 'partly_cloudy';
    humidity = 66 + (i % 6);
    wind = 11 + (i % 3);
    windDir = 'SW';
  }

  const pm25 = Math.round((baseAqi * 0.32) * 10) / 10;
  const feelsLike = Math.round(baseTemp + (humidity > 65 ? 4 : 2));

  let alert = undefined;
  if (p.key === 'bangkok') {
    alert = {
      level: 'advisory',
      titleTh: 'แจ้งเตือนสภาพอากาศ: ฝนฟ้าคะนองร้อยละ 40 ของพื้นที่',
      titleEn: 'Weather Advisory: 40% Chance of Thunderstorms',
      descTh: 'ลมตะวันตกเฉียงใต้พัดปกคลุมอ่าวไทยและภาคกลาง อาจมีลมกระโชกแรงช่วง 15:00 - 18:00 น.',
      descEn: 'Southwesterly wind prevails over Gulf of Thailand and Central plains. Gusts expected between 15:00 - 18:00.',
      sourceTh: 'กรมอุตุนิยมวิทยา (TMD Thailand)',
      sourceEn: 'Thai Meteorological Department (TMD)',
    };
  } else if (p.key === 'chiang mai') {
    alert = {
      level: 'watch',
      titleTh: 'เฝ้าระวังน้ำป่าไหลหลากบริเวณเชิงเขา',
      titleEn: 'Flash Flood Watch in Foothill Areas',
      descTh: 'ฝนตกสะสมต่อเนื่องในเขตภูเขาและดอยสุเทพ ประชาชนควรระมัดระวังเส้นทางสัญจร',
      descEn: 'Continuous rainfall along mountain slopes. Drivers should take caution on winding roads.',
      sourceTh: 'ศูนย์อุตุนิยมวิทยาภาคเหนือ',
      sourceEn: 'Northern Meteorological Center',
    };
  } else if (p.key === 'phuket') {
    alert = {
      level: 'warning',
      titleTh: 'เตือนภัยคลื่นลมแรงบริเวณทะเลอันดามัน',
      titleEn: 'Strong Wind and High Waves Warning in Andaman Sea',
      descTh: 'คลื่นลมทะเลอันดามันมีคลื่นสูง 2-3 เมตร บริเวณที่มีฝนฟ้าคะนองคลื่นสูงมากกว่า 3 เมตร เรือเล็กควรงดออกจากฝั่ง',
      descEn: 'Waves 2-3 meters high in Andaman Sea; above 3m in stormy areas. Small boats should remain ashore.',
      sourceTh: 'กรมอุตุนิยมวิทยา ศูนย์ภูเก็ต',
      sourceEn: 'TMD Southern Weather Station Phuket',
    };
  }

  return {
    key: p.key,
    th: p.nameTh,
    en: p.nameEn,
    districtTh: p.key === 'bangkok' ? 'เขตพระนคร' : 'อำเภอเมือง' + p.nameTh,
    districtEn: p.key === 'bangkok' ? 'Phra Nakhon' : 'Mueang ' + p.nameEn,
    region: p.region,
    lat: p.lat,
    lon: p.lon,
    temp: baseTemp,
    tempMin: baseTemp - 7,
    tempMax: baseTemp + 3,
    feelsLike: feelsLike,
    humidity: humidity,
    wind: wind,
    windDirection: windDir,
    windGust: wind + 10,
    pressure: 1010 + (i % 4),
    visibility: 9.0 + ((i % 10) / 10),
    dewPoint: Math.round((baseTemp - 8) * 10) / 10,
    uvIndex: reg === 'southern' ? 8 : reg === 'northeastern' ? 10 : 9,
    rainChance: weather.includes('rain') ? 65 : 30,
    rainfallToday: weather.includes('rain') ? 5.5 : 0.0,
    sunrise: '06:' + String(8 + (i % 10)).padStart(2, '0'),
    sunset: '18:' + String(20 + (i % 10)).padStart(2, '0'),
    aqi: baseAqi,
    pm25: pm25,
    weather: weather,
    pollutants: {
      pm25: pm25,
      pm10: Math.round(pm25 * 2.1 * 10) / 10,
      o3: Math.round(20 + (i % 15)),
      no2: Math.round(10 + (i % 10)),
      so2: Math.round(2 + (i % 4)),
      co: Math.round((0.3 + ((i % 5) / 10)) * 10) / 10,
    },
    alert: alert,
    sevenDayForecast: [
      { dayNameTh: 'วันนี้', dayNameEn: 'Today', date: '20 ก.ย.', weather: weather, tempMin: baseTemp - 7, tempMax: baseTemp + 3, rainChance: weather.includes('rain') ? 60 : 30 },
      { dayNameTh: 'พรุ่งนี้', dayNameEn: 'Tomorrow', date: '21 ก.ย.', weather: 'partly_cloudy', tempMin: baseTemp - 7, tempMax: baseTemp + 3, rainChance: 40 },
      { dayNameTh: 'พ.', dayNameEn: 'Wed', date: '22 ก.ย.', weather: 'rain_light', tempMin: baseTemp - 8, tempMax: baseTemp + 2, rainChance: 55 },
      { dayNameTh: 'พฤ.', dayNameEn: 'Thu', date: '23 ก.ย.', weather: 'sunny', tempMin: baseTemp - 7, tempMax: baseTemp + 4, rainChance: 25 },
      { dayNameTh: 'ศ.', dayNameEn: 'Fri', date: '24 ก.ย.', weather: 'sunny', tempMin: baseTemp - 6, tempMax: baseTemp + 4, rainChance: 20 },
      { dayNameTh: 'ส.', dayNameEn: 'Sat', date: '25 ก.ย.', weather: 'partly_cloudy', tempMin: baseTemp - 6, tempMax: baseTemp + 3, rainChance: 30 },
      { dayNameTh: 'อา.', dayNameEn: 'Sun', date: '26 ก.ย.', weather: 'sunny', tempMin: baseTemp - 6, tempMax: baseTemp + 4, rainChance: 15 },
    ],
    hourly: [
      { time: '00:00', temp: baseTemp - 5, aqi: baseAqi - 5, rainChance: 15, wind: Math.max(4, wind - 4), weather: weather },
      { time: '03:00', temp: baseTemp - 6, aqi: baseAqi - 6, rainChance: 15, wind: Math.max(4, wind - 5), weather: weather },
      { time: '06:00', temp: baseTemp - 6, aqi: baseAqi, rainChance: 20, wind: Math.max(4, wind - 3), weather: 'partly_cloudy' },
      { time: '09:00', temp: baseTemp - 2, aqi: baseAqi + 6, rainChance: 25, wind: wind, weather: 'sunny' },
      { time: '12:00', temp: baseTemp + 2, aqi: baseAqi + 4, rainChance: 35, wind: wind + 2, weather: weather },
      { time: '15:00', temp: baseTemp + 3, aqi: baseAqi, rainChance: 45, wind: wind + 3, weather: weather },
      { time: '18:00', temp: baseTemp - 1, aqi: baseAqi - 4, rainChance: 30, wind: wind, weather: 'partly_cloudy' },
      { time: '21:00', temp: baseTemp - 3, aqi: baseAqi - 3, rainChance: 20, wind: Math.max(4, wind - 2), weather: 'partly_cloudy' },
    ],
    lifestyle: {
      running: { score: 7, labelTh: 'ดี', labelEn: 'Good', descTh: 'เหมาะวิ่งช่วงเช้าตรู่ 05:30-07:30 น.', descEn: 'Best for morning runs (05:30-07:30).' },
      laundry: { score: 8, labelTh: 'ดีมาก', labelEn: 'Very Good', descTh: 'แดดแรง ผ้าแห้งไว', descEn: 'Strong sunlight, clothes dry fast.' },
      carWash: { score: 7, labelTh: 'ดี', labelEn: 'Good', descTh: 'โอกาสฝนปานกลาง ล้างรถได้', descEn: 'Moderate rain risk.' },
      sunscreen: { score: 9, labelTh: 'จำเป็น', labelEn: 'Required', descTh: 'ทาครีมกันแดด SPF 50+ สม่ำเสมอ', descEn: 'Apply SPF 50+ sunscreen.' },
    },
  };
}

const allCities = rawProvinces.map(generateCity);

const fileHeader = `export type Lang = "th" | "en"

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

export const DEMO_CITIES: City[] = `;

const fileFooter = `

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
  const hours = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
  const tempCurve = [-4, -5, -3, 1, 3, 2, -1, -3]
  const aqiCurve = [4, 6, 8, 2, -4, -2, 2, 4]
  return hours.map((time, i) => ({
    time,
    temp: Math.round(city.temp + tempCurve[i]),
    aqi: Math.max(0, Math.round(city.aqi + aqiCurve[i])),
    rainChance: Math.max(0, Math.min(100, Math.round(city.rainChance + (i % 2 === 0 ? 5 : -5)))),
    wind: city.wind,
    weather: city.weather,
  }))
}

export function getThailandRankings(cities: City[]) {
  const sorted = [...cities].sort((a, b) => a.aqi - b.aqi)
  const cleanest = sorted.slice(0, 5)
  const polluted = [...sorted].reverse().slice(0, 5)
  return { cleanest, polluted }
}
`;

const outputContent = fileHeader + JSON.stringify(allCities, null, 2) + fileFooter;
fs.writeFileSync('C:/Users/tonkla/Downloads/weather-aqi-sense-ui-mockup/lib/weather-data.ts', outputContent, 'utf8');
console.log('Successfully generated weather-data.ts with all ' + allCities.length + ' provinces!');
