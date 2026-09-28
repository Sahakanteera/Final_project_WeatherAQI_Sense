"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import type { City, Lang } from "@/lib/weather-data"
import { buildHourly } from "@/lib/weather-data"
import { UI, pick } from "@/lib/i18n"
import { cardClass } from "./card"
import { WeatherIcon } from "./weather-icon"
import { Droplets, Clock } from "lucide-react"

const TEMP_COLOR = "#1a73e8"
const AQI_COLOR = "#ff8c00"

function ChartTooltip({
  active,
  payload,
  label,
  lang,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
  lang: Lang
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl border border-[#e8eaed] bg-white px-3 py-2 shadow-lg"
      style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
    >
      <p className="mb-1 text-xs font-semibold text-[#202124]">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-1.5 text-xs text-[#5f6368]">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name}: <span className="font-semibold text-[#202124]">{p.value}</span>
          {p.name === pick(UI.temperature, lang) ? "°C" : ""}
        </p>
      ))}
    </div>
  )
}

export function HourlyChart({ city, lang }: { city: City; lang: Lang }) {
  let hourlyData = buildHourly(city)

  // Rotate to start at the current hour
  const currentHour = new Date().getHours()
  const startIndex = hourlyData.findIndex((d) => parseInt(d.time.split(":")[0]) === currentHour)
  if (startIndex !== -1) {
    hourlyData = [...hourlyData.slice(startIndex), ...hourlyData.slice(0, startIndex)]
  }

  const chartData = hourlyData.map((d) => ({
    time: d.time,
    [pick(UI.temperature, lang)]: d.temp,
    AQI: d.aqi,
    Rain: d.rainChance,
  }))

  const tempKey = pick(UI.temperature, lang)
  const RAIN_COLOR = "#0ea5e9" // A nice light blue for rain

  return (
    <section className={cardClass}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#5f6368]">
          <Clock size={16} strokeWidth={2} />
          <h3 className="text-sm font-semibold text-[#202124]">{pick(UI.hourlyTitle, lang)}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-[#5f6368]">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: TEMP_COLOR }} />
            {tempKey}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#5f6368]">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: AQI_COLOR }} />
            AQI
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#5f6368]">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: RAIN_COLOR }} />
            Rain %
          </span>
        </div>
      </div>

      {/* Horizontal Hourly Timeline Cards */}
      <div className="mb-5 flex gap-2.5 overflow-x-auto pb-2.5 pt-1 scrollbar-thin">
        {hourlyData.map((h, i) => (
          <div
            key={h.time + i}
            className={`flex min-w-[70px] flex-col items-center rounded-xl border p-2.5 transition ${
              i === 0
                ? "border-[#1a73e8]/30 bg-[#e8f0fe]/50 font-medium"
                : "border-[#e8eaed] bg-[#f8f9fa] hover:bg-[#f1f3f4]"
            }`}
          >
            <span className="text-xs text-[#5f6368]">{i === 0 ? (lang === "th" ? "ตอนนี้" : "Now") : h.time}</span>
            <div className="my-1.5">
              <WeatherIcon kind={h.weather || city.weather} size={24} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-bold text-[#202124]">{h.temp}°</span>
            {h.rainChance > 15 ? (
              <span className="mt-1 flex items-center gap-0.5 text-[10px] font-semibold text-[#1a73e8]">
                <Droplets size={10} strokeWidth={2} />
                {h.rainChance}%
              </span>
            ) : (
              <span className="mt-1 text-[10px] text-[#9aa0a6]">-</span>
            )}
          </div>
        ))}
      </div>

      {/* 24-hour Trend Line Chart */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: -5, bottom: 0 }}>
            <CartesianGrid stroke="#f1f3f4" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: "#80868b", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e8eaed" }}
            />
            <YAxis
              tick={{ fill: "#80868b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={(props) => <ChartTooltip {...props} lang={lang} />} />
            <Line
              type="monotone"
              dataKey={tempKey}
              stroke={TEMP_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3, fill: TEMP_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="AQI"
              stroke={AQI_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3, fill: AQI_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Rain"
              stroke={RAIN_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3, fill: RAIN_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
