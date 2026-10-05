"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle2, ShieldQuestion } from "lucide-react"
import type { City, Lang } from "@/lib/weather-data"
import { UI, pick, QUICK_ACTIONS, type QuickAction } from "@/lib/i18n"
import { cardClass } from "./card"

export function QuickActions({ city, lang }: { city: City; lang: Lang }) {
  const [active, setActive] = useState<QuickAction | null>(null)

  useEffect(() => {
    if (!active) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  const response = active ? active.answer(city, lang) : null

  return (
    <section className={cardClass}>
      <div className="flex items-center gap-2 text-[#5f6368] mb-3">
        <ShieldQuestion size={16} strokeWidth={2} />
        <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.quickAsk, lang)}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((qa) => (
          <button
            key={qa.id}
            type="button"
            onClick={() => setActive(qa)}
            className="rounded-full border border-[#dadce0] bg-white px-3 py-1.5 text-xs font-medium text-[#3c4043] shadow-sm transition hover:border-[#1a73e8] hover:bg-[#f8fafd] hover:text-[#1a73e8]"
          >
            {pick(qa.label, lang)}
          </button>
        ))}
      </div>

      {active && response && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(32,33,36,0.4)" }}
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6"
            style={{ boxShadow: "0 12px 36px rgba(0,0,0,0.22)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#f1f3f4] pb-3">
              <div>
                <span className="rounded-full bg-[#e8f0fe] px-2 py-0.5 text-[11px] font-semibold text-[#1a73e8]">
                  {lang === "th" ? "คำแนะนำสุขภาพ" : "Health Guidance"}
                </span>
                <h4 className="mt-1 text-base font-bold text-[#202124]">{response.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={pick(UI.close, lang)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4]"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5f6368]">
              {response.summary}
            </p>

            <div className="mt-4 rounded-xl border border-[#e8eaed] bg-[#f8f9fa] p-3.5">
              <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#202124]">
                {lang === "th" ? "ข้อปฏิบัติแนะนำ" : "Key Action Points"}
              </h5>
              <ul className="space-y-2">
                {response.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-snug text-[#3c4043]">
                    <CheckCircle2 size={15} className="shrink-0 text-[#34a853] mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-xl bg-[#1a73e8] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1557b0]"
              >
                {pick(UI.close, lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
