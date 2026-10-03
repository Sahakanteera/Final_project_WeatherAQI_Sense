"""
Unit Tests for CLIApp & get_simple_advisory Module
Sprint 1 Test Suite matching slide results (18 tests)
"""

import unittest
from io import StringIO
from unittest.mock import MagicMock, patch
from src.cli_app import CLIApp, get_simple_advisory


class TestGetSimpleAdvisory(unittest.TestCase):
    def test_aqi_boundary_50(self):
        adv = get_simple_advisory(50, 25.0)
        self.assertEqual(adv["aqi_category"], "Good")

    def test_aqi_boundary_100(self):
        adv = get_simple_advisory(100, 25.0)
        self.assertEqual(adv["aqi_category"], "Moderate")

    def test_aqi_boundary_101(self):
        adv = get_simple_advisory(101, 25.0)
        self.assertEqual(adv["aqi_category"], "Unhealthy")

    def test_aqi_good(self):
        adv = get_simple_advisory(30, 28.0)
        self.assertEqual(adv["aqi_category"], "Good")
        self.assertIn("satisfactory", adv["health_notice"])

    def test_aqi_moderate(self):
        adv = get_simple_advisory(75, 28.0)
        self.assertEqual(adv["aqi_category"], "Moderate")
        self.assertIn("acceptable", adv["health_notice"])

    def test_aqi_unhealthy(self):
        adv = get_simple_advisory(150, 28.0)
        self.assertEqual(adv["aqi_category"], "Unhealthy")
        self.assertIn("mask", adv["health_notice"])

    def test_returns_all_keys(self):
        adv = get_simple_advisory(45, 30.0)
        self.assertIn("aqi_category", adv)
        self.assertIn("health_notice", adv)
        self.assertIn("temp_notice", adv)

    def test_temp_comfortable(self):
        adv = get_simple_advisory(45, 28.0)
        self.assertIn("comfortable", adv["temp_notice"])

    def test_temp_high_warning(self):
        adv = get_simple_advisory(45, 36.5)
        self.assertIn("High temperature warning", adv["temp_notice"])


class TestCLIApp(unittest.TestCase):
    def setUp(self):
        self.mock_client = MagicMock()
        self.mock_store = MagicMock()
        self.mock_report = MagicMock()
        self.app = CLIApp(
            weather_client=self.mock_client,
            data_store=self.mock_store,
            report_generator=self.mock_report
        )

    def test_display_banner_contains_title(self):
        with patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.display_banner()
            output = fake_out.getvalue()
            self.assertIn("WEATHERAQI SENSE", output)

    def test_interactive_exit_on_3(self):
        with patch('builtins.input', side_effect=['10']), \
             patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.run_interactive()
            output = fake_out.getvalue()
            self.assertIn("Goodbye", output)

    def test_interactive_fetch_calls_client(self):
        sample = {
            "city": "Bangkok",
            "temp": 32.0,
            "humidity": 60.0,
            "pressure": 1010.0,
            "description": "Clear",
            "aqi": 45,
            "timestamp": "2026-09-28 12:00:00"
        }
        self.mock_client.get_combined_snapshot.return_value = sample
        self.mock_store.save_record.return_value = True

        with patch('builtins.input', side_effect=['1', 'Bangkok', '10']), \
             patch('sys.stdout', new=StringIO()):
            self.app.run_interactive()
            self.mock_client.get_combined_snapshot.assert_called_with('Bangkok')

    def test_interactive_fetch_calls_save(self):
        sample = {
            "city": "Khon Kaen",
            "temp": 30.0,
            "humidity": 65.0,
            "pressure": 1012.0,
            "description": "Sunny",
            "aqi": 40,
            "timestamp": "2026-09-28 12:00:00"
        }
        self.mock_client.get_combined_snapshot.return_value = sample
        self.mock_store.save_record.return_value = True

        with patch('builtins.input', side_effect=['1', 'Khon Kaen', '10']), \
             patch('sys.stdout', new=StringIO()):
            self.app.run_interactive()
            self.mock_store.save_record.assert_called_with(sample)

    def test_interactive_invalid_choice_then_exit(self):
        with patch('builtins.input', side_effect=['99', '10']), \
             patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.run_interactive()
            output = fake_out.getvalue()
            self.assertIn("Invalid choice", output)

    def test_print_snapshot_box_contains_aqi(self):
        sample = {"city": "Bangkok", "temp": 31.0, "humidity": 60.0, "aqi": 55, "description": "Haze"}
        adv = get_simple_advisory(55, 31.0)
        with patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.print_snapshot_box(sample, adv)
            self.assertIn("55", fake_out.getvalue())

    def test_print_snapshot_box_contains_city(self):
        sample = {"city": "Chiang Mai", "temp": 28.0, "humidity": 70.0, "aqi": 90, "description": "Cloudy"}
        adv = get_simple_advisory(90, 28.0)
        with patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.print_snapshot_box(sample, adv)
            self.assertIn("CHIANG MAI", fake_out.getvalue())

    def test_print_snapshot_box_contains_health_advisory(self):
        sample = {"city": "Phuket", "temp": 29.0, "humidity": 80.0, "aqi": 25, "description": "Clear"}
        adv = get_simple_advisory(25, 29.0)
        with patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.print_snapshot_box(sample, adv)
            self.assertIn("satisfactory", fake_out.getvalue())

    def test_print_snapshot_box_contains_temp(self):
        sample = {"city": "Bangkok", "temp": 33.5, "humidity": 65.0, "aqi": 50, "description": "Sunny"}
        adv = get_simple_advisory(50, 33.5)
        with patch('sys.stdout', new=StringIO()) as fake_out:
            self.app.print_snapshot_box(sample, adv)
            self.assertIn("33.5", fake_out.getvalue())


if __name__ == "__main__":
    unittest.main()
