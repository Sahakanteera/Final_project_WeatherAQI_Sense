# 📓 Learning Log & Responsible AI Prompt Record (WeatherAQI Sense)

**Project Title:** WeatherAQI Sense — Weather & Air Quality Health Dashboard  
**Sprint:** 1 (Front-End App Dev & Core Skeleton)  
**Team Members & Roles:**
- 👩‍💻 **ผักกาด (Phakkad):** Planner / Architect
- 👨‍💻 **พัตเตอร์ (Putter):** Coder / Dev
- 👨‍💻 **กล้า (Kla):** Debugger / QA

---

## 1. Context & Educational Rationale

เพื่อปฏิบัติตามหลักการ **Responsible AI & Explainable Systems** เอกสารฉบับนี้จัดเก็บคำถาม (Prompt), สรุปคำตอบเชิงทฤษฎีจาก AI และชุดทดสอบ Live Python Code สำหรับสร้างโปรเจกต์ WeatherAQI Sense

---

## 2. Records of AI Prompts & Responses

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

### 🔹 Prompt 3: Dual-Axis Matplotlib Trend Plotting
- **Student Prompt:**
  ```text
  เขียนคลาส ReportGenerator สำหรับพล็อตกราฟเส้นเปรียบเทียบอุณหภูมิ (แกน Y ซ้าย) และดัชนีคุณภาพอากาศ AQI (แกน Y ขวา) แบบ Dual-Axis ด้วย matplotlib แล้วบันทึกไฟล์เป็น PNG
  ```
- **AI Response Summary:**  
  แนะนำการใช้ `fig, ax1 = plt.subplots()` และ `ax2 = ax1.twinx()` เพื่อสร้างแกน Y 2 แกนแยกจากกัน
- **Live Verification Code:**
  ```python
  from src.report_generator import ReportGenerator

  reporter = ReportGenerator(store)
  reporter.plot_city_trends("Khon Kaen")
  ```
