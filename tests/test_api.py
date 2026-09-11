"""
Unit Tests for WeatherClient API Module
"""

import unittest
from src.weather_client import WeatherClient

class TestWeatherClient(unittest.TestCase):
    def setUp(self):
        self.client = WeatherClient(owm_api_key="demo_owm_key", iqair_api_key="demo_iqair_key")

    def test_fetch_weather_fallback(self):
        data = self.client.fetch_weather("Khon Kaen")
        self.assertIn("temp", data)
        self.assertIn("humidity", data)
        self.assertIsInstance(data["temp"], float)

    def test_fetch_aqi_fallback(self):
        data = self.client.fetch_aqi("Bangkok")
        self.assertIn("aqi", data)
        self.assertIn("main_pollutant", data)
        self.assertIsInstance(data["aqi"], int)

    def test_get_combined_snapshot(self):
        snapshot = self.client.get_combined_snapshot("Chiang Mai")
        self.assertEqual(snapshot["city"], "Chiang Mai")
        self.assertIn("timestamp", snapshot)
        self.assertIn("aqi", snapshot)
        self.assertIn("temp", snapshot)

if __name__ == "__main__":
    unittest.main()
