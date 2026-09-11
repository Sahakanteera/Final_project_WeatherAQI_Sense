"""
Unit Tests for DataStore SQLite Module
"""

import unittest
import os
import tempfile
from src.data_store import DataStore

class TestDataStore(unittest.TestCase):
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

    def test_save_and_fetch_record(self):
        record = {
            "timestamp": "2026-09-11 12:00:00",
            "city": "Khon Kaen",
            "temp": 30.5,
            "humidity": 65.0,
            "pressure": 1010.0,
            "description": "Sunny",
            "aqi": 45,
            "main_pollutant": "p2"
        }
        success = self.store.save_record(record)
        self.assertTrue(success)

        fetched = self.store.fetch_records_by_city("Khon Kaen")
        self.assertEqual(len(fetched), 1)
        self.assertEqual(fetched[0]["city"], "Khon Kaen")
        self.assertEqual(fetched[0]["temp"], 30.5)
        self.assertEqual(fetched[0]["aqi"], 45)

if __name__ == "__main__":
    unittest.main()
