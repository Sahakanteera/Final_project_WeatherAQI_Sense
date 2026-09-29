"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { Search, RefreshCw } from "lucide-react"
import type { City, Lang } from "@/lib/weather-data"
import { DEMO_CITIES } from "@/lib/weather-data"
import { UI, pick, cityName } from "@/lib/i18n"

interface TopBarProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
  onSelectCity: (key: string) => void
  onRefresh: () => void
  refreshing: boolean
  dataSource?: "live" | "supabase" | "cache" | "demo"
}

export function TopBar({ lang, onLangChange, onSelectCity, onRefresh, refreshing, dataSource }: TopBarProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DEMO_CITIES
    return DEMO_CITIES.filter(
      (c) => c.en.toLowerCase().includes(q) || c.th.includes(query.trim()) || c.key.includes(q),
    )
  }, [query])

  function choose(c: City) {
    onSelectCity(c.key)
    setQuery("")
    setOpen(false)
  }

  const [syncStatus, setSyncStatus] = useState("")
  
  useEffect(() => {
    if (dataSource === "live") {
      setSyncStatus(lang === 'th' ? "🟢 ข้อมูล API ล่าสุด (Real-time)" : "🟢 Live API Data (Real-time)");
    } else {
      const now = new Date();
      const lastSyncHour = now.getHours().toString().padStart(2, '0');
      if (lang === 'th') {
        setSyncStatus(`🕒 ฐานข้อมูล (อัปเดตล่าสุด: ${lastSyncHour}:00 น.)`);
      } else {
        setSyncStatus(`🕒 Database (Last sync: ${lastSyncHour}:00)`);
      }
    }
  }, [lang, dataSource])

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8eaed] bg-white/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:flex-wrap md:items-center md:gap-4 lg:gap-6 md:py-4">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: "#1a73e8" }}
            aria-hidden="true"
          >
            <Search size={18} strokeWidth={2} />
          </span>
          <div className="leading-tight">
            <h1 className="text-[17px] font-semibold tracking-tight text-[#202124]">WeatherAQI Sense</h1>
            <p className="text-xs text-[#5f6368]">{pick(UI.subtitle, lang)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[250px] md:mx-2">
          <div className="flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-[#f8f9fa] px-4 py-2 transition-colors focus-within:border-[#1a73e8] focus-within:bg-white">
            <Search size={18} strokeWidth={1.75} className="text-[#5f6368]" aria-hidden="true" />
            <input
              type="text"
              value={query}
              placeholder={pick(UI.searchPlaceholder, lang)}
              aria-label={pick(UI.searchPlaceholder, lang)}
              className="w-full bg-transparent text-sm text-[#202124] outline-none placeholder:text-[#80868b]"
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
                setHighlight(0)
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setOpen(false), 120)
              }}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setHighlight((h) => Math.min(h + 1, results.length - 1))
                } else if (e.key === "ArrowUp") {
                  e.preventDefault()
                  setHighlight((h) => Math.max(h - 1, 0))
                } else if (e.key === "Enter" && results[highlight]) {
                  choose(results[highlight])
                } else if (e.key === "Escape") {
                  setOpen(false)
                }
              }}
            />
          </div>

          {open && (
            <ul
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-72 overflow-auto rounded-2xl border border-[#e8eaed] bg-white py-1.5"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
              role="listbox"
            >
              {results.length === 0 && (
                <li className="px-4 py-3 text-sm text-[#5f6368]">{pick(UI.noResults, lang)}</li>
              )}
              {results.map((c, i) => (
                <li key={c.key} role="option" aria-selected={i === highlight}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      if (blurTimer.current) clearTimeout(blurTimer.current)
                      choose(c)
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${
                      i === highlight ? "bg-[#f1f3f4]" : "bg-transparent"
                    }`}
                  >
                    <span className="text-[#202124]">{cityName(c, lang)}</span>
                    <span className="text-xs text-[#80868b]">{lang === "th" ? c.en : c.th}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center rounded-full border border-[#e0e0e0] p-0.5" role="group" aria-label="Language">
            {(["th", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => onLangChange(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  lang === l ? "text-white" : "text-[#5f6368] hover:text-[#202124]"
                }`}
                style={lang === l ? { backgroundColor: "#1a73e8" } : undefined}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            aria-label={pick(UI.refresh, lang)}
            title={pick(UI.refresh, lang)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] text-[#5f6368] transition-colors hover:bg-[#f1f3f4] hover:text-[#202124]"
          >
            <RefreshCw size={17} strokeWidth={1.75} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Sub-header for Data Source Status */}
      {dataSource && (
        <div className="border-t border-[#e8eaed] bg-[#f8f9fa] px-4 py-1.5 sm:px-6 flex justify-center md:justify-end">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border transition-all ${
              dataSource === "live"
                ? "bg-sky-50 text-sky-700 border-sky-300"
                : dataSource === "supabase"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-amber-50 text-amber-700 border-amber-300"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dataSource === "live" ? "bg-sky-500 animate-pulse" : dataSource === "supabase" ? "bg-emerald-500" : "bg-amber-500"}`} />
            {dataSource === "live"
              ? (lang === "th" ? "LIVE OPEN-METEO" : "LIVE OPEN-METEO")
              : dataSource === "supabase"
                ? (lang === "th" ? `ดึงข้อมูล API • ${syncStatus}` : `API DATA • ${syncStatus}`)
                : (lang === "th" ? "BASELINE DATA" : "BASELINE DATA")}
          </span>
        </div>
      )}
    </header>
  )
}
