/**
 * Service Client for OpenWeatherMap and IQAir (AirVisual) APIs
 * Designed with a Hybrid Strategy: Uses live APIs when API keys are supplied,
 * otherwise smoothly falls back to rich built-in demo data.
 */

export interface OpenWeatherData {
  temp: number
  feelsLike: number
  humidity: number
  pressure: number
  windSpeed: number
  weatherCondition: string
  weatherCode: number
}

export interface IQAirData {
  aqi: number
  pm25: number
  pm10: number
  mainPollutant: string
}

export async function fetchOpenWeatherMap(
  lat: number,
  lon: number,
  apiKey?: string
): Promise<OpenWeatherData | null> {
  if (!apiKey) return null

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`OpenWeatherMap HTTP ${res.status}`)
    const data = await res.json()

    return {
      temp: Math.round(data.main.temp * 10) / 10,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
      weatherCondition: data.weather[0]?.description || "Clear",
      weatherCode: data.weather[0]?.id || 800,
    }
  } catch (err) {
    console.warn("OpenWeatherMap fetch failed, using fallback:", err)
    return null
  }
}

export async function fetchIQAir(
  lat: number,
  lon: number,
  apiKey?: string
): Promise<IQAirData | null> {
  if (!apiKey) return null

  try {
    const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`IQAir HTTP ${res.status}`)
    const json = await res.json()
    const pollution = json.data?.current?.pollution

    if (!pollution) return null

    return {
      aqi: pollution.aqius,
      pm25: Math.round((pollution.aqius * 0.32) * 10) / 10,
      pm10: Math.round((pollution.aqius * 0.65) * 10) / 10,
      mainPollutant: pollution.mainus || "p2",
    }
  } catch (err) {
    console.warn("IQAir fetch failed, using fallback:", err)
    return null
  }
}
