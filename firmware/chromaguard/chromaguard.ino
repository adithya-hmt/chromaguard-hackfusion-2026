#include <Arduino.h>
#include "config.h"
#include "classifier.h"
volatile unsigned long flowPulses = 0;
void IRAM_ATTR flowISR() { flowPulses++; }
float scaled(int pin, float maxValue) { return analogRead(pin) / 4095.0f * maxValue; }
void setup() {
  Serial.begin(115200); pinMode(BYPASS_PIN, INPUT_PULLUP); pinMode(FLOW_PIN, INPUT_PULLUP); attachInterrupt(digitalPinToInterrupt(FLOW_PIN), flowISR, RISING);
  for (int pin : {GREEN_LED, RED_LED, YELLOW_LED, BUZZER_PIN, VALVE_PIN, PUMP_PIN}) pinMode(pin, OUTPUT);
}
void loop() {
  static unsigned long last = 0; if (millis() - last < 1000) return; last = millis();
  Readings r{scaled(PH_PIN, 14), scaled(TDS_PIN, 3500), scaled(TURBIDITY_PIN, 100), scaled(COLOUR_PIN, 100), flowPulses * 60.0f}; flowPulses = 0;
  Classification c = classify(r); bool bypass = digitalRead(BYPASS_PIN) == LOW; bool divert = !bypass && (c == NON_COMPLIANT || c == SENSOR_FAULT);
  digitalWrite(GREEN_LED, c == COMPLIANT && !bypass); digitalWrite(YELLOW_LED, c == WARNING || bypass); digitalWrite(RED_LED, divert); digitalWrite(VALVE_PIN, divert); digitalWrite(PUMP_PIN, divert && c == NON_COMPLIANT); digitalWrite(BUZZER_PIN, divert);
  Serial.printf("{\"timestamp\":%lu,\"ph\":%.2f,\"tds\":%.0f,\"turbidity\":%.1f,\"colourIntensity\":%.1f,\"flowRate\":%.1f,\"classification\":\"%s\",\"valve\":\"%s\",\"pump\":%s,\"bypass\":%s}\n", millis(), r.ph, r.tds, r.turbidity, r.colourIntensity, r.flowRate, classificationName(c), divert ? "DIVERTING" : "NORMAL", (divert && c == NON_COMPLIANT) ? "true" : "false", bypass ? "true" : "false");
}
