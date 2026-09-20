"use client"

import { useState } from "react"
import type { City, Lang, ThaiRegion } from "@/lib/weather-data"
import { aqiBand, AQI_COLORS } from "@/lib/weather-data"
import { UI, pick, cityName, REGION_NAMES } from "@/lib/i18n"
import { cardClass } from "./card"
import { MapPin, Trophy, ShieldCheck, Flame } from "lucide-react"

interface ThailandRankingsProps {
  cities: City[]
  activeKey: string
  lang: Lang
  onSelect: (key: string) => void
}

export function ThailandRankings({ cities, activeKey, lang, onSelect }: ThailandRankingsProps) {
  const [selectedRegion, setSelectedRegion] = useState<ThaiRegion | "all">("all")

  // Filter cities by region
  const filteredCities = selectedRegion === "all"
    ? cities
    : cities.filter((c) => c.region === selectedRegion)

  // Rank cities
  const sortedByCleanest = [...cities].sort((a, b) => a.aqi - b.aqi).slice(0, 3)
  const sortedByPolluted = [...cities].sort((a, b) => b.aqi - a.aqi).slice(0, 3)

  const regions: (ThaiRegion | "all")[] = ["all", "central", "northern", "northeastern", "eastern", "southern"]

  return (
    <section className={cardClass}>
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[#5f6368]">
          <MapPin size={17} strokeWidth={2} className="text-[#1a73e8]" />
          <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.rankingsTitle, lang)}</h3>
        </div>
        <span className="text-xs text-[#80868b]">{lang === "th" ? "อัปเดตรายชั่วโมง" : "Hourly Synced"}</span>
      </div>

      {/* Top 3 Cleanest vs Highest AQI Cards */}
      <div className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {/* Cleanest */}
        <div className="rounded-xl border border-[#ceead6] bg-[#f6fbf7] p-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#137333]">
            <ShieldCheck size={16} />
            <span>{pick(UI.cleanestAir, lang)}</span>
          </div>
          <div className="space-y-1.5">
            {sortedByCleanest.map((c, i) => (
              <button
                key={c.key}
                type="button"
                onClick={() => onSelect(c.key)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-xs transition hover:bg-white/80"
              >
                <span className="flex items-center gap-2 text-[#202124]">
                  <span className="font-bold text-[#137333]">#{i + 1}</span>
                  <span>{cityName(c, lang)}</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#137333]">
                  <span>AQI {c.aqi}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Highest AQI */}
        <div className="rounded-xl border border-[#feefc3] bg-[#fefaf0] p-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#b06000]">
            <Flame size={16} />
            <span>{pick(UI.mostPolluted, lang)}</span>
          </div>
          <div className="space-y-1.5">
            {sortedByPolluted.map((c, i) => (
              <button
                key={c.key}
                type="button"
                onClick={() => onSelect(c.key)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-xs transition hover:bg-white/80"
              >
                <span className="flex items-center gap-2 text-[#202124]">
                  <span className="font-bold text-[#b06000]">#{i + 1}</span>
                  <span>{cityName(c, lang)}</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#b06000]">
                  <span>AQI {c.aqi}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Region Filter Tabs */}
      <div className="mb-3 flex flex-wrap gap-1.5 border-b border-[#f1f3f4] pb-2.5">
        {regions.map((reg) => {
          const isSelected = selectedRegion === reg
          const label = reg === "all" ? pick(UI.allRegions, lang) : pick(REGION_NAMES[reg], lang)
          return (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                isSelected
                  ? "bg-[#1a73e8] text-white shadow-sm"
                  : "bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]"
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Filtered Province List */}
      <div className="max-h-56 overflow-y-auto divide-y divide-[#f1f3f4] pr-1">
        {filteredCities.map((c) => {
          const active = c.key === activeKey
          const color = AQI_COLORS[aqiBand(c.aqi)]
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onSelect(c.key)}
              aria-current={active ? "true" : undefined}
              className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition ${
                active ? "bg-[#e8f0fe]" : "hover:bg-[#f8f9fa]"
              }`}
            >
              <div className="min-w-0">
                <span className={`block truncate text-xs sm:text-sm ${active ? "font-semibold text-[#1a73e8]" : "text-[#202124]"}`}>
                  {cityName(c, lang)}
                </span>
                <span className="text-[11px] text-[#80868b] truncate block">
                  {lang === "th" ? c.districtTh : c.districtEn}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs sm:text-sm text-[#5f6368] tabular-nums">{c.temp}°C</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="w-12 text-right text-xs sm:text-sm font-medium tabular-nums text-[#202124]">
                    AQI {c.aqi}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
