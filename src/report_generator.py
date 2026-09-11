"""
ReportGenerator Module
Generates visual trend plots for Temperature vs Air Quality Index (AQI)
using Matplotlib with dual-axis rendering and defensive data handling.
"""

import matplotlib.pyplot as plt
import os
from typing import List, Dict, Any, Optional
from src.data_store import DataStore

class ReportGenerator:
    """
    Generates Matplotlib trend analysis charts from DataStore SQLite records.
    """
    
    def __init__(self, data_store: DataStore):
        self.data_store = data_store

    def plot_city_trends(self, city: str, output_path: Optional[str] = None) -> Optional[str]:
        """
        Plots Temperature vs AQI trends for a specific city and saves to PNG file.
        Returns saved PNG file path or None if no records exist.
        """
        records = self.data_store.fetch_records_by_city(city)
        if not records:
            print(f"[Info] No historical records found for '{city}' to plot.")
            return None

        timestamps = [r["timestamp"].split(" ")[1] if " " in r["timestamp"] else r["timestamp"] for r in records]
        temps = [r["temp"] for r in records]
        aqis = [r["aqi"] for r in records]

        fig, ax1 = plt.subplots(figsize=(10, 5))

        # Primary Y-axis: Temperature
        color_temp = '#e74c3c'
        ax1.set_xlabel('Timestamp', fontweight='bold')
        ax1.set_ylabel('Temperature (°C)', color=color_temp, fontweight='bold')
        ax1.plot(timestamps, temps, color=color_temp, marker='o', linewidth=2, label='Temp (°C)')
        ax1.tick_params(axis='y', labelcolor=color_temp)

        # Secondary Y-axis: AQI
        color_aqi = '#2980b9'
        ax2 = ax1.twinx()
        ax2.set_ylabel('AQI (US EPA)', color=color_aqi, fontweight='bold')
        ax2.plot(timestamps, aqis, color=color_aqi, marker='s', linestyle='--', linewidth=2, label='AQI')
        ax2.tick_params(axis='y', labelcolor=color_aqi)

        city_title = city.strip().title()
        plt.title(f'Weather & Air Quality Trends for {city_title}', fontsize=14, fontweight='bold', pad=15)
        fig.tight_layout()
        plt.grid(True, linestyle=':', alpha=0.6)

        if output_path is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            output_path = os.path.join(base_dir, f"trend_{city_title.lower().replace(' ', '_')}.png")

        plt.savefig(output_path, dpi=150)
        plt.close(fig)
        print(f"[Success] Trend plot saved to '{output_path}'")
        return output_path
