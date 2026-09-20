import { Droplets, Wind, Thermometer, ArrowUp, ArrowDown, MapPin, Clock } from "lucide-react"
import type { City, Lang } from "@/lib/weather-data"
import { UI, pick, cityName, districtName, WEATHER_LABELS } from "@/lib/i18n"
import { WeatherIcon } from "./weather-icon"
import { cardClass } from "./card"

export function WeatherCard({ city, lang }: { city: City; lang: Lang }) {
  const stats = [
    { icon: Thermometer, label: pick(UI.feelsLike, lang), value: `${city.feelsLike}°C` },
    { icon: Droplets, label: pick(UI.humidity, lang), value: `${city.humidity}%` },
    { icon: Wind, label: pick(UI.wind, lang), value: `${city.wind} km/h ${city.windDirection}` },
  ]

  return (
    <section className={cardClass}>
      {/* Location, District & Time header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#f1f3f4] pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-[#1a73e8] font-medium mb-1">
            <MapPin size={14} />
            <span>{districtName(city, lang)}</span>
          </div>
          <h2 className="truncate text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
            {cityName(city, lang)}
          </h2>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-xs text-[#80868b]">
            <Clock size={12} />
            <span>{lang === "th" ? "พฤ. 20 ก.ย. • 15:30 น." : "Thu 20 Sep • 15:30"}</span>
          </div>
          <span className="inline-block mt-1 rounded-full bg-[#e8f0fe] px-2.5 py-0.5 text-[11px] font-semibold text-[#1a73e8]">
            {lang === "th" ? "สถานีตรวจวัดอัตโนมัติ" : "Automatic Weather Station"}
          </span>
        </div>
      </div>

      {/* Main Temperature & Big Icon */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl sm:text-7xl font-light tracking-tight text-[#202124]">{city.temp}</span>
            <span className="text-3xl font-light text-[#5f6368]">°C</span>
          </div>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#202124]">
            {pick(WEATHER_LABELS[city.weather], lang)}
          </p>

          <div className="mt-1.5 flex items-center gap-3 text-xs text-[#5f6368]">
            <span className="flex items-center gap-0.5">
              <ArrowUp size={13} className="text-[#ea4335]" />
              {lang === "th" ? "สูงสุด" : "H"}: <strong className="text-[#202124] ml-0.5">{city.tempMax}°</strong>
            </span>
            <span className="flex items-center gap-0.5">
              <ArrowDown size={13} className="text-[#1a73e8]" />
              {lang === "th" ? "ต่ำสุด" : "L"}: <strong className="text-[#202124] ml-0.5">{city.tempMin}°</strong>
            </span>
          </div>
        </div>

        <div className="shrink-0 p-2">
          <WeatherIcon kind={city.weather} size={68} strokeWidth={1.25} />
        </div>
      </div>

      {/* Inline Sub-metrics */}
      <div className="mt-5 grid grid-cols-3 gap-2.5 border-t border-[#f1f3f4] pt-3.5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-[#5f6368]">
              <s.icon size={14} strokeWidth={1.75} aria-hidden="true" />
              <span className="text-xs truncate">{s.label}</span>
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#202124]">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
