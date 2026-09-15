"""
Unit Tests for AIAdvisory & ReportGenerator Modules
"""

import unittest
import os
import tempfile
from src.ai_advisory import AIAdvisory
from src.data_store import DataStore
from src.report_generator import ReportGenerator

class TestReportsAndAdvisory(unittest.TestCase):
    def test_ai_advisory_good_aqi(self):
        advisory = AIAdvisory.get_advisory(aqi=30, temp=25.0)
        self.assertEqual(advisory["aqi_category"], "Good")
        self.assertIn("Ideal for outdoor workouts", advisory["health_notice"])

    def test_ai_advisory_unhealthy_aqi(self):
        advisory = AIAdvisory.get_advisory(aqi=160, temp=36.0)
        self.assertEqual(advisory["aqi_category"], "Unhealthy")
        self.assertIn("High Heat Warning", advisory["temp_notice"])

    def test_report_generator_plot(self):
        fd_db, temp_db_path = tempfile.mkstemp(suffix=".db")
        os.close(fd_db)
        fd_png, temp_png_path = tempfile.mkstemp(suffix=".png")
        os.close(fd_png)
        
        try:
            store = DataStore(db_path=temp_db_path)
            store.save_record({
                "timestamp": "2026-09-11 10:00:00",
                "city": "Bangkok",
                "temp": 32.0,
                "humidity": 70.0,
                "aqi": 80,
                "main_pollutant": "p2"
            })
            
            reporter = ReportGenerator(store)
            output = reporter.plot_city_trends("Bangkok", output_path=temp_png_path)
            self.assertIsNotNone(output)
            self.assertTrue(os.path.exists(temp_png_path))
        finally:
            if os.path.exists(temp_db_path):
                try:
                    os.remove(temp_db_path)
                except Exception:
                    pass
            if os.path.exists(temp_png_path):
                try:
                    os.remove(temp_png_path)
                except Exception:
                    pass

if __name__ == "__main__":
    unittest.main()
