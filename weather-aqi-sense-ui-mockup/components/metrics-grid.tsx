import type { City, Lang } from "@/lib/weather-data"
import { UI, pick, uvDescription } from "@/lib/i18n"
import { cardClass } from "./card"
import {
  Sun,
  Sunrise,
  Sunset,
  Wind,
  Droplets,
  Gauge,
  Eye,
  CloudRain,
  Flame,
} from "lucide-react"

export function MetricsGrid({ city, lang }: { city: City; lang: Lang }) {
  const uvInfo = uvDescription(city.uvIndex, lang)

  return (
    <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      {/* 1. UV Index */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center justify-between text-[#5f6368]">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <Sun size={15} strokeWidth={2} />
            {pick(UI.uvIndex, lang)}
          </span>
          <span className="text-[11px] font-medium text-[#1a73e8]">{uvInfo.level}</span>
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#202124]">{city.uvIndex}</span>
          <span className="ml-1 text-xs text-[#80868b]">/ 12</span>
        </div>
        <p className="text-[11px] leading-snug text-[#5f6368]">{uvInfo.advice}</p>
      </div>

      {/* 2. Sunrise & Sunset */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#5f6368]">
          <Sunrise size={15} strokeWidth={2} />
          {lang === "th" ? "ดวงอาทิตย์" : "Sun Times"}
        </div>
        <div className="my-2 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#80868b]">{pick(UI.sunrise, lang)}</span>
            <span className="text-sm font-semibold text-[#202124]">{city.sunrise} น.</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#80868b]">{pick(UI.sunset, lang)}</span>
            <span className="text-sm font-semibold text-[#202124]">{city.sunset} น.</span>
          </div>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {lang === "th" ? "เวลากลางวัน ~12 ชม. 16 นาที" : "Daylight ~12h 16m"}
        </p>
      </div>

      {/* 3. Wind & Gusts */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center justify-between text-[#5f6368]">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <Wind size={15} strokeWidth={2} />
            {pick(UI.wind, lang)}
          </span>
          <span className="rounded bg-[#f1f3f4] px-1.5 py-0.5 text-[10px] font-semibold text-[#5f6368]">
            {city.windDirection}
          </span>
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#202124]">{city.wind}</span>
          <span className="ml-1 text-xs text-[#5f6368]">km/h</span>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {pick(UI.windGust, lang)}: <strong className="text-[#202124]">{city.windGust} km/h</strong>
        </p>
      </div>

      {/* 4. Humidity & Dew Point */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center justify-between text-[#5f6368]">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <Droplets size={15} strokeWidth={2} />
            {pick(UI.humidity, lang)}
          </span>
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#202124]">{city.humidity}</span>
          <span className="ml-1 text-xs text-[#5f6368]">%</span>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {pick(UI.dewPoint, lang)}: <strong className="text-[#202124]">{city.dewPoint}°C</strong>
        </p>
      </div>

      {/* 5. Rain Chance & Precipitation */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#5f6368]">
          <CloudRain size={15} strokeWidth={2} />
          {pick(UI.rainChance, lang)}
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#1a73e8]">{city.rainChance}</span>
          <span className="ml-1 text-xs text-[#1a73e8]">%</span>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {pick(UI.rainfall, lang)}: <strong className="text-[#202124]">{city.rainfallToday} mm</strong>
        </p>
      </div>

      {/* 6. Heat Index (RealFeel) */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center justify-between text-[#5f6368]">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            <Flame size={15} strokeWidth={2} />
            {pick(UI.feelsLike, lang)}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
              city.feelsLike >= 38 ? "bg-[#fad2cf] text-[#c5221f]" : "bg-[#e6f4ea] text-[#137333]"
            }`}
          >
            {city.feelsLike >= 38 ? (lang === "th" ? "ระวังลมแดด" : "High Heat") : (lang === "th" ? "ปกติ" : "Comfort")}
          </span>
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#ea4335]">{city.feelsLike}</span>
          <span className="ml-1 text-xs text-[#ea4335]">°C</span>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {lang === "th" ? "ดัชนีความร้อนสะสมที่ร่างกายรู้สึกจริง" : "Effective perceived temperature index"}
        </p>
      </div>

      {/* 7. Barometric Pressure */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#5f6368]">
          <Gauge size={15} strokeWidth={2} />
          {pick(UI.pressure, lang)}
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#202124]">{city.pressure}</span>
          <span className="ml-1 text-xs text-[#5f6368]">hPa</span>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {lang === "th" ? "ความกดอากาศระดับน้ำทะเลปานกลาง" : "Mean sea-level atmospheric pressure"}
        </p>
      </div>

      {/* 8. Visibility */}
      <div className={`${cardClass} flex flex-col justify-between p-4`}>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#5f6368]">
          <Eye size={15} strokeWidth={2} />
          {pick(UI.visibility, lang)}
        </div>
        <div className="my-2">
          <span className="text-3xl font-light tracking-tight text-[#202124]">{city.visibility}</span>
          <span className="ml-1 text-xs text-[#5f6368]">km</span>
        </div>
        <p className="text-[11px] text-[#5f6368]">
          {city.visibility >= 9 ? (lang === "th" ? "ทัศนวิสัยแจ่มใส มองเห็นได้ชัดเจน" : "Clear visibility") : (lang === "th" ? "มีหมอกควันบางพื้นที่" : "Hazy atmosphere")}
        </p>
      </div>
    </section>
  )
}
