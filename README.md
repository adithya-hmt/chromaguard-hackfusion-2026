# ChromaGuard – Effluent Compliance System

ChromaGuard is an ESP32-oriented prototype for textile dye effluent. It continuously senses pH, TDS, turbidity, colour intensity, and flow; applies a documented rule classifier; decides the outlet route; drives a diversion valve on non-compliance; and records an auditable event log.

> **Prototype notice:** the browser uses simulated sensor data and this project is not a replacement for an effluent treatment plant, regulatory approval, or certified instrumentation. Thresholds are prototype defaults. Final limits require applicable TNPCB/CPCB review, field samples, calibration, and safety validation.

## Why detection alone is insufficient

A dashboard that only reports a violation leaves the discharge path open. ChromaGuard makes the control action explicit: in automatic mode, `NON_COMPLIANT` or `SENSOR_FAULT` enters the fail-safe route and commands diversion before the normal outlet. A full holding tank closes the valve and raises a visible fault instead of pretending the tank can accept more flow.

## Sense → Classify → Decide → Act → Log

```mermaid
flowchart LR
  A[Dyeing unit] --> B[Sensor pod]
  B --> C[Rule fusion classifier]
  C --> D{Decision]
  D -->|COMPLIANT| E[Normal discharge]
  D -->|WARNING| F[Alert + continue monitoring]
  D -->|NON_COMPLIANT / SENSOR_FAULT| G[Solenoid diversion]
  G --> H[Holding tank]
  H --> I[Optional dosing pump]
  C --> J[(Local event log)]
```

## Live demo

The public repository is [adithya-hmt/chromaguard-hackfusion-2026](https://github.com/adithya-hmt/chromaguard-hackfusion-2026). After the Pages workflow completes, the simulation is available at [adithya-hmt.github.io/chromaguard-hackfusion-2026](https://adithya-hmt.github.io/chromaguard-hackfusion-2026/).

## Run locally

```bash
npm install
npm run dev
```

The simulation is offline after the app loads. State and events are stored in the browser's localStorage. Run `npm run typecheck`, `npm test -- --run`, and `npm run build` for the release checks.

## Demo scenarios

Use the scenario console to reproduce normal, high TDS, acidic/alkaline pH, high turbidity, abnormal colour, severe mixed contamination, sensor disconnect, maintenance bypass, and holding-tank-full states. The event log supports search, filtering, CSV export, and confirmed clearing.

## Repository map

- `src/simulation/` — TypeScript classifier, state machine, scenarios, and telemetry helpers.
- `src/App.tsx` — responsive control-room dashboard.
- `firmware/chromaguard/` — Arduino-compatible ESP32 sketch and shared rule model.
- `simulation/wokwi/` — Wokwi diagram and setup notes.
- `docs/` — architecture, calibration, limits, BOM, testing, and demo script.
- `.github/workflows/` — test/build and GitHub Pages deployment.

## Classification model

Prototype defaults: pH 6.5–8.5; TDS warning/violation at 1,500/2,100 mg/L; turbidity warning/violation at 20/50 NTU; configurable colour thresholds at 55/78. A critical single-sensor rule diverts. Two warnings escalate to non-compliant. Missing or implausible critical input is `SENSOR_FAULT`. This is rule-based confidence, not an ML probability. An ML classifier is a future upgrade only after labelled real-world samples exist.

## Hardware and Wokwi

The target build uses an ESP32, pH/TDS/turbidity probes, TCS3200 RGB sensor, optional flow sensor, 12 V solenoid, optional dosing pump, three status LEDs, buzzer, and bypass switch. Wokwi substitutes potentiometers for analogue sensors; see [`simulation/wokwi/README.md`](simulation/wokwi/README.md).

## GitHub Pages deployment

Push the repository to GitHub with the name `chromaguard-hackfusion-2026`. Enable Pages with **GitHub Actions** as the source. The workflow installs dependencies, typechecks, tests, builds with the configured base path, and deploys `dist/`.

## Limitations and roadmap

Current limitations include simulated browser readings, proxy inputs in Wokwi, no plant PLC interlock, no certified sensor calibration, and no persistent server database. Next steps are field sampling, calibration curves, tank-level hardware interlocks, treatment validation, and only then evaluation of a labelled-data ML model.

## Team

**Team ChromaGuard · HackFusion 2026**

- **Adithya HMT** — repository maintainer, product direction, dashboard and simulation integration ([`@adithya-hmt`](https://github.com/adithya-hmt)).
- **ChromaGuard engineering team** — embedded sensing, process controls, calibration, and field validation.

The public prototype intentionally records roles rather than inventing personal details for collaborators who have not published their profiles. See [`docs/team.md`](docs/team.md) for the demo handoff and ownership map.

## Licence

See [`LICENSE`](LICENSE), [`CONTRIBUTING.md`](CONTRIBUTING.md), and [`SECURITY.md`](SECURITY.md).
