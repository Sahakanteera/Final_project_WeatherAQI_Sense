import type { City, Lang } from "@/lib/weather-data"
import { aqiBand, AQI_COLORS, aqiPercent } from "@/lib/weather-data"
import { UI, pick, AQI_LABELS, aqiHint } from "@/lib/i18n"
import { cardClass } from "./card"

export function AqiCard({ city, lang }: { city: City; lang: Lang }) {
  const band = aqiBand(city.aqi)
  const color = AQI_COLORS[band]
  const percent = aqiPercent(city.aqi)

  return (
    <section className={cardClass}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#5f6368]">{pick(UI.airQuality, lang)}</h3>
        <span className="text-xs text-[#80868b]">AQI</span>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-4xl font-semibold tracking-tight text-[#202124]">{city.aqi}</span>
        <span className="text-base font-medium" style={{ color }}>
          {pick(AQI_LABELS[band], lang)}
        </span>
      </div>

      {/* Scale bar */}
      <div className="mt-4">
        <div
          className="relative h-2 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #34a853 0%, #34a853 25%, #fbbc04 50%, #ff8c00 75%, #ea4335 100%)",
          }}
        >
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white"
            style={{ left: `${percent}%`, boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
          >
            <span className="block h-full w-full rounded-full" style={{ backgroundColor: color }} />
          </div>
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[#80868b]">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200+</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#f1f3f4] pt-3">
        <span className="text-xs text-[#5f6368]">PM2.5</span>
        <span className="text-sm font-medium text-[#202124]">
          {city.pm25.toFixed(1)} <span className="text-xs font-normal text-[#5f6368]">µg/m³</span>
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[#5f6368]">{aqiHint(band, lang)}</p>
    </section>
  )
}
