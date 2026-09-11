# 📓 Learning Log & Responsible AI Prompt Record (WeatherAQI Sense)

**Project Title:** WeatherAQI Sense — Weather & Air Quality Health Dashboard  
**Sprint 1 Scope:** Core System Foundation, OOP Architecture & SQLite Store  
**Team Members & Roles:**
- 👩‍💻 **ผักกาด (Phakkad):** Planner / Architect
- 👨‍💻 **พัตเตอร์ (Putter):** Coder / Dev
- 👨‍💻 **กล้า (Kla):** Debugger / QA

---

## 1. Context & Educational Rationale

เพื่อปฏิบัติตามหลักการ **Responsible AI & Explainable Systems** เอกสารฉบับนี้จัดเก็บคำถาม (Prompt), สรุปคำตอบเชิงทฤษฎีจาก AI และชุดทดสอบ Live Python Code สำหรับสร้างโปรเจกต์ WeatherAQI Sense ใน Sprint 1

---

## 2. Records of AI Prompts & Responses (Sprint 1)

### 🔹 Prompt 1: Designing OOP WeatherClient with Defensive Fallbacks
- **Student Prompt:**
  ```text
  เขียนคลาส WeatherClient ในภาษา Python ตามหลัก OOP โดยมีเมธอด fetch_weather และ fetch_aqi ที่ดึงข้อมูลจาก OpenWeatherMap และ IQAir API พร้อมระบบดักจับ Exception และ fallback ข้อมูลเมื่อ API ล้มเหลว หรือคีย์ API ไม่ถูกต้อง
  ```
- **AI Response Summary:**  
  แนะนำการใช้ `requests.get()` ร่วมกับ `timeout=5`, `response.raise_for_status()`, การดักจับ Exception และการใช้ `.get()` แบบปลอดภัยเพื่อป้องกัน `KeyError`
- **Live Verification Code:**
  ```python
  from src.weather_client import WeatherClient

  client = WeatherClient()
  snapshot = client.get_combined_snapshot("Khon Kaen")
  print("Fetched Snapshot:", snapshot)
  ```

---

### 🔹 Prompt 2: SQLite Persistence Layer with DataStore
- **Student Prompt:**
  ```text
  ออกแบบคลาส DataStore จัดการฐานข้อมูล SQLite สำหรับบันทึกค่า timestamp, city, temp, humidity, aqi และ main_pollutant พร้อมเมธอด insert และ fetch ข้อมูลโดยอัตโนมัติ
  ```
- **AI Response Summary:**  
  ใช้ `sqlite3.connect()` ร่วมกับ context manager (`with` statement) และ Parameterized Queries (`?`) เพื่อป้องกัน SQL Injection
- **Live Verification Code:**
  ```python
  from src.data_store import DataStore
  import tempfile

  temp_db = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
  store = DataStore(db_path=temp_db.name)
  saved = store.save_record(snapshot)
  print("Record Saved:", saved)

  records = store.fetch_all_records()
  print("Stored Records:", records)
  ```

---

### 🔹 Prompt 3: CLI Interface & Main Controller with Input Normalization
- **Student Prompt:**
  ```text
  เขียนคลาส CLIApp และ main.py สำหรับจัดการเมนูโต้ตอบ CLI รองรับการทำความสะอาดอินพุตด้วย .strip().lower(), แสดงผลกรอบการ์ดสภาพอากาศและ AQI ด้วยอักขระ ASCII ตารางที่รองรับคอนโซล Windows และโหมดสาธิตแบบอัตโนมัติ (--demo)
  ```
- **AI Response Summary:**  
  แนะนำการออกแบบ CLI Controller, การใช้ `argparse` สำหรับโหมด `--demo`, การสร้าง ASCII Box Framing สำหรับแสดงอุณหภูมิ/AQI/คำแนะนำสุขภาพ และคำสั่ง `fetch_all_records` สำหรับดูประวัติย้อนหลังใน SQLite
- **Live Verification Code:**
  ```python
  from src.weather_client import WeatherClient
  from src.data_store import DataStore
  from src.cli_app import CLIApp, get_simple_advisory

  client = WeatherClient()
  store = DataStore()
  app = CLIApp(client, store)

  snapshot = client.get_combined_snapshot("Khon Kaen")
  advisory = get_simple_advisory(snapshot["aqi"], snapshot["temp"])
  app.print_snapshot_box(snapshot, advisory)
  ```
