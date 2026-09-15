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
