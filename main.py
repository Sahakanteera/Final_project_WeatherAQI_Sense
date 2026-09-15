"""
Main Entry Point
Weather & Air Quality Dashboard Application Controller.
Supports interactive mode and automated demo mode (--demo).
"""

import sys
import os
import argparse

from src.weather_client import WeatherClient
from src.data_store import DataStore
from src.report_generator import ReportGenerator
from src.ai_advisory import AIAdvisory
from src.cli_app import CLIApp

def run_automated_demo():
    print("\n" + "=" * 70)
    print("      AUTOMATED DEMO MODE: WEATHERAQI SENSE")
    print("      WIP LIMIT = 2 | RESPONSIBLE AI | EXPLAINABLE RECEIPT/REPORT")
    print("=" * 70 + "\n")

    client = WeatherClient()
    store = DataStore()
    reporter = ReportGenerator(store)
    app = CLIApp(client, store, reporter)

    cities = ["Khon Kaen", "Bangkok", "Chiang Mai"]

    print("--- 1. FETCHING & PERSISTING MOCK DATA FOR CITIES ---")
    for city in cities:
        snapshot = client.get_combined_snapshot(city)
        advisory = AIAdvisory.get_advisory(snapshot["aqi"], snapshot["temp"])
        app.print_snapshot_box(snapshot, advisory)
        store.save_record(snapshot)

    print("\n--- 2. VERIFYING SQLITE PERSISTENCE STORE ---")
    records = store.fetch_all_records()
    print(f"Successfully retrieved {len(records)} records from SQLite.")

    print("\n--- 3. GENERATING MATPLOTLIB TREND CHARTS ---")
    reporter.plot_city_trends("Khon Kaen")
    print("\n[Success] Automated Demo executed successfully with 0 errors.\n")

def main():
    parser = argparse.ArgumentParser(description="Weather & Air Quality Dashboard CLI")
    parser.add_argument("--demo", action="store_true", help="Run automated demonstration mode")
    args = parser.parse_args()

    client = WeatherClient()
    store = DataStore()
    reporter = ReportGenerator(store)
    app = CLIApp(client, store, reporter)

    if args.demo:
        run_automated_demo()
    else:
        app.run_interactive()

if __name__ == "__main__":
    main()
