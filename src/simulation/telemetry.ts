import type { Sensors } from '../types'
export const blankSensors: Sensors = { ph: 7.2, tds: 780, turbidity: 9, colourIntensity: 22, flowRate: 12 }
export function telemetry(s: Sensors) { return JSON.stringify({ timestamp: Date.now(), ...s, classification: 'SIMULATED', valve: 'NORMAL', pump: false }) }
