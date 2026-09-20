import type { City, Lang } from "@/lib/weather-data"
import { UI, pick } from "@/lib/i18n"
import { cardClass } from "./card"
import { Activity } from "lucide-react"

export function PollutantBreakdown({ city, lang }: { city: City; lang: Lang }) {
  const p = city.pollutants
  if (!p) return null

  const items = [
    { name: "PM2.5", value: p.pm25.toFixed(1), unit: "µg/m³", maxStandard: 37.5, descTh: "ฝุ่นละอองขนาดเล็กมาก", descEn: "Fine particulate matter" },
    { name: "PM10", value: p.pm10.toFixed(1), unit: "µg/m³", maxStandard: 120, descTh: "ฝุ่นละอองขนาดไม่เกิน 10 ไมครอน", descEn: "Respirable particulate" },
    { name: "O₃", value: p.o3.toFixed(0), unit: "ppb", maxStandard: 70, descTh: "ก๊าซโอโซนระดับผิวดิน", descEn: "Ground-level ozone" },
    { name: "NO₂", value: p.no2.toFixed(0), unit: "ppb", maxStandard: 170, descTh: "ไนโตรเจนไดออกไซด์ (ควันรถ)", descEn: "Nitrogen dioxide" },
    { name: "SO₂", value: p.so2.toFixed(0), unit: "ppb", maxStandard: 100, descTh: "ซัลเฟอร์ไดออกไซด์ (โรงงาน)", descEn: "Sulfur dioxide" },
    { name: "CO", value: p.co.toFixed(1), unit: "ppm", maxStandard: 9.0, descTh: "คาร์บอนมอนอกไซด์", descEn: "Carbon monoxide" },
  ]

  return (
    <section className={cardClass}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#5f6368]">
          <Activity size={17} strokeWidth={2} />
          <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.pollutantsTitle, lang)}</h3>
        </div>
        <span className="rounded bg-[#f1f3f4] px-2 py-0.5 text-[11px] font-medium text-[#5f6368]">
          {lang === "th" ? "เกณฑ์มาตรฐาน สธ." : "WHO / PCD Standards"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
        {items.map((item) => {
          const num = parseFloat(item.value)
          const isOver = num > item.maxStandard
          const isWarning = num > item.maxStandard * 0.75

          return (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-xl border border-[#e8eaed] bg-[#f8f9fa] p-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#202124]">{item.name}</span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOver ? "bg-[#ea4335]" : isWarning ? "bg-[#fbbc04]" : "bg-[#34a853]"
                  }`}
                />
              </div>

              <div className="my-1.5">
                <span className="text-lg font-semibold tracking-tight text-[#202124]">{item.value}</span>
                <span className="ml-1 text-[10px] text-[#80868b]">{item.unit}</span>
              </div>

              <div className="border-t border-[#e0e0e0] pt-1">
                <span className="block text-[10px] text-[#5f6368] truncate">
                  {lang === "th" ? item.descTh : item.descEn}
                </span>
                <span className="text-[9px] text-[#9aa0a6]">
                  {lang === "th" ? `เกณฑ์: <${item.maxStandard}` : `Limit: <${item.maxStandard}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
