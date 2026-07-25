#pragma once
// Wokwi-friendly analog inputs stand in for industrial probes.
constexpr int PH_PIN = 34;          // potentiometer: 0-14 pH
constexpr int TDS_PIN = 35;         // potentiometer: 0-3500 mg/L
constexpr int TURBIDITY_PIN = 32;  // potentiometer: 0-100 NTU
constexpr int COLOUR_PIN = 33;      // potentiometer: 0-100 intensity
constexpr int FLOW_PIN = 27;        // pulse input
constexpr int BYPASS_PIN = 14;      // active-low maintenance switch
constexpr int GREEN_LED = 18;
constexpr int RED_LED = 19;
constexpr int YELLOW_LED = 21;
constexpr int BUZZER_PIN = 22;
constexpr int VALVE_PIN = 23;
constexpr int PUMP_PIN = 25;
constexpr float PH_MIN = 6.5, PH_MAX = 8.5;
constexpr float TDS_WARNING = 1500, TDS_VIOLATION = 2100;
constexpr float TURBIDITY_WARNING = 20, TURBIDITY_VIOLATION = 50;
constexpr float COLOUR_WARNING = 55, COLOUR_VIOLATION = 78;
