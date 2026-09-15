# Changelog

All notable changes to the **WeatherAQI Sense** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Project Information / ข้อมูลโครงงาน
- **Project Name:** WeatherAQI Sense — Weather & Air Quality Dashboard
- **Course:** CP352301 Software Development Principles & Practice (หลักการและวิธีปฏิบัติการพัฒนาซอฟต์แวร์)
- **Academic Term:** Semester 1, Academic Year 2026 (September 2026)
- **Development Team (คณะผู้จัดทำ):**
  - **สหกานต์ธีรา สังข์ขาว (ผักกาด)** — Product Owner & Frontend / Documentation Lead
  - **ปิยภัทร รัตนรักษ์ (พัตเตอร์)** — Backend & Data Architecture Lead
  - **อัษฎาวุธ เรือนแก้ว (กล้า)** — Full-Stack Integration & QA / DevOps Lead

---

## [Unreleased]

### Planned for Sprint 3 (v1.0.0) - Web Dashboard, Bilingual UI & GitHub Pages Deployment
*Target Release: Late September 2026 (สปรินต์ที่ 3: เว็บแดชบอร์ด, การรองรับสองภาษา และการดีพลอย)*

#### Added
- **Glassmorphism Web Dashboard (`index.html`, `web/index.html`):**
  - พัฒนาหน้าเว็บ Dashboard สไตล์ Glassmorphism (Frosted glass UI) ทันสมัย รองรับทั้ง Desktop, Tablet และ Mobile (Responsive Web Design)
  - Visual gauge cards สำหรับแสดงระดับดัชนีคุณภาพอากาศ (US AQI) พร้อม color-coding ตามมาตรฐาน EPA (เขียว, เหลือง, ส้ม, แดง, ม่วง, น้ำตาลแดง)
  - พยากรณ์สภาพอากาศล่วงหน้า (Hourly & Daily Weather Forecast) พร้อมไอคอนสภาพอากาศแบบไดนามิก
- **Bilingual Interface (TH/EN):**
  - ระบบสลับภาษา ไทย / อังกฤษ (Language Switcher) แบบ Real-time ครอบคลุมป้ายกำกับ, หน่วยวัด, คำแนะนำสุขภาพ (Health Advisory), และสถานะสภาพอากาศ
- **Client-Side Live API Fetching:**
  - ผสานการดึงข้อมูลสดผ่าน Open-Meteo API (Weather & Air Quality) ฝั่ง Browser โดยตรง ไม่จำเป็นต้องใช้ API Key เพิ่มความสะดวกและปลอดภัย
  - ระบบ Auto-refresh และ Caching ใน LocalStorage เพื่อลดการเรียก API ซ้ำซ้อน
- **Comprehensive Quality Assurance Documentation:**
  - `test_cases/TEST_CASES.md`: เอกสารกรณีทดสอบฉบับสมบูรณ์ (Functional, UI/UX, Edge Cases, Performance, Cross-browser testing)
  - `TEST.md`: รายงานสรุปผลการทดสอบ (Test Execution Report), Automated Test Coverage, และ Verification Criteria
- **Production Deployment:**
  - กำหนดค่า GitHub Actions CI/CD Pipeline สำหรับ Automated Build & Deploy สู่ GitHub Pages

---

### Planned for Sprint 2 (v0.2.0) - Report Generator, AI Health Advisory & Cloud Database Migration
*Target Release: Mid September 2026 (สปรินต์ที่ 2: ระบบรายงานผล, คำแนะนำสุขภาพด้วย AI และการย้ายฐานข้อมูลสู่ Cloud)*

#### Added
- **Visual Report Generator (`src/report_generator.py`):**
  - โมดูลสร้างกราฟสถิติด้วย Matplotlib แบบ Dual-Axis Chart เปรียบเทียบความสัมพันธ์ระหว่างอุณหภูมิ (°C) และค่าคุณภาพอากาศ (AQI) ในช่วงเวลาเดียวกัน
  - ฟังก์ชัน Export กราฟเป็นไฟล์รูปภาพ PNG คุณภาพสูงสำหรับทำรายงานและวิเคราะห์แนวโน้มสภาพอากาศ
  - รองรับการพลอตค่าเฉลี่ยรายวัน และการไฮไลต์โซนอันตราย (Unhealthy AQI Threshold bands)
- **AI-Powered Health Advisory Engine (`src/ai_advisory.py`):**
  - ระบบประมวลผลคำแนะนำด้านสุขภาพอัจฉริยะ (Context-Aware Health Advisory) ตามระดับความรุนแรงของมลพิษทางอากาศ (PM2.5 / PM10 / O3)
  - คำแนะนำเฉพาะกลุ่มเปราะบาง (Sensitive Groups) เช่น เด็ก, ผู้สูงอายุ, สตรีมีครรภ์ และผู้ป่วยโรคระบบทางเดินหายใจ
  - ระบบ Prompt Template สำหรับสังเคราะห์คำแนะนำเชิงลึกผ่าน Generative AI
- **GenAI Prompt Engineering Logs (`learning_log.ipynb`):**
  - บันทึกประวัติการออกแบบ Prompt, Few-Shot Examples, ข้อความตอบกลับของโมเดล AI, และการปรับแต่งพารามิเตอร์อย่างละเอียดใน Interactive Jupyter Notebook

#### Changed
- **Cloud Database Migration (SQLite -> Supabase PostgreSQL):**
  - ปรับปรุงคลาส `DataStore` เพื่อรองรับการเชื่อมต่อกับ Supabase PostgreSQL Cloud Database แทน SQLite เดิม
  - รองรับ Multi-client Concurrent Writing, Remote Querying, และการเชื่อมต่อผ่าน REST API / psycopg2
  - ปรับปรุง Connection Pooling และระบบ Auto-reconnect กรณีสูญเสียการเชื่อมต่อเครือข่าย

---

## [0.1.0] - 2026-09-08

### Sprint 1: Core OOP Foundation & SQLite CLI Architecture
*Released: 2026-09-08 (สปรินต์ที่ 1: โครงสร้างเชิงวัตถุพื้นฐานและแอปพลิเคชัน CLI ด้วย SQLite)*

#### Added
- **Core Object-Oriented Architecture (`src/`):**
  - **`src/weather_client.py` (`WeatherClient` class):**
    - พัฒนาคลาสเชื่อมต่อภายนอก (External API Integration) รองรับ OpenWeatherMap API สำหรับข้อมูลสภาพอากาศ (Temperature, Humidity, Pressure, Condition) และ IQAir AirVisual API สำหรับข้อมูลคุณภาพอากาศ (AQI, Main Pollutant)
    - ระบบ Defensive Fallback Mock Data: ออกแบบกลไกการรับมือข้อผิดพลาดแบบ Fail-Safe เมื่อเกิดปัญหา Network Timeout, API Key ไม่ถูกต้อง หรือโควตา API เต็ม โดยจะสลับไปใช้ข้อมูลสังเคราะห์ (Deterministic Mock Data) โดยอัตโนมัติ ทำให้ระบบไม่หยุดการทำงาน
  - **`src/data_store.py` (`DataStore` class):**
    - พัฒนาระบบจัดเก็บข้อมูลลง SQLite Database (`data/weather_data.db`)
    - สร้างตาราง `metrics` ประกอบด้วยคอลัมน์:
      - `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
      - `timestamp` (DATETIME DEFAULT CURRENT_TIMESTAMP)
      - `city` (TEXT NOT NULL)
      - `temp` (REAL)
      - `humidity` (REAL)
      - `pressure` (REAL)
      - `description` (TEXT)
      - `aqi` (INTEGER)
      - `aqi_category` (TEXT)
      - `main_pollutant` (TEXT)
    - ฟังก์ชัน `save_metric()` และ `get_recent_metrics()` สำหรับบันทึกและดึงข้อมูลย้อนหลังตามชื่อเมือง
  - **`src/cli_app.py` (`CLIApp` class):**
    - ส่วนติดต่อผู้ใช้ผ่าน Command Line Interface (CLI) แสดงผล Weather Card และ AQI Status ด้วย ASCII Box Art อย่างสวยงาม
    - การประมวลผลอินพุต (Input Normalization): จัดการข้อความค้นหาด้วย `.strip().lower()` เพื่อลดความผิดพลาดจากผู้ใช้
    - Health Advisory Rules: ระบบประเมินระดับความเสี่ยงสุขภาพตามเกณฑ์มาตรฐาน US AQI (Good, Moderate, Unhealthy for Sensitive Groups, Unhealthy, Very Unhealthy, Hazardous)
    - รายชื่อเมืองเริ่มต้นสำหรับตรวจสอบ (`DEFAULT_CITIES`):
      - Bangkok (กรุงเทพมหานคร)
      - Khon Kaen (ขอนแก่น)
      - Chiang Mai (เชียงใหม่)
      - Phuket (ภูเก็ต)
- **Application Entry Point (`main.py`):**
  - รองรับ **Interactive Mode** (`python main.py`) ให้ผู้ใช้เลือกดูข้อมูลเมืองเริ่มต้น หรือค้นหาเมืองที่ต้องการได้ตามต้องการ
  - รองรับ **Automated Demo Mode** (`python main.py --demo`) เพื่อรันสาธิตระบบอัตโนมัติ 4 เมืองหลัก พร้อมบันทึกข้อมูลลงฐานข้อมูลและแสดงผลสรุป เหมาะสำหรับการนำเสนอและตรวจสอบความสมบูรณ์ของระบบ
- **Unit Testing Suite (`tests/`):**
  - `tests/test_api.py`: ชุดทดสอบ 3 Test Cases สำหรับตรวจสอบ `WeatherClient`:
    1. ทดสอบการดึงข้อมูลสำเร็จและโครงสร้าง Response Schema
    2. ทดสอบ Fallback Mechanism เมื่อ Network ขัดข้อง
    3. ทดสอบความถูกต้องของการคำนวณและการจัดหมวดหมู่ AQI Category
  - `tests/test_db.py`: ชุดทดสอบ 1 Test Case สำหรับตรวจสอบวงจรชีวิตของ `DataStore` (Save & Fetch Cycle Validation):
    - ทดสอบการเชื่อมต่อ SQLite ในหน่วยความจำ (`:memory:`)
    - ทดสอบการ Insert ข้อมูลเมทริกซ์ และ Verify ข้อมูลที่อ่านกลับคืนมา
  - ผลการทดสอบ: ผ่าน 100% (4 passed out of 4 test cases) ผ่าน Pytest Framework
- **Project Structure & Best Practices:**
  - วางโครงสร้างโปรเจกต์แบบโมดูลาร์ แยกส่วน Logic (`src/`), Database Data (`data/`), และชุดทดสอบ (`tests/`) อย่างเป็นสัดส่วน
  - `requirements.txt`: กำหนด Package Dependencies พร้อมระบุ Version Constraints ขั้นต่ำ:
    - `requests>=2.31.0` (HTTP Client)
    - `matplotlib>=3.7.0` (Data Visualization)
    - `pytest>=7.4.0` (Test Framework)
    - `python-dotenv>=1.0.0` (Environment Variables Management)
    - `flake8>=6.0.0` (PEP 8 Linter & Code Style Enforcement)
  - `.gitignore`: ละเว้นไฟล์ที่ไม่จำเป็น เช่น `.env`, `*.db`, `__pycache__/`, `.pytest_cache/`, และ Virtual Environments (`venv/`, `.venv/`)
  - Documentation Assets:
    - `README.md`: รายละเอียดโปรเจกต์ สถาปัตยกรรม วิธีการติดตั้ง และคู่มือการใช้งาน CLI
    - `LEARNINGLOG.md`: บันทึกการเรียนรู้ กระบวนการพัฒนา และปัญหา-แนวทางแก้ไขในแต่ละ Sprint
    - `learning_log.ipynb`: Interactive Jupyter Notebook สาธิตขั้นตอนการทำงานและ Prompt Log

#### Changed
- ปรับโครงสร้างโค้ดให้สอดคล้องตามมาตรฐาน PEP 8 โดยผ่านการตรวจสอบด้วย `flake8` ไม่มีข้อผิดพลาด
- แยกการจัดการ Configuration และ Sensitive API Keys ผ่านไฟล์ `.env` เพื่อความปลอดภัยตามหลัก 12-Factor App

#### Fixed
- แก้ไขปัญหา API Rate Limiting ของ IQAir ฟรีเทียร์ โดยการเพิ่มแคชชั่วคราวและ Fallback data เพื่อป้องกันโปรแกรมแครชระหว่างรันการทดสอบ
- ป้องกันข้อผิดพลาด Case-sensitivity และ Whitespace เมื่อผู้ใช้พิมพ์ชื่อเมืองใน CLI เช่น `" Bangkok "` หรือ `"khon kaen"` ให้สามารถค้นหาได้อย่างถูกต้อง

---

## Versioning Policy
โครงการนี้ใช้ระบบ [Semantic Versioning 2.0.0](https://semver.org/):
- **MAJOR (x.0.0):** มีการเปลี่ยนแปลงสถาปัตยกรรมขนาดใหญ่ หรือการเปลี่ยนแปลงที่ไม่สามารถทำงานร่วมกับเวอร์ชันเดิมได้ (Incompatible changes เช่น Web Application Release)
- **MINOR (0.x.0):** เพิ่มฟีเจอร์ใหม่ที่ยังคงทำงานร่วมกับระบบเดิมได้ (Backwards-compatible features เช่น Report Generator, Cloud DB Migration)
- **PATCH (0.0.x):** แก้ไขบั๊กหรือปรับปรุงประสิทธิภาพเล็กน้อย (Backwards-compatible bug fixes)
