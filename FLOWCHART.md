# WeatherAQI Sense — System Architecture & Flowchart Documentation
> **เอกสารแผนภาพสถาปัตยกรรมและการไหลของข้อมูลระบบ (System Architecture & Flowchart Specification)**  
> **โครงงาน:** WeatherAQI Sense (Weather & Air Quality Monitoring Dashboard)  
> **หมวดหมู่:** ซอฟต์แวร์ประยุกต์ด้านสิ่งแวดล้อมและสภาพภูมิอากาศ (Environmental & Weather Application)  
> **ระดับโครงการ:** Senior Project / Software Engineering Capstone Project  
> **สถานะโครงการ:** Sprint 1 Active (Sprint 2 & 3 Planned)

---

## สารบัญ (Table of Contents)
1. [ภาพรวมสถาปัตยกรรมระบบ (System Architecture Overview)](#1-ภาพรวมสถาปัตยกรรมระบบ-system-architecture-overview)
2. [ขั้นตอนการทำงานของผู้ใช้ - โหมดโต้ตอบ (User Flow: Interactive Mode)](#2-ขั้นตอนการทำงานของผู้ใช้---โหมดโต้ตอบ-user-flow-interactive-mode)
3. [ขั้นตอนการทำงานของผู้ใช้ - โหมดสาธิต (User Flow: Demo Mode)](#3-ขั้นตอนการทำงานของผู้ใช้---โหมดสาธิต-user-flow-demo-mode)
4. [แผนภาพการไหลของข้อมูล (Data Flow Diagram - DFD)](#4-แผนภาพการไหลของข้อมูล-data-flow-diagram---dfd)
5. [แผนภาพคลาสและความสัมพันธ์เชิงโครงสร้าง (Class Diagram)](#5-แผนภาพคลาสและความสัมพันธ์เชิงโครงสร้าง-class-diagram)
6. [โครงสร้างฐานข้อมูล (Database Schema & ER Diagram)](#6-โครงสร้างฐานข้อมูล-database-schema--er-diagram)
7. [แผนงานการพัฒนาตามสปรินต์ (Sprint Roadmap)](#7-แผนงานการพัฒนาตามสปรินต์-sprint-roadmap)
8. [ข้อกำหนดทางเทคนิคและการจัดการข้อผิดพลาด (Technical Specs & Defensive Architecture)](#8-ข้อกำหนดทางเทคนิคและการจัดการข้อผิดพลาด-technical-specs--defensive-architecture)

---

## 1. ภาพรวมสถาปัตยกรรมระบบ (System Architecture Overview)

ระบบ **WeatherAQI Sense** ถูกออกแบบตามหลักการ **Layered & Modular Architecture** โดยแยกความรับผิดชอบของส่วนรับส่งข้อมูลภายนอก (Data Acquisition), ชั้นตรรกะและการจัดเก็บ (Persistence & Logic), และชั้นการนำเสนอผลลัพธ์ (Presentation Layer) ออกจากกันอย่างชัดเจน พร้อมรองรับกลไก **Defensive Fallback Mechanism** ป้องกันระบบล่มเมื่อ API ภายนอกไม่พร้อมให้บริการ

```mermaid
graph TB
    %% Entry Point Layer
    subgraph Layer_Entry ["1. Entry Point Layer (จุดเริ่มต้นการทำงาน)"]
        MAIN["main.py<br/>(CLI Entry Point)"]
        FLAG_CHECK{"Argument Parser<br/>(ตรวจสอบพารามิเตอร์)"}
        MAIN --> FLAG_CHECK
    end

    %% Presentation Layer
    subgraph Layer_Presentation ["2. Presentation Layer (ชั้นการแสดงผล)"]
        CLI_APP["CLIApp (src/cli_app.py)<br/>• Input Normalization (.strip().lower())<br/>• ASCII Status Card Display<br/>• Health & Temperature Advisory"]
        REPORT_GEN["report_generator.py (Sprint 2)<br/>• Matplotlib Dual-Axis Graphs<br/>• Export Visual Trends (PNG/PDF)"]
        AI_ADVISORY["ai_advisory.py (Sprint 2)<br/>• AI/LLM Health Recommendation<br/>• Vulnerability Risk Analysis"]
        WEB_UI["Web Dashboard (Sprint 3)<br/>• Glassmorphism UI (Tailwind/React)<br/>• Bilingual Support (TH/EN)<br/>• Interactive Geo Map"]
    end

    %% Business & Client Layer
    subgraph Layer_Client ["3. Data Acquisition & Client Layer (ชั้นเชื่อมต่อข้อมูลภายนอก)"]
        W_CLIENT["WeatherClient (src/weather_client.py)<br/>• API Aggregator & Normalizer<br/>• Error Handling & Fallback"]
        MOCK_ENGINE["Defensive Fallback Mock Data<br/>• _mock_weather_data()<br/>• _mock_aqi_data()"]
        W_CLIENT -.->|"Fallback เมื่อ API ล้มเหลว"| MOCK_ENGINE
    end

    %% External API Services
    subgraph Layer_External ["External Data Providers (ผู้ให้บริการข้อมูลภายนอก)"]
        OWM_API[("OpenWeatherMap API<br/>Weather: Temp, Humidity, Pressure")]
        IQAIR_API[("IQAir / AirVisual API<br/>Air Quality: AQI, PM2.5, PM10")]
    end

    %% Data Storage Layer
    subgraph Layer_Storage ["4. Persistence & Storage Layer (ชั้นจัดเก็บข้อมูล)"]
        DATA_STORE["DataStore (src/data_store.py)<br/>• _init_db()<br/>• save_record()<br/>• fetch_all_records()"]
        SQLITE_DB[("SQLite Database<br/>data/weather_data.db<br/>Table: metrics")]
        SUPABASE_DB[("Supabase PostgreSQL (Sprint 3)<br/>Cloud Database & Realtime API")]
        
        DATA_STORE -->|"Local SQL Writes"| SQLITE_DB
        DATA_STORE -.->|"Planned Cloud Migration"| SUPABASE_DB
    end

    %% Inter-layer Connections
    FLAG_CHECK -->|"--interactive หรือ ค่าเริ่มต้น"| CLI_APP
    FLAG_CHECK -->|"--demo flag"| CLI_APP

    CLI_APP -->|"เรียกขอข้อมูลสภาพอากาศและ AQI"| W_CLIENT
    W_CLIENT -->|"REST GET Request"| OWM_API
    W_CLIENT -->|"REST GET Request"| IQAIR_API

    CLI_APP -->|"บันทึก Snapshot & ดึงประวัติ"| DATA_STORE
    
    %% Future Sprint Links
    SQLITE_DB -.->|"อ่านข้อมูลสถิติย้อนหลัง"| REPORT_GEN
    W_CLIENT -.->|"ส่งค่า AQI ประมวลผลเชิงลึก"| AI_ADVISORY
    SUPABASE_DB -.->|"REST/GraphQL Data Sync"| WEB_UI

    %% Styling
    classDef entryStyle fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    classDef presStyle fill:#0f172a,stroke:#818cf8,stroke-width:2px,color:#ffffff;
    classDef clientStyle fill:#1e1b4b,stroke:#a855f7,stroke-width:2px,color:#ffffff;
    classDef extStyle fill:#3b0764,stroke:#ec4899,stroke-width:2px,color:#ffffff;
    classDef storageStyle fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ffffff;

    class MAIN,FLAG_CHECK entryStyle;
    class CLI_APP,REPORT_GEN,AI_ADVISORY,WEB_UI presStyle;
    class W_CLIENT,MOCK_ENGINE clientStyle;
    class OWM_API,IQAIR_API extStyle;
    class DATA_STORE,SQLITE_DB,SUPABASE_DB storageStyle;
```

---

## 2. ขั้นตอนการทำงานของผู้ใช้ - โหมดโต้ตอบ (User Flow: Interactive Mode)

โหมดโต้ตอบ (Interactive Mode) ช่วยให้ผู้ใช้สามารถค้นหาข้อมูลสภาพอากาศและคุณภาพอากาศของเมืองที่ต้องการได้แบบเรียลไทม์ พร้อมการตรวจสอบข้อมูลนำเข้า การแปลงข้อมูลให้เป็นรูปแบบมาตรฐาน และการแจ้งเตือนคำแนะนำสุขภาพทันที

```mermaid
flowchart TD
    START(["เริ่มต้นการทำงาน (Start App)"]) --> BANNER["แสดงผลแบนเนอร์ระบบ (Display ASCII Banner & Version)"]
    BANNER --> PROMPT[/ "รับข้อมูลชื่อเมืองจากผู้ใช้ (Prompt City Name)" /]
    
    PROMPT --> CHECK_EMPTY{"ผู้ใช้ป้อนค่าว่างหรือไม่?<br/>(Check Empty Input)"}
    CHECK_EMPTY -- "ใช่ (Empty)" --> WARN_EMPTY["แจ้งเตือน: กรุณากรอกชื่อเมือง<br/>(Show Warning)"]
    WARN_EMPTY --> PROMPT
    
    CHECK_EMPTY -- "ไม่ใช่ (Valid)" --> NORMALIZE["ทำความสะอาดข้อมูลนำเข้า (Normalize Input)<br/>• .strip() ตัดช่องว่างหัว-ท้าย<br/>• .lower() แปลงเป็นตัวพิมพ์เล็ก<br/>• Map ชื่อเมืองภาษาไทย/อังกฤษ"]
    
    NORMALIZE --> FETCH_API["ส่งคำขอข้อมูลผ่าน WeatherClient<br/>(Fetch Weather & AQI)"]
    
    FETCH_API --> API_EVAL{"ตรวจสอบสถานะ API Response<br/>(API Status OK?)"}
    
    API_EVAL -- "สำเร็จ (HTTP 200 & Valid Payload)" --> PARSE_LIVE["จัดเตรียม Snapshot จากข้อมูลสด<br/>(Process Live API Data)"]
    
    API_EVAL -- "ล้มเหลว (Network Err / Invalid Key / Rate Limit)" --> FALLBACK["เปิดใช้งาน Mock Data อัตโนมัติ<br/>(Defensive Fallback to Mock Data)"]
    FALLBACK --> WARN_FALLBACK["แสดงป้ายเตือน: [MOCK DATA MODE]<br/>(Notify User of Mock Mode)"]
    
    PARSE_LIVE --> MERGE_SNAP["รวมข้อมูลเป็นโครงสร้างมาตรฐาน (Unified Snapshot Dict)"]
    WARN_FALLBACK --> MERGE_SNAP
    
    MERGE_SNAP --> DB_SAVE["บันทึกข้อมูลลงฐานข้อมูล SQLite<br/>DataStore.save_record(snapshot)"]
    
    DB_SAVE --> ADVISORY_CALC["ประมวลผลคำแนะนำสุขภาพ<br/>get_simple_advisory(aqi, temp)"]
    
    ADVISORY_CALC --> PRINT_CARD["แสดงผลการ์ดสถานะ ASCII Status Card<br/>• กรอบ Unicode Box-drawing<br/>• ค่าอุณหภูมิ, ความชื้น, AQI, มลพิษหลัก<br/>• ข้อความแนะนำสุขภาพภาษาไทย"]
    
    PRINT_CARD --> LOOP_ASK{"ต้องการตรวจสอบเมืองอื่นต่อหรือไม่?<br/>(Continue Search? [Y/N])"}
    
    LOOP_ASK -- "Y / Yes (ทำต่อ)" --> PROMPT
    LOOP_ASK -- "N / No (ออก)" --> EXIT_MSG["แสดงข้อความขอบคุณและปิดโปรแกรม<br/>(Display Exit Message)"]
    EXIT_MSG --> FINISH(["สิ้นสุดการทำงาน (End)"])

    %% Styles
    classDef startEnd fill:#047857,stroke:#10b981,stroke-width:2px,color:#ffffff;
    classDef process fill:#1e293b,stroke:#64748b,stroke-width:1.5px,color:#f8fafc;
    classDef decision fill:#7c2d12,stroke:#f97316,stroke-width:2px,color:#ffffff;
    classDef warning fill:#831843,stroke:#f43f5e,stroke-width:2px,color:#ffffff;
    classDef output fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff;

    class START,FINISH startEnd;
    class BANNER,NORMALIZE,FETCH_API,PARSE_LIVE,MERGE_SNAP,DB_SAVE,ADVISORY_CALC,EXIT_MSG process;
    class CHECK_EMPTY,API_EVAL,LOOP_ASK decision;
    class WARN_EMPTY,FALLBACK,WARN_FALLBACK warning;
    class PROMPT,PRINT_CARD output;
```

---

## 3. ขั้นตอนการทำงานของผู้ใช้ - โหมดสาธิต (User Flow: Demo Mode)

โหมดสาธิต (`python main.py --demo`) ถูกสร้างขึ้นเพื่อให้คณะกรรมการหรือผู้ตรวจโครงงานสามารถทดสอบความสามารถของระบบได้อย่างรวดเร็ว โดยระบบจะวนลูปดึงข้อมูลเมืองตัวแทน 3 ภูมิภาคหลักของประเทศไทย บันทึกลงฐานข้อมูล แสดงผลการ์ดสรุป และแสดงประวัติข้อมูลย้อนหลังทันที

```mermaid
flowchart TD
    D_START(["เริ่มต้นโหมดสาธิต (Run: python main.py --demo)"]) --> D_BANNER["แสดงแบนเนอร์โหมดสาธิต<br/>(Display Demo Mode Banner)"]
    D_BANNER --> INIT_LIST["กำหนดรายการเมืองเป้าหมาย 3 ภูมิภาค<br/>cities = ['Khon Kaen', 'Bangkok', 'Chiang Mai']"]
    
    INIT_LIST --> ITER_START{"ยังมีเมืองในรายการ<br/>ที่ยังไม่ได้ประมวลผล?<br/>(Has Next City?)"}
    
    ITER_START -- "มีเมืองถัดไป (Yes)" --> PICK_CITY["เลือกเมืองปัจจุบัน (Current City)"]
    PICK_CITY --> LOG_FETCH["แสดงสถานะ: Fetching Data for [City]..."]
    LOG_FETCH --> CALL_CLIENT["เรียก WeatherClient.get_combined_snapshot(city)"]
    
    CALL_CLIENT --> SNAP_READY["ได้รับ Combined Snapshot<br/>(Live API หรือ Mock Fallback)"]
    SNAP_READY --> SAVE_SQLITE["บันทึกข้อมูลลงตาราง metrics<br/>DataStore.save_record(snapshot)"]
    
    SAVE_SQLITE --> EVAL_ADV["ประมวลผลระดับ AQI และคำแนะนำสุขภาพ<br/>get_simple_advisory(aqi, temp)"]
    EVAL_ADV --> RENDER_CARD["พิมพ์การ์ดสถานะ ASCII Box Status Card ลงจอภาพ"]
    RENDER_CARD --> DELAY_STEP["หน่วงเวลาเล็กน้อยเพื่อความชัดเจน (Time Delay 0.5s)"]
    DELAY_STEP --> ITER_START
    
    ITER_START -- "ครบทุกเมืองแล้ว (No / Complete)" --> FETCH_HIST["ดึงประวัติการบันทึกทั้งหมดจาก SQLite<br/>DataStore.fetch_all_records()"]
    FETCH_HIST --> PRINT_TABLE["แสดงผลตารางสรุปประวัติย้อนหลัง<br/>(Render History Summary Table)"]
    PRINT_TABLE --> D_SUMMARY["แสดงข้อความสรุปความพร้อมของระบบ (Demo Finished Successfully)"]
    D_SUMMARY --> D_END(["สิ้นสุดการทดสอบโหมดสาธิต (End Demo)"])

    %% Styles
    classDef demoStart fill:#1d4ed8,stroke:#60a5fa,stroke-width:2px,color:#ffffff;
    classDef demoProc fill:#1e293b,stroke:#475569,stroke-width:1.5px,color:#f8fafc;
    classDef demoLoop fill:#6d28d9,stroke:#c084fc,stroke-width:2px,color:#ffffff;
    classDef demoCard fill:#065f46,stroke:#34d399,stroke-width:2px,color:#ffffff;

    class D_START,D_END demoStart;
    class D_BANNER,INIT_LIST,PICK_CITY,LOG_FETCH,CALL_CLIENT,SNAP_READY,SAVE_SQLITE,EVAL_ADV,DELAY_STEP,FETCH_HIST,PRINT_TABLE,D_SUMMARY demoProc;
    class ITER_START demoLoop;
    class RENDER_CARD demoCard;
```

---

## 4. แผนภาพการไหลของข้อมูล (Data Flow Diagram - DFD)

แผนภาพแสดงทิศทางการไหลและการแปลงสภาพของข้อมูลระหว่าง **External Entities (แหล่งข้อมูลภายนอก)**, **Processes (กระบวนการประมวลผล)**, และ **Data Stores (แหล่งเก็บข้อมูล)**

```mermaid
flowchart LR
    %% External Entities
    subgraph Entities ["External Entities (เอนทิตีภายนอก)"]
        USER["👤 ผู้ใช้งานระบบ (User / Operator)"]
        EXT_OWM["🌐 OpenWeatherMap Server (Weather API)"]
        EXT_IQAIR["🌐 IQAir AirVisual Server (AQI API)"]
    end

    %% Processes
    subgraph Processes ["Data Processing Engines (กระบวนการประมวลผลข้อมูล)"]
        P1["1.0 รับค่าและปรับรูปแบบคำค้น<br/>(Normalize Input Query)"]
        P2["2.0 ร้องขอและสกัดข้อมูลสภาพอากาศ<br/>(Fetch & Parse Weather)"]
        P3["3.0 ร้องขอและสกัดข้อมูลมลพิษ<br/>(Fetch & Parse AQI)"]
        P4["4.0 ประกอบรวมและคำนวณคำแนะนำ<br/>(Aggregate Snapshot & Advisory)"]
        P5["5.0 บันทึกและดึงข้อมูลย้อนหลัง<br/>(Persist & Query Records)"]
        P6["6.0 สร้างภาพแสดงผลระดับสายตา<br/>(Render ASCII & Card Formatting)"]
    end

    %% Data Stores
    subgraph Stores ["Data Stores (แหล่งเก็บข้อมูล)"]
        DS_MOCK[("D1: Mock Data Cache (In-Memory Fallback)")]
        DS_SQLITE[("D2: SQLite DB (data/weather_data.db)<br/>Table: metrics")]
    end

    %% Flows from User
    USER -->|"ป้อนชื่อเมือง (Raw City String / --demo flag)"| P1
    P1 -->|"ชื่อเมืองแบบมาตรฐาน (Normalized City: e.g. 'bangkok')"| P2
    P1 -->|"ชื่อเมืองแบบมาตรฐาน (Normalized City: e.g. 'bangkok')"| P3

    %% External API Communications
    P2 <-->|"HTTP GET Request / JSON Weather Response"| EXT_OWM
    P3 <-->|"HTTP GET Request / JSON Pollution Response"| EXT_IQAIR

    %% Fallback Flows
    DS_MOCK -.->|"ส่งค่าสำรองเมื่อออฟไลน์ (Mock Weather Data)"| P2
    DS_MOCK -.->|"ส่งค่าสำรองเมื่อออฟไลน์ (Mock AQI Data)"| P3

    %% Flow to Aggregator
    P2 -->|"พารามิเตอร์สภาพอากาศ (Temp, Humidity, Pressure, Desc)"| P4
    P3 -->|"พารามิเตอร์คุณภาพอากาศ (AQI, Category, Main Pollutant)"| P4

    %% Persistence Flow
    P4 -->|"ชุดข้อมูลสมบูรณ์ (Unified Snapshot Dictionary)"| P5
    P5 -->|"SQL INSERT Statement (Record Values)"| DS_SQLITE
    DS_SQLITE -->|"SQL SELECT Result Set (Historical Rows)"| P5

    %% Presentation Flow
    P4 -->|"ข้อมูลการ์ดและผลการประเมิน (Snapshot + Advisory Info)"| P6
    P5 -->|"รายการประวัติย้อนหลัง (Record History List)"| P6
    P6 -->|"การ์ด ASCII และตารางประวัติบนหน้าจอคอนโซล"| USER

    %% Styles
    classDef entityStyle fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#ffffff;
    classDef processStyle fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#ffffff;
    classDef storeStyle fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#ffffff;

    class USER,EXT_OWM,EXT_IQAIR entityStyle;
    class P1,P2,P3,P4,P5,P6 processStyle;
    class DS_MOCK,DS_SQLITE storeStyle;
```

---

## 5. แผนภาพคลาสและความสัมพันธ์เชิงโครงสร้าง (Class Diagram)

โครงสร้างเชิงวัตถุ (Object-Oriented Design) ของโมดูลหลักในระบบ ประกอบด้วยคลาสจัดการข้อมูลภายนอก (`WeatherClient`), คลาสจัดการฐานข้อมูล (`DataStore`), และคลาสประสานงานหน้าจอผู้ใช้ (`CLIApp`) พร้อมฟังก์ชันอรรถประโยชน์อิสระ (`get_simple_advisory`)

```mermaid
classDiagram
    direction TB

    class WeatherClient {
        -str owm_api_key
        -str iqair_api_key
        +dict DEFAULT_CITIES
        -dict MOCK_WEATHER_DATA
        -dict MOCK_AQI_DATA
        +__init__(owm_key: str, iqair_key: str)
        +fetch_weather(city: str) dict
        +fetch_aqi(city: str) dict
        +get_combined_snapshot(city: str) dict
        -_mock_weather_data(city: str) dict
        -_mock_aqi_data(city: str) dict
    }

    class DataStore {
        +str db_path
        +__init__(db_path: str)
        -_init_db() void
        +save_record(snapshot: dict) int
        +fetch_all_records(limit: int) list~dict~
        +fetch_records_by_city(city: str) list~dict~
    }

    class CLIApp {
        +WeatherClient weather_client
        +DataStore data_store
        +__init__(client: WeatherClient, store: DataStore)
        +display_banner() void
        +normalize_city(raw_input: str) str
        +print_snapshot_box(snapshot: dict, advisory: dict) void
        +print_history_table(records: list~dict~) void
        +run_interactive() void
        +run_demo() void
    }

    class AdvisoryEngine {
        <<Utility Module>>
        +get_simple_advisory(aqi: int, temp: float) dict
    }

    class MetricsRecord {
        <<Data Transfer Object>>
        +int id
        +str timestamp
        +str city
        +float temp
        +float humidity
        +float pressure
        +str description
        +int aqi
        +str aqi_category
        +str main_pollutant
    }

    %% Relationships
    CLIApp *-- WeatherClient : "ประกอบด้วย (Composition)"
    CLIApp *-- DataStore : "ประกอบด้วย (Composition)"
    CLIApp ..> AdvisoryEngine : "เรียกใช้งาน (Invokes)"
    DataStore ..> MetricsRecord : "บันทึกและคืนค่า (Persists/Maps)"
    WeatherClient ..> MetricsRecord : "จัดรูปแบบข้อมูล (Produces Raw Data)"
```

### คำอธิบายโครงสร้างคลาส (Class Structure Details)
- **`WeatherClient` (`src/weather_client.py`)**:
  - รับผิดชอบการติดต่อผ่านเครือข่าย HTTP REST API ไปยัง OpenWeatherMap และ IQAir
  - ทำการ Wrap ค่า Exception และมีกลไกตรวจจับ Fallback อัตโนมัติ (`_mock_weather_data`, `_mock_aqi_data`) หากไม่พบคีย์ API หรือระบบขัดข้อง
- **`DataStore` (`src/data_store.py`)**:
  - ควบคุมการเชื่อมต่อ SQLite อย่างปลอดภัย โดยรันคำสั่ง `CREATE TABLE IF NOT EXISTS` อัตโนมัติเมื่อเริ่มต้นออบเจกต์
  - รองรับการบันทึก Snapshot และสืบค้นข้อมูลประวัติพร้อมจำกัดจำนวนแถวผลลัพธ์ (`limit`)
- **`CLIApp` (`src/cli_app.py`)**:
  - ควบคุมลำดับการแสดงผลผ่าน Terminal, ตรวจสอบและทำความสะอาด Input ของผู้ใช้
  - ผสานรวมข้อมูลผลลัพธ์สภาพอากาศ เข้ากับคำแนะนำของ `AdvisoryEngine` แล้วนำไปเรนเดอร์เป็นการ์ด ASCII
- **`get_simple_advisory(aqi, temp)`**:
  - ฟังก์ชันประเมินระดับดัชนีคุณภาพอากาศ (US AQI Standard) และสภาพอุณหภูมิ เพื่อคืนค่าคำแนะนำด้านสุขภาพภาษาไทยที่เหมาะสมกับประชาชนทั่วไปและกลุ่มเสี่ยง

---

## 6. โครงสร้างฐานข้อมูล (Database Schema & ER Diagram)

ระบบใช้ฐานข้อมูล **SQLite** ในการจัดเก็บข้อมูลเบื้องต้น (`data/weather_data.db`) โดยมีตารางหลักคือ `metrics` พร้อมรองรับการขยายสถาปัตยกรรมสู่ **Supabase PostgreSQL** ใน Sprint 3

```mermaid
erDiagram
    METRICS {
        INTEGER id PK "Primary Key (Auto Increment)"
        TEXT timestamp "ISO-8601 Record Timestamp (UTC/Local)"
        TEXT city "Normalized City Name (e.g. Bangkok, Khon Kaen)"
        REAL temp "Ambient Temperature (Degrees Celsius)"
        REAL humidity "Relative Humidity Percentage (0 - 100%)"
        REAL pressure "Atmospheric Pressure at Sea Level (hPa)"
        TEXT description "Sky Condition (e.g. scattered clouds, rain)"
        INTEGER aqi "US Air Quality Index Value (0 - 500)"
        TEXT aqi_category "AQI Health Risk Level (Good, Moderate, Unhealthy)"
        TEXT main_pollutant "Primary Air Pollutant (e.g. pm2.5, pm10, o3)"
    }
```

### รายละเอียดพจนานุกรมข้อมูล (Data Dictionary for `metrics` Table)

| ฟิลด์ (Field Name) | ชนิดข้อมูล (Type) | คีย์ (Key) | ค่าว่าง (Null) | คำอธิบายภาษาไทย (Description) | ตัวอย่างข้อมูล (Example) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id` | `INTEGER` | **PK** | No | ลำดับรหัสรายการ (Auto Increment) | `1`, `2`, `3` |
| `timestamp` | `TEXT` | - | No | เวลาที่ทำการบันทึกข้อมูล (ISO-8601 Format) | `2026-09-15 09:30:00` |
| `city` | `TEXT` | IDX | No | ชื่อเมืองที่ตรวจวัด (Normalized Capital Case) | `"Bangkok"`, `"Khon Kaen"` |
| `temp` | `REAL` | - | No | อุณหภูมิอากาศ ณ จุดตรวจวัด (องศาเซลเซียส) | `32.5` |
| `humidity` | `REAL` | - | No | ความชื้นสัมพัทธ์ในอากาศ (เปอร์เซ็นต์ %) | `68.0` |
| `pressure` | `REAL` | - | Yes | ความกดอากาศสัมพัทธ์ระดับน้ำทะเล (hPa) | `1012.4` |
| `description` | `TEXT` | - | Yes | รายละเอียดสภาพท้องฟ้าและสภาพอากาศ | `"few clouds"`, `"light rain"` |
| `aqi` | `INTEGER` | - | Yes | ดัชนีคุณภาพอากาศมาตรฐานสากล (US AQI) | `45`, `112`, `165` |
| `aqi_category` | `TEXT` | - | Yes | ระดับความเสี่ยงต่อสุขภาพตามเกณฑ์มาตรฐาน | `"Moderate"`, `"Unhealthy"` |
| `main_pollutant`| `TEXT` | - | Yes | สารมลพิษหลักที่เป็นตัวกำหนดค่า AQI | `"pm25"`, `"pm10"`, `"o3"` |

> [!TIP]
> **การปรับปรุงประสิทธิภาพฐานข้อมูล (Database Indexing Recommendation):**  
> ในการใช้งานจริง แนะนำให้สร้าง Index แบบผสม `CREATE INDEX idx_city_time ON metrics(city, timestamp DESC);` เพื่อเพิ่มความเร็วในการสืบค้นประวัติย้อนหลังของแต่ละเมืองสำหรับโมดูลพล็อตกราฟใน Sprint 2

---

## 7. แผนงานการพัฒนาตามสปรินต์ (Sprint Roadmap)

แผนงานการพัฒนาโครงงานแบ่งออกเป็น 3 สปรินต์หลัก โดยเริ่มจากรากฐาน Command-Line Interface ที่มั่นคง การเสริมขีดความสามารถด้านการวิเคราะห์ภาพและปัญญาประดิษฐ์ ไปจนถึงการยกระดับสู่เว็บแอปพลิเคชันระดับคลาวด์

```mermaid
gantt
    title WeatherAQI Sense — แผนพัฒนาโครงการ (Development Roadmap)
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b

    section Sprint 1: CLI Core & Architecture
    ออกแบบสถาปัตยกรรมและ Schema DB         :done, s1_arch, 2026-09-01, 3d
    พัฒนา WeatherClient และ Mock Data Fallback :done, s1_api, after s1_arch, 4d
    สร้างระบบฐานข้อมูล SQLite DataStore       :done, s1_db, after s1_api, 3d
    ออกแบบหน้าจอ CLIApp & ASCII Status Card   :done, s1_cli, after s1_db, 4d
    ทดสอบ Interactive Mode และ Demo Mode      :done, s1_test, after s1_cli, 2d

    section Sprint 2: Analytics & AI Advisory
    สร้างโมดูล report_generator.py (Matplotlib):active, s2_plot, 2026-09-17, 5d
    ทำกราฟสองแกน Dual-Axis (Temp vs AQI)    :active, s2_dual, after s2_plot, 3d
    พัฒนาโมดูล ai_advisory.py (AI Engine)    :s2_ai, after s2_plot, 4d
    สร้างระบบจำแนกกลุ่มเสี่ยง (Sensitive Groups):s2_risk, after s2_ai, 3d
    ระบบส่งออกรายงานประวัติแบบ PDF/PNG        :s2_export, after s2_dual, 3d

    section Sprint 3: Cloud & Modern Web UI
    เตรียม Cloud DB บน Supabase (PostgreSQL)  :s3_supa, 2026-10-05, 4d
    เขียน API Adapter ย้ายข้อมูลจาก SQLite     :s3_migr, after s3_supa, 3d
    สร้าง Web Dashboard ด้วย Glassmorphism UI  :s3_web, after s3_migr, 7d
    ระบบสลับ 2 ภาษาแบบไดนามิก (TH / EN Toggle) :s3_lang, after s3_web, 3d
    แผนที่มลพิษโต้ตอบ (Interactive Geo Map)   :s3_map, after s3_web, 4d
    การทดสอบระบบรวมและจัดทำคู่มือส่งมอบงาน    :s3_final, after s3_map, 3d
```

### ไทม์ไลน์สรุปตามสปรินต์ (Sprint Progression Highlights)

```mermaid
journey
    title เส้นทางการพัฒนาโครงงาน WeatherAQI Sense (Project Evolution)
    section Sprint 1: รากฐานระบบ (Foundation)
      รับส่งคำสั่งผ่านคอนโซล (CLI Interface) : 5: นักพัฒนา
      เชื่อมต่อ 2 APIs (OpenWeather + IQAir) : 4: นักพัฒนา
      ระบบสำรองข้อมูลฉุกเฉิน (Mock Fallback) : 5: นักพัฒนา, ผู้ใช้
      บันทึกข้อมูลท้องถิ่น (SQLite Persistence) : 5: นักพัฒนา
    section Sprint 2: การวิเคราะห์และปัญญาประดิษฐ์ (Intelligence)
      พล็อตกราฟสถิติสองแกน (Dual-Axis Charts) : 4: นักวิเคราะห์
      คำแนะนำเชิงลึกจาก AI (AI Health Advisory) : 4: ผู้ใช้, ผู้เชี่ยวชาญ
      การประเมินความเสี่ยงรายกลุ่ม (Risk Assessment) : 4: ผู้ใช้
    section Sprint 3: ประสบการณ์ผู้ใช้ขั้นสูง (Modern Experience)
      เชื่อมต่อคลาวด์ (Supabase Cloud Migration) : 5: นักพัฒนา
      อินเทอร์เฟซกระจกโปร่งแสง (Glassmorphism Web UI) : 5: ผู้ใช้
      รองรับสองภาษาไทย-อังกฤษ (Bilingual TH/EN) : 5: ผู้ใช้สากล
```

---

## 8. ข้อกำหนดทางเทคนิคและการจัดการข้อผิดพลาด (Technical Specs & Defensive Architecture)

### 8.1 Defensive Fallback Strategy (ยุทธศาสตร์การป้องกันความล้มเหลว)
เพื่อให้ระบบมีเสถียรภาพสูงสุดในการตรวจประเมินผลการเรียนการสอนและนำไปใช้งานจริง ระบบได้ออกแบบกลไกป้องกันข้อผิดพลาด 3 ระดับ:

1. **Missing API Keys Protection:**  
   หากไม่มีการตั้งค่า `OWM_API_KEY` หรือ `IQAIR_API_KEY` ในสภาพแวดล้อมระบบ ตัวโปรแกรมจะไม่ขัดข้องหรือเกิด Unhandled Exception แต่จะสลับไปดึงข้อมูลจำลองจาก `_mock_weather_data()` และ `_mock_aqi_data()` ทันที พร้อมแสดงสัญลักษณ์ `[MOCK MODE]` บนหน้าจอ
2. **Network Timeout & Connection Refusal Handling:**  
   ใช้การดักจับข้อผิดพลาด `requests.exceptions.RequestException` และกำหนดค่า `timeout` อย่างเคร่งครัด (5-10 วินาที) ป้องกันไม่ให้หน้าจอ Terminal ค้าง
3. **HTTP 429 Rate-Limit Mitigation:**  
   เนื่องจากบริการฟรีของ IQAir มีการจำกัดโควตาการเรียกใช้งานต่อนาที/วัน เมื่อพบรหัสสถานะ `429 Too Many Requests` ระบบจะแจ้งเตือนผู้ใช้อย่างสุภาพและดึงค่าล่าสุดจากฐานข้อมูล SQLite ในเครื่องมาแสดงผลแทน

### 8.2 เกณฑ์การแปลผลดัชนีคุณภาพอากาศ (US AQI Health Breakpoints)
ระบบของ `get_simple_advisory()` อ้างอิงตามมาตรฐาน US EPA:

| ช่วงค่า AQI | ระดับคุณภาพอากาศ | สัญลักษณ์สี | คำแนะนำทางสุขภาพภาษาไทย (Health Advisory) |
| :---: | :---: | :---: | :--- |
| **0 - 50** | ดีมาก (Good) | 🟢 เขียว | อากาศบริสุทธิ์ เหมาะสำหรับกิจกรรมกลางแจ้งทุกประเภท |
| **51 - 100** | ปานกลาง (Moderate) | 🟡 เหลือง | คุณภาพอากาศยอมรับได้ ผู้มีอาการภูมิแพ้ควรเฝ้าระวังอาการเบื้องต้น |
| **101 - 150** | เริ่มมีผลต่อสุขภาพ (Unhealthy for Sensitive) | 🟠 ส้ม | เด็ก ผู้สูงอายุ และผู้ป่วยทางเดินหายใจ ควรลดกิจกรรมกลางแจ้ง |
| **151 - 200** | มีผลกระทบต่อสุขภาพ (Unhealthy) | 🔴 แดง | ทุกคนควรหลีกเลี่ยงกิจกรรมกลางแจ้ง และสวมหน้ากากป้องกันฝุ่น N95 |
| **201 - 300** | มีผลกระทบต่อสุขภาพมาก (Very Unhealthy) | 🟣 ม่วง | เตือนภัยสุขภาพ! งดกิจกรรมกลางแจ้งเด็ดขาด และเปิดเครื่องฟอกอากาศ |
| **301+** | อันตรายร้ายแรง (Hazardous) | 🟤 น้ำตาลเข้ม | ภาวะฉุกเฉินด้านมลพิษ อยู่ภายในอาคารปิดมิดชิดตลอดเวลา |

---

*เอกสารฉบับนี้จัดทำขึ้นสำหรับโครงการ WeatherAQI Sense — เพื่อใช้ประกอบการประเมินโครงงานวิศวกรรมซอฟต์แวร์และการพัฒนาโปรแกรมต่อเนื่อง*
