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
                    SELECT id, timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    WHERE LOWER(city) = LOWER(?)
                    ORDER BY id ASC
                    LIMIT ?
                """, (city_title, limit))
                rows = cursor.fetchall()

            return [
                {
                    "id": r[0],
                    "timestamp": r[1],
                    "city": r[2],
                    "temp": r[3],
                    "humidity": r[4],
                    "pressure": r[5],
                    "description": r[6],
                    "aqi": r[7],
                    "main_pollutant": r[8]
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
                    SELECT id, timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    ORDER BY id DESC
                    LIMIT ?
                """, (limit,))
                rows = cursor.fetchall()

            return [
                {
                    "id": r[0],
                    "timestamp": r[1],
                    "city": r[2],
                    "temp": r[3],
                    "humidity": r[4],
                    "pressure": r[5],
                    "description": r[6],
                    "aqi": r[7],
                    "main_pollutant": r[8]
                }
                for r in rows
            ]
        except Exception as e:
            print(f"[Error] Database fetch all failed: {e}")
            return []

    def search_records(self, keyword: str, limit: int = 50) -> List[Dict[str, Any]]:
        """
        Searches records by keyword matching city name or description.
        """
        keyword = keyword.strip()
        if not keyword:
            return self.fetch_all_records(limit=limit)
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                pattern = f"%{keyword}%"
                cursor.execute("""
                    SELECT id, timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    WHERE LOWER(city) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
                    ORDER BY id DESC
                    LIMIT ?
                """, (pattern, pattern, limit))
                rows = cursor.fetchall()
            return [
                {"id": r[0], "timestamp": r[1], "city": r[2], "temp": r[3], "humidity": r[4],
                 "pressure": r[5], "description": r[6], "aqi": r[7], "main_pollutant": r[8]}
                for r in rows
            ]
        except Exception as e:
            print(f"[Error] Database search failed: {e}")
            return []

    def filter_records(self, city: Optional[str] = None, aqi_min: Optional[int] = None,
                       aqi_max: Optional[int] = None, temp_min: Optional[float] = None,
                       temp_max: Optional[float] = None, limit: int = 50) -> List[Dict[str, Any]]:
        """
        Filters records by multiple criteria: city, AQI range, temperature range.
        """
        try:
            conditions = []
            params: list = []
            if city:
                conditions.append("LOWER(city) = LOWER(?)")
                params.append(city.strip())
            if aqi_min is not None:
                conditions.append("aqi >= ?")
                params.append(int(aqi_min))
            if aqi_max is not None:
                conditions.append("aqi <= ?")
                params.append(int(aqi_max))
            if temp_min is not None:
                conditions.append("temp >= ?")
                params.append(float(temp_min))
            if temp_max is not None:
                conditions.append("temp <= ?")
                params.append(float(temp_max))

            where_clause = " AND ".join(conditions) if conditions else "1=1"
            params.append(limit)

            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute(f"""
                    SELECT id, timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    WHERE {where_clause}
                    ORDER BY id DESC
                    LIMIT ?
                """, tuple(params))
                rows = cursor.fetchall()
            return [
                {"id": r[0], "timestamp": r[1], "city": r[2], "temp": r[3], "humidity": r[4],
                 "pressure": r[5], "description": r[6], "aqi": r[7], "main_pollutant": r[8]}
                for r in rows
            ]
        except Exception as e:
            print(f"[Error] Database filter failed: {e}")
            return []

    def fetch_sorted_records(self, sort_by: str = "timestamp", order: str = "desc",
                             limit: int = 50) -> List[Dict[str, Any]]:
        """
        Fetches records sorted by specified column and order.
        Allowed columns: timestamp, city, temp, humidity, aqi.
        """
        allowed_columns = {"timestamp", "city", "temp", "humidity", "aqi", "pressure"}
        if sort_by not in allowed_columns:
            sort_by = "timestamp"
        order_sql = "ASC" if order.lower() == "asc" else "DESC"

        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute(f"""
                    SELECT id, timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
                    FROM metrics
                    ORDER BY {sort_by} {order_sql}
                    LIMIT ?
                """, (limit,))
                rows = cursor.fetchall()
            return [
                {"id": r[0], "timestamp": r[1], "city": r[2], "temp": r[3], "humidity": r[4],
                 "pressure": r[5], "description": r[6], "aqi": r[7], "main_pollutant": r[8]}
                for r in rows
            ]
        except Exception as e:
            print(f"[Error] Database sorted fetch failed: {e}")
            return []

    def update_record(self, record_id: int, updates: Dict[str, Any]) -> bool:
        """
        Updates a specific record by ID. Only allowed fields are updated.
        """
        allowed_fields = {"city", "temp", "humidity", "pressure", "description", "aqi", "main_pollutant"}
        filtered = {k: v for k, v in updates.items() if k in allowed_fields}
        if not filtered:
            print("[Warning] No valid fields to update.")
            return False
        try:
            set_clause = ", ".join(f"{k} = ?" for k in filtered)
            values = list(filtered.values()) + [record_id]
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute(f"UPDATE metrics SET {set_clause} WHERE id = ?", tuple(values))
                conn.commit()
                if cursor.rowcount == 0:
                    print(f"[Warning] No record found with ID {record_id}.")
                    return False
            return True
        except Exception as e:
            print(f"[Error] Database update failed: {e}")
            return False

    def delete_record(self, record_id: int) -> bool:
        """
        Deletes a specific record by ID.
        """
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM metrics WHERE id = ?", (record_id,))
                conn.commit()
                if cursor.rowcount == 0:
                    print(f"[Warning] No record found with ID {record_id}.")
                    return False
            return True
        except Exception as e:
            print(f"[Error] Database delete failed: {e}")
            return False

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
