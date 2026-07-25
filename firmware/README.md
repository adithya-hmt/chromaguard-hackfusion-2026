# ESP32 / Wokwi firmware

The Arduino-compatible sketch reads potentiometer values as proxy analog sensors, applies the documented rule classifier, drives the status outputs, and emits one JSON telemetry line per second. `config.h` is the single pin/threshold reference. A real deployment must add conditioned sensor circuits, electrical isolation, valve-driver protection, watchdogs, tank level interlocks, and field calibration.

Open `simulation/wokwi/diagram.json` in Wokwi, or import the folder as a new ESP32 project. Turn the potentiometers to reproduce the dashboard scenarios. The maintenance switch is active-low.
