# 🧪 System Quality Assurance & Test Cases (TEST.md)

โปรเจกต์ **WeatherAQI Sense** มีระบบการทดสอบและประกันคุณภาพซอฟต์แวร์ (Quality Assurance) อย่างเป็นระบบ

---

## 📂 เอกสารบันทึก Test Cases ฉบับเต็ม
ดูตารางเคสการทดสอบฉบับเต็มได้ที่โฟลเดอร์: [test_cases/TEST_CASES.md](file:///c:/%E0%B8%9C%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%94/Scrip%20Program/Final%20Project/test_cases/TEST_CASES.md)

---

## 🚀 การรันชุดทดสอบอัตโนมัติ (Automated Unit Testing)

```bash
# รันชุดทดสอบ Unit Tests ทั้งหมดด้วย pytest
pytest

# รันชุดทดสอบแบบแสดงรายละเอียดรายเทส
pytest -v
```

### รายการโมดูลการทดสอบที่ผ่าน 100%:
- `tests/test_api.py` — ทดสอบการดึงข้อมูล API และระบบ Defensive Fallbacks (PASSED)
- `tests/test_db.py` — ทดสอบการสร้างตาราง การ INSERT และ SELECT ข้อมูล SQLite (PASSED)
- `tests/test_reports.py` — ทดสอบการพล็อตกราฟ Matplotlib Dual-Axis และ AI Health Advisory (PASSED)
