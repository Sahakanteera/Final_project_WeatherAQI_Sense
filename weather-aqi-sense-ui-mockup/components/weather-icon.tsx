import { Sun, CloudSun, Cloud, CloudDrizzle, CloudRain, CloudLightning } from "lucide-react"
import type { WeatherKind } from "@/lib/weather-data"

const MAP: Record<WeatherKind, typeof Sun> = {
  sunny: Sun,
  partly_cloudy: CloudSun,
  cloudy: Cloud,
  rain_light: CloudDrizzle,
  rain_heavy: CloudRain,
  thunderstorm: CloudLightning,
}

const COLOR: Record<WeatherKind, string> = {
  sunny: "#fbbc04",
  partly_cloudy: "#5f6368",
  cloudy: "#5f6368",
  rain_light: "#1a73e8",
  rain_heavy: "#1a73e8",
  thunderstorm: "#ea4335",
}

export function WeatherIcon({
  kind,
  size = 24,
  strokeWidth = 1.5,
}: {
  kind: WeatherKind
  size?: number
  strokeWidth?: number
}) {
  const Icon = MAP[kind] || Sun
  const color = COLOR[kind] || "#5f6368"
  return <Icon size={size} strokeWidth={strokeWidth} color={color} aria-hidden="true" />
}
