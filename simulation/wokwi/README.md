# Wokwi setup

1. Create a new ESP32 DevKit project at [wokwi.com](https://wokwi.com/).
2. Replace its `diagram.json` with this file and upload the contents of `firmware/chromaguard/` as the sketch.
3. Start the simulation and watch the Serial Monitor for JSON telemetry.
4. Turn the pH/TDS/turbidity/colour potentiometers; a critical value turns on the red diversion output. Press the maintenance switch to see the yellow override state.

Wokwi's virtual potentiometers are proxies, not calibrated industrial sensors.
