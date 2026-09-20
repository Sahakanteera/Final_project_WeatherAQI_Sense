import type { City, Lang } from "@/lib/weather-data"
import { aqiBand, AQI_COLORS } from "@/lib/weather-data"
import { UI, pick, cityName } from "@/lib/i18n"
import { cardClass } from "./card"

interface OtherCitiesProps {
  cities: City[]
  activeKey: string
  lang: Lang
  onSelect: (key: string) => void
}

export function OtherCities({ cities, activeKey, lang, onSelect }: OtherCitiesProps) {
  return (
    <section className={cardClass}>
      <h3 className="mb-2 text-sm font-medium text-[#202124]">{pick(UI.otherProvinces, lang)}</h3>
      <ul className="divide-y divide-[#f1f3f4]">
        {cities.map((c) => {
          const active = c.key === activeKey
          return (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => onSelect(c.key)}
                aria-current={active ? "true" : undefined}
                className={`flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left transition-colors ${
                  active ? "bg-[#e8f0fe]" : "hover:bg-[#f8f9fa]"
                }`}
              >
                <span
                  className={`truncate text-sm ${active ? "font-medium text-[#1a73e8]" : "text-[#202124]"}`}
                >
                  {cityName(c, lang)}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-sm text-[#5f6368]">{c.temp}°</span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: AQI_COLORS[aqiBand(c.aqi)] }}
                      aria-hidden="true"
                    />
                    <span className="w-6 text-right text-sm tabular-nums text-[#202124]">{c.aqi}</span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
