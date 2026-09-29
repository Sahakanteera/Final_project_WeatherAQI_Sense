import type { City, Lang } from "@/lib/weather-data"
import { UI, pick } from "@/lib/i18n"
import { cardClass } from "./card"
import { WeatherIcon } from "./weather-icon"
import { Droplets, CalendarDays } from "lucide-react"

export function Forecast7Day({ city, lang }: { city: City; lang: Lang }) {
  const forecast = city.sevenDayForecast || []
  if (!forecast.length) return null

  // Calculate absolute min & max across 7 days to calibrate bar widths
  const allMins = forecast.map((f) => f.tempMin)
  const allMaxs = forecast.map((f) => f.tempMax)
  const lowest = Math.min(...allMins)
  const highest = Math.max(...allMaxs)
  const range = highest - lowest || 1

  return (
    <section className={cardClass}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#5f6368]">
          <CalendarDays size={17} strokeWidth={2} />
          <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.sevenDayTitle, lang)}</h3>
        </div>
        <span className="text-xs text-[#80868b]">{lang === "th" ? "พยากรณ์รายสัปดาห์" : "Weekly Outlook"}</span>
      </div>

      <div className="divide-y divide-[#f1f3f4]">
        {forecast.map((d, idx) => {
          const dayTitle = lang === "th" ? d.dayNameTh : d.dayNameEn
          const leftPercent = ((d.tempMin - lowest) / range) * 100
          const barWidthPercent = ((d.tempMax - d.tempMin) / range) * 100

          return (
            <div key={d.date} className="flex items-center justify-between py-2.5 text-xs sm:text-sm">
              {/* Day title & date */}
              <div className="w-24 shrink-0 sm:w-28">
                <span className={`block font-medium ${idx === 0 ? "text-[#1a73e8]" : "text-[#202124]"}`}>
                  {dayTitle}
                </span>
                <span className="text-[11px] text-[#80868b]">
                  {(() => {
                    // d.date is either '24/9' from api or '24 ก.ย.' from mock
                    let day = "", month = "";
                    if (d.date.includes("/")) {
                      const parts = d.date.split("/");
                      day = parts[0];
                      const mIndex = parseInt(parts[1]) - 1;
                      const thM = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
                      const enM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      month = lang === "th" ? thM[mIndex] : enM[mIndex];
                    } else {
                      // fallback for mock string '24 ก.ย.'
                      day = d.date.split(" ")[0];
                      month = lang === "th" ? d.date.split(" ")[1] : "Sep";
                    }
                    return `${day} ${month}`;
                  })()}
                </span>
              </div>

              {/* Weather icon & rain probability */}
              <div className="flex w-24 shrink-0 items-center gap-2 sm:w-28">
                <WeatherIcon kind={d.weather} size={22} strokeWidth={1.5} />
                {d.rainChance > 20 ? (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-[#1a73e8]">
                    <Droplets size={12} strokeWidth={2} />
                    {d.rainChance}%
                  </span>
                ) : (
                  <span className="text-xs text-[#9aa0a6]">-</span>
                )}
              </div>

              {/* Temperature range bar */}
              <div className="flex flex-1 items-center gap-2 sm:gap-3">
                <span className="w-7 text-right text-xs text-[#5f6368] tabular-nums">{d.tempMin}°</span>
                <div className="relative h-1.5 flex-1 rounded-full bg-[#e8eaed]">
                  <div
                    className="absolute top-0 h-full rounded-full"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${Math.max(15, barWidthPercent)}%`,
                      background: "linear-gradient(90deg, #4285f4 0%, #fbbc04 60%, #ea4335 100%)",
                    }}
                  />
                </div>
                <span className="w-7 text-left text-xs font-semibold text-[#202124] tabular-nums">{d.tempMax}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
