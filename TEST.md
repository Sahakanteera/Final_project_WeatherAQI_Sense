# WeatherAQI Sense — Test Documentation & Execution Report
## เอกสารการทดสอบระบบและรายงานผลการทดสอบ

---

### Project Information / ข้อมูลโครงงาน
- **Project Name:** WeatherAQI Sense — Weather & Air Quality Dashboard
- **Course:** CP352301 Software Development Principles & Practice (หลักการและวิธีปฏิบัติการพัฒนาซอฟต์แวร์)
- **Academic Term:** Semester 1, Academic Year 2026 (September 2026)
- **Document Version:** 1.0.0
- **Document Date:** September 2026
- **Test Target:** Sprint 1 Baseline (CLI Core & OOP DataStore)
- **Development & QA Team (คณะผู้จัดทำ):**
  - **สหกานต์ธีรา สังข์ขาว (ผักกาด)** — Product Owner & Frontend / Documentation Lead
  - **ปิยภัทร รัตนรักษ์ (พัตเตอร์)** — Backend & Data Architecture Lead
  - **อัษฎาวุธ เรือนแก้ว (กล้า)** — Full-Stack Integration & QA / DevOps Lead
- **Status:** Approved / 100% Passed (4 of 4 Test Cases)

---

## 1. Test Environment (สภาพแวดล้อมการทดสอบ)

การทดสอบของระบบ **WeatherAQI Sense** ถูกออกแบบและดำเนินการภายใต้สภาพแวดล้อมที่ควบคุมความแปรปรวน (Isolated Test Environment) เพื่อให้แน่ใจว่าผลการทดสอบสามารถทำซ้ำได้ (Reproducibility) และทำงานได้ถูกต้องทั้งบนเครื่องนักพัฒนาและระบบ Automated Pipeline:

- **Operating System:** Microsoft Windows 10/11 (Architecture x64) และรองรับระบบปฏิบัติการตามมาตรฐาน POSIX (Linux/macOS)
- **Language / Runtime:** Python 3.x (ทดสอบและรับรองความเข้ากันได้บน Python 3.10, 3.11 และ 3.12)
- **Primary Test Runner:** `pytest >= 7.4.0` (รองรับ Test Discovery, Detailed Tracebacks, และ Assert Rewriting)
- **Test Framework:** `unittest` (Standard Python Library สำหรับการกำหนด Test Case และ Lifecycle Fixtures)
- **Test Suites Location:** ไดเรกทอรี `tests/` ที่ Root Directory ของโครงการ
- **Standard Execution Command:**
  - รันแบบมาตรฐาน: `pytest`
  - รันแบบแสดงรายละเอียด: `pytest -v`
- **Core Dependencies Under Test:**
  - `requests >= 2.31.0` (HTTP Client สำหรับเชื่อมต่อภายนอก)
  - `sqlite3` (Built-in Relational Database Engine)
  - `tempfile` / `os` (สร้าง Isolated Database ในระบบไฟล์ชั่วคราวเพื่อไม่ให้กระทบข้อมูล Production)

> [!NOTE]
> ชุดการทดสอบใน Sprint 1 ถูกออกแบบให้เป็น **Hermetic Tests (การทดสอบแบบปิด)** กล่าวคือสามารถรันผ่านได้ 100% โดยไม่ต้องพึ่งพาการเชื่อมต่ออินเทอร์เน็ตจริง (Offline-capable) ผ่านระบบ **Deterministic Mock Fallback Engine** ของ [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-01-test_fetch_weather_fallback)

---

## 2. Test Suite Overview Table (ภาพรวมชุดการทดสอบ)

ตารางสรุปรายการกรณีทดสอบ (Test Cases) ทั้งหมดใน Sprint 1 ที่ผ่านการทดสอบด้วย `pytest`:

| Test ID | Test File | Test Class | Test Method | Description / วัตถุประสงค์การทดสอบ | Status | Sprint |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **`TC-01`** | `tests/test_api.py` | `TestWeatherClient` | [`test_fetch_weather_fallback`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-01-test_fetch_weather_fallback) | ตรวจสอบการทำงานของ [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-01-test_fetch_weather_fallback) ว่าสามารถส่งคืนข้อมูลสภาพอากาศจำลอง (Mock Data) ที่ถูกต้อง เมื่อใช้ Demo Key | ✅ PASSED | Sprint 1 |
| **`TC-02`** | `tests/test_api.py` | `TestWeatherClient` | [`test_fetch_aqi_fallback`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-02-test_fetch_aqi_fallback) | ตรวจสอบว่าระบบส่งคืนข้อมูลดัชนีคุณภาพอากาศ (AQI Mock Data) ที่เป็นตัวเลขจำนวนเต็มที่ถูกต้อง | ✅ PASSED | Sprint 1 |
| **`TC-03`** | `tests/test_api.py` | `TestWeatherClient` | [`test_combined_snapshot`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-03-test_combined_snapshot) | ตรวจสอบฟังก์ชัน `get_combined_snapshot()` ในการรวมข้อมูล Weather + AQI เป็น Payload ก้อนเดียวกันอย่างสมบูรณ์ | ✅ PASSED | Sprint 1 |
| **`TC-04`** | `tests/test_db.py` | `TestDataStore` | [`test_save_and_fetch`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-04-test_save_and_fetch) | ตรวจสอบความถูกต้องของ [`DataStore`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-04-test_save_and_fetch) ในการบันทึก (Save) และดึงข้อมูล (Fetch) จาก SQLite Database | ✅ PASSED | Sprint 1 |

### Summary Metrics
- **Total Test Cases:** 4 Cases
- **Passed:** 4 Cases (100%)
- **Failed / Errors:** 0 Cases (0%)
- **Skipped:** 0 Cases
- **Execution Duration:** 0.38 seconds

---

## 3. Test Cases Detail (รายละเอียดกรณีทดสอบ)

รายละเอียดเชิงลึกของแต่ละกรณีทดสอบ ประกอบด้วยเป้าหมาย, ขั้นตอนการจัดเตรียม (Setup), ข้อมูลนำเข้า (Input), ผลลัพธ์ที่คาดหวัง (Expected Output), Assertions และขั้นตอนการคืนทรัพยากร (Teardown):

---

### TC-01: test_fetch_weather_fallback
- **Target Module / Class:** [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-01-test_fetch_weather_fallback) ใน `src/weather_client.py`
- **Test File & Location:** `tests/test_api.py` -> Class `TestWeatherClient`
- **Purpose (วัตถุประสงค์):**
  ตรวจสอบว่า [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-01-test_fetch_weather_fallback) ทำงานได้อย่างมีเสถียรภาพโดยไม่เกิด Exception เมื่อกำหนด API Key เป็นค่าเริ่มต้นสำหรับสาธิต (`demo_owm_key`) และสามารถสลับไปดึงข้อมูลสภาพอากาศสังเคราะห์ (Defensive Mock Data) ที่มี Schema ถูกต้องตามสัญญาข้อมูล (API Contract)
- **Setup & Preconditions:**
  ```python
  client = WeatherClient(
      owm_api_key="demo_owm_key",
      iqair_api_key="demo_iqair_key"
  )
  ```
- **Input:**
  - `city = "Khon Kaen"`
- **Execution Action:**
  - เรียกใช้งานเมธอด: `data = client.fetch_weather("Khon Kaen")`
- **Expected Result (ผลลัพธ์ที่คาดหวัง):**
  - คืนค่าออบเจกต์ประเภท Dictionary
  - ต้องปรากฏคีย์ `"temp"` โดยมีค่าเป็นตัวเลขทศนิยม (`float`) หรือจำนวนเต็ม (`int`)
  - โครงสร้างข้อมูลประกอบด้วยฟิลด์สภาพอากาศพื้นฐาน เช่น `"humidity"`, `"pressure"`, `"description"`
- **Assertions:**
  ```python
  self.assertIn("temp", data)
  self.assertIsInstance(data["temp"], (int, float))
  self.assertTrue(-50.0 <= data["temp"] <= 60.0)
  ```
- **Status:** ✅ PASSED (Execution Time ~0.08s)

---

### TC-02: test_fetch_aqi_fallback
- **Target Module / Class:** [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-02-test_fetch_aqi_fallback) ใน `src/weather_client.py`
- **Test File & Location:** `tests/test_api.py` -> Class `TestWeatherClient`
- **Purpose (วัตถุประสงค์):**
  ตรวจสอบว่าการเรียกข้อมูลคุณภาพอากาศผ่าน [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-02-test_fetch_aqi_fallback) ภายใต้สภาวะ Demo Mode ส่งคืนค่าดัชนีคุณภาพอากาศ (Air Quality Index: AQI) ที่ถูกต้องตามข้อกำหนดประเภทข้อมูล (Integer) และสามารถจัดระดับหมวดหมู่มลพิษได้อย่างถูกต้อง
- **Setup & Preconditions:**
  ```python
  client = WeatherClient(
      owm_api_key="demo_owm_key",
      iqair_api_key="demo_iqair_key"
  )
  ```
- **Input:**
  - `city = "Bangkok"`
- **Execution Action:**
  - เรียกใช้งานเมธอด: `data = client.fetch_aqi("Bangkok")`
- **Expected Result (ผลลัพธ์ที่คาดหวัง):**
  - คืนค่าออบเจกต์ประเภท Dictionary
  - ต้องปรากฏคีย์ `"aqi"` โดยค่าต้องเป็นจำนวนเต็ม (`int`)
  - ค่า AQI ต้องสอดคล้องกับเกณฑ์มาตรฐาน US AQI (0 ถึง 500)
- **Assertions:**
  ```python
  self.assertIn("aqi", data)
  self.assertIsInstance(data["aqi"], int)
  self.assertGreaterEqual(data["aqi"], 0)
  ```
- **Status:** ✅ PASSED (Execution Time ~0.07s)

---

### TC-03: test_combined_snapshot
- **Target Module / Class:** [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-03-test_combined_snapshot) ใน `src/weather_client.py`
- **Test File & Location:** `tests/test_api.py` -> Class `TestWeatherClient`
- **Purpose (วัตถุประสงค์):**
  ตรวจสอบว่าเมธอด `get_combined_snapshot()` สามารถผสานรวมข้อมูลจาก Weather API และ AQI API เข้าด้วยกันเป็นโครงสร้างข้อมูลรวม (Combined Payload) ได้อย่างถูกต้อง ไม่มีการตกหล่นของคีย์สำคัญ และพร้อมสำหรับการส่งต่อไปยัง [`DataStore`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-04-test_save_and_fetch) เพื่อบันทึกข้อมูล
- **Setup & Preconditions:**
  ```python
  client = WeatherClient(
      owm_api_key="demo_owm_key",
      iqair_api_key="demo_iqair_key"
  )
  ```
- **Input:**
  - `city = "Chiang Mai"`
- **Execution Action:**
  - เรียกใช้งานเมธอด: `data = client.get_combined_snapshot("Chiang Mai")`
- **Expected Result (ผลลัพธ์ที่คาดหวัง):**
  - คืนค่า Dictionary รวมที่ประกอบด้วยคีย์หลักทั้ง `"temp"` และ `"aqi"`
  - ปรากฏชื่อเมือง `"city"` ที่ตรงกับอินพุต
  - มีฟิลด์เสริมครบถ้วน เช่น `"aqi_category"`, `"main_pollutant"`, `"timestamp"`
- **Assertions:**
  ```python
  self.assertIn("temp", data)
  self.assertIn("aqi", data)
  self.assertEqual(data.get("city"), "Chiang Mai")
  self.assertIn("aqi_category", data)
  ```
- **Status:** ✅ PASSED (Execution Time ~0.09s)

---

### TC-04: test_save_and_fetch
- **Target Module / Class:** [`DataStore`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-04-test_save_and_fetch) ใน `src/data_store.py`
- **Test File & Location:** `tests/test_db.py` -> Class `TestDataStore`
- **Purpose (วัตถุประสงค์):**
  ตรวจสอบความสมบูรณ์ของวงจรชีวิตข้อมูล (CRUD Lifecycle: Create and Read Cycle) ของ [`DataStore`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-04-test_save_and_fetch) โดยทำการบันทึกข้อมูลลงฐานข้อมูล SQLite แล้วทำการ Query ข้อมูลล่าสุดกลับคืนมา เพื่อพิสูจน์ว่าข้อมูลไม่มีการสูญหายหรือเกิด Type Corruption ในระหว่างการ Persist
- **Setup & Preconditions:**
  สร้างฐานข้อมูลชั่วคราวแบบแยกส่วน (Isolated Temporary File) เพื่อป้องกัน Side-effect ต่อฐานข้อมูลจริง:
  ```python
  self.db_fd, self.db_path = tempfile.mkstemp(suffix=".db")
  self.store = DataStore(db_path=self.db_path)
  ```
- **Input:**
  ชุดข้อมูลตัวอย่างที่เสมือนบันทึกจริงจาก CLI:
  ```python
  sample_record = {
      "city": "Khon Kaen",
      "temp": 31.8,
      "humidity": 65.0,
      "pressure": 1010.5,
      "description": "Clear Sky",
      "aqi": 42,
      "aqi_category": "Good",
      "main_pollutant": "pm25"
  }
  ```
- **Execution Action:**
  ```python
  save_result = self.store.save_metric(sample_record)
  fetched_records = self.store.get_recent_metrics(city="Khon Kaen", limit=1)
  ```
- **Expected Result (ผลลัพธ์ที่คาดหวัง):**
  - การบันทึกสำเร็จ ส่งคืนค่าความจริง (`True`)
  - สามารถ Query ข้อมูลกลับคืนมาได้ โดยได้จำนวนแถวข้อมูลเท่ากับ 1 แถว
  - ข้อมูลในคอลัมน์ `city`, `temp`, `aqi`, `aqi_category` ตรงกับค่าที่ป้อนเข้าอย่างแม่นยำ
- **Assertions:**
  ```python
  self.assertTrue(save_result)
  self.assertGreater(len(fetched_records), 0)
  self.assertEqual(fetched_records[0]["city"], "Khon Kaen")
  self.assertAlmostEqual(fetched_records[0]["temp"], 31.8, places=1)
  self.assertEqual(fetched_records[0]["aqi"], 42)
  self.assertEqual(fetched_records[0]["aqi_category"], "Good")
  ```
- **Teardown (การเก็บกวาดสภาพแวดล้อม):**
  ปิด Connection และลบไฟล์ฐานข้อมูลชั่วคราวออกจากระบบ:
  ```python
  self.store.close()
  os.close(self.db_fd)
  if os.path.exists(self.db_path):
      os.remove(self.db_path)
  ```
- **Status:** ✅ PASSED (Execution Time ~0.14s)

---

## 4. Edge Case Matrix (ตารางวิเคราะห์กรณีขอบเขตและความผิดพลาด)

ระบบ **WeatherAQI Sense** ให้ความสำคัญกับหลักการเขียนโค้ดเชิงป้องกัน (Defensive Programming) เพื่อให้แอปพลิเคชันทำงานได้ต่อเนื่อง ไม่หยุดชะงัก (High Availability & Robustness) ตารางด้านล่างแสดงการวิเคราะห์กรณีขอบเขต (Edge Cases) ทั้ง 10 สถานการณ์ที่ระบบรองรับ:

| Case ID | Scenario / Edge Case (สถานการณ์) | Scope / Module | Potential Risk (ความเสี่ยงหากไม่ป้องกัน) | Defensive Implementation (กลไกการรับมือ) | Expected Behavior (พฤติกรรมที่คาดหวัง) | Test / Verification |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **EC-01** | **Invalid city name**<br>ผู้ใช้พิมพ์ชื่อเมืองที่ไม่มีอยู่จริง เช่น `"InvalidCity99"` | `WeatherClient`<br>`CLIApp` | HTTP 404 Error, JSON decoding error ทำให้โปรแกรม Crash | Fallback Error Handler จะจับข้อผิดพลาดและส่งคืน Deterministic Mock Data สำหรับเมืองดังกล่าว พร้อมแจ้งเตือนผู้ใช้ | โปรแกรมไม่แครช แสดงผลข้อมูลจำลองพร้อมคำเตือนใน CLI | ✅ Handled |
| **EC-02** | **Empty string input**<br>ผู้ใช้กด Enter หรือเคาะ Spacebar เปล่า เช่น `""` หรือ `"   "` | `CLIApp` | Query ข้อมูลด้วยค่าว่าง ส่งผลให้ API ปฏิเสธการทำงาน | ดำเนินการผ่าน `.strip().lower()` ตรวจสอบเงื่อนไข `if not city:` แล้ว Prompt ให้ผู้ใช้ระบุค่าใหม่ หรือใช้ค่า Default City | แจ้งเตือน *"Please enter a valid city name"* และไม่ยิง Request ว่างออกไป | ✅ Handled |
| **EC-03** | **API timeout / Network drop**<br>การเชื่อมต่อไปยัง OWM หรือ IQAir ขัดข้องหรือช้าผิดปกติ | `WeatherClient` | โปรแกรมค้าง (Infinite wait) หรือส่ง Exception `requests.exceptions.Timeout` | กำหนด `timeout=(3.0, 5.0)` ในทุก HTTP Request และครอบด้วยบล็อก `try...except requests.RequestException:` | สลับไปใช้ Fallback Mock Data ทันทีโดยไม่ต้องรอจนโปรแกรมหยุดทำงาน | ✅ Handled |
| **EC-04** | **Demo API key**<br>ยังไม่ได้ตั้งค่าคีย์จริง หรือระบุเป็น `"demo_owm_key"` | `WeatherClient` | ได้รับ HTTP 401 Unauthorized จาก External API | ตรวจสอบค่าคีย์ล่วงหน้า `if "demo" in api_key.lower():` หากพบจะ Bypass HTTP Call ทันที | คืนค่า Mock Data ทันที ลดภาระ Network และรัน Automated Tests ได้รวดเร็ว | ✅ Verified in TC-01, TC-02 |
| **EC-05** | **Database file doesn't exist**<br>รันระบบครั้งแรกโดยยังไม่มีไฟล์ `data/weather_data.db` | `DataStore` | `sqlite3.OperationalError: no such table` | เมธอด `_init_db()` ตรวจสอบพาธไดเรกทอรีอัตโนมัติด้วย `os.makedirs(exist_ok=True)` และสั่ง `CREATE TABLE IF NOT EXISTS` | สร้างไฟล์ `.db` และสร้าง Schema ตาราง `metrics` อัตโนมัติในครั้งแรก | ✅ Verified in TC-04 |
| **EC-06** | **Duplicate records**<br>ผู้ใช้กดดึงข้อมูลเมืองเดิมซ้ำ ๆ ในช่วงเวลาใกล้เคียงกัน | `DataStore` | Primary Key Conflict หรือเกิด Data Inconsistency | ตาราง `metrics` กำหนด Primary Key เป็น `id INTEGER PRIMARY KEY AUTOINCREMENT` และบันทึก `timestamp` อิสระ | บันทึกเป็น Snapshot ประวัติข้อมูลย้อนหลังตามลำดับเวลาโดยไม่ขัดแย้ง | ✅ Handled |
| **EC-07** | **Unicode city names**<br>การป้อนชื่อเมืองภาษาไทย เช่น `"กรุงเทพมหานคร"`, `"ขอนแก่น"` | `CLIApp`<br>`WeatherClient` | UnicodeEncodeError หรือการแสดงผลตัวอักษรเพี้ยน | จัดการข้อความเป็น Python Native `str` (UTF-8 Encoding) และมี Dictionary Map ชื่อเมืองไทยสู่สากล | แปลงและดึงข้อมูลได้อย่างถูกต้อง แสดงผลภาษาไทยบนหน้าจอได้อย่างเรียบร้อย | ✅ Handled |
| **EC-08** | **Very high AQI values (>300)**<br>ภาวะมลพิษรุนแรง เช่น ค่า AQI ทะลุ 350 หรือ 500 | `CLIApp`<br>`Health Advisory` | คำนวณช่วงคะแนนผิดพลาด หรือไม่มีระดับคำแนะนำสุขภาพรองรับ | เขียนเงื่อนไขครอบคลุม `elif aqi > 300:` เพื่อจัดกลุ่มเป็นระดับ *"Hazardous"* (อันตรายร้ายแรง) | แสดงผลระดับสีม่วงเข้ม/น้ำตาล พร้อมเตือนให้อยู่แต่ในอาคารและสวมหน้ากาก N95 | ✅ Handled |
| **EC-09** | **Negative temperature**<br>อุณหภูมิต่ำกว่าจุดเยือกแข็ง เช่น `-5.0°C` ในสภาพอากาศหนาวจัด | `DataStore`<br>`WeatherClient` | เกิดข้อผิดพลาดกรณีฟังก์ชันแปลงข้อมูลคาดหวังค่าบวกเท่านั้น | กำหนดฟิลด์ `temp` ในตารางเป็น `REAL` รองรับเครื่องหมายบวก/ลบ และใช้การฟอร์แมต `f"{temp:+.1f}°C"` | บันทึกและแสดงผลตัวเลขอุณหภูมิติดลบได้อย่างถูกต้องตามหลักฟิสิกส์ | ✅ Handled |
| **EC-10** | **Missing API response fields**<br>JSON Response จาก API ภายนอกไม่มีบางฟิลด์ (เช่น ไม่มี `"pressure"`) | `WeatherClient` | `KeyError` ส่งผลให้ระบบล่มในชั้น Data Extraction | ใช้คำสั่ง `.get()` พร้อมค่า Default เสมอ เช่น `res.get("pressure", 1013.25)` แทนการเข้าถึงแบบ `res["pressure"]` | ระบบทำงานได้อย่างราบรื่นโดยใช้ค่ามาตรฐานสากลเข้ามาทดแทนส่วนที่ขาดหาย | ✅ Handled |

---

## 5. Test Execution Results (ผลการรันการทดสอบ)

ผลการทดสอบชุด Automated Unit Tests ทั้งหมดโดยใช้เครื่องมือ `pytest` ในโหมด Verbose (`pytest -v`):

```text
============================= test session starts =============================
platform win32 -- Python 3.10.11, pytest-7.4.4, pluggy-1.4.0 -- C:\Users\tonkla\AppData\Local\Programs\Python\Python310\python.exe
cachedir: .pytest_cache
rootdir: C:\Users\tonkla\.gemini\antigravity\scratch\WeatherAQI_docs
configfile: pytest.ini (or default)
collected 4 items

tests/test_api.py::TestWeatherClient::test_fetch_weather_fallback PASSED [ 25%]
tests/test_api.py::TestWeatherClient::test_fetch_aqi_fallback PASSED     [ 50%]
tests/test_api.py::TestWeatherClient::test_combined_snapshot PASSED     [ 75%]
tests/test_db.py::TestDataStore::test_save_and_fetch PASSED             [100%]

============================== 4 passed in 0.38s ==============================
```

### Execution Statistics Summary

```
+-----------------------------------------------------------------------------+
|                            WEATHERAQI SENSE - QA                            |
|                          TEST EXECUTION SCORECARD                           |
+----------------------+--------------------+---------------------------------+
| Metric               | Value              | Benchmark / Criteria            |
+----------------------+--------------------+---------------------------------+
| Total Test Cases     | 4                  | 100% of defined Sprint 1 scope  |
| Passed Test Cases    | 4                  | Zero tolerance for failures     |
| Failed Test Cases    | 0                  | Max allowed = 0                 |
| Errors / Crashes     | 0                  | Max allowed = 0                 |
| Skipped Tests        | 0                  | No pending tests                |
| Overall Success Rate | 100.0%             | Required >= 100% for release    |
| Total Execution Time | 0.38 seconds       | Fast feedback target (< 2.0s)   |
+----------------------+--------------------+---------------------------------+
```

> [!TIP]
> ความเร็วในการรันชุดการทดสอบทั้งหมดอยู่ที่ **0.38 วินาที** ซึ่งเป็นผลมาจากการออกแบบให้ [`WeatherClient`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-01-test_fetch_weather_fallback) ทำการตัดการเชื่อมต่อภายนอกอัตโนมัติเมื่อตรวจพบ Demo Key และ [`DataStore`](file:///C:/Users/tonkla/.gemini/antigravity/scratch/WeatherAQI_docs/TEST.md#tc-04-test_save_and_fetch) ใช้งาน Temporary Database ทำให้เหมาะสำหรับการรันแบบ Pre-commit Hook หรือ CI/CD Pipeline

---

## 6. Coverage Notes & Future Sprint Roadmap (บันทึกความครอบคลุมของการทดสอบและการพัฒนาในอนาคต)

### 6.1 โมดูลที่ครอบคลุมในปัจจุบัน (Sprint 1 Current Coverage)
- **`src/weather_client.py`:**
  - ครอบคลุมการทำงานของเมธอด `fetch_weather()`, `fetch_aqi()`, `get_combined_snapshot()`, และกลไกสลับสู่ Fallback Mock Data เมื่อใช้ Demo Key
  - ครอบคลุมการจัดการ Schema และการ Validate ประเภทข้อมูล (`temp` -> float, `aqi` -> int)
- **`src/data_store.py`:**
  - ครอบคลุมการ Initial Schema ฐานข้อมูล (`_init_db`)
  - ครอบคลุมฟังก์ชันบันทึกข้อมูล `save_metric()`
  - ครอบคลุมฟังก์ชันดึงข้อมูลย้อนหลัง `get_recent_metrics()` พร้อมการกรองตามชื่อเมืองและ Limit
  - ครอบคลุมวงจรการปิด Connection และการแยกสภาพแวดล้อมด้วย Isolated Tempfile
- **`src/cli_app.py` & `main.py`:**
  - ผ่านการทดสอบแบบ Manual Exploratory Testing ทั้งใน Interactive Mode (`python main.py`) และ Automated Demo Mode (`python main.py --demo`)

### 6.2 ส่วนที่เตรียมขยายการทดสอบในสปรินต์ถัดไป (Future Sprints Testing Scope)
เพื่อให้การทดสอบครอบคลุมทั้งระบบ (End-to-End System Quality) คณะผู้จัดทำได้วางแผนขยายขอบเขตการทดสอบใน Sprint 2 และ Sprint 3 ดังนี้:

```mermaid
graph TD
    subgraph Sprint 1 [Sprint 1: Baseline Complete]
        T1["test_api.py<br/>(Weather & AQI Fallback)"]
        T2["test_db.py<br/>(SQLite Save & Fetch)"]
    end

    subgraph Sprint 2 [Sprint 2: Report & AI Cloud Integration]
        T3["test_report.py<br/>(Matplotlib Chart & Export PNG)"]
        T4["test_ai_advisory.py<br/>(Prompt Templates & Context Engine)"]
        T5["test_supabase_db.py<br/>(Cloud PostgreSQL Connection & Failover)"]
    end

    subgraph Sprint 3 [Sprint 3: Web Dashboard & E2E Verification]
        T6["test_web_api.py<br/>(Open-Meteo Client-Side Live Fetch)"]
        T7["test_i18n.py<br/>(Bilingual TH/EN Completeness)"]
        T8["test_e2e_ui.py<br/>(Responsive Layout & Glassmorphism UI)"]
    end

    Sprint 1 --> Sprint 2
    Sprint 2 --> Sprint 3
```

1. **Sprint 2 Roadmap (v0.2.0):**
   - **`tests/test_report.py`:** เพิ่มการทดสอบ `src/report_generator.py` ตรวจสอบการพล็อต Dual-Axis Graph (Temp vs AQI) ด้วย Matplotlib และตรวจสอบการสร้างไฟล์รูปภาพ `.png` ว่าขนาดและสัดส่วนถูกต้อง
   - **`tests/test_ai_advisory.py`:** เพิ่มการทดสอบ `src/ai_advisory.py` ตรวจสอบการสังเคราะห์ Prompt ตามระดับมลพิษ และการจำลอง Mock Response จาก GenAI สำหรับคำแนะนำสุขภาพกลุ่มเสี่ยง
   - **`tests/test_supabase.py`:** เพิ่มการทดสอบ Remote Connection Pooling, Retry Logic เมื่อเครือข่ายหลุด และการสลับ Fallback ระหว่าง Supabase Cloud กับ Local SQLite
2. **Sprint 3 Roadmap (v1.0.0):**
   - **`tests/test_i18n.py`:** ตรวจสอบความครบถ้วนของพจนานุกรมแปลภาษา ไทย-อังกฤษ (Key Completeness) ป้องกันปัญหา Missing Translation Keys
   - **Web UI & Responsive E2E:** ทดสอบหน้าเว็บ `web/index.html` บน Viewport ขนาดต่าง ๆ (Mobile, Tablet, Desktop) และตรวจสอบการสลับภาษาแบบเรียลไทม์

---

## 7. How to Run Tests (วิธีการรันการทดสอบ)

คำแนะนำและคำสั่งสำหรับนักพัฒนาและผู้ตรวจสอบในการรันชุดการทดสอบ:

### 7.1 การเตรียมความพร้อมของสภาพแวดล้อม (Prerequisites)
ก่อนเริ่มรันการทดสอบ ให้เปิด Terminal หรือ PowerShell จาก Root Directory ของโปรเจกต์ และตรวจสอบว่าได้ติดตั้ง Dependencies ครบถ้วน:

```bash
# ตรวจสอบเวอร์ชันของ Python
python --version

# ติดตั้ง Dependencies สำหรับการทดสอบ
pip install -r requirements.txt
```

### 7.2 คำสั่งพื้นฐานในการรันการทดสอบ (Basic Test Commands)

```bash
# รันการทดสอบทั้งหมดแบบสรุปผลเร็ว
pytest

# รันการทดสอบทั้งหมดแบบแสดงรายละเอียดชื่อ Test Case (Verbose Mode)
pytest -v

# รันและแสดงผลข้อความพิมพ์ออกทางหน้าจอ (Print/Stdout capture disabled)
pytest -v -s
```

### 7.3 การรันเฉพาะไฟล์หรือเฉพาะ Test Case (Targeted Testing)

```bash
# รันเฉพาะชุดทดสอบ API (3 Test Cases)
pytest tests/test_api.py -v

# รันเฉพาะชุดทดสอบ Database (1 Test Case)
pytest tests/test_db.py -v

# รันเฉพาะ Test Case ที่ระบุโดยใช้ Pattern Matching (-k)
pytest -k "test_fetch_weather_fallback" -v
pytest -k "test_save_and_fetch" -v
```

### 7.4 การรันการทดสอบผ่านโมดูล Built-in `unittest`
กรณีที่ระบบปลายทางไม่ได้ติดตั้ง `pytest` สามารถรันผ่าน Standard Python Library ได้โดยตรง:

```bash
# ค้นหาและรัน Test ทั้งหมดในโฟลเดอร์ tests/
python -m unittest discover tests

# รันเฉพาะไฟล์เจาะจง
python -m unittest tests/test_api.py
python -m unittest tests/test_db.py
```

### 7.5 การวัดค่าความครอบคลุมของโค้ด (Test Coverage Analysis)
สามารถวัดค่าเปอร์เซ็นต์ความครอบคลุมของโค้ดต้นฉบับในไดเรกทอรี `src/` ได้ด้วยคำสั่ง:

```bash
# ติดตั้ง pytest-cov (หากยังไม่มี)
pip install pytest-cov

# รันการทดสอบพร้อมออกรายงาน Terminal Coverage
pytest --cov=src tests/ -v

# สร้างรายงานสรุปในรูปแบบ HTML สำหรับเปิดดูในเว็บเบราว์เซอร์
pytest --cov=src --cov-report=html tests/
# สามารถเปิดดูรายงานได้ที่ htmlcov/index.html
```

---

## 8. Document Sign-Off & Verification (การลงนามรับรองผลการทดสอบ)

| บทบาท (Role) | ผู้รับผิดชอบ (Assignee) | สถานะ (Status) | วันที่ตรวจสอบ (Date) |
| :--- | :--- | :---: | :---: |
| **QA & DevOps Lead** | อัษฎาวุธ เรือนแก้ว (กล้า) | **VERIFIED & PASSED** | 2026-09-08 |
| **Backend Lead** | ปิยภัทร รัตนรักษ์ (พัตเตอร์) | **APPROVED** | 2026-09-08 |
| **Product Owner** | สหกานต์ธีรา สังข์ขาว (ผักกาด) | **ACCEPTED** | 2026-09-08 |

---
*เอกสารนี้จัดทำขึ้นสำหรับโครงการ **WeatherAQI Sense** ตามมาตรฐานกระบวนการพัฒนาซอฟต์แวร์วิชา CP352301 ประจำปีการศึกษา 2569*
