"""
DataStore Module
Handles SQLite database persistence for weather and AQI logs.
Includes defensive table creation, parameterized queries, and safe fetching.
"""

import sqlite3
import os
from typing import Dict, Any, List, Optional

class DataStore:
    """
    Manages local SQLite database operations for Weather & AQI metrics.
    """
    
    def __init__(self, db_path: Optional[str] = None):
        if db_path is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            data_dir = os.path.join(base_dir, "data")
            os.makedirs(data_dir, exist_ok=True)
            self.db_path = os.path.join(data_dir, "weather_data.db")
        else:
            self.db_path = db_path

        self._init_db()

    def _init_db(self):
        """
        Initializes the SQLite metrics table defensively if it does not exist.
        """
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    city TEXT NOT NULL,
                    temp REAL NOT NULL,
                    humidity REAL NOT NULL,
                    pressure REAL,
                    description TEXT,
                    aqi INTEGER NOT NULL,
                    main_pollutant TEXT
                )
            """)
            conn.commit()

    def save_record(self, record: Dict[str, Any]) -> bool:
        """
        Saves a single weather/AQI snapshot record into SQLite.
        """
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO metrics (timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    record.get("timestamp", ""),
                    record.get("city", "Unknown"),
                    float(record.get("temp", 0.0)),
                    float(record.get("humidity", 0.0)),
                    float(record.get("pressure", 1013.0)),
                    record.get("description", "Clear"),
                    int(record.get("aqi", 0)),
                    record.get("main_pollutant", "p2")
                ))
                conn.commit()
            return True
        except Exception as e:
            print(f"[Error] Database insert failed: {e}")
            return False

    def fetch_records_by_city(self, city: str, limit: int = 50) -> List[Dict[str, Any]]:
        """
        Fetches historical records for a specific city ordered by timestamp ascending.
        """
        city_title = city.strip().title()
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    WHERE LOWER(city) = LOWER(?)
                    ORDER BY id ASC
                    LIMIT ?
                """, (city_title, limit))
                rows = cursor.fetchall()
                
            return [
                {
                    "timestamp": r[0],
                    "city": r[1],
                    "temp": r[2],
                    "humidity": r[3],
                    "pressure": r[4],
                    "description": r[5],
                    "aqi": r[6],
                    "main_pollutant": r[7]
                }
                for r in rows
            ]
        except Exception as e:
            print(f"[Error] Database fetch failed: {e}")
            return []

    def fetch_all_records(self, limit: int = 100) -> List[Dict[str, Any]]:
        """
        Fetches all stored records from SQLite.
        """
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    ORDER BY id DESC
                    LIMIT ?
                """, (limit,))
                rows = cursor.fetchall()
                
            return [
                {
                    "timestamp": r[0],
                    "city": r[1],
                    "temp": r[2],
                    "humidity": r[3],
                    "pressure": r[4],
                    "description": r[5],
                    "aqi": r[6],
                    "main_pollutant": r[7]
                }
                for r in rows
            ]
        except Exception as e:
            print(f"[Error] Database fetch all failed: {e}")
            return []

    def clear_records(self) -> bool:
        """
        Clears all records in the metrics table (used for testing).
        """
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM metrics")
                conn.commit()
            return True
        except Exception as e:
            print(f"[Error] Database clear failed: {e}")
            return False
