import { HeartPulse, ShieldAlert, CheckCircle2 } from "lucide-react"
import type { City, Lang } from "@/lib/weather-data"
import { UI, pick, healthSummary } from "@/lib/i18n"
import { aqiBand, AQI_COLORS } from "@/lib/weather-data"
import { cardClass } from "./card"

export function HealthAdvisory({ city, lang }: { city: City; lang: Lang }) {
  const band = aqiBand(city.aqi)
  const isHealthy = band === "good"

  return (
    <section className={cardClass}>
      <div className="flex items-center justify-between border-b border-[#f1f3f4] pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#1a73e8]">
            <HeartPulse size={18} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.healthAdvisory, lang)}</h3>
            <span className="text-[11px] text-[#80868b]">
              {lang === "th" ? "ประเมินผลตามดัชนีสุขภาพกรมอนามัย" : "Health Intelligence Engine"}
            </span>
          </div>
        </div>

        <span
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            backgroundColor: isHealthy ? "#e6f4ea" : "#fef7e0",
            color: isHealthy ? "#137333" : "#b06000",
          }}
        >
          {isHealthy ? <CheckCircle2 size={13} /> : <ShieldAlert size={13} />}
          {isHealthy ? (lang === "th" ? "อากาศปลอดภัย" : "Safe Air") : (lang === "th" ? "ควรระวัง" : "Caution")}
        </span>
      </div>

      <div className="mt-3.5 rounded-xl border border-[#e8eaed] bg-[#f8f9fa] p-3.5">
        <p className="text-xs sm:text-sm leading-relaxed text-[#3c4043]">
          {healthSummary(city, lang)}
        </p>
      </div>
    </section>
  )
}
