import type { City, Lang } from "@/lib/weather-data"
import { UI, pick } from "@/lib/i18n"
import { cardClass } from "./card"
import { Footprints, Shirt, Car, ShieldAlert, Sparkles } from "lucide-react"

export function LifestyleIndex({ city, lang }: { city: City; lang: Lang }) {
  const { lifestyle } = city
  if (!lifestyle) return null

  const items = [
    {
      icon: Footprints,
      titleTh: "การออกกำลังกายกลางแจ้ง",
      titleEn: "Outdoor Running",
      data: lifestyle.running,
      badgeColor: lifestyle.running.score >= 7 ? "bg-[#e6f4ea] text-[#137333]" : "bg-[#fef7e0] text-[#b06000]",
    },
    {
      icon: Shirt,
      titleTh: "การซักผ้า-ตากผ้า",
      titleEn: "Laundry Drying",
      data: lifestyle.laundry,
      badgeColor: lifestyle.laundry.score >= 7 ? "bg-[#e6f4ea] text-[#137333]" : "bg-[#fce8e6] text-[#c5221f]",
    },
    {
      icon: Car,
      titleTh: "การล้างรถ",
      titleEn: "Car Wash",
      data: lifestyle.carWash,
      badgeColor: lifestyle.carWash.score >= 7 ? "bg-[#e6f4ea] text-[#137333]" : "bg-[#fef7e0] text-[#b06000]",
    },
    {
      icon: ShieldAlert,
      titleTh: "การป้องกันแสงแดด",
      titleEn: "Sun Protection",
      data: lifestyle.sunscreen,
      badgeColor: lifestyle.sunscreen.score >= 8 ? "bg-[#fad2cf] text-[#a50e0e]" : "bg-[#e6f4ea] text-[#137333]",
    },
  ]

  return (
    <section className={cardClass}>
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#5f6368]">
          <Sparkles size={17} strokeWidth={2} className="text-[#1a73e8]" />
          <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.lifestyleTitle, lang)}</h3>
        </div>
        <span className="text-xs text-[#80868b]">{lang === "th" ? "คำแนะนำประจำวัน" : "Daily Insights"}</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {items.map((it) => (
          <div
            key={it.titleEn}
            className="flex items-start gap-3 rounded-xl border border-[#e8eaed] bg-[#f8f9fa] p-3 transition hover:border-[#dadce0]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#e8eaed] text-[#1a73e8]">
              <it.icon size={18} strokeWidth={1.75} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-semibold text-[#202124]">
                  {lang === "th" ? it.titleTh : it.titleEn}
                </h4>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${it.badgeColor}`}>
                  {lang === "th" ? it.data.labelTh : it.data.labelEn}
                </span>
              </div>

              <p className="mt-1 text-xs leading-relaxed text-[#5f6368]">
                {lang === "th" ? it.data.descTh : it.data.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
