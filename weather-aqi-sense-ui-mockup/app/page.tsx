"use client"

import { useMemo, useState } from "react"
import type { City, Lang } from "@/lib/weather-data"
import { DEMO_CITIES } from "@/lib/weather-data"
import { TopBar } from "@/components/top-bar"
import { WeatherAlertBanner } from "@/components/weather-alert"
import { ThailandInteractiveMap } from "@/components/thailand-map"
import { WeatherCard } from "@/components/weather-card"
import { AqiCard } from "@/components/aqi-card"
import { HourlyChart } from "@/components/hourly-chart"
import { Forecast7Day } from "@/components/forecast-7day"
import { MetricsGrid } from "@/components/metrics-grid"
import { PollutantBreakdown } from "@/components/pollutant-breakdown"
import { LifestyleIndex } from "@/components/lifestyle-index"
import { HealthAdvisory } from "@/components/health-advisory"
import { QuickActions } from "@/components/quick-actions"
import { ThailandRankings } from "@/components/thailand-rankings"
import { TeamFooter } from "@/components/team-footer"

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("th")
  const [activeKey, setActiveKey] = useState<string>(DEMO_CITIES[0].key)
  const [refreshing, setRefreshing] = useState(false)
  // Live overrides produced by the Refresh button (keyed by city).
  const [overrides, setOverrides] = useState<Record<string, Partial<City>>>({})

  const cities = useMemo<City[]>(
    () => DEMO_CITIES.map((c) => ({ ...c, ...overrides[c.key] })),
    [overrides],
  )

  const active = cities.find((c) => c.key === activeKey) ?? cities[0]

  function handleRefresh() {
    if (refreshing) return
    setRefreshing(true)
    setTimeout(() => {
      setOverrides((prev) => {
        const next = { ...prev }
        for (const base of DEMO_CITIES) {
          const cur = { ...base, ...prev[base.key] }
          next[base.key] = {
            temp: clamp(cur.temp + Math.round((Math.random() - 0.5) * 2), 20, 42),
            aqi: clamp(cur.aqi + Math.round((Math.random() - 0.5) * 8), 5, 190),
            pm25: Math.round(clamp(cur.pm25 + (Math.random() - 0.5) * 3, 2, 120) * 10) / 10,
          }
        }
        return next
      })
      setRefreshing(false)
    }, 900)
  }

  return (
    <div className="min-h-screen text-[#202124]" style={{ backgroundColor: "#f8f9fa" }}>
      <TopBar
        lang={lang}
        onLangChange={setLang}
        onSelectCity={setActiveKey}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <main className="mx-auto max-w-7xl px-3.5 py-5 sm:px-6 sm:py-7">
        {/* 1. TMD Meteorological Warning Banner (If active) */}
        <WeatherAlertBanner city={active} lang={lang} />

        {/* 2. Interactive Real-World Map of Thailand */}
        <div className="mb-6">
          <ThailandInteractiveMap
            cities={cities}
            activeKey={activeKey}
            lang={lang}
            onSelectCity={setActiveKey}
          />
        </div>

        {/* 3. Detailed 12-Column Regional & Atmospheric Dashboard */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left Column (Primary Weather & Atmospheric Data): 7 cols */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {/* Hero Weather Card */}
            <WeatherCard city={active} lang={lang} />

            {/* 24-Hour Hourly Scroller & Dual-Axis Trend Chart */}
            <HourlyChart city={active} lang={lang} />

            {/* 7-Day Thailand Weather Forecast */}
            <Forecast7Day city={active} lang={lang} />

            {/* 8 Atmospheric & Climate Metrics Cards */}
            <MetricsGrid city={active} lang={lang} />

            {/* Air Pollutants Breakdown Table (PCD Standards) */}
            <PollutantBreakdown city={active} lang={lang} />
          </div>

          {/* Right Column (Air Quality, Health, Lifestyle & Thailand Watchlist): 5 cols */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* Air Quality Index Card with Gradient Scale */}
            <AqiCard city={active} lang={lang} />

            {/* Health Advisory Summary Card */}
            <HealthAdvisory city={active} lang={lang} />

            {/* Quick Action Assessment Chips & Dialog */}
            <QuickActions city={active} lang={lang} />

            {/* Lifestyle & Everyday Living Indices */}
            <LifestyleIndex city={active} lang={lang} />

            {/* Thailand Regional Rankings & Province Selector */}
            <ThailandRankings
              cities={cities}
              activeKey={activeKey}
              lang={lang}
              onSelect={setActiveKey}
            />
          </div>
        </div>
      </main>

      <TeamFooter lang={lang} />
    </div>
  )
}
