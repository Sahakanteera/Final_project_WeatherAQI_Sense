"""
CLIApp Controller Module
Provides interactive Command Line Interface for Weather & AQI Dashboard.
Supports input normalization (.strip().lower()), formatted status cards, and menu navigation.
"""

from typing import Dict, Any, Optional
from src.weather_client import WeatherClient
from src.data_store import DataStore
from src.report_generator import ReportGenerator


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
    Main CLI Interface application controller.
    """

    def __init__(
        self,
        weather_client: WeatherClient,
        data_store: DataStore,
        report_generator: Optional[ReportGenerator] = None
    ):
        self.weather_client = weather_client
        self.data_store = data_store
        self.report_generator = report_generator or ReportGenerator(data_store)

    def display_banner(self):
        print("\n" + "=" * 65)
        print("   🌍 WEATHERAQI SENSE - LIVE WEATHER & AIR QUALITY MONITOR")
        print("   RESPONSIBLE AI | EXPLAINABLE SYSTEM | AGILE WIP LIMIT = 2")
        print("=" * 65)

    def print_snapshot_box(self, snapshot: Dict[str, Any], advisory: Dict[str, str]):
        city_str = str(snapshot.get('city', 'UNKNOWN')).upper()
        ts_str = str(snapshot.get('timestamp', 'N/A'))
        temp_val = float(snapshot.get('temp', 0.0))
        desc_str = str(snapshot.get('description', 'N/A'))
        hum_val = float(snapshot.get('humidity', 0.0))
        aqi_val = int(snapshot.get('aqi', 0))
        pol_str = str(snapshot.get('main_pollutant', 'N/A'))
        aqi_cat = str(advisory.get('aqi_category', 'N/A'))
        h_notice = str(advisory.get('health_notice', 'N/A'))
        t_notice = str(advisory.get('temp_notice', 'N/A'))

        print("\n" + "+" + "-" * 63 + "+")
        print(f"|  WEATHER & AIR QUALITY REPORT - {city_str:<28} |")
        print("+" + "-" * 63 + "+")
        print(f"| Timestamp       : {ts_str:<43} |")
        print(f"| Temperature     : {temp_val:.1f} C ({desc_str:<28}) |")
        rain_val = float(snapshot.get('rain', 0.0))
        print(f"| Humidity        : {hum_val:.1f} %                                       |")
        print(f"| Rain (1h)       : {rain_val:.1f} mm                                      |")
        print(f"| Air Quality AQI : {aqi_val:<3} ({aqi_cat:<32}) |")
        print(f"| Main Pollutant  : {pol_str:<43} |")
        print("+" + "-" * 63 + "+")
        print(f"| HEALTH ADVISORY : {h_notice:<43} |")
        print(f"| TEMP ADVISORY   : {t_notice:<43} |")
        print("+" + "-" * 63 + "+\n")

    def run_interactive(self):
        self.display_banner()

        while True:
            print("\n--- MAIN MENU ---")
            print("1.  Fetch & Record Live Weather & AQI (e.g. Bangkok, Khon Kaen, Chiang Mai)")
            print("2.  View Saved History Records in SQLite")
            print("3.  Generate & View Matplotlib Trend Chart (PNG)")
            print("4.  Launch Web Dashboard (เปิดหน้าเว็บแดชบอร์ดบนเบราว์เซอร์)")
            print("5.  🔍 Search Records by Keyword")
            print("6.  🔎 Filter Records (AQI / Temperature Range)")
            print("7.  📊 Sort & Display Records")
            print("8.  ✏️  Update a Record")
            print("9.  🗑️  Delete a Record")
            print("10. Exit Application (ออกจากโปรแกรม)")

            user_choice = input("\nEnter choice (1-10): ").strip()

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
                    print("✅ Successfully persisted snapshot into SQLite database.")
                else:
                    print("❌ Failed to save snapshot to database.")

            elif user_choice == "2":
                records = self.data_store.fetch_all_records(limit=20)
                if not records:
                    print("\n[Info] No records stored in database yet.")
                else:
                    print(f"\n--- RECENT METRICS RECORDS (Total: {len(records)}) ---")
                    for idx, r in enumerate(records, 1):
                        rec_id = r.get('id', idx)
                        print(
                            f" {rec_id:3d}. [{r['timestamp']}] {r['city']:<12} | "
                            f"Temp: {r['temp']:5.1f}°C | AQI: {r['aqi']:3d} ({r['description']})"
                        )

            elif user_choice == "3":
                city_input = input("Enter City Name to plot (default: Khon Kaen): ").strip()
                if not city_input:
                    city_input = "Khon Kaen"
                self.report_generator.plot_city_trends(city_input)

            elif user_choice == "4":
                import webbrowser
                import urllib.request
                import os
                target_url = "http://localhost:8000"
                try:
                    urllib.request.urlopen(target_url, timeout=1)
                except Exception:
                    index_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "index.html"))
                    target_url = f"file:///{index_path.replace(os.sep, '/')}"
                print(f"\n🌐 กำลังเปิดเว็บแดชบอร์ดบนเบราว์เซอร์: {target_url}")
                print("💡 คุณยังสามารถรัน 'python run_web.py' หรือ 'python main.py --web' ได้ด้วยเช่นกัน")
                webbrowser.open(target_url)

            elif user_choice == "5":
                keyword = input("Enter search keyword (city or description): ").strip()
                if not keyword:
                    print("⚠️ Please enter a keyword to search.")
                    continue
                results = self.data_store.search_records(keyword)
                if not results:
                    print(f"\n[Info] No records matching '{keyword}'.")
                else:
                    print(f"\n--- SEARCH RESULTS for '{keyword}' ({len(results)} found) ---")
                    for r in results:
                        print(
                            f" ID {r['id']:3d}. [{r['timestamp']}] {r['city']:<12} | "
                            f"Temp: {r['temp']:5.1f}°C | AQI: {r['aqi']:3d} ({r['description']})"
                        )

            elif user_choice == "6":
                print("\n--- FILTER RECORDS (leave blank to skip a filter) ---")
                city_f = input("  City name (blank=any): ").strip() or None
                aqi_min_s = input("  AQI min (blank=no min): ").strip()
                aqi_max_s = input("  AQI max (blank=no max): ").strip()
                temp_min_s = input("  Temp min °C (blank=no min): ").strip()
                temp_max_s = input("  Temp max °C (blank=no max): ").strip()
                try:
                    aqi_min = int(aqi_min_s) if aqi_min_s else None
                    aqi_max = int(aqi_max_s) if aqi_max_s else None
                    temp_min = float(temp_min_s) if temp_min_s else None
                    temp_max = float(temp_max_s) if temp_max_s else None
                except ValueError:
                    print("⚠️ Invalid number input. Please try again.")
                    continue
                results = self.data_store.filter_records(
                    city=city_f, aqi_min=aqi_min, aqi_max=aqi_max,
                    temp_min=temp_min, temp_max=temp_max
                )
                if not results:
                    print("\n[Info] No records match the specified filters.")
                else:
                    print(f"\n--- FILTERED RESULTS ({len(results)} found) ---")
                    for r in results:
                        print(
                            f" ID {r['id']:3d}. [{r['timestamp']}] {r['city']:<12} | "
                            f"Temp: {r['temp']:5.1f}°C | AQI: {r['aqi']:3d}"
                        )

            elif user_choice == "7":
                print("\n--- SORT RECORDS ---")
                print("Sort by: timestamp / city / temp / humidity / aqi / pressure")
                sort_col = input("  Sort by (default: aqi): ").strip().lower() or "aqi"
                sort_ord = input("  Order (asc/desc, default: desc): ").strip().lower() or "desc"
                results = self.data_store.fetch_sorted_records(sort_by=sort_col, order=sort_ord)
                if not results:
                    print("\n[Info] No records in database to sort.")
                else:
                    print(f"\n--- SORTED BY '{sort_col}' ({sort_ord.upper()}) — {len(results)} records ---")
                    for r in results:
                        print(
                            f" ID {r['id']:3d}. [{r['timestamp']}] {r['city']:<12} | "
                            f"Temp: {r['temp']:5.1f}°C | AQI: {r['aqi']:3d}"
                        )

            elif user_choice == "8":
                id_input = input("Enter Record ID to update: ").strip()
                try:
                    record_id = int(id_input)
                except ValueError:
                    print("⚠️ Invalid ID. Please enter a number.")
                    continue
                print("  Leave field blank to keep current value.")
                new_city = input("  New city name (blank=skip): ").strip()
                new_temp = input("  New temp °C (blank=skip): ").strip()
                new_aqi = input("  New AQI (blank=skip): ").strip()
                new_desc = input("  New description (blank=skip): ").strip()
                updates = {}
                if new_city:
                    updates["city"] = new_city
                if new_temp:
                    try:
                        updates["temp"] = float(new_temp)
                    except ValueError:
                        print("⚠️ Invalid temperature value.")
                        continue
                if new_aqi:
                    try:
                        updates["aqi"] = int(new_aqi)
                    except ValueError:
                        print("⚠️ Invalid AQI value.")
                        continue
                if new_desc:
                    updates["description"] = new_desc
                if not updates:
                    print("⚠️ No changes specified.")
                    continue
                success = self.data_store.update_record(record_id, updates)
                if success:
                    print(f"✅ Record ID {record_id} updated successfully.")
                else:
                    print(f"❌ Failed to update record ID {record_id}.")

            elif user_choice == "9":
                id_input = input("Enter Record ID to delete: ").strip()
                try:
                    record_id = int(id_input)
                except ValueError:
                    print("⚠️ Invalid ID. Please enter a number.")
                    continue
                confirm = input(f"⚠️ Are you sure you want to delete record ID {record_id}? (y/n): ").strip().lower()
                if confirm != "y":
                    print("Cancelled.")
                    continue
                success = self.data_store.delete_record(record_id)
                if success:
                    print(f"✅ Record ID {record_id} deleted successfully.")
                else:
                    print(f"❌ Failed to delete record ID {record_id}. Record may not exist.")

            elif user_choice == "10" or user_choice.lower() == "exit" or user_choice.lower() == "quit":
                print("\nThank you for using Weather & Air Quality Dashboard! Goodbye.\n")
                break
            else:
                print("\n⚠️ Invalid choice. Please enter 1-10.")
