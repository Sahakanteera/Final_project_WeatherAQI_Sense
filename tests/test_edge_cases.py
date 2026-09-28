"""
Edge Case Test Suite for WeatherAQI Sense
Tests boundary conditions, error handling, and CRUD operations.
"""

import unittest
import os
import tempfile
from src.weather_client import WeatherClient
from src.data_store import DataStore
from src.ai_advisory import AIAdvisory


class TestWeatherClientEdgeCases(unittest.TestCase):
    def setUp(self):
        self.client = WeatherClient(owm_api_key="demo_owm_key", iqair_api_key="demo_iqair_key")

    def test_empty_city_name(self):
        data = self.client.fetch_weather("")
        self.assertIn("temp", data)
        self.assertIsInstance(data["temp"], float)

    def test_city_with_whitespace(self):
        data = self.client.fetch_weather("  Bangkok  ")
        self.assertIn("temp", data)
        self.assertEqual(data["temp"], 32.5)

    def test_city_with_special_characters(self):
        data = self.client.fetch_weather("New@York#123")
        self.assertIn("temp", data)

    def test_unknown_city_returns_default(self):
        data = self.client.fetch_weather("Atlantis")
        self.assertIn("temp", data)
        self.assertEqual(data["temp"], 29.5)


class TestDataStoreEdgeCases(unittest.TestCase):
    def setUp(self):
        fd, self.temp_path = tempfile.mkstemp(suffix=".db")
        os.close(fd)
        self.store = DataStore(db_path=self.temp_path)

    def tearDown(self):
        if os.path.exists(self.temp_path):
            try:
                os.remove(self.temp_path)
            except Exception:
                pass

    def _sample_record(self, city="Bangkok", temp=32.0, aqi=80, desc="Sunny"):
        return {
            "timestamp": "2026-09-28 12:00:00",
            "city": city,
            "temp": temp,
            "humidity": 65.0,
            "pressure": 1010.0,
            "description": desc,
            "aqi": aqi,
            "main_pollutant": "p2"
        }

    def test_db_auto_created(self):
        new_path = self.temp_path + "_new.db"
        try:
            _ = DataStore(db_path=new_path)
            self.assertTrue(os.path.exists(new_path))
        finally:
            try:
                if os.path.exists(new_path):
                    os.remove(new_path)
            except PermissionError:
                pass

    def test_save_record_missing_optional_fields(self):
        record = {"timestamp": "2026-09-28 12:00:00", "city": "Test", "temp": 30.0, "humidity": 60.0, "aqi": 50}
        success = self.store.save_record(record)
        self.assertTrue(success)

    def test_fetch_empty_database(self):
        records = self.store.fetch_all_records()
        self.assertEqual(len(records), 0)

    def test_save_and_fetch_multiple(self):
        self.store.save_record(self._sample_record("Bangkok", 32.0, 80))
        self.store.save_record(self._sample_record("Khon Kaen", 30.0, 42))
        self.store.save_record(self._sample_record("Chiang Mai", 28.0, 120))
        records = self.store.fetch_all_records()
        self.assertEqual(len(records), 3)

    def test_search_records_empty_keyword(self):
        self.store.save_record(self._sample_record("Bangkok"))
        results = self.store.search_records("")
        self.assertEqual(len(results), 1)

    def test_search_records_no_match(self):
        self.store.save_record(self._sample_record("Bangkok"))
        results = self.store.search_records("Atlantis")
        self.assertEqual(len(results), 0)

    def test_search_records_by_city(self):
        self.store.save_record(self._sample_record("Bangkok"))
        self.store.save_record(self._sample_record("Khon Kaen"))
        results = self.store.search_records("Bangkok")
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["city"], "Bangkok")

    def test_search_records_by_description(self):
        self.store.save_record(self._sample_record("Bangkok", desc="Rainy"))
        self.store.save_record(self._sample_record("Khon Kaen", desc="Sunny"))
        results = self.store.search_records("Rainy")
        self.assertEqual(len(results), 1)

    def test_filter_by_aqi_range(self):
        self.store.save_record(self._sample_record("Bangkok", aqi=30))
        self.store.save_record(self._sample_record("Khon Kaen", aqi=80))
        self.store.save_record(self._sample_record("Chiang Mai", aqi=150))
        results = self.store.filter_records(aqi_min=0, aqi_max=50)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["aqi"], 30)

    def test_filter_no_match(self):
        self.store.save_record(self._sample_record("Bangkok", aqi=80))
        results = self.store.filter_records(aqi_min=200, aqi_max=300)
        self.assertEqual(len(results), 0)

    def test_filter_by_temp_range(self):
        self.store.save_record(self._sample_record("Bangkok", temp=35.0))
        self.store.save_record(self._sample_record("Khon Kaen", temp=25.0))
        results = self.store.filter_records(temp_min=30.0, temp_max=40.0)
        self.assertEqual(len(results), 1)

    def test_sort_by_aqi_asc(self):
        self.store.save_record(self._sample_record("A", aqi=100))
        self.store.save_record(self._sample_record("B", aqi=20))
        self.store.save_record(self._sample_record("C", aqi=60))
        results = self.store.fetch_sorted_records(sort_by="aqi", order="asc")
        aqis = [r["aqi"] for r in results]
        self.assertEqual(aqis, [20, 60, 100])

    def test_sort_by_temp_desc(self):
        self.store.save_record(self._sample_record("A", temp=25.0))
        self.store.save_record(self._sample_record("B", temp=35.0))
        self.store.save_record(self._sample_record("C", temp=30.0))
        results = self.store.fetch_sorted_records(sort_by="temp", order="desc")
        temps = [r["temp"] for r in results]
        self.assertEqual(temps, [35.0, 30.0, 25.0])

    def test_update_record_valid(self):
        self.store.save_record(self._sample_record("Bangkok", temp=32.0))
        records = self.store.fetch_all_records()
        rec_id = records[0]["id"]
        success = self.store.update_record(rec_id, {"temp": 99.9, "city": "Updated City"})
        self.assertTrue(success)
        updated = self.store.fetch_all_records()
        self.assertEqual(updated[0]["temp"], 99.9)
        self.assertEqual(updated[0]["city"], "Updated City")

    def test_update_record_nonexistent(self):
        success = self.store.update_record(99999, {"temp": 50.0})
        self.assertFalse(success)

    def test_delete_record_valid(self):
        self.store.save_record(self._sample_record("Bangkok"))
        records = self.store.fetch_all_records()
        rec_id = records[0]["id"]
        success = self.store.delete_record(rec_id)
        self.assertTrue(success)
        remaining = self.store.fetch_all_records()
        self.assertEqual(len(remaining), 0)

    def test_delete_record_nonexistent(self):
        success = self.store.delete_record(99999)
        self.assertFalse(success)

    def test_clear_then_fetch(self):
        self.store.save_record(self._sample_record("Bangkok"))
        self.store.save_record(self._sample_record("Khon Kaen"))
        self.store.clear_records()
        records = self.store.fetch_all_records()
        self.assertEqual(len(records), 0)


class TestAIAdvisoryEdgeCases(unittest.TestCase):
    def test_aqi_0_boundary(self):
        adv = AIAdvisory.get_advisory(0, 25.0)
        self.assertEqual(adv["aqi_category"], "Good")

    def test_aqi_50_boundary(self):
        adv = AIAdvisory.get_advisory(50, 25.0)
        self.assertEqual(adv["aqi_category"], "Good")

    def test_aqi_51_moderate(self):
        adv = AIAdvisory.get_advisory(51, 25.0)
        self.assertEqual(adv["aqi_category"], "Moderate")

    def test_aqi_100_moderate(self):
        adv = AIAdvisory.get_advisory(100, 25.0)
        self.assertEqual(adv["aqi_category"], "Moderate")

    def test_aqi_101_unhealthy_sensitive(self):
        adv = AIAdvisory.get_advisory(101, 25.0)
        self.assertEqual(adv["aqi_category"], "Unhealthy for Sensitive Groups")

    def test_aqi_200_unhealthy(self):
        adv = AIAdvisory.get_advisory(200, 25.0)
        self.assertEqual(adv["aqi_category"], "Unhealthy")

    def test_aqi_300_very_unhealthy(self):
        adv = AIAdvisory.get_advisory(300, 25.0)
        self.assertEqual(adv["aqi_category"], "Very Unhealthy")

    def test_aqi_301_hazardous(self):
        adv = AIAdvisory.get_advisory(301, 25.0)
        self.assertEqual(adv["aqi_category"], "Hazardous")

    def test_aqi_999_hazardous(self):
        adv = AIAdvisory.get_advisory(999, 25.0)
        self.assertEqual(adv["aqi_category"], "Hazardous")

    def test_temp_extreme_cold(self):
        adv = AIAdvisory.get_advisory(30, -20.0)
        self.assertIn("Cool", adv["temp_notice"])

    def test_temp_18_boundary_cool(self):
        adv = AIAdvisory.get_advisory(30, 18.0)
        self.assertIn("Cool", adv["temp_notice"])

    def test_temp_18_1_comfortable(self):
        adv = AIAdvisory.get_advisory(30, 18.1)
        self.assertIn("Comfortable", adv["temp_notice"])

    def test_temp_34_9_comfortable(self):
        adv = AIAdvisory.get_advisory(30, 34.9)
        self.assertIn("Comfortable", adv["temp_notice"])

    def test_temp_35_boundary_heat(self):
        adv = AIAdvisory.get_advisory(30, 35.0)
        self.assertIn("Heat", adv["temp_notice"])

    def test_temp_extreme_hot(self):
        adv = AIAdvisory.get_advisory(30, 50.0)
        self.assertIn("Heat", adv["temp_notice"])


if __name__ == "__main__":
    unittest.main()
