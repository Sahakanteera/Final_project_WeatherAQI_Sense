# Changelog

All notable changes to the Weather & Air Quality Dashboard project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v0.1.0] - Sprint 1: Front-End App Dev & Architecture Skeleton
### Added
- Initialized project directory structure with `src/`, `tests/`, `data/`.
- Created OOP class skeletons for `WeatherClient`, `DataStore`, `ReportGenerator`, `AIAdvisory`, and `CLIApp`.
- Implemented defensive input normalization (`.strip().lower()`) in CLI controller.
- Added automated unit tests (`tests/test_api.py`, `tests/test_db.py`, `tests/test_reports.py`).
- Added automated demo mode (`python main.py --demo`).

### Planner / Coder / Debugger Roles
- **Planner (ผักกาด):** Defined OOP class architecture, SQLite database schema, and Kanban board DoD.
- **Coder (พัตเตอร์):** Implemented CLI menu, `WeatherClient` API integration, and `DataStore` SQLite persistence.
- **Debugger (กล้า):** Built unit testing suite, verified input validation, and handled defensive fallbacks.

---

## [v0.2.0] - Sprint 2: Back-End App Dev & Cloud Migration
### Added
- **Cloud Database Migration:** Migrated persistence from local SQLite to Supabase PostgreSQL (`supabase_schema.sql`, `src/sync_supabase.py`).
- **Dual-Axis Chart Generator:** Matplotlib trend plot comparing Temp vs AQI over time (`src/report_generator.py`).
- **AI Health Advisory Module:** Rule-based 6-level AQI classification with temperature warnings (`src/ai_advisory.py`).
- **Search Algorithm:** `DataStore.search_records(keyword)` — keyword search across city names and descriptions.
- **Filter Algorithm:** `DataStore.filter_records()` — multi-criteria filtering by city, AQI range, and temperature range.
- **Sort Algorithm:** `DataStore.fetch_sorted_records()` — sort by any column (aqi, temp, timestamp, city) in asc/desc order.
- **CRUD Complete:** Added `update_record(id, updates)` and `delete_record(id)` to DataStore.
- **Expanded CLI Menu:** 10 menu options including Search (5), Filter (6), Sort (7), Update (8), Delete (9).
- **Learning Log:** Documented AI prompt logs in `learning_log.ipynb` and `LEARNINGLOG.md`.

### Planner / Coder / Debugger Roles
- **Coder (ผักกาด):** Implemented Supabase migration, report generator, and AI advisory module.
- **Debugger (พัตเตอร์):** Tested API fallbacks, database integrity, and edge case scenarios.
- **Planner (กล้า):** Designed cloud schema, defined Sprint 2 DoD, and coordinated integration.

---

## [v0.3.0] - Sprint 3: Full-Stack Web Dashboard & Deployment
### Added
- **Web Dashboard:** Glassmorphism UI covering all 78 Thai provinces with live weather & AQI data (`index.html`).
- **Bilingual UI:** Thai/English language toggle with complete translation support.
- **Live API Integration:** Real-time data from Open-Meteo Weather & Air Quality APIs on browser.
- **Supabase Cache Layer:** Province data cached in cloud with auto-refresh every 12 hours via GitHub Actions.
- **GitHub Pages Deployment:** Automated static site deployment (`.github/workflows/static.yml`).
- **CI/CD Pipeline:** Automated linting (flake8) and testing (pytest) on push/PR (`.github/workflows/ci.yml`).
- **Auto Data Refresh:** Scheduled GitHub Actions cron job for province data updates (`.github/workflows/refresh_data.yml`).
- **Edge Case Test Suite:** 37 additional tests covering boundary conditions, CRUD operations, and error handling (`tests/test_edge_cases.py`).
- **Project Architecture Document:** PLAN.md with UML Class Diagram, Data Schema, and Definition of Done.
- **Next.js UI Mockup:** Alternative React/Next.js dashboard prototype (`weather-aqi-sense-ui-mockup/`).

### Planner / Coder / Debugger Roles
- **Debugger (ผักกาด):** QA testing, edge case verification, and CI/CD validation.
- **Planner (พัตเตอร์):** Defined web architecture, bilingual specs, and deployment strategy.
- **Coder & DevOps (กล้า):** Built web dashboard, configured GitHub Actions, and deployed to GitHub Pages.
