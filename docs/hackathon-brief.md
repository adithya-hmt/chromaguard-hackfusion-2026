# ChromaGuard HackFusion brief

## One-line value proposition

ChromaGuard converts water-quality sensing into an immediate, explainable physical diversion decision at the discharge pipe.

## The gap

Laboratory testing and passive dashboards can identify pollution after release or wait for a human response. The prototype demonstrates a closed loop instead: **Sense → Classify → Decide → Act → Log**.

## What judges can verify now

- Ten deterministic browser scenarios, including violations, sensor loss, bypass, and a nearly full holding tank.
- A rule classifier with explicit pH, TDS, turbidity, and colour thresholds.
- Automatic diversion on non-compliance and the configured sensor-fault response.
- Minimum diversion hold and consecutive-compliant recovery in a state machine.
- Searchable local event history, CSV export, trend charts, impact counters, and localStorage restoration.
- Mirrored Arduino-compatible ESP32 rules, Wokwi proxy inputs, actuator outputs, and JSON serial telemetry.
- Automated classifier/state tests and GitHub Actions deployment.

## Why it is different

The differentiator is not another water dashboard. ChromaGuard places the actuator in the decision loop. The prototype also keeps rule reasons visible, logs maintenance bypass, and demonstrates unsafe-capacity handling instead of hiding difficult states.

## Pilot model from the submission deck

1. **Prototype and calibrate:** build Plan A on one outflow line, gather labelled samples, tune thresholds, and validate the valve.
2. **CETP pilot:** deploy at two or three member units connected to one CETP; compare sensors with laboratory measurements and review false decisions.
3. **Add pre-treatment:** introduce the holding tank and dosing buffer and measure contaminant reduction before CETP hand-off.
4. **Regulatory pathway:** pursue a supervised TNPCB pilot only after safety and field evidence are complete.

## Sustainability path

The deck proposes hardware sale or lease and recurring calibration, probe-cleaning, and maintenance services. A hosted compliance dashboard may be evaluated later, but the submitted repository deliberately has no authentication, paid API, cloud database, or SaaS claim.

## Validation gates before field use

- Traceable calibration against real textile-effluent samples.
- False-positive and false-negative analysis across operating conditions.
- Electrical isolation, enclosure, relay-driver, flyback, watchdog, and emergency-stop review.
- Normally-safe valve selection, power-loss testing, tank-level interlocks, and hydraulic validation.
- Applicable TNPCB/CPCB limits and disposal/reuse requirements confirmed for the specific site.
- Independent treatment-performance testing for any dosing stage.

## Honest status

The digital twin and tests are working. The Wokwi build uses proxy inputs. Physical sensing, valve actuation, treatment performance, regulator acceptance, tamper resistance, and ML classification remain unvalidated.
