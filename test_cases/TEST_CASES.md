# 🧪 Test Cases Documentation — WeatherAQI Sense

เอกสารจัดเก็บ **Test Cases (เคสการทดสอบระบบ)** สำหรับโปรเจกต์ **WeatherAQI Sense**
รายวิชา CP352301 Script Programming

---

## 📋 ตารางสรุปผลการทดสอบระบบ (Quality Assurance & Test Suite Matrix)

| Test ID | หมวดการทดสอบ | รายละเอียดการทดสอบ | อินพุต (Input) | ผลลัพธ์ที่คาดหวัง (Expected Output) | ผลการทดสอบจริง (Actual Output) | สถานะ |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | API Ingestion | ดึงข้อมูลสภาพอากาศสด | City = "Khon Kaen" | ได้รับอุณหภูมิ, ความชื้น, ความเร็วลม | ได้รับ Temp, Humidity, WindSpeed สด | **PASSED** |
| **TC-02** | API Ingestion | ดึงข้อมูลฝุ่น PM2.5 & AQI สด | City = "Bangkok" | ได้รับค่า PM2.5 และดัชนี US AQI สด | ได้รับ PM2.5 (µg/m³) และ AQI ตรงตามเซิร์ฟเวอร์ | **PASSED** |
| **TC-03** | WeatherCode Mapping | แมปปิ้งรหัสสภาพอากาศ WMO | weathercode = 0 | แสดงผล "☀️ อากาศโปร่งใส แดดจัด / Clear & Sunny" | แสดงผลตรงตามมาตรฐาน WMO | **PASSED** |
| **TC-04** | WeatherCode Mapping | แมปปิ้งสภาพฝนตก | weathercode = 61 | แสดงผล "🌧️ ฝนตกเล็กน้อย / Light Rain Showers" | แสดงผลไอคอนและคำอธิบายฝนตรง | **PASSED** |
| **TC-05** | AQI Classification | จัดหมวดหมู่ระดับ AQI (0-50) | AQI = 42 | หมวด "Good (คุณภาพดี)", ป้ายสีเขียว, ไม่ต้องใส่หน้ากาก | หมวด Good, ป้ายสีเขียวตรงตามเกณฑ์ | **PASSED** |
| **TC-06** | AQI Classification | จัดหมวดหมู่ระดับ AQI (101-150) | AQI = 125 | หมวด "Unhealthy for Sensitive", ป้ายสีส้ม, แนะนำใส่ N95 | หมวด Unhealthy for Sensitive, แนะนำใส่ N95 ตรง | **PASSED** |
| **TC-07** | Database Persistence | บันทึกสแนปชอตลง SQLite | Dictionary Payload | เพิ่มข้อมูลลงตาราง `metrics` ใน SQLite สำเร็จ | คำสั่ง `INSERT` ทำงานผ่าน 100% | **PASSED** |
| **TC-08** | Chart Rendering | พล็อตกราฟ Matplotlib Dual-Axis | 7 Historical Records | สร้างไฟล์ภาพ PNG 2 แกน Y (Temp vs AQI) | ได้ไฟล์ภาพ `trend_khon_kaen.png` สมบูรณ์ | **PASSED** |
| **TC-09** | UI Bilingual Switch | สลับภาษาหน้าเว็บ TH / EN | Toggle select = "en" | ข้อความ หัวข้อ และคำแนะนำเปลี่ยนเป็นภาษาอังกฤษ | ข้อความเปลี่ยนเป็นภาษาอังกฤษทันทีเรียลไทม์ | **PASSED** |
| **TC-10** | Defensive Fallback | ทดสอบระบบสำรองเมื่อ API ล้มเหลว | API Key ไม่ถูกต้อง | สลับมาใช้ข้อมูลจำลองที่ปลอดภัย โปรแกรมไม่พัง | ใช้ Fallback Data รันโปรแกรมต่อได้ | **PASSED** |
| **TC-11** | Search Algorithm | ค้นหาเรคอร์ดตามคำค้น "Bangkok" | keyword = "Bangkok" | พบเรคอร์ดที่มีชื่อเมือง Bangkok | แสดงเรคอร์ด Bangkok ตรงตามที่ค้นหา | **PASSED** |
| **TC-12** | Search Algorithm | ค้นหาด้วยคำค้นที่ไม่มีในระบบ | keyword = "Atlantis" | ไม่พบเรคอร์ด แสดงรายการว่าง | แสดง empty list ไม่มี error | **PASSED** |
| **TC-13** | Filter Algorithm | กรองข้อมูลตามช่วง AQI 0-50 | aqi_min=0, aqi_max=50 | พบเฉพาะเรคอร์ดที่ AQI อยู่ในช่วง 0-50 | กรองได้ถูกต้องตามเงื่อนไข | **PASSED** |
| **TC-14** | Filter Algorithm | กรองข้อมูลตามช่วงอุณหภูมิ 30-40°C | temp_min=30, temp_max=40 | พบเฉพาะเรคอร์ดที่อุณหภูมิอยู่ในช่วง | กรองอุณหภูมิได้แม่นยำ | **PASSED** |
| **TC-15** | Sort Algorithm | เรียงลำดับข้อมูลตาม AQI น้อยไปมาก | sort_by="aqi", order="asc" | ข้อมูลเรียงจาก AQI ต่ำสุดไปสูงสุด | เรียงลำดับถูกต้อง [20, 60, 100] | **PASSED** |
| **TC-16** | Sort Algorithm | เรียงลำดับตามอุณหภูมิมากไปน้อย | sort_by="temp", order="desc" | ข้อมูลเรียงจาก Temp สูงสุดไปต่ำสุด | เรียงลำดับถูกต้อง [35, 30, 25] | **PASSED** |
| **TC-17** | CRUD - Update | แก้ไขเรคอร์ดที่มีอยู่ในระบบ | record_id=1, temp=99.9 | อัปเดตค่า temp สำเร็จ | ค่า temp เปลี่ยนเป็น 99.9 ตรง | **PASSED** |
| **TC-18** | CRUD - Update | แก้ไขเรคอร์ดที่ไม่มีอยู่ | record_id=99999 | แจ้งเตือนว่าไม่พบเรคอร์ด, return False | return False ไม่มี error | **PASSED** |
| **TC-19** | CRUD - Delete | ลบเรคอร์ดที่มีอยู่ในระบบ | record_id=1 | ลบสำเร็จ เรคอร์ดหายจากฐานข้อมูล | ลบได้ถูกต้อง fetch กลับมาเป็น empty | **PASSED** |
| **TC-20** | CRUD - Delete | ลบเรคอร์ดที่ไม่มีอยู่ | record_id=99999 | แจ้งเตือนว่าไม่พบเรคอร์ด, return False | return False ไม่มี error | **PASSED** |
| **TC-21** | AQI Boundary | ทดสอบ AQI = 0 (ขอบล่างสุด) | AQI = 0 | หมวด "Good" | หมวด Good ตรงตามเกณฑ์ | **PASSED** |
| **TC-22** | AQI Boundary | ทดสอบ AQI = 301 (ขอบ Hazardous) | AQI = 301 | หมวด "Hazardous" | หมวด Hazardous ตรง | **PASSED** |
| **TC-23** | Temp Boundary | ทดสอบอุณหภูมิ -20°C (หนาวจัด) | Temp = -20.0 | แจ้งเตือน "Cool Notice" | Cool Notice ตรงตามเกณฑ์ | **PASSED** |
| **TC-24** | Temp Boundary | ทดสอบอุณหภูมิ 50°C (ร้อนจัด) | Temp = 50.0 | แจ้งเตือน "Heat Warning" | Heat Warning ตรง | **PASSED** |

---

## 🔬 รายละเอียดเคสการทดสอบเชิงลึก (Detailed Test Case Specs)

### 🔹 TC-01: Live Weather API Fetching
- **การทดสอบ:** สอบทานการยิงคำขอไปยัง Open-Meteo Weather API
- **เงื่อนไข:** ลองเลือกเมือง ขอนแก่น (Lat: 16.4322, Lon: 102.8236)
- **การยืนยันความถูกต้อง:** ค่าอุณหภูมิ ต้องไม่เป็นค่าว่าง และอัปเดตตรงตามเวลาจริง

### 🔹 TC-03 & TC-04: WMO Weather Code Standard Mapping
- **การทดสอบ:** สอบทานรหัสสภาพอากาศ WMO (World Meteorological Organization Standard)
- **การแมปปิ้ง:**
  - `0`: ☀️ อากาศโปร่งใส แดดจัด (Clear Sky)
  - `1 - 3`: ⛅ มีเมฆบางส่วน (Partly Cloudy)
  - `45 - 48`: 🌫️ มีหมอกควันหนาแน่น (Foggy & Haze)
  - `51 - 67`: 🌧️ มีฝนตก (Rain Showers)
  - `95 - 99`: 🌩️ พายุฝนฟ้าคะนอง (Thunderstorm)
