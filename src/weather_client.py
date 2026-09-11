"""
WeatherClient Module
Handles fetching real-time weather data from OpenWeatherMap API
and Air Quality Index (AQI) data from IQAir API with defensive programming.
"""

import requests
from datetime import datetime
from typing import Dict, Any, Optional

class WeatherClient:
    """
    Client for interacting with OpenWeatherMap and IQAir APIs.
    Includes defensive checks, timeouts, and graceful fallbacks.
    """
    
    DEFAULT_CITIES = {
        "bangkok": {"lat": 13.7563, "lon": 100.5018, "name": "Bangkok", "state": "Bangkok", "country": "Thailand"},
        "khon kaen": {"lat": 16.4322, "lon": 102.8236, "name": "Khon Kaen", "state": "Khon Kaen", "country": "Thailand"},
        "chiang mai": {"lat": 18.7883, "lon": 98.9853, "name": "Chiang Mai", "state": "Chiang Mai", "country": "Thailand"},
        "phuket": {"lat": 7.8804, "lon": 98.3923, "name": "Phuket", "state": "Phuket", "country": "Thailand"}
    }

    def __init__(self, owm_api_key: str = "demo_owm_key", iqair_api_key: str = "demo_iqair_key"):
        self.owm_api_key = owm_api_key
        self.iqair_api_key = iqair_api_key

    def fetch_weather(self, city: str) -> Dict[str, Any]:
        """
        Fetches current temperature, humidity, and weather description from OpenWeatherMap.
        Falls back safely to mock data if API call fails or key is demo key.
        """
        city_clean = city.strip().lower()
        if self.owm_api_key == "demo_owm_key" or not self.owm_api_key:
            return self._mock_weather_data(city_clean)

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={self.owm_api_key}"
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            data = response.json()
            main = data.get("main", {})
            weather_list = data.get("weather", [{}])
            return {
                "temp": float(main.get("temp", 0.0)),
                "humidity": float(main.get("humidity", 0.0)),
                "pressure": float(main.get("pressure", 1013.0)),
                "description": weather_list[0].get("description", "Clear sky") if weather_list else "Clear sky"
            }
        except Exception as e:
            print(f"[Warning] Weather API call failed ({e}). Using defensive fallback.")
            return self._mock_weather_data(city_clean)

    def fetch_aqi(self, city: str) -> Dict[str, Any]:
        """
        Fetches US AQI and main pollutant from IQAir API using safe dictionary lookups (.get()).
        Falls back safely to mock data if API call fails or key is demo key.
        """
        city_clean = city.strip().lower()
        if self.iqair_api_key == "demo_iqair_key" or not self.iqair_api_key:
            return self._mock_aqi_data(city_clean)

        city_info = self.DEFAULT_CITIES.get(city_clean, {"name": city, "state": city, "country": "Thailand"})
        url = f"https://api.airvisual.com/v2/city?city={city_info['name']}&state={city_info['state']}&country={city_info['country']}&key={self.iqair_api_key}"
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            payload = response.json()
            pollution = payload.get("data", {}).get("current", {}).get("pollution", {})
            return {
                "aqi": int(pollution.get("aqius", 42)),
                "main_pollutant": str(pollution.get("mainus", "p2"))
            }
        except Exception as e:
            print(f"[Warning] IQAir API call failed ({e}). Using defensive fallback.")
            return self._mock_aqi_data(city_clean)

    def get_combined_snapshot(self, city: str) -> Dict[str, Any]:
        """
        Combines weather and AQI metrics into a unified snapshot payload.
        """
        weather = self.fetch_weather(city)
        aqi_info = self.fetch_aqi(city)
        city_name = city.strip().title()
        
        return {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "city": city_name,
            "temp": weather["temp"],
            "humidity": weather["humidity"],
            "pressure": weather.get("pressure", 1013.0),
            "description": weather.get("description", "Clear sky"),
            "aqi": aqi_info["aqi"],
            "main_pollutant": aqi_info.get("main_pollutant", "p2")
        }

    def _mock_weather_data(self, city_clean: str) -> Dict[str, Any]:
        mock_map = {
            "bangkok": {"temp": 32.5, "humidity": 68.0, "pressure": 1009.0, "description": "Partly cloudy"},
            "khon kaen": {"temp": 30.2, "humidity": 62.0, "pressure": 1011.0, "description": "Sunny"},
            "chiang mai": {"temp": 28.0, "humidity": 75.0, "pressure": 1012.0, "description": "Haze"},
            "phuket": {"temp": 31.0, "humidity": 80.0, "pressure": 1008.0, "description": "Light rain"}
        }
        return mock_map.get(city_clean, {"temp": 29.5, "humidity": 65.0, "pressure": 1010.0, "description": "Clear sky"})

    def _mock_aqi_data(self, city_clean: str) -> Dict[str, Any]:
        mock_map = {
            "bangkok": {"aqi": 85, "main_pollutant": "p2"},
            "khon kaen": {"aqi": 42, "main_pollutant": "p2"},
            "chiang mai": {"aqi": 125, "main_pollutant": "p2"},
            "phuket": {"aqi": 25, "main_pollutant": "p1"}
        }
        return mock_map.get(city_clean, {"aqi": 50, "main_pollutant": "p2"})
