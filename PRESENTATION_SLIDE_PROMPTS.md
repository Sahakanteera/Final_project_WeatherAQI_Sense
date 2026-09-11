# Presentation Slide Prompts for Live Demo (5-Part Scheme)

ชุด Prompt สำหรับนำไปสร้างสไลด์นำเสนอและเตรียมพรีเซนต์สด Live Demo ตามโครงสร้าง 5 ส่วนหลักของวิชา Script Programming:

---

### ส่วนที่ 1: ปัญหา สถาปัตยกรรม และการออกแบบ (20%)
```text
Prompt:
เน้นนำเสนอปัญหาของผู้คนที่ต้องการดูทั้งสภาพอากาศ (อุณหภูมิ/ความชื้น) และคุณภาพอากาศ (ฝุ่น PM2.5/AQI) พร้อมกันในที่เดียว 
นำเสนอสถาปัตยกรรมแบบ OOP (Modular Architecture) 3 ชั้น (Presentation CLI, Business Logic WeatherClient/AIAdvisory, Data Access DataStore)
พร้อมแสดงตารางหมุนเวียนบทบาท (Role Rotation) ของสมาชิกทั้ง 3 คน (ผักกาด, พัตเตอร์, กล้า) ใน 4 Sprints
```

### ส่วนที่ 2: Stack เทคโนโลยีและมาตรฐานการพัฒนา (10%)
```text
Prompt:
อธิบาย Tech Stack: Python 3.x (สไตล์ OOP), OpenWeatherMap API, IQAir API, SQLite Database, Matplotlib
แสดงกระบวนการพัฒนาด้วย Agile Kanban Board (WIP Limits = 2) และการใช้ Responsible AI Log (learning_log.ipynb)
```

### ส่วนที่ 3: การสาธิตฟังก์ชันและการทดสอบจริง (40% — Live Demo หลัก)
```text
Prompt:
นำเสนอการรันคำสั่งสดด้วย python main.py --demo และการเลือกเมืองผ่าน CLI
แสดงการดึงข้อมูลสด, การบันทึกลง SQLite, การสร้างใบเสร็จ/รายงาน Explainable Snapshot, การเตือนสุขภาพจาก AIAdvisory
และแสดงภาพกราฟ Matplotlib Dual-Axis (Temp vs AQI)
```

### ส่วนที่ 4: ปัญหาทางเทคนิค การแก้ไข และการเปรียบเทียบ (15%)
```text
Prompt:
สรุปปัญหาทางเทคนิคที่พบ เช่น API Rate Limit (Error 429) และโครงสร้าง JSON ซ้อนกันลึกของ IQAir 
อธิบายแนวทางแก้ไขโดยใช้ Safe Dictionary Lookups (.get()) และ Defensive Fallback Mechanisms
```

### ส่วนที่ 5: DevOps, CI/CD Pipeline & AI Integration (15%)
```text
Prompt:
แสดงการตั้งค่า CI/CD Pipeline ผ่าน GitHub Actions และการรัน Unit Testing ด้วย pytest 
นำเสนอฟีเจอร์ AI Health Advisory และแนวทางพัฒนาต่อยอดในอนาคต (เช่น การส่งการแจ้งเตือนผ่าน LINE Notify)
```
