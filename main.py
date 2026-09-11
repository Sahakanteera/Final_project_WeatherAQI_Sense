"""
Main Entry Point (Sprint 1 Version)
Weather & Air Quality Dashboard Application Controller.
Supports interactive mode and automated demo mode (--demo).
"""

import sys
import os
import argparse

from src.weather_client import WeatherClient
from src.data_store import DataStore
from src.cli_app import CLIApp, get_simple_advisory

def run_automated_demo():
    print("\n" + "=" * 70)
    print("      AUTOMATED DEMO MODE: WEATHERAQI SENSE (SPRINT 1)")
    print("      WIP LIMIT = 2 | CORE OOP FOUNDATION | SQLITE PERSISTENCE")
    print("=" * 70 + "\n")
    
    client = WeatherClient()
    store = DataStore()
    app = CLIApp(client, store)

    cities = ["Khon Kaen", "Bangkok", "Chiang Mai"]
    
    print("--- 1. FETCHING & PERSISTING MOCK DATA FOR CITIES ---")
    for city in cities:
        snapshot = client.get_combined_snapshot(city)
        advisory = get_simple_advisory(snapshot["aqi"], snapshot["temp"])
        app.print_snapshot_box(snapshot, advisory)
        store.save_record(snapshot)

    print("\n--- 2. VERIFYING SQLITE PERSISTENCE STORE ---")
    records = store.fetch_all_records()
    print(f"Successfully retrieved {len(records)} records from SQLite database.")
    print("\n[Success] Sprint 1 Automated Demo executed successfully with 0 errors.\n")

def main():
    parser = argparse.ArgumentParser(description="Weather & Air Quality Dashboard CLI (Sprint 1)")
    parser.add_argument("--demo", action="store_true", help="Run automated demonstration mode")
    args = parser.parse_args()

    client = WeatherClient()
    store = DataStore()
    app = CLIApp(client, store)

    if args.demo:
        run_automated_demo()
    else:
        app.run_interactive()

if __name__ == "__main__":
    main()
