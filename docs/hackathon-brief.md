# Technical brief

## Problem

Water tests and monitoring dashboards do not control the discharge pipe. ChromaGuard adds a valve to the monitoring loop. A failed sample changes the route before the simulated flow reaches the normal outlet.

## Implemented

- Browser simulation with ten fixed scenarios
- Rule checks for pH, TDS, turbidity, colour, and sensor validity
- State machine for diversion hold, recovery, bypass, and tank capacity
- Searchable event history, charts, CSV export, and localStorage recovery
- ESP32 sketch with analogue proxy inputs and JSON serial output
- Wokwi circuit with LEDs, buzzer, valve output, pump output, and bypass switch
- Automated tests and GitHub Pages deployment

## Pilot sequence

1. Install the sensor pod and valve on one controlled outflow line.
2. Calibrate each probe against laboratory measurements and record false decisions.
3. Test two or three member units connected to one CETP.
4. Add the holding tank and dosing pump only after the diversion system is stable.
5. Measure treatment results before pursuing a supervised regulatory pilot.

## Cost estimate

| Build | Scope | Estimate |
|---|---|---:|
| Sensor stack | Shared sensing hardware | ₹3,100–₹4,400 |
| Plan A | Sensing and diversion | ₹3,500–₹5,300 |
| Plan B | Diversion and treatment buffer | ₹4,600–₹7,500 |

These figures are early estimates, not supplier quotes. Industrial probes, enclosures, certified switching hardware, installation, and calibration will cost more.

## Possible operating model

The hardware could be sold or leased. Calibration, probe cleaning, and valve maintenance would be recurring services. This repository does not implement billing, authentication, a cloud database, or a hosted compliance service.

## Tests required before field use

- Calibration with labelled textile-effluent samples
- False-positive and false-negative analysis
- Electrical isolation and protected actuator drivers
- Watchdog, emergency stop, and power-loss tests
- Normally safe valve and tank-level interlocks
- Site-specific TNPCB/CPCB review
- Independent testing of any dosing process

## Current limit

The digital twin and automated tests run now. Wokwi uses proxy inputs. The project has not yet measured real effluent or actuated a physical valve.
