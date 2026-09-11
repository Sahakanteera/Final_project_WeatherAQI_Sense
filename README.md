# WeatherAQI Sense — ระบบแดชบอร์ดติดตามสภาพอากาศและคุณภาพอากาศ

**รายวิชา:** CP352301 การเขียนโปรแกรมสคริปต์ (1/2569)  
**หัวข้อ:** Weather & Air Quality Dashboard (ระบบแดชบอร์ดสภาพอากาศและคุณภาพอากาศ)  
**อาจารย์ผู้สอน:** ผศ. บุญสืบ ไวคำ  

---

## 👥 สมาชิกในทีมและการหมุนเวียนบทบาท (Role Rotation Matrix)

เพื่อให้สมาชิกทุกคนในทีมได้ฝึกฝนทั้ง 3 บทบาทหลัก (**Planner / Coder / Debugger & DevOps**) ครบทุกคน 100%:

| สมาชิก | ชื่อเล่น | Sprint 1 (W12) | Sprint 2 (W13) | Sprint 3 (W14) | Final Sprint (W15) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **นางสาวสหกานต์ธีรา สังข์ขาว** | ผักกาด | **Planner** | **Coder** | **Debugger** | **Planner & Integration** |
| **นายปิยภัทร รัตนรักษ์** | พัตเตอร์ | **Coder** | **Debugger** | **Planner** | **Coder & AI Feature** |
| **นายอัษฎาวุธ เรือนแก้ว** | กล้า | **Debugger** | **Planner** | **Coder** | **Debugger & DevOps** |

---

## 🚀 กระบวนการพัฒนาซอฟต์แวร์ระดับมืออาชีพ (Agile & Responsible AI)

1. **Agile Kanban Board (WIP Limits = 2):**  
   กำหนดข้อจำกัดงานในหมวด *In Progress* ไม่เกิน 2 งาน เพื่อป้องกันการเจนโค้ดจาก Gen AI แบบบานปลาย บังคับให้พัฒนาทีละฟังก์ชันและทำ Unit Test ก่อนส่งมอบ
2. **Gen AI Prompt Logging (`learning_log.ipynb`):**  
   บันทึก Prompt คำถาม, คำอธิบายเชิงทฤษฎีจาก AI และ Live Executable Code เพื่อสร้างระบบที่ตรวจสอบและอธิบายได้ (Explainable System)
3. **Documentation & Audit Artifacts:**  
   - `README.md`: ข้อมูลโครงการ สมาชิก ตารางหมุนเวียนบทบาท และคู่มือการรัน
   - `CHANGELOG.md`: บันทึกวิวัฒนาการเวอร์ชัน v0.1.0 -> v0.2.0 -> v0.3.0 -> v1.0.0
   - `FLOWCHART.md`: ผังงานแสดงโครงสร้างสถาปัตยกรรมและกระบวนการทำงานของระบบ
   - `PRESENTATION_SLIDE_PROMPTS.md`: ชุด Prompt สำหรับสร้างสไลด์นำเสนอ Live Demo 5 ส่วน

---

## 💻 สถาปัตยกรรมระบบ (System Architecture)

ระบบถูกออกแบบในสไตล์ **Object-Oriented Programming (OOP)** แบ่งเป็นโมดูลาร์:
- **`src/weather_client.py` (`WeatherClient`):** ดึงข้อมูลสภาพอากาศ (OpenWeatherMap) และ AQI (IQAir) พร้อมระบบ Defensive Fallback
- **`src/data_store.py` (`DataStore`):** จัดเก็บข้อมูลยั่งยืนลง SQLite Database (`data/weather_data.db`)
- **`src/report_generator.py` (`ReportGenerator`):** พล็อตกราฟเปรียบเทียบ Temp vs AQI แบบ Dual-Axis ด้วย `matplotlib`
- **`src/ai_advisory.py` (`AIAdvisory`):** วิเคราะห์ระดับ AQI และสภาพอากาศเพื่อออกคำแนะนำด้านสุขภาพและกิจกรรมกลางแจ้ง
- **`src/cli_app.py` (`CLIApp`):** หน้าต่างปฏิสัมพันธ์ Command Line Interface รับอินพุตด้วย `.strip().lower()`
- **`main.py`:** ตัวควบคุมหลัก (มีโหมด `--demo` สำหรับสาธิตสด)

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
