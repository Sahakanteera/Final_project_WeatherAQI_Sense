"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { City, Lang } from "@/lib/weather-data"
import { DEMO_CITIES } from "@/lib/weather-data"
import { fetchAllSupabaseCities, getCityDataWithFallback } from "@/lib/api-client"
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

export default function Page() {
  const [lang, setLang] = useState<Lang>("th")
  const [activeKey, setActiveKey] = useState<string>(DEMO_CITIES[0].key)
  const [refreshing, setRefreshing] = useState(false)
  const [dataSource, setDataSource] = useState<"live" | "supabase" | "cache" | "demo">("live")
  const [overrides, setOverrides] = useState<Record<string, Partial<City>>>({})

  // Merge DEMO_CITIES baseline with live / Supabase overrides
  const cities = useMemo<City[]>(
    () => DEMO_CITIES.map((c) => ({ ...c, ...overrides[c.key] })),
    [overrides],
  )

  const active = cities.find((c) => c.key === activeKey) ?? cities[0]

  // Fetch detailed live or cached data for a specific province
  const loadCityData = useCallback(async (key: string, forceLive: boolean = false) => {
    const baseCity = DEMO_CITIES.find((c) => c.key === key) || DEMO_CITIES[0]
    setRefreshing(true)
    try {
      const res = await getCityDataWithFallback(baseCity, forceLive)
      if (res && res.data && Object.keys(res.data).length > 0) {
        setOverrides((prev) => ({
          ...prev,
          [key]: { ...prev[key], ...res.data },
        }))
        setDataSource(res.source)
      }
    } catch (err) {
      console.warn("Failed to load city data:", err)
    } finally {
      setRefreshing(false)
    }
  }, [])

  // 1. Initial Load: Fetch all 77 provinces from Supabase cache for rankings/map pins
  useEffect(() => {
    let mounted = true
    async function initAllProvinces() {
      try {
        const allCached = await fetchAllSupabaseCities()
        if (mounted && Object.keys(allCached).length > 0) {
          setOverrides((prev) => ({ ...allCached, ...prev }))
        }
      } catch (e) {
        console.warn("Supabase init error:", e)
      }
    }
    initAllProvinces()
    return () => {
      mounted = false
    }
  }, [])

  // 2. Fetch active city detailed live metrics whenever selection changes
  useEffect(() => {
    loadCityData(activeKey, false)
  }, [activeKey, loadCityData])

  // 3. Auto-refresh live data every 5 minutes (300,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      loadCityData(activeKey, true)
    }, 300000)
    return () => clearInterval(interval)
  }, [activeKey, loadCityData])

  // Manual Refresh Handler: Force fresh live API fetch
  const handleRefresh = useCallback(() => {
    if (refreshing) return
    loadCityData(activeKey, true)
  }, [activeKey, loadCityData, refreshing])

  return (
    <div className="min-h-screen text-[#202124]" style={{ backgroundColor: "#f8f9fa" }}>
      <TopBar
        lang={lang}
        onLangChange={setLang}
        onSelectCity={setActiveKey}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        dataSource={dataSource}
      />

      <main className="mx-auto max-w-7xl px-3.5 py-5 sm:px-6 sm:py-7">
        {/* 1. Meteorological Warning Banner (If active) */}
        <WeatherAlertBanner city={active} lang={lang} />

        {/* 2. Interactive Real-World Map of Thailand (77 Provinces GIS + Live Doppler Radar) */}
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

            {/* 24-Hour Hourly Scroller & Trend Chart */}
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
