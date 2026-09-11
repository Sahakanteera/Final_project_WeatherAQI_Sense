"""
CLIApp Controller Module (Sprint 1 Version)
Provides interactive Command Line Interface for Weather & AQI Dashboard.
Supports input normalization (.strip().lower()), formatted status cards, and SQLite history view.
"""

from typing import Dict, Any
from src.weather_client import WeatherClient
from src.data_store import DataStore

def get_simple_advisory(aqi: int, temp: float) -> Dict[str, str]:
    if aqi <= 50:
        aqi_cat = "Good"
        health = "Air quality is satisfactory. Enjoy outdoor activities."
    elif aqi <= 100:
        aqi_cat = "Moderate"
        health = "Air quality is acceptable. Sensitive individuals be cautious."
    else:
        aqi_cat = "Unhealthy"
        health = "Elevated pollution. Reduce outdoor activity and wear a mask."

    if temp >= 35.0:
        temp_notice = "High temperature warning. Stay hydrated."
    else:
        temp_notice = "Temperature is comfortable."

    return {
        "aqi_category": aqi_cat,
        "health_notice": health,
        "temp_notice": temp_notice
    }

class CLIApp:
    """
    Main CLI Interface application controller for Sprint 1.
    """
    
    def __init__(self, weather_client: WeatherClient, data_store: DataStore):
        self.weather_client = weather_client
        self.data_store = data_store

    def display_banner(self):
        print("\n" + "=" * 65)
        print("   🌍 WEATHERAQI SENSE - LIVE WEATHER & AIR QUALITY MONITOR")
        print("   SPRINT 1: CORE OOP FOUNDATION & SQLITE PERSISTENCE STORE")
        print("=" * 65)

    def print_snapshot_box(self, snapshot: Dict[str, Any], advisory: Dict[str, str]):
        city_str = str(snapshot['city']).upper()
        print("\n" + "+" + "-" * 63 + "+")
        print(f"|  WEATHER & AIR QUALITY REPORT - {city_str:<28} |")
        print("+" + "-" * 63 + "+")
        print(f"| Timestamp       : {snapshot['timestamp']:<43} |")
        print(f"| Temperature     : {snapshot['temp']:.1f} C ({snapshot['description']:<28}) |")
        print(f"| Humidity        : {snapshot['humidity']:.1f} %                                       |")
        print(f"| Air Quality AQI : {snapshot['aqi']:<3} ({advisory['aqi_category']:<32}) |")
        print(f"| Main Pollutant  : {snapshot['main_pollutant']:<43} |")
        print("+" + "-" * 63 + "+")
        print(f"| HEALTH ADVISORY : {advisory['health_notice']:<43} |")
        print(f"| TEMP ADVISORY   : {advisory['temp_notice']:<43} |")
        print("+" + "-" * 63 + "+\n")

    def run_interactive(self):
        self.display_banner()
        
        while True:
            print("\n--- MAIN MENU (SPRINT 1) ---")
            print("1. Fetch & Record Live Weather & AQI (e.g. Bangkok, Khon Kaen, Chiang Mai)")
            print("2. View Saved History Records in SQLite")
            print("3. Exit Application")
            
            user_choice = input("\nEnter choice (1-3): ").strip()
            
            if user_choice == "1":
                city_input = input("Enter City Name (default: Khon Kaen): ").strip()
                if not city_input:
                    city_input = "Khon Kaen"
                
                print(f"\n[Info] Fetching live metrics for '{city_input}'...")
                snapshot = self.weather_client.get_combined_snapshot(city_input)
                advisory = get_simple_advisory(snapshot["aqi"], snapshot["temp"])
                
                self.print_snapshot_box(snapshot, advisory)
                saved = self.data_store.save_record(snapshot)
                if saved:
                    print(f"✅ Successfully persisted snapshot into SQLite database.")
                else:
                    print(f"❌ Failed to save snapshot to database.")

            elif user_choice == "2":
                records = self.data_store.fetch_all_records(limit=20)
                if not records:
                    print("\n[Info] No records stored in database yet.")
                else:
                    print(f"\n--- RECENT METRICS RECORDS (Total: {len(records)}) ---")
                    for idx, r in enumerate(records, 1):
                        print(f" {idx:2d}. [{r['timestamp']}] {r['city']:<12} | Temp: {r['temp']:5.1f}°C | AQI: {r['aqi']:3d} ({r['description']})")

            elif user_choice == "3" or user_choice.lower() == "exit" or user_choice.lower() == "quit":
                print("\nThank you for using Weather & Air Quality Dashboard (Sprint 1)! Goodbye.\n")
                break
            else:
                print("\n⚠️ Invalid choice. Please enter 1, 2, or 3.")
