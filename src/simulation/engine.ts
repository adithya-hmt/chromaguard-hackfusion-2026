import { classify } from './classifier'
import type { Classification, Event, Sample, Sensors, SystemMode, SystemState } from '../types'
export type EngineState = { systemState: SystemState; previousClassification: Classification; compliantStreak: number; valve: 'NORMAL' | 'DIVERTING' | 'CLOSED'; pump: boolean; tankLevel: number; divertedVolume: number; totalVolume: number; violations: number; samples: Sample[]; events: Event[] }
export const initialEngine = (): EngineState => ({ systemState: 'COMPLIANT', previousClassification: 'COMPLIANT', compliantStreak: 0, valve: 'NORMAL', pump: false, tankLevel: 18, divertedVolume: 0, totalVolume: 0, violations: 0, samples: [], events: [] })
export function advance(state: EngineState, sensors: Sensors, mode: SystemMode, bypass: boolean, minHold = 2): EngineState {
  const result = classify(sensors); const full = state.tankLevel >= 98
  let valve: EngineState['valve'] = state.valve, nextState: SystemState = result.classification, streak = result.classification === 'COMPLIANT' ? state.compliantStreak + 1 : 0
  if (bypass) { nextState = 'MAINTENANCE'; valve = 'NORMAL' }
  else if (mode === 'MANUAL') { nextState = result.classification === 'SENSOR_FAULT' ? 'SENSOR_FAULT' : state.systemState; valve = state.valve }
  else if (full && result.classification === 'NON_COMPLIANT') { nextState = 'SENSOR_FAULT'; valve = 'CLOSED' }
  else if (result.classification === 'NON_COMPLIANT' || result.classification === 'SENSOR_FAULT') { nextState = result.classification; valve = 'DIVERTING' }
  else if (state.valve === 'DIVERTING' && streak < minHold) { nextState = 'DIVERTING'; valve = 'DIVERTING' }
  else if (streak >= 2) { nextState = result.classification; valve = 'NORMAL' }
  const diverted = valve === 'DIVERTING' ? (sensors.flowRate ?? 0) / 60 : 0
  const event: Event = { id: `${Date.now()}-${state.events.length}`, timestamp: new Date().toISOString(), values: sensors, classification: result.classification, rules: result.rules.map(r => r.label), valve, pump: state.pump, mode, fault: result.classification === 'SENSOR_FAULT' ? 'Sensor health check failed' : undefined }
  return { ...state, systemState: nextState, previousClassification: result.classification, compliantStreak: streak, valve, tankLevel: Math.min(100, state.tankLevel + diverted * 0.1), divertedVolume: state.divertedVolume + diverted, totalVolume: state.totalVolume + (sensors.flowRate ?? 0) / 60, violations: state.violations + (result.classification === 'NON_COMPLIANT' && state.previousClassification !== 'NON_COMPLIANT' ? 1 : 0), samples: [...state.samples.slice(-59), { ...sensors, time: Date.now(), score: result.score, classification: result.classification, divertedVolume: state.divertedVolume + diverted }], events: [...state.events.slice(-199), event] }
}
