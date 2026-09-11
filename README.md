# WeatherAQI Sense — ระบบแดชบอร์ดติดตามสภาพอากาศและคุณภาพอากาศ

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)  
**หัวข้อ:** Weather & Air Quality Dashboard (ระบบแดชบอร์ดสภาพอากาศและคุณภาพอากาศ)  
**อาจารย์ผู้สอน:** ผศ. บุญสืบ ไวคำ  

---

## 👥 สมาชิกในทีมและการหมุนเวียนบทบาท (Role Rotation Matrix)

เพื่อให้สมาชิกทุกคนในทีมได้ฝึกฝนทั้ง 3 บทบาทหลัก (**Planner / Architect**, **Coder / Dev**, **Debugger / QA & DevOps**) ครบทุกคน 100%:

| สมาชิก | ชื่อเล่น | Sprint 1 (W12-W13): OOP & Database | Sprint 2 (W14): AI & Report | Sprint 3 (W15): Web & Deployment |
| :--- | :---: | :---: | :---: | :---: |
| **นางสาวสหกานต์ธีรา สังข์ขาว** | ผักกาด | **Planner / Architect** | **Coder / Dev** | **Debugger / QA** |
| **นายปิยภัทร รัตนรักษ์** | พัตเตอร์ | **Coder / Dev** | **Debugger / QA** | **Planner / Architect** |
| **นายอัษฎาวุธ เรือนแก้ว** | กล้า | **Debugger / QA** | **Planner / Architect** | **Coder & DevOps** |

---

## 📅 แผนการทำงานแยกตาม Sprint (3 Sprints Roadmap)

### **Sprint 1: Core System Foundation & OOP CLI Architecture**
* **เป้าหมาย:** สร้างรากฐานสถาปัตยกรรมเชิงวัตถุ (OOP) และระบบจัดเก็บข้อมูล SQLite
* **รายละเอียดงาน:**
  - `src/weather_client.py`: ดึงข้อมูล Weather & AQI พร้อมระบบ Defensive Fallback Mock Data
  - `src/data_store.py`: จัดเก็บข้อมูลยั่งยืนลง SQLite Database (`data/weather_data.db`)
  - `src/cli_app.py` & `main.py`: หน้าต่างปฏิสัมพันธ์ Command Line Interface และโหมด `--demo`
  - `tests/test_api.py` & `tests/test_db.py`: ชุดทดสอบระบบอัตโนมัติ (Automated pytest)

### **Sprint 2: Report Generator & AI Health Advisory**
* **เป้าหมาย:** เพิ่มโมดูลวิเคราะห์ข้อมูล กราฟ และระบบคำแนะนำสุขภาพ AI
* **รายละเอียดงาน:**
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

## 🛠️ วิธีการติดตั้งและรันโปรแกรม

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
