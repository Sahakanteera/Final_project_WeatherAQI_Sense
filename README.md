# WeatherAQI Sense — ระบบแดชบอร์ดติดตามสภาพอากาศและคุณภาพอากาศ

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)  
**หัวข้อ:** Weather & Air Quality Dashboard (ระบบแดชบอร์ดสภาพอากาศและคุณภาพอากาศ)  
**อาจารย์ผู้สอน:** ผศ. บุญสืบ ไวคำ  

---

## 👥 สมาชิกในทีมและการหมุนเวียนบทบาท (Role Rotation Matrix)

เพื่อให้สมาชิกทุกคนในทีมได้ฝึกฝนทั้ง 3 บทบาทหลัก (**Planner / Architect**, **Coder / Dev**, **Debugger / QA & DevOps**) ครบทุกคน 100%:

| สมาชิก | ชื่อเล่น | Sprint 1 : OOP & SQLite | Sprint 2 : AI, Report & Supabase | Sprint 3 : Web & Deployment |
| :--- | :---: | :---: | :---: | :---: |
| **นางสาวสหกานต์ธีรา สังข์ขาว** | ผักกาด | **Planner / Architect** | **Coder / Dev** | **Debugger / QA** |
| **นายปิยภัทร รัตนรักษ์** | พัตเตอร์ | **Coder / Dev** | **Debugger / QA** | **Planner / Architect** |
| **นายอัษฎาวุธ เรือนแก้ว** | กล้า | **Debugger / QA** | **Planner / Architect** | **Coder & DevOps** |

---

## ✨ สรุปฟีเจอร์ทั้งหมดของระบบ (Features Overview)

### 🟢 ฟีเจอร์ที่พัฒนาเสร็จแล้ว (Current Implemented Features - Sprint 1)
- 🌡️ **Weather & Air Quality Gateway (`src/weather_client.py`)**: ดึงข้อมูลอุณหภูมิ, ความชื้น, ความกดอากาศ, ดัชนี AQI และสารมลพิษหลัก (PM2.5) จาก OpenWeatherMap และ IQAir API
- 🛡️ **Defensive Programming & Fallback**: มีระบบ Mock Data สำรองอัตโนมัติเมื่อ API มีปัญหาหรือไม่มี API Key ป้องกันแอปพลิเคชันล่ม 100%
- 💾 **Local Database Persistence (`src/data_store.py`)**: จัดเก็บ snapshot ข้อมูลยั่งยืนลงในฐานข้อมูล SQLite3 (`data/weather_data.db`) พร้อมฟังก์ชันค้นหาประวัติย้อนหลัง
- 💻 **Interactive CLI Menu (`src/cli_app.py`)**: หน้าต่างโต้ตอบผ่าน Command Line ให้ผู้ใช้ป้อนชื่อเมือง ดูรายงานผล และเรียกดูประวัติข้อมูลบันทึกย้อนหลัง
- 🤖 **Automated Demo Mode (`main.py --demo`)**: โหมดรันสาธิตระบบอัตโนมัติสำหรับทดสอบการดึงข้อมูลและบันทึกข้อมูลหลายเมืองพร้อมกัน
- 📊 **ASCII Formatted Status Box**: วาดกรอบรายงานสภาพอากาศและคุณภาพอากาศด้วยตาราง ASCII บนคอนโซลได้อย่างสวยงามและจัดระเบียบอ่านง่าย
- 🏥 **Health & Temp Advisory**: คำนวณระดับความเสี่ยง AQI ให้คำแนะนำสุขภาพ การออกกำลังกายกลางแจ้ง และแจ้งเตือนเมื่ออุณหภูมิสูงเกินเกณฑ์
- 🧪 **Automated Test Coverage (`tests/`)**: มีชุดทดสอบระบบด้วย `pytest` ครอบคลุมทั้ง API Gateway และ SQLite Database (Pass 100%)

### 🟡 ฟีเจอร์ตามแผนงานที่จะพัฒนาใน Sprint ถัดไป (Planned Features Roadmap)
- ☁️ **Cloud Database Migration (Sprint 2)**: ย้ายการจัดเก็บข้อมูลจาก Local SQLite ไปยัง Cloud Database (Supabase PostgreSQL)
- 📈 **Dual-Axis Chart Generator (Sprint 2)**: ระบบส่งออกภาพกราฟวิเคราะห์เปรียบเทียบ Temp vs AQI ย้อนหลังด้วย Matplotlib (`src/report_generator.py`)
- 🧠 **AI Health Advisory Module (Sprint 2)**: ระบบประมวลผลคำแนะนำสุขภาพและกิจกรรมกลางแจ้งเชิงลึกด้วย LLM/GenAI (`src/ai_advisory.py`)
- 🌐 **Web Dashboard Interface (Sprint 3)**: หน้าเว็บแดชบอร์ดสไตล์ Glassmorphism UI ดึงข้อมูล Live API บนเบราว์เซอร์ (`index.html`)
- 🌐 **Bilingual UI Support (Sprint 3)**: สลับภาษาในการแสดงผลหน้าเว็บได้ 2 ภาษา (ไทย/อังกฤษ - TH/EN Toggle)
- 🚀 **GitHub Pages Deployment (Sprint 3)**: ระบบ CI/CD จัดส่งหน้าเว็บอัตโนมัติไปยัง GitHub Pages (`.github/workflows/static.yml`)

---

## 📅 แผนการทำงานภาพรวม (3 Sprints Roadmap)

### **Sprint 1: Core System Foundation & OOP CLI Architecture**
* **เป้าหมาย:** สร้างรากฐานสถาปัตยกรรมเชิงวัตถุ (OOP) ระบบจัดเก็บข้อมูล Local SQLite และ CLI Interface
* **รายละเอียดงาน:**
  - `src/weather_client.py`: ดึงข้อมูล Weather & AQI พร้อมระบบ Defensive Fallback Mock Data
  - `src/data_store.py`: จัดเก็บข้อมูลยั่งยืนลง Local SQLite Database (`data/weather_data.db`)
  - `src/cli_app.py` & `main.py`: หน้าต่างปฏิสัมพันธ์ Command Line Interface และโหมด `--demo`
  - `tests/test_api.py` & `tests/test_db.py`: ชุดทดสอบระบบอัตโนมัติ (Automated pytest)

### **Sprint 2: Report Generator, AI Health Advisory & Cloud Database Migration (Supabase)**
* **เป้าหมาย:** ย้ายการจัดเก็บข้อมูลสู่ Cloud Database (Supabase PostgreSQL), เพิ่มโมดูลวิเคราะห์ข้อมูล กราฟ และระบบคำแนะนำสุขภาพ AI
* **รายละเอียดงาน:**
  - **Cloud Database (Supabase):** ไมเกรตฐานข้อมูลจาก Local SQLite ไปใช้ **Cloud Database (Supabase PostgreSQL)** รองรับการจัดเก็บข้อมูลออนไลน์และเชื่อมต่อหลายอุปกรณ์
  - `src/report_generator.py`: พล็อตกราฟ Dual-Axis เปรียบเทียบ Temp vs AQI ด้วย Matplotlib
  - `src/ai_advisory.py`: ระบบประมวลผลคำแนะนำสุขภาพและกิจกรรมกลางแจ้งตามระดับ AQI
  - `learning_log.ipynb` & `LEARNINGLOG.md`: บันทึก Gen AI Prompt Logs

### **Sprint 3: Web Dashboard, Bilingual UI & GitHub Pages Deployment**
* **เป้าหมาย:** พัฒนาหน้าแดชบอร์ดบนเว็บ สองภาษา และระบบส่งมอบงานผ่าน GitHub Pages
* **รายละเอียดงาน:**
  - `index.html` & `web/index.html`: หน้าเว็บแดชบอร์ดสไตล์ Glassmorphism รองรับสองภาษา (TH/EN Toggle)
  - Live Open-Meteo API Fetching แบบ Real-time บนเบราว์เซอร์
  - `test_cases/TEST_CASES.md` & `TEST.md`: บันทึกกรณีทดสอบระบบครบถ้วน
  - `.github/workflows/static.yml`: Deployment อัตโนมัติไปยัง GitHub Pages

---

## 🛠️ รายละเอียดการทำงานและผลลัพธ์ของ Sprint 1 (Sprint 1 Implementation & Results)

### 1. **สถาปัตยกรรมและหลักการออกแบบ (OOP Architecture & Agile Principles)**
- **โครงสร้างสถาปัตยกรรมเชิงวัตถุ (OOP):** แบ่งภาระหน้าที่ของแต่ละโมดูลอย่างชัดเจน (Separation of Concerns) ตามหลัก Single Responsibility Principle (SRP)
- **การใช้ Agile Kanban:** กำหนดข้อจำกัดงานในหมวด *In Progress* (**WIP Limit = 2**) เพื่อควบคุมขั้นตอนการพัฒนาและทำ Unit Test ก่อนส่งมอบทุกครั้ง

### 2. **โมดูลหลักใน Sprint 1 (Core Components)**
1. **`src/weather_client.py` (`WeatherClient`):**
   - ทำหน้าที่เป็น Client Gateway สำหรับรับชื่อเมือง (เช่น `Khon Kaen`, `Bangkok`, `Chiang Mai`) 
   - รวบรวมข้อมูลอุณหภูมิ สภาพอากาศ ฝุ่น PM2.5 และดัชนีคุณภาพอากาศ (AQI)
   - มีระบบ **Defensive Fallback Mock Data** ป้องกันแอปพลิเคชันล่มกรณีไม่สามารถเชื่อมต่อเครือข่ายได้
2. **`src/data_store.py` (`DataStore`):**
   - จัดเก็บข้อมูลยั่งยืน (Persistence Storage) ลงฐานข้อมูล **SQLite3** (`data/weather_data.db`)
   - สร้างตาราง `weather_records` อัตโนมัติ จัดเก็บ Timestamp, เมือง, อุณหภูมิ, AQI, สารมลพิษหลัก และคำอธิบาย
   - ให้บริการคำสั่งดึงประวัติย้อนหลัง `fetch_all_records(limit=20)`
3. **`src/cli_app.py` (`CLIApp`):**
   - หน้าต่างปฏิสัมพันธ์ Command Line Interface (CLI) รับอินพุต ปรับข้อความด้วย `.strip().lower()`
   - วาดการ์ดแสดงผลด้วยกรอบตาราง ASCII ที่รองรับการแสดงผลบนคอนโซล Windows (CP874/UTF-8) ได้อย่างไร้ข้อผิดพลาด
   - ประมวลผลคำแนะนำสุขภาพและอุณหภูมิเบื้องต้น
4. **`main.py` (Main Controller):**
   - จุดเริ่มต้นหลักของแอปพลิเคชัน รองรับทั้ง **Interactive Mode** (`python main.py`) และ **Automated Demo Mode** (`python main.py --demo`)

### 3. **ผลลัพธ์การทดสอบและการวัดผล (Verification & Test Results)**
* **ผลการรันชุดทดสอบอัตโนมัติ (`pytest`):**
  - สอบทานความถูกต้องของ `tests/test_api.py` (3 test cases) และ `tests/test_db.py` (1 test case)
  - **ผลลัพธ์:** **Passed 4/4 (100% Pass Rate)** ในเวลา 0.38 วินาที
* **ตัวอย่างการแสดงผลกรอบรายงานใน CLI (Output Result):**
  ```text
  +---------------------------------------------------------------+
  |  WEATHER & AIR QUALITY REPORT - KHON KAEN                     |
  +---------------------------------------------------------------+
  | Timestamp       : 2026-09-11 22:44:06                         |
  | Temperature     : 30.2 C (Sunny                       )       |
  | Humidity        : 62.0 %                                      |
  | Air Quality AQI : 42  (Good                            )       |
  | Main Pollutant  : PM2.5                                       |
  +---------------------------------------------------------------+
  | HEALTH ADVISORY : Air quality is satisfactory.                |
  | TEMP ADVISORY   : Temperature is comfortable.                 |
  +---------------------------------------------------------------+
  ```

---

## 💻 วิธีการติดตั้งและรันโปรแกรม

```bash
# 1. ติดตั้ง Dependencies
pip install -r requirements.txt

# 2. รันโปรแกรมในโหมดโต้ตอบ (Interactive CLI)
python main.py

# 3. รันโปรแกรมในโหมดการสาธิตสดอัตโนมัติ (Automated Demo Mode)
python main.py --demo

# 4. รันชุดทดสอบระบบอัตโนมัติ (Automated Testing)
pytest
```
