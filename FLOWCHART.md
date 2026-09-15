# System Architecture & Workflow Flowchart

Below is the architectural data flow diagram for the **Weather & Air Quality Dashboard**, illustrating interactions between the Presentation CLI Layer, Business Logic Layer, Data Persistence Layer, and External APIs.

```mermaid
graph TD
    User([User / CLI Client]) -->|1. Select City & Command| CLI[CLIApp Controller]
    
    subgraph Business Logic Layer
        CLI -->|2. Fetch Metrics| Client[WeatherClient]
        Client -->|2a. GET Weather| OWM[OpenWeatherMap API]
        Client -->|2b. GET Air Quality| IQAir[IQAir API]
        OWM -->|Return JSON| Client
        IQAir -->|Return JSON| Client
        
        Client -->|3. Combined Payload| Advisory[AIAdvisory Engine]
        Advisory -->|4. Health & Temp Advisory| CLI
    end
    
    subgraph Data Access Layer
        CLI -->|5. Save Snapshot| Store[DataStore SQLite]
        Store -->|Write Record| DB[(SQLite Database: metrics)]
    end
    
    subgraph Visualization Layer
        CLI -->|6. Request Trend Plot| Reporter[ReportGenerator]
        Reporter -->|7. Fetch History| Store
        Store -->|Return Records| Reporter
        Reporter -->|8. Render Dual-Axis Chart| Plot[Matplotlib PNG Output]
    end
    
    CLI -->|9. Display Explainable Box & Chart| User
```
