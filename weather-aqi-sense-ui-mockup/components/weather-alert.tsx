"use client"

import { useState } from "react"
import { AlertTriangle, Info, ChevronRight, X, ShieldAlert } from "lucide-react"
import type { City, Lang } from "@/lib/weather-data"

export function WeatherAlertBanner({ city, lang }: { city: City; lang: Lang }) {
  const [dismissed, setDismissed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (!city.alert || dismissed) return null

  const { alert } = city
  const isWarning = alert.level === "warning"
  const title = lang === "th" ? alert.titleTh : alert.titleEn
  const desc = lang === "th" ? alert.descTh : alert.descEn
  const source = lang === "th" ? alert.sourceTh : alert.sourceEn

  return (
    <aside
      role="alert"
      className={`relative mb-5 overflow-hidden rounded-2xl border transition-all ${
        isWarning
          ? "border-[#fce8e6] bg-[#fef7f6] text-[#c5221f]"
          : "border-[#fef7e0] bg-[#fefaf0] text-[#b06000]"
      }`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-start justify-between gap-3 p-3.5 sm:p-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isWarning ? "bg-[#ea4335] text-white" : "bg-[#f9ab00] text-white"
            }`}
          >
            {isWarning ? <ShieldAlert size={20} strokeWidth={2} /> : <AlertTriangle size={19} strokeWidth={2} />}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                  isWarning ? "bg-[#fad2cf] text-[#a50e0e]" : "bg-[#feefc3] text-[#762700]"
                }`}
              >
                {lang === "th" ? "ประกาศทางการ" : "Official Alert"}
              </span>
              <h4 className="text-sm font-semibold leading-snug">{title}</h4>
            </div>

            <p className="mt-1 text-xs leading-relaxed text-[#5f6368] sm:text-[13px]">{desc}</p>

            <div className="mt-2 flex items-center gap-2 text-[11px] text-[#80868b]">
              <Info size={12} strokeWidth={1.75} />
              <span>{source}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-lg p-1 text-[#80868b] transition hover:bg-black/5 hover:text-[#202124]"
          aria-label={lang === "th" ? "ปิดการแจ้งเตือน" : "Dismiss alert"}
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  )
}
