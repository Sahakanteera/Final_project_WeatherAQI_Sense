# 📦 Sprint 1: Front-End App Dev & Architecture Skeleton

**ส่งงาน:** สัปดาห์ที่ 12 (15-16/9/2569) | **กำหนดส่ง:** 18/9/2569

---

## 🎯 เป้าหมาย Sprint 1
สร้างโครงสร้าง OOP CLI Application พร้อมระบบดึงข้อมูล Weather & AQI แบบ Interactive

---

## ✅ Deliverables ที่ส่งมอบ

### 1. OOP Class Architecture (Skeleton)
| คลาส | ไฟล์ | หน้าที่ |
|:---|:---|:---|
| `WeatherClient` | `src/weather_client.py` | ดึงข้อมูลสภาพอากาศ + AQI จาก API พร้อม Defensive Fallback |
| `DataStore` | `src/data_store.py` | จัดเก็บข้อมูลลง SQLite3 (Create + Read) |
| `AIAdvisory` | `src/ai_advisory.py` | คำแนะนำสุขภาพตามระดับ AQI + อุณหภูมิ |
| `ReportGenerator` | `src/report_generator.py` | สร้างกราฟ Matplotlib |
| `CLIApp` | `src/cli_app.py` | เมนู Interactive CLI |

### 2. CLI Interface
- เมนู 5 ตัวเลือก (Fetch, View History, Chart, Web, Exit)
- รับชื่อเมืองจาก user input
- แสดง ASCII Box Report ข้อมูล snapshot
- แสดงคำแนะนำสุขภาพเบื้องต้น

### 3. SQLite Persistence
- ตาราง `metrics` — เก็บ timestamp, city, temp, humidity, pressure, description, aqi, main_pollutant
- Create + Read (INSERT + SELECT) ทำงานได้

### 4. Defensive Fallback
- เมื่อ API ล้มเหลว ระบบสลับมาใช้ข้อมูลจำลอง (Mock Data) อัตโนมัติ — โปรแกรมไม่พัง

### 5. Unit Tests (22/22 Passed — 100% PASSED)
- `tests/test_api.py` — ทดสอบ WeatherClient API fallback (3 เทส)
- `tests/test_cli.py` — ทดสอบ get_simple_advisory (9 เทส) + CLIApp controller (9 เทส) รวม 18 เทส
- `tests/test_db.py` — ทดสอบ DataStore SQLite CRUD (1 เทส)
> รันคำสั่ง `pytest tests/test_api.py tests/test_cli.py tests/test_db.py -v` → **22 passed** ตรงตามผลการทดสอบในสไลด์นำเสนอ Sprint 1 เป๊ะ

### 6. โหมดสาธิต
- `python main.py --demo` — รันโหมด demo อัตโนมัติ

---

## 👥 บทบาทสมาชิก Sprint 1

| สมาชิก | บทบาท | งานที่ทำ |
|:---|:---:|:---|
| **ผักกาด** | Planner | ออกแบบ OOP Architecture, กำหนด Database Schema, วาง Kanban Board |
| **พัตเตอร์** | Coder | เขียน CLI Menu, WeatherClient API, DataStore SQLite |
| **กล้า** | Debugger | สร้าง Unit Tests, ตรวจ Input Validation, จัดการ Fallbacks |

---

## 📝 Changelog — Sprint 1

### [v0.1.0] - Sprint 1: Front-End App Dev & Architecture Skeleton
#### Added
- Initialized project directory structure with `src/`, `tests/`, `data/`
- Created OOP class skeletons for `WeatherClient`, `DataStore`, `ReportGenerator`, `AIAdvisory`, and `CLIApp`
- Implemented defensive input normalization (`.strip().lower()`) in CLI controller
- Added automated unit tests (`tests/test_api.py`, `tests/test_db.py`, `tests/test_reports.py`)
- Added automated demo mode (`python main.py --demo`)

---

## 📂 ไฟล์ที่เกี่ยวข้อง
```
src/
├── weather_client.py    ← API Gateway + Defensive Fallback
├── data_store.py        ← SQLite Persistence (Create + Read)
├── ai_advisory.py       ← Health Advisory (Rule-Based)
├── report_generator.py  ← Matplotlib Chart Generator
└── cli_app.py           ← Interactive CLI Menu

tests/
├── test_api.py          ← API Unit Tests (3 tests)
├── test_cli.py          ← CLI & Advisory Unit Tests (18 tests)
└── test_db.py           ← Database Unit Tests (1 test)

main.py                  ← Entry Point (--demo mode)
README.md                ← Project Overview
FLOWCHART.md             ← Architecture Diagram (Mermaid)
```
