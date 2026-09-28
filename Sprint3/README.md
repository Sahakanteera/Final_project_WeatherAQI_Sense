# 📦 Sprint 3: Full-Stack Web Dashboard & Deployment

**นำเสนอ:** สัปดาห์ที่ 14 (29-30/9/2569) | **กำหนดส่ง:** 2/10/2569

---

## 🎯 เป้าหมาย Sprint 3
เชื่อมต่อ Full-Stack Integration — Web Dashboard, Bilingual UI, Live API, CI/CD Pipeline, GitHub Pages Deployment, Edge Case Testing

---

## ✅ Deliverables ที่ส่งมอบ

### 1. 🌐 Web Dashboard (Glassmorphism UI)
- **ไฟล์:** `index.html` (2,312 บรรทัด — Single-File App)
- ดึงข้อมูล Live API จาก Open-Meteo Weather + Air Quality APIs
- แสดงข้อมูล **78 จังหวัด** ทั่วประเทศไทย
- Glassmorphism Design — กระจกเบลอ, gradient, ดูดีมืออาชีพ
- **ฟีเจอร์:**
  - 🔍 Searchable Province Dropdown (ค้นหาจังหวัดได้ทั้งไทย/อังกฤษ)
  - 📊 Chart.js กราฟรายชั่วโมง (Hourly Temp & AQI Trend)
  - 🏥 AI Health Advisory Banner (คำแนะนำสุขภาพ real-time)
  - 🗺️ Metric Cards (อุณหภูมิ, AQI, PM2.5, ความชื้น, ลม)
  - 📱 Responsive Design — ใช้ได้ทั้ง Desktop และ Mobile
  - ♻️ Auto-refresh ทุก 5 นาที

### 2. 🌐 Bilingual UI (TH/EN Toggle)
- สลับภาษาได้ทั้ง Thai และ English
- เปลี่ยน: หัวข้อ, คำแนะนำ, labels, ชื่อจังหวัด ทุกข้อความ
- เก็บ preference ลง `localStorage`

### 3. ☁️ Supabase Cache Layer
- Province data cached บน Supabase Cloud Database
- Fallback: ถ้า Supabase ล้ม → ดึง Live API ตรงจาก Open-Meteo
- Badge แสดงแหล่งข้อมูล: `● CACHE` หรือ `● LIVE`

### 4. 🚀 GitHub Pages Deployment
- **Workflow:** `.github/workflows/static.yml`
- Auto-deploy `index.html` ไปยัง GitHub Pages ทุกครั้งที่ push

### 5. 🧪 CI/CD Pipeline — Lint + Test อัตโนมัติ
- **Workflow:** `.github/workflows/ci.yml`
- Trigger: ทุก push/PR ไปยัง `main` branch
- ขั้นตอน:
  1. `flake8 src/ tests/ --max-line-length 120` — Linting
  2. `pytest -v` — Unit Tests
- **ผลล่าสุด:** flake8 = 0 errors ✅ | pytest = 44/44 PASSED ✅

### 6. 🔄 Auto Data Refresh (Cron Job)
- **Workflow:** `.github/workflows/refresh_data.yml`
- รัน `src/refresh_provinces.py` ทุก 12 ชั่วโมงอัตโนมัติ
- อัปเดตข้อมูล 78 จังหวัดบน Supabase

### 7. 🧪 Edge Case Test Suite (37 เทสใหม่)
- **ไฟล์:** `tests/test_edge_cases.py`
- **WeatherClient Edge Cases (4 เทส):** Empty city, whitespace, special chars, unknown city
- **DataStore Edge Cases (18 เทส):** DB auto-create, missing fields, empty DB, multi-record, search/filter/sort, update/delete valid/invalid
- **AIAdvisory Boundary Tests (15 เทส):** AQI = 0, 50, 51, 100, 101, 200, 300, 301, 999 | Temp = -20, 18, 18.1, 34.9, 35, 50

### 8. 📄 Documentation Updates
- `CHANGELOG.md` — เพิ่ม Sprint 2 + Sprint 3 entries
- `README.md` — อัปเดตฟีเจอร์จาก Planned → Completed
- `TEST.md` — เพิ่ม test_edge_cases.py (44 เทส total)
- `TEST_CASES.md` — เพิ่ม TC-11 ถึง TC-24

---

## 👥 บทบาทสมาชิก Sprint 3

| สมาชิก | บทบาท | งานที่ทำ |
|:---|:---:|:---|
| **ผักกาด** | Debugger | QA Testing, Edge Case Verification, CI/CD Validation |
| **พัตเตอร์** | Planner | ออกแบบ Web Architecture, กำหนด Bilingual Specs, Deployment Strategy |
| **กล้า** | Coder & DevOps | สร้าง Web Dashboard, GitHub Actions Workflows, Deploy GitHub Pages |

---

## 📝 Changelog — Sprint 3

### [v0.3.0] - Sprint 3: Full-Stack Web Dashboard & Deployment
#### Added
- **Web Dashboard:** Glassmorphism UI covering all 78 Thai provinces with live weather & AQI data (`index.html`)
- **Bilingual UI:** Thai/English language toggle with complete translation support
- **Live API Integration:** Real-time data from Open-Meteo Weather & Air Quality APIs on browser
- **Supabase Cache Layer:** Province data cached in cloud with auto-refresh every 12 hours
- **GitHub Pages Deployment:** Automated static site deployment (`.github/workflows/static.yml`)
- **CI/CD Pipeline:** Automated linting (flake8) and testing (pytest) on push/PR (`.github/workflows/ci.yml`)
- **Auto Data Refresh:** Scheduled GitHub Actions cron job (`.github/workflows/refresh_data.yml`)
- **Edge Case Test Suite:** 37 additional tests covering boundary conditions, CRUD, Search/Filter/Sort
- **Documentation:** Updated CHANGELOG, README, TEST.md, TEST_CASES.md

---

## 📂 ไฟล์ที่เพิ่ม/แก้ไขใน Sprint 3
```
index.html                         ← สร้างใหม่ — Web Dashboard (2,312 บรรทัด)
run_web.py                         ← สร้างใหม่ — HTTP Server for local dev
config.example.js                  ← สร้างใหม่ — Supabase config template

.github/workflows/
├── static.yml                     ← สร้างใหม่ — GitHub Pages deploy
├── ci.yml                         ← สร้างใหม่ — Lint + Test CI/CD
└── refresh_data.yml               ← สร้างใหม่ — Auto refresh cron

tests/
└── test_edge_cases.py             ← สร้างใหม่ — 37 edge case tests

Sprint1/README.md                  ← สร้างใหม่ — Sprint 1 summary
Sprint2/README.md                  ← สร้างใหม่ — Sprint 2 summary
Sprint3/README.md                  ← สร้างใหม่ — Sprint 3 summary (ไฟล์นี้)

CHANGELOG.md                       ← เพิ่ม Sprint 2 + Sprint 3 entries
README.md                          ← อัปเดตฟีเจอร์ Planned → Completed
TEST.md                            ← เพิ่ม edge case test module
test_cases/TEST_CASES.md           ← เพิ่ม TC-11 ถึง TC-24
```

---

## 📊 สรุปสถิติโปรเจกต์ ณ สิ้น Sprint 3

| เมตริก | ค่า |
|:---|:---|
| **Unit Tests** | 44 เทส (PASSED 100%) |
| **flake8 Lint** | 0 errors |
| **OOP Classes** | 5 คลาส (WeatherClient, DataStore, AIAdvisory, ReportGenerator, CLIApp) |
| **CRUD Operations** | 4/4 (Create ✅ Read ✅ Update ✅ Delete ✅) |
| **Algorithms** | 3/3 (Search ✅ Filter ✅ Sort ✅) |
| **CI/CD Workflows** | 3 (Pages Deploy, Lint+Test, Data Refresh) |
| **จังหวัดที่รองรับ** | 78 จังหวัดทั่วไทย |
| **ภาษา UI** | 2 (ไทย / English) |
| **Python LOC** | ~1,200+ บรรทัด |
| **Web Dashboard LOC** | 2,312 บรรทัด |
