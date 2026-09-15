"""
AIAdvisory Module
Provides smart health, exercise, and outdoor activity recommendations
based on Air Quality Index (AQI) levels and temperature.
Safe for all terminal encodings (ASCII/UTF-8 compatible).
"""

from typing import Dict, Any

class AIAdvisory:
    """
    Evaluates weather and air quality parameters to generate explainable health advisories.
    """
    
    AQI_THRESHOLDS = [
        (50, "Good", "[Good] Air quality is satisfactory. Ideal for outdoor workouts and outdoor activities."),
        (100, "Moderate", "[Moderate] Air quality is acceptable. Sensitive individuals should consider reducing heavy outdoor exertion."),
        (150, "Unhealthy for Sensitive Groups", "[Unhealthy for Sensitive Groups] Sensitive groups (asthma, children, elderly) may experience health effects. Wear N95 mask outdoors."),
        (200, "Unhealthy", "[Unhealthy] Everyone may begin to experience health effects. Avoid prolonged outdoor activities and wear mask."),
        (300, "Very Unhealthy", "[Very Unhealthy] Health alert: serious health effects for everyone. Stay indoors and run air purifiers."),
        (999, "Hazardous", "[Hazardous] Emergency conditions: entire population likely affected. Do NOT go outside.")
    ]

    @classmethod
    def get_advisory(cls, aqi: int, temp: float) -> Dict[str, str]:
        """
        Returns structured advisory containing category, health notice, and outdoor activity recommendation.
        """
        category = "Unknown"
        notice = "No advisory available."
        
        for threshold, cat, msg in cls.AQI_THRESHOLDS:
            if aqi <= threshold:
                category = cat
                notice = msg
                break

        # Temperature Advisory
        if temp >= 35.0:
            temp_notice = "[Heat Warning] High Heat Warning: Stay hydrated and avoid direct sunlight exposure."
        elif temp <= 18.0:
            temp_notice = "[Cool Notice] Keep warm when exercising outside."
        else:
            temp_notice = "[Comfortable] Comfortable Temperature: Suitable weather conditions."

        return {
            "aqi_category": category,
            "health_notice": notice,
            "temp_notice": temp_notice,
            "explainable_summary": f"AQI Level {aqi} ({category}) | Temp {temp:.1f}C -> {notice} {temp_notice}"
        }
