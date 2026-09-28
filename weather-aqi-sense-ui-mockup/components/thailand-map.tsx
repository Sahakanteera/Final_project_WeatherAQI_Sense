"use client"

import { useEffect, useRef, useState } from "react"
import type { City, Lang } from "@/lib/weather-data"
import { aqiBand, AQI_COLORS } from "@/lib/weather-data"
import { cityName, districtName, pick, WEATHER_LABELS } from "@/lib/i18n"
import { WeatherIcon } from "./weather-icon"
import { cardClass } from "./card"
import {
  Thermometer,
  ShieldCheck,
  Maximize2,
  Minimize2,
  MapPin,
  RotateCcw,
  Globe,
  Satellite,
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  CloudRain,
  Play,
  Pause,
  Wind,
  Cloud,
  Gauge,
  X,
  Sliders,
} from "lucide-react"

interface ThailandMapProps {
  cities: City[]
  activeKey: string
  lang: Lang
  onSelectCity: (key: string) => void
}

type MapMode = "aqi" | "weather"
type TileLayerType = "clean" | "satellite" | "osm"
type DensityMode = "all" | "smart"
type WeatherOverlay = "none" | "radar" | "satellite_ir" | "temp" | "clouds" | "wind" | "pressure"

interface RadarFrame {
  time: number
  path: string
}

const MAJOR_KEYS = new Set([
  "bangkok",
  "chiang mai",
  "chiang rai",
  "phitsanulok",
  "nakhon sawan",
  "khon kaen",
  "udon thani",
  "ubon ratchathani",
  "nakhon ratchasima",
  "si sa ket",
  "chonburi",
  "rayong",
  "kanchanaburi",
  "prachuap khiri khan",
  "surat thani",
  "phuket",
  "krabi",
  "songkhla",
  "yala",
  "saraburi",
  "ayutthaya",
])

function matchCity(geoName: string, cities: City[]): City | undefined {
  const norm = geoName.toLowerCase().replace(/[^a-z]/g, "")
  return cities.find((c) => {
    const cNorm = c.en.toLowerCase().replace(/[^a-z]/g, "")
    const kNorm = c.key.toLowerCase().replace(/[^a-z]/g, "")
    return cNorm === norm || kNorm === norm || cNorm.includes(norm) || norm.includes(cNorm)
  })
}

export function ThailandInteractiveMap({
  cities,
  activeKey,
  lang,
  onSelectCity,
}: ThailandMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const markersMapRef = useRef<Record<string, any>>({})
  const polygonsMapRef = useRef<Record<string, any>>({})
  const tileLayerRef = useRef<any>(null)
  const maskLayerRef = useRef<any>(null)
  const provincesGeoLayerRef = useRef<any>(null)
  const radarLayerRef = useRef<any>(null)

  const [mode, setMode] = useState<MapMode>("aqi")
  const [layerType, setLayerType] = useState<TileLayerType>("clean")
  const [densityMode, setDensityMode] = useState<DensityMode>("all")
  const [zoomLevel, setZoomLevel] = useState<number>(6)
  const [expanded, setExpanded] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [provincesGeo, setProvincesGeo] = useState<any>(null)
  const [countryGeo, setCountryGeo] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Weather & Radar Overlays States
  const [weatherOverlay, setWeatherOverlay] = useState<WeatherOverlay>("radar")
  const [radarFrames, setRadarFrames] = useState<RadarFrame[]>([])
  const [satelliteFrames, setSatelliteFrames] = useState<RadarFrame[]>([])
  const [radarHost, setRadarHost] = useState("https://tilecache.rainviewer.com")
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [radarOpacity, setRadarOpacity] = useState(0.8)
  const [radarColorScheme, setRadarColorScheme] = useState<number>(2)
  const [radarSmooth, setRadarSmooth] = useState<boolean>(true)
  const owmLayerRef = useRef<any>(null)

  const activeCity = cities.find((c) => c.key === activeKey) ?? cities[0]

  // 1. Fetch Thailand Country Boundary & 77 Provinces GeoJSON
  useEffect(() => {
    fetch("/thailand-boundary.geojson")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCountryGeo(data))
      .catch((err) => console.error("Error loading country boundary:", err))

    fetch("/thailand-provinces.geojson")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProvincesGeo(data))
      .catch((err) => console.error("Error loading provinces boundary:", err))
  }, [])

  // 2. Fetch Live RainViewer Doppler Radar + Satellite IR Frames
  useEffect(() => {
    fetch("https://api.rainviewer.com/public/weather-maps.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return
        const host = data.host || "https://tilecache.rainviewer.com"
        // Radar frames
        const past: RadarFrame[] = data.radar?.past || []
        const nowcast: RadarFrame[] = data.radar?.nowcast || []
        const all = [...past, ...nowcast]
        // Satellite IR frames
        const satFrames: RadarFrame[] = data.satellite?.infrared || []
        setRadarHost(host)
        setRadarFrames(all)
        setSatelliteFrames(satFrames)
        if (all.length > 0) {
          const latestPastIdx = past.length > 0 ? past.length - 1 : all.length - 1
          setCurrentFrameIndex(latestPastIdx)
        }
      })
      .catch((err) => console.error("Error loading RainViewer frames:", err))
  }, [])

  // 3. Radar / Satellite animation loop
  const activeFrames = weatherOverlay === "satellite_ir" ? satelliteFrames : radarFrames
  const showRadar = weatherOverlay === "radar" || weatherOverlay === "satellite_ir"
  useEffect(() => {
    if (!isPlaying || !showRadar || activeFrames.length <= 1) return
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % activeFrames.length)
    }, 850)
    return () => clearInterval(interval)
  }, [isPlaying, showRadar, activeFrames.length])

  // 4. Load Leaflet CSS & Script dynamically on client
  useEffect(() => {
    if (typeof window === "undefined") return

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link")
      link.id = "leaflet-css"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }

    if ((window as any).L) {
      setLeafletLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.async = true
    script.onload = () => {
      setLeafletLoaded(true)
    }
    document.body.appendChild(script)
  }, [])

  // 5. Initialize Leaflet Map Instance
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return

    const L = (window as any).L
    if (!L) return

    // Center on Thailand [13.4, 101.0] with zoom 6
    const map = L.map(mapContainerRef.current, {
      center: [13.4, 101.0],
      zoom: 6,
      minZoom: 5,
      maxZoom: 14,
      maxBounds: [
        [3.0, 93.0],
        [22.8, 108.5],
      ],
      attributionControl: false,
      zoomControl: false,
    })

    map.on("zoomend", () => {
      setZoomLevel(map.getZoom())
    })

    L.control.zoom({ position: "topright" }).addTo(map)
    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [leafletLoaded])

  // 6. Handle Tile Layer Switching (Clean / Satellite / OSM) — NO WATERMARK
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = (window as any).L
    if (!map || !L) return

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }

    let url =
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    let options: any = { maxZoom: 14 }

    if (layerType === "satellite") {
      url =
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      options = { maxZoom: 14 }
    } else if (layerType === "osm") {
      url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      options = { maxZoom: 14, subdomains: ["a", "b", "c"] }
    }

    const newLayer = L.tileLayer(url, options).addTo(map)
    tileLayerRef.current = newLayer
  }, [layerType, leafletLoaded])

  // 7. Render / Update Weather Overlay Layer (Radar / Satellite IR / OWM)
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = (window as any).L
    if (!map || !L) return

    // Clear previous layers
    if (radarLayerRef.current) {
      map.removeLayer(radarLayerRef.current)
      radarLayerRef.current = null
    }
    if (owmLayerRef.current) {
      map.removeLayer(owmLayerRef.current)
      owmLayerRef.current = null
    }

    const BLANK_TILE =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

    if (weatherOverlay === "radar" || weatherOverlay === "satellite_ir") {
      const frames = weatherOverlay === "satellite_ir" ? satelliteFrames : radarFrames
      if (frames.length === 0) return
      const frame = frames[currentFrameIndex]
      if (!frame) return

      const colorScheme = weatherOverlay === "satellite_ir" ? 0 : radarColorScheme
      const smooth = weatherOverlay === "satellite_ir" ? "0" : radarSmooth ? "1" : "0"
      const tileUrl = `${radarHost}${frame.path}/256/{z}/{x}/{y}/${colorScheme}/${smooth}_1.png`

      radarLayerRef.current = L.tileLayer(tileUrl, {
        opacity: radarOpacity,
        zIndex: 350,
        maxZoom: 14,
        maxNativeZoom: 8,
        tileSize: 256,
        errorTileUrl: BLANK_TILE,
      }).addTo(map)
    } else if (["temp", "clouds", "wind", "pressure"].includes(weatherOverlay)) {
      // OpenWeatherMap tile layers
      const owmKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
      if (!owmKey) return
      const layerMap: Record<string, string> = {
        temp: "temp_new",
        clouds: "clouds_new",
        wind: "wind_new",
        pressure: "pressure_new",
      }
      const layer = layerMap[weatherOverlay]
      if (!layer) return
      const tileUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${owmKey}`

      owmLayerRef.current = L.tileLayer(tileUrl, {
        opacity: radarOpacity,
        zIndex: 350,
        maxZoom: 14,
        maxNativeZoom: 10,
        tileSize: 256,
        errorTileUrl: BLANK_TILE,
      }).addTo(map)
    }
  }, [
    weatherOverlay,
    currentFrameIndex,
    radarFrames,
    satelliteFrames,
    radarHost,
    radarOpacity,
    radarColorScheme,
    radarSmooth,
    leafletLoaded,
  ])

  // 8. Inverted Mask to Dim Neighboring Countries (Myanmar, Laos, Cambodia, Malaysia)
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = (window as any).L
    if (!map || !L || !countryGeo) return

    if (maskLayerRef.current) map.removeLayer(maskLayerRef.current)

    try {
      const multi = countryGeo.features[0].geometry.coordinates
      let mainlandPoints: any[] = []
      let maxLen = 0

      for (const poly of multi) {
        if (poly[0] && poly[0].length > maxLen) {
          maxLen = poly[0].length
          mainlandPoints = poly[0]
        }
      }

      if (mainlandPoints.length > 0) {
        const outerWorld = [
          [85, -180],
          [85, 180],
          [-85, 180],
          [-85, -180],
        ]
        const thailandHole = mainlandPoints.map((pt: any) => [pt[1], pt[0]])
        const maskColor = layerType === "satellite" ? "#0f172a" : "#f1f3f4"
        const maskOpacity = layerType === "satellite" ? 0.65 : 0.72

        const mask = L.polygon([outerWorld, thailandHole], {
          stroke: false,
          fillColor: maskColor,
          fillOpacity: maskOpacity,
          interactive: false,
        }).addTo(map)
        maskLayerRef.current = mask
      }
    } catch (e) {
      console.error("Error creating Thailand mask:", e)
    }
  }, [countryGeo, layerType, leafletLoaded])

  // 9. Render 77 Province Boundary Outlines (Interactive Outline Polygons with Accurate Centroids)
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = (window as any).L
    if (!map || !L || !provincesGeo) return

    if (provincesGeoLayerRef.current) {
      map.removeLayer(provincesGeoLayerRef.current)
    }
    polygonsMapRef.current = {}

    const layer = L.geoJSON(provincesGeo, {
      style: (feature: any) => {
        const provName = feature?.properties?.name || ""
        const matched = matchCity(provName, cities)
        const isSelected = matched && matched.key === activeKey

        return {
          color: isSelected ? "#0b57d0" : layerType === "satellite" ? "#cbd5e1" : "#64748b",
          weight: isSelected ? 2.5 : 1.2,
          opacity: isSelected ? 1 : 0.8,
          dashArray: isSelected ? "" : "3, 2",
          fillColor: isSelected ? "#1a73e8" : "#ffffff",
          fillOpacity: isSelected ? 0.28 : weatherOverlay !== "none" ? 0.02 : 0.04,
        }
      },
      onEachFeature: (feature: any, polygonLayer: any) => {
        const provName = feature?.properties?.name || ""
        const matched = matchCity(provName, cities)

        if (matched) {
          polygonsMapRef.current[matched.key] = polygonLayer
          const color = AQI_COLORS[aqiBand(matched.aqi)]
          polygonLayer.bindTooltip(
            `<div style="font-family: inherit; padding: 2px;">
              <strong style="font-size: 13px; color: #202124;">${cityName(matched, lang)}</strong><br/>
              <span style="font-size: 11px; color: #5f6368;">${
                lang === "th" ? "อุณหภูมิ" : "Temp"
              }: ${matched.temp}°C | AQI: <b style="color: ${color};">${matched.aqi}</b></span>
            </div>`,
            { sticky: true, opacity: 0.95 }
          )
        }

        polygonLayer.on({
          mouseover: (e: any) => {
            const l = e.target
            l.setStyle({
              weight: 2.5,
              color: "#1a73e8",
              fillColor: "#1a73e8",
              fillOpacity: 0.22,
            })
            l.bringToFront()

            if (matched) {
              const m = markersMapRef.current[matched.key]
              if (m) {
                m.setZIndexOffset(1000)
                const el = m.getElement()
                if (el) {
                  const circle = el.querySelector(".badge-circle")
                  if (circle) circle.classList.add("scale-125", "ring-2", "ring-[#1a73e8]")
                  const label = el.querySelector(".badge-label")
                  if (label) {
                    label.classList.remove("hidden")
                    label.classList.add("flex")
                  }
                }
              }
            }
          },
          mouseout: (e: any) => {
            layer.resetStyle(e.target)
            if (matched) {
              const m = markersMapRef.current[matched.key]
              if (m) {
                m.setZIndexOffset(0)
                const el = m.getElement()
                if (el && matched.key !== activeKey) {
                  const circle = el.querySelector(".badge-circle")
                  if (circle) circle.classList.remove("scale-125", "ring-2", "ring-[#1a73e8]")
                  const label = el.querySelector(".badge-label")
                  if (label) {
                    label.classList.add("hidden")
                    label.classList.remove("flex")
                  }
                }
              }
            }
          },
          click: (e: any) => {
            if (matched) {
              onSelectCity(matched.key)
              map.fitBounds(e.target.getBounds(), {
                maxZoom: 9,
                padding: [40, 40],
                animate: true,
                duration: 0.7,
              })
            }
          },
        })
      },
    }).addTo(map)

    provincesGeoLayerRef.current = layer
  }, [provincesGeo, cities, activeKey, lang, layerType, weatherOverlay, leafletLoaded])

  // 10. Render GPS Station Markers across Thailand (Centered Exactly at Polygon Centroid)
  useEffect(() => {
    const map = mapInstanceRef.current
    const L = (window as any).L
    if (!map || !L) return

    markersRef.current.forEach((m) => map.removeLayer(m))
    markersRef.current = []
    markersMapRef.current = {}

    cities.forEach((city) => {
      const isSelected = city.key === activeKey
      const isMajor = MAJOR_KEYS.has(city.key)

      // In smart density mode and zoomed out (<=6), show major keys + selected
      if (densityMode === "smart" && zoomLevel <= 6 && !isMajor && !isSelected) {
        return
      }

      const band = aqiBand(city.aqi)
      const color = AQI_COLORS[band]
      const name = cityName(city, lang)

      let html = ""
      if (mode === "aqi") {
        html = `
          <div class="marker-container group relative cursor-pointer" style="position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; pointer-events: auto;">
            ${
              isSelected
                ? `<div class="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none" style="background-color: ${color};"></div>`
                : ""
            }
            <div class="badge-circle relative flex items-center justify-center rounded-full border-2 border-white text-white font-bold shadow-md transition-transform duration-200 group-hover:scale-125 ${
              isSelected
                ? "h-8 w-8 ring-2 ring-[#1a73e8] text-[11px]"
                : zoomLevel <= 6
                ? "h-[22px] w-[22px] text-[9.5px]"
                : "h-7 w-7 text-[10.5px]"
            }" style="background-color: ${color};">
              ${city.aqi}
            </div>
            <div style="position: absolute; top: 100%; margin-top: 3px; left: 50%; transform: translateX(-50%); pointer-events: none;" class="badge-label ${
              isSelected ? "flex" : "hidden group-hover:flex"
            } items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow-md whitespace-nowrap ${
              isSelected
                ? "bg-[#1a73e8] text-white ring-1 ring-white/50"
                : "bg-white text-[#202124] border border-[#dadce0]"
            }">
              ${name}
            </div>
          </div>
        `
      } else {
        html = `
          <div class="marker-container group relative cursor-pointer" style="position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; pointer-events: auto;">
            ${
              isSelected
                ? `<div class="absolute inset-0 rounded-full animate-ping opacity-40 bg-[#1a73e8] pointer-events-none"></div>`
                : ""
            }
            <div class="badge-circle relative flex items-center justify-center rounded-full border border-[#dadce0] bg-white text-[#202124] font-bold shadow-md transition-transform duration-200 group-hover:scale-125 ${
              isSelected
                ? "h-8 px-2 ring-2 ring-[#1a73e8] text-[11px]"
                : zoomLevel <= 6
                ? "h-[22px] px-1 text-[9.5px]"
                : "h-7 px-1.5 text-[10px]"
            }">
              <span>${Math.round(city.temp)}°</span>
            </div>
            <div style="position: absolute; top: 100%; margin-top: 3px; left: 50%; transform: translateX(-50%); pointer-events: none;" class="badge-label ${
              isSelected ? "flex" : "hidden group-hover:flex"
            } items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow-md whitespace-nowrap ${
              isSelected
                ? "bg-[#1a73e8] text-white ring-1 ring-white/50"
                : "bg-white text-[#202124] border border-[#dadce0]"
            }">
              ${name}
            </div>
          </div>
        `
      }

      const customIcon = L.divIcon({
        html,
        className: "custom-weather-marker",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      })

      const marker = L.marker([city.lat, city.lon], { icon: customIcon }).addTo(map)

      marker.on({
        mouseover: () => {
          marker.setZIndexOffset(1000)
          const poly = polygonsMapRef.current[city.key]
          if (poly) {
            poly.setStyle({
              weight: 2.5,
              color: "#1a73e8",
              fillColor: "#1a73e8",
              fillOpacity: 0.22,
            })
            poly.bringToFront()
          }
        },
        mouseout: () => {
          if (!isSelected) {
            marker.setZIndexOffset(0)
            const poly = polygonsMapRef.current[city.key]
            if (poly && provincesGeoLayerRef.current) {
              provincesGeoLayerRef.current.resetStyle(poly)
            }
          }
        },
        click: () => {
          onSelectCity(city.key)
          const poly = polygonsMapRef.current[city.key]
          if (poly) {
            map.fitBounds(poly.getBounds(), {
              maxZoom: 9,
              padding: [40, 40],
              animate: true,
              duration: 0.7,
            })
          } else {
            map.flyTo([city.lat, city.lon], Math.max(map.getZoom(), 8), {
              duration: 0.7,
            })
          }
        },
      })

      markersRef.current.push(marker)
      markersMapRef.current[city.key] = marker
    })
  }, [cities, activeKey, mode, densityMode, zoomLevel, lang, leafletLoaded])

  function handleRecenter() {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.flyTo([13.4, 101.0], 6, { duration: 0.8 })
  }

  function handleFocusActive() {
    if (!mapInstanceRef.current || !activeCity) return
    const poly = polygonsMapRef.current[activeCity.key]
    if (poly) {
      mapInstanceRef.current.fitBounds(poly.getBounds(), {
        maxZoom: 9,
        padding: [40, 40],
        animate: true,
        duration: 0.8,
      })
    } else {
      mapInstanceRef.current.flyTo([activeCity.lat, activeCity.lon], 9, { duration: 0.8 })
    }
  }

  function formatRadarTime(timestamp?: number) {
    if (!timestamp) return ""
    const date = new Date(timestamp * 1000)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes} น.`
  }

  const filteredProvinces = cities.filter((c) => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return true
    return c.th.toLowerCase().includes(q) || c.en.toLowerCase().includes(q) || c.key.includes(q)
  })

  return (
    <section className={`${cardClass} overflow-hidden`}>
      <style jsx global>{`
        .custom-weather-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f3f4] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#1a73e8]">
            <Globe size={20} strokeWidth={2} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-[#202124]">
                {lang === "th"
                  ? "แผนที่เรดาร์สภาพอากาศ & ฝนปกคลุม 77 จังหวัด"
                  : "Thailand Weather & Precipitation Radar Map"}
              </h3>
              <span className="rounded-full bg-[#1a73e8] px-2 py-0.5 text-[10px] font-bold text-white">
                {lang === "th" ? "Doppler Radar & 77 Centroids" : "Doppler & Centroids"}
              </span>
            </div>
            <span className="text-[11px] text-[#5f6368]">
              {lang === "th"
                ? "เรดาร์ตรวจกลุ่มฝนสดแบบเคลื่อนไหว • แสดงขอบเขตและใจกลาง 77 จังหวัดแม่นยำ 100%"
                : "Live Doppler rain radar overlay • Exact 77 province outlines & centroids"}
            </span>
          </div>
        </div>

        {/* Controls: Mode & Map Layer Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Weather & Radar Overlays Selector */}
          <div className="flex items-center rounded-full border border-[#dadce0] bg-[#f8f9fa] p-0.5 text-xs shadow-sm">
            <button
              type="button"
              onClick={() => {
                setWeatherOverlay(weatherOverlay === "radar" ? "none" : "radar")
                setIsPlaying(false)
              }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold transition ${
                weatherOverlay === "radar"
                  ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-400"
                  : "text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]"
              }`}
              title={lang === "th" ? "เรดาร์ตรวจกลุ่มฝนสด (Doppler)" : "Live Doppler Rain Radar"}
            >
              <CloudRain size={13} />
              <span>{lang === "th" ? "เรดาร์ฝนสด" : "Rain Radar"}</span>
              {weatherOverlay === "radar" && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setWeatherOverlay(weatherOverlay === "clouds" ? "none" : "clouds")}
              className={`flex items-center gap-1 rounded-full px-2 py-1 font-medium transition ${
                weatherOverlay === "clouds"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]"
              }`}
              title={lang === "th" ? "เมฆปกคลุม (Clouds)" : "Cloud Cover"}
            >
              <Cloud size={13} />
              <span>{lang === "th" ? "เมฆ" : "Clouds"}</span>
            </button>

            <button
              type="button"
              onClick={() => setWeatherOverlay(weatherOverlay === "wind" ? "none" : "wind")}
              className={`flex items-center gap-1 rounded-full px-2 py-1 font-medium transition ${
                weatherOverlay === "wind"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]"
              }`}
              title={lang === "th" ? "ความเร็วลม (Wind)" : "Wind Speed"}
            >
              <Wind size={13} />
              <span>{lang === "th" ? "ลม" : "Wind"}</span>
            </button>

            <button
              type="button"
              onClick={() => setWeatherOverlay(weatherOverlay === "temp" ? "none" : "temp")}
              className={`flex items-center gap-1 rounded-full px-2 py-1 font-medium transition ${
                weatherOverlay === "temp"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]"
              }`}
              title={lang === "th" ? "แผนที่ความร้อน (Temp Heatmap)" : "Temperature"}
            >
              <Thermometer size={13} />
              <span>{lang === "th" ? "ความร้อน" : "Temp"}</span>
            </button>

            <button
              type="button"
              onClick={() => setWeatherOverlay(weatherOverlay === "pressure" ? "none" : "pressure")}
              className={`flex items-center gap-1 rounded-full px-2 py-1 font-medium transition ${
                weatherOverlay === "pressure"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]"
              }`}
              title={lang === "th" ? "ความกดอากาศ (Pressure)" : "Atmospheric Pressure"}
            >
              <Gauge size={13} />
              <span>{lang === "th" ? "ความกด" : "Press"}</span>
            </button>
          </div>

          {/* Data Mode Switcher */}
          <div className="flex rounded-full border border-[#e0e0e0] bg-[#f8f9fa] p-0.5">
            <button
              type="button"
              onClick={() => setMode("aqi")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                mode === "aqi"
                  ? "bg-[#1a73e8] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              <ShieldCheck size={13} />
              <span>{lang === "th" ? "ฝุ่น AQI" : "AQI"}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("weather")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                mode === "weather"
                  ? "bg-[#1a73e8] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              <Thermometer size={13} />
              <span>{lang === "th" ? "อุณหภูมิ °C" : "Temp"}</span>
            </button>
          </div>

          {/* Density Mode Switcher */}
          <div className="flex rounded-full border border-[#e0e0e0] bg-[#f8f9fa] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setDensityMode("all")}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-medium transition ${
                densityMode === "all"
                  ? "bg-[#1a73e8] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
              title={lang === "th" ? "แสดงหมุดทุก 77 จังหวัดพร้อมกัน" : "Show all 77 pins"}
            >
              <Layers size={12} />
              <span>{lang === "th" ? "ครบ 77 จว." : "All 77"}</span>
            </button>
            <button
              type="button"
              onClick={() => setDensityMode("smart")}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-medium transition ${
                densityMode === "smart"
                  ? "bg-[#1a73e8] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
              title={
                lang === "th"
                  ? "แสดงเฉพาะหัวเมืองใหญ่เมื่อซูมออก ป้องกันหมุดซ้อนทับ"
                  : "Smart view: Hubs at low zoom, all on zoom-in"
              }
            >
              <Sparkles size={12} />
              <span>{lang === "th" ? "คลีน (หัวเมือง)" : "Smart Hubs"}</span>
            </button>
          </div>

          {/* Map Layer Switcher */}
          <div className="flex rounded-full border border-[#e0e0e0] bg-[#f8f9fa] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLayerType("clean")}
              className={`rounded-full px-2.5 py-1 font-medium transition ${
                layerType === "clean"
                  ? "bg-[#202124] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              {lang === "th" ? "แผนที่สะอาด" : "Clean"}
            </button>
            <button
              type="button"
              onClick={() => setLayerType("satellite")}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-medium transition ${
                layerType === "satellite"
                  ? "bg-[#202124] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              <Satellite size={12} />
              <span>{lang === "th" ? "ดาวเทียมจริง" : "Satellite"}</span>
            </button>
            <button
              type="button"
              onClick={() => setLayerType("osm")}
              className={`rounded-full px-2.5 py-1 font-medium transition ${
                layerType === "osm"
                  ? "bg-[#202124] text-white shadow-sm"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              OSM
            </button>
          </div>

          {/* Recenter Button */}
          <button
            type="button"
            onClick={handleRecenter}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dadce0] bg-white text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
            title={lang === "th" ? "จัดกึ่งกลางประเทศไทย" : "Recenter Thailand"}
          >
            <RotateCcw size={13} />
          </button>

          {/* Expand / Minimize Map Height */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dadce0] bg-white text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
            title={expanded ? "ย่อขนาดแผนที่" : "ขยายแผนที่"}
          >
            {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Official API Citation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e8eaed] bg-[#f8f9fa] px-3 py-1.5 text-[11px] text-[#5f6368]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#3c4043]">
            {lang === "th" ? "แหล่งข้อมูล API ทางการ:" : "Official Live APIs:"}
          </span>
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#1a73e8] hover:underline"
          >
            <span>OpenWeatherMap</span>
            <ExternalLink size={11} />
          </a>
          <span className="text-[#dadce0]">|</span>
          <a
            href="https://api-docs.iqair.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#1a73e8] hover:underline"
          >
            <span>IQAir AirVisual</span>
            <ExternalLink size={11} />
          </a>
          <span className="text-[#dadce0]">|</span>
          <a
            href="https://www.rainviewer.com/api.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
          >
            <span>RainViewer Doppler Radar (TMD Thailand)</span>
            <ExternalLink size={11} />
          </a>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#80868b]">
          <span>GIS Polygons: 77 Provinces GeoJSON Centroids</span>
        </div>
      </div>

      {/* Map Layout Grid: Left = Leaflet View, Right = Inspector & Quick Search */}
      <div className="grid grid-cols-1 gap-4 pt-3 lg:grid-cols-3">
        {/* Left 2 Cols: Interactive Leaflet Map */}
        <div className="relative overflow-hidden rounded-2xl border border-[#dadce0] lg:col-span-2">
          <div
            ref={mapContainerRef}
            className={`w-full transition-all duration-300 ${
              expanded ? "h-[650px]" : "h-[470px]"
            }`}
            style={{ zIndex: 1 }}
          />

          {/* Weather & Radar Floating Controller (Top-Left) */}
          {weatherOverlay !== "none" && (
            <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-md text-xs text-[#202124] max-w-[340px]">
              {/* Header with Title and Close Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="font-bold text-[#1a73e8]">
                    {weatherOverlay === "radar"
                      ? lang === "th"
                        ? "เรดาร์ตรวจฝนสด (Doppler)"
                        : "Live Doppler Rain Radar"
                      : weatherOverlay === "clouds"
                      ? lang === "th"
                        ? "เลเยอร์เมฆปกคลุม (Clouds)"
                        : "Cloud Cover Layer"
                      : weatherOverlay === "wind"
                      ? lang === "th"
                        ? "เลเยอร์ความเร็วลม (Wind)"
                        : "Wind Speed Layer"
                      : weatherOverlay === "temp"
                      ? lang === "th"
                        ? "เลเยอร์อุณหภูมิ (Temperature)"
                        : "Temperature Layer"
                      : lang === "th"
                      ? "ความกดอากาศ (Pressure)"
                      : "Pressure Layer"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {weatherOverlay === "radar" && radarFrames.length > 0 && (
                    <span className="rounded bg-[#e8f0fe] px-1.5 py-0.5 text-[10px] font-semibold text-[#1a73e8]">
                      {formatRadarTime(radarFrames[currentFrameIndex]?.time)}
                      {currentFrameIndex === radarFrames.length - 1
                        ? lang === "th"
                          ? " (สด)"
                          : " (Live)"
                        : ""}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setWeatherOverlay("none")
                      setIsPlaying(false)
                    }}
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
                    title="ปิดเลเยอร์นี้"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Rain Radar Player Controls */}
              {weatherOverlay === "radar" && radarFrames.length > 0 && (
                <>
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-white shadow-sm hover:bg-[#1557b0] transition"
                      title={isPlaying ? "หยุดชั่วคราว" : "เล่นภาพเคลื่อนไหว"}
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={radarFrames.length - 1}
                      value={currentFrameIndex}
                      onChange={(e) => {
                        setIsPlaying(false)
                        setCurrentFrameIndex(Number(e.target.value))
                      }}
                      className="h-1.5 flex-1 cursor-pointer accent-[#1a73e8]"
                    />

                    <span className="text-[10px] text-[#5f6368] tabular-nums whitespace-nowrap">
                      {currentFrameIndex + 1}/{radarFrames.length}
                    </span>
                  </div>

                  {/* Radar Color Scale Bar */}
                  <div className="pt-0.5">
                    <div className="flex items-center justify-between text-[9px] text-[#5f6368] mb-0.5">
                      <span>{lang === "th" ? "ระดับความหนาแน่นกลุ่มฝน:" : "Precipitation Rate:"}</span>
                      <span>{lang === "th" ? "เบา ➔ ฟ้าคะนอง" : "Light ➔ Extreme"}</span>
                    </div>
                    <div
                      className="h-2 w-full rounded-full overflow-hidden"
                      style={{
                        background:
                          radarColorScheme === 6
                            ? "linear-gradient(to right, #00ece6 0%, #00a000 25%, #ffff00 50%, #e70000 75%, #ff00ff 100%)"
                            : radarColorScheme === 7
                            ? "linear-gradient(to right, #00ffff 0%, #0000ff 25%, #00ff00 50%, #ffff00 75%, #ff0000 100%)"
                            : radarColorScheme === 8
                            ? "linear-gradient(to right, #4575b4 0%, #91bfdb 25%, #fee090 50%, #fc8d59 75%, #d73027 100%)"
                            : "linear-gradient(to right, #79d279 0%, #ffd24d 25%, #ff9933 50%, #ff3333 75%, #b300b3 100%)",
                      }}
                    />
                    <div className="flex justify-between text-[8px] text-[#80868b] mt-0.5">
                      <span>&lt;2.5 mm/h</span>
                      <span>5 mm/h</span>
                      <span>10 mm/h</span>
                      <span>&gt;25 mm/h</span>
                    </div>
                  </div>

                  {/* Radar Style Selector & Smooth Toggle */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#f1f3f4] text-[10px] text-[#5f6368]">
                    <div className="flex items-center gap-1">
                      <span>{lang === "th" ? "สีเรดาร์:" : "Palette:"}</span>
                      <select
                        value={radarColorScheme}
                        onChange={(e) => setRadarColorScheme(Number(e.target.value))}
                        className="rounded border border-[#dadce0] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#202124] focus:outline-none"
                      >
                        <option value={2}>{lang === "th" ? "มาตรฐาน (Universal)" : "Universal"}</option>
                        <option value={6}>NEXRAD (USA)</option>
                        <option value={7}>Rainbow (รุ้ง)</option>
                        <option value={8}>Dark Sky</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRadarSmooth(!radarSmooth)}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition ${
                        radarSmooth
                          ? "bg-[#e8f0fe] text-[#1a73e8]"
                          : "bg-[#f1f3f4] text-[#5f6368]"
                      }`}
                      title={lang === "th" ? "เปิด/ปิด การเกลี่ยความเนียนของภาพเรดาร์" : "Toggle smoothing"}
                    >
                      {radarSmooth ? (lang === "th" ? "ภาพเนียน" : "Smooth") : (lang === "th" ? "คมชัดดิบ" : "Raw")}
                    </button>
                  </div>
                </>
              )}

              {/* Other Weather Overlays Legend */}
              {weatherOverlay === "clouds" && (
                <div className="pt-0.5">
                  <div className="flex items-center justify-between text-[9px] text-[#5f6368] mb-0.5">
                    <span>{lang === "th" ? "ความหนาแน่นเมฆ:" : "Cloud Cover:"}</span>
                    <span>0% ➔ 100%</span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full overflow-hidden"
                    style={{
                      background: "linear-gradient(to right, #f1f5f9 0%, #94a3b8 50%, #1e293b 100%)",
                    }}
                  />
                  <div className="flex justify-between text-[8px] text-[#80868b] mt-0.5">
                    <span>{lang === "th" ? "ฟ้าโปร่ง (0%)" : "Clear (0%)"}</span>
                    <span>{lang === "th" ? "มีเมฆบางส่วน" : "Scattered"}</span>
                    <span>{lang === "th" ? "เมฆทึบ (100%)" : "Overcast (100%)"}</span>
                  </div>
                </div>
              )}

              {weatherOverlay === "wind" && (
                <div className="pt-0.5">
                  <div className="flex items-center justify-between text-[9px] text-[#5f6368] mb-0.5">
                    <span>{lang === "th" ? "ความเร็วลม:" : "Wind Speed:"}</span>
                    <span>0 ➔ &gt;40 m/s</span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full overflow-hidden"
                    style={{
                      background: "linear-gradient(to right, #38bdf8 0%, #34d399 33%, #fbbf24 66%, #f87171 100%)",
                    }}
                  />
                  <div className="flex justify-between text-[8px] text-[#80868b] mt-0.5">
                    <span>0 m/s (สงบ)</span>
                    <span>10 m/s</span>
                    <span>25 m/s</span>
                    <span>&gt;40 m/s (พายุ)</span>
                  </div>
                </div>
              )}

              {weatherOverlay === "temp" && (
                <div className="pt-0.5">
                  <div className="flex items-center justify-between text-[9px] text-[#5f6368] mb-0.5">
                    <span>{lang === "th" ? "อุณหภูมิ:" : "Temperature Range:"}</span>
                    <span>10°C ➔ 45°C</span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full overflow-hidden"
                    style={{
                      background: "linear-gradient(to right, #38bdf8 0%, #34d399 25%, #facc15 50%, #fb923c 75%, #ef4444 100%)",
                    }}
                  />
                  <div className="flex justify-between text-[8px] text-[#80868b] mt-0.5">
                    <span>10°C (เย็น)</span>
                    <span>25°C</span>
                    <span>35°C</span>
                    <span>&gt;42°C (ร้อนจัด)</span>
                  </div>
                </div>
              )}

              {weatherOverlay === "pressure" && (
                <div className="pt-0.5">
                  <div className="flex items-center justify-between text-[9px] text-[#5f6368] mb-0.5">
                    <span>{lang === "th" ? "ความกดอากาศระดับน้ำทะเล:" : "Sea-Level Pressure:"}</span>
                    <span>980 ➔ 1030 hPa</span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full overflow-hidden"
                    style={{
                      background: "linear-gradient(to right, #818cf8 0%, #38bdf8 50%, #f472b6 100%)",
                    }}
                  />
                  <div className="flex justify-between text-[8px] text-[#80868b] mt-0.5">
                    <span>980 hPa (หย่อม L)</span>
                    <span>1010 hPa</span>
                    <span>1030 hPa (ลิ่ม H)</span>
                  </div>
                </div>
              )}

              {/* Opacity selector */}
              <div className="flex items-center justify-between pt-1 border-t border-[#f1f3f4] text-[10px] text-[#5f6368]">
                <span>{lang === "th" ? "ความโปร่งใส:" : "Opacity:"}</span>
                <div className="flex items-center gap-1">
                  {[0.5, 0.75, 1.0].map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setRadarOpacity(op)}
                      className={`rounded px-1.5 py-0.5 font-medium transition ${
                        radarOpacity === op
                          ? "bg-[#1a73e8] text-white"
                          : "bg-[#f1f3f4] text-[#3c4043] hover:bg-[#e8eaed]"
                      }`}
                    >
                      {Math.round(op * 100)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Notice for OpenWeatherMap layers when key is missing */}
              {["clouds", "wind", "temp", "pressure"].includes(weatherOverlay) &&
                !process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY && (
                  <div className="rounded-lg bg-amber-50 p-1.5 text-[9px] text-amber-800 border border-amber-200">
                    💡 {lang === "th"
                      ? "ระบุ OPENWEATHER_API_KEY ใน .env.local เพื่อแสดงเลเยอร์สดจาก OpenWeatherMap"
                      : "Add NEXT_PUBLIC_OPENWEATHER_API_KEY in .env.local to stream live tiles from OpenWeatherMap"}
                  </div>
                )}
            </div>
          )}

          {/* Color Legend (Bottom-Left overlay) */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-xl border border-black/5 bg-white/90 p-2 text-[10px] shadow-lg backdrop-blur-md">
            <span className="mb-1 block font-bold text-[#3c4043]">
              {mode === "aqi"
                ? lang === "th"
                  ? "ดัชนีคุณภาพอากาศ (US AQI)"
                  : "Air Quality Index"
                : lang === "th"
                ? "ระดับอุณหภูมิ (°C)"
                : "Temperature Range"}
            </span>
            {mode === "aqi" ? (
              <div className="flex flex-col gap-0.5 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: AQI_COLORS.good }} />
                  <span className="text-[#5f6368]">0–50 ดีมาก (Good)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: AQI_COLORS.moderate }}
                  />
                  <span className="text-[#5f6368]">51–100 ปานกลาง (Moderate)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: AQI_COLORS.unhealthySensitive }}
                  />
                  <span className="text-[#5f6368]">101–150 เริ่มมีผลกระทบ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: AQI_COLORS.unhealthy }}
                  />
                  <span className="text-[#5f6368]">&gt;150 มีผลกระทบต่อสุขภาพ</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] text-[#5f6368]">
                <span className="h-2 w-6 rounded bg-emerald-400" /> &lt;28°C
                <span className="h-2 w-6 rounded bg-amber-400" /> 28-33°C
                <span className="h-2 w-6 rounded bg-rose-500" /> &gt;34°C
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Selected Province Inspector & 77 Search */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#e8eaed] bg-[#f8f9fa] p-4">
          <div>
            {/* Active Province Card */}
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block rounded-md bg-[#e8f0fe] px-2 py-0.5 text-[10px] font-bold text-[#1a73e8]">
                  {cityName(activeCity, lang)} • {districtName(activeCity, lang)}
                </span>
                <h4 className="mt-1 text-lg font-bold text-[#202124]">
                  {cityName(activeCity, lang)}
                </h4>
                <p className="text-[11px] text-[#5f6368]">
                  {activeCity.region.toUpperCase()} THAILAND
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                <WeatherIcon kind={activeCity.weather} className="h-7 w-7" />
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-[#e8eaed] bg-white p-2.5">
                <span className="text-[10px] font-medium text-[#5f6368]">
                  {lang === "th" ? "อุณหภูมิปัจจุบัน" : "Temperature"}
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-[#202124]">{activeCity.temp}°C</span>
                  <span className="text-[10px] text-[#80868b]">
                    {lang === "th" ? `รู้สึกเหมือน ${activeCity.feelsLike}°` : `Feels ${activeCity.feelsLike}°`}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#e8eaed] bg-white p-2.5">
                <span className="text-[10px] font-medium text-[#5f6368]">
                  {lang === "th" ? "ดัชนีคุณภาพอากาศ (AQI)" : "Air Quality (AQI)"}
                </span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span
                    className="text-xl font-bold"
                    style={{ color: AQI_COLORS[aqiBand(activeCity.aqi)] }}
                  >
                    {activeCity.aqi}
                  </span>
                  <span className="text-[10px] font-semibold text-[#5f6368]">
                    PM2.5: {activeCity.pm25} µg
                  </span>
                </div>
              </div>
            </div>

            {/* Weather status summary */}
            <div className="mt-3 rounded-xl border border-[#dadce0] bg-white p-2.5 text-xs">
              <div className="flex items-center justify-between text-[#5f6368]">
                <span>{lang === "th" ? "สภาพอากาศ" : "Condition"}</span>
                <span className="font-semibold text-[#202124]">
                  {pick(WEATHER_LABELS[activeCity.weather], lang)}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[#5f6368]">
                <span>{lang === "th" ? "ความชื้นสัมพัทธ์" : "Humidity"}</span>
                <span className="font-semibold text-[#202124]">{activeCity.humidity}%</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[#5f6368]">
                <span>{lang === "th" ? "แรงลม" : "Wind"}</span>
                <span className="font-semibold text-[#202124]">
                  {activeCity.wind} km/h ({activeCity.windDirection})
                </span>
              </div>
            </div>

            {/* Quick Province Search inside map inspector */}
            <div className="mt-3">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-[#80868b]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === "th" ? "ค้นหาใน 77 จังหวัด..." : "Search 77 provinces..."}
                  className="w-full rounded-xl border border-[#dadce0] bg-white py-1.5 pl-8 pr-3 text-xs text-[#202124] placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:outline-none"
                />
              </div>

              {/* Mini Scrollable Province List */}
              <div className="mt-2 max-h-36 overflow-y-auto rounded-xl border border-[#e8eaed] bg-white divide-y divide-[#f1f3f4] text-xs">
                {filteredProvinces.slice(0, 25).map((c) => {
                  const isCur = c.key === activeKey
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        onSelectCity(c.key)
                        const poly = polygonsMapRef.current[c.key]
                        if (poly && mapInstanceRef.current) {
                          mapInstanceRef.current.fitBounds(poly.getBounds(), {
                            maxZoom: 9,
                            padding: [40, 40],
                            animate: true,
                            duration: 0.8,
                          })
                        } else if (mapInstanceRef.current) {
                          mapInstanceRef.current.flyTo([c.lat, c.lon], 9, { duration: 0.8 })
                        }
                      }}
                      className={`flex w-full items-center justify-between px-2.5 py-1.5 text-left transition ${
                        isCur
                          ? "bg-[#e8f0fe] font-bold text-[#1a73e8]"
                          : "hover:bg-[#f8f9fa] text-[#3c4043]"
                      }`}
                    >
                      <span>{cityName(c, lang)}</span>
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <span>{c.temp}°C</span>
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: AQI_COLORS[aqiBand(c.aqi)] }}
                        />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-3 pt-2 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={handleFocusActive}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a73e8] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1557b0]"
            >
              <MapPin size={15} />
              <span>
                {lang === "th"
                  ? `ซูมดูพื้นที่ ${cityName(activeCity, lang)}`
                  : `Zoom into ${cityName(activeCity, lang)}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
