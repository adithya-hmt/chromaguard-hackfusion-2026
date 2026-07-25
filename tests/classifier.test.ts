import { describe, expect, it } from 'vitest'
import { classify } from '../src/simulation/classifier'
import { advance, initialEngine } from '../src/simulation/engine'
import type { Sensors } from '../src/types'
const good: Sensors = { ph: 7.2, tds: 700, turbidity: 8, colourIntensity: 20, flowRate: 12 }
describe('ChromaGuard classifier and fail-safe engine', () => {
  it('classifies normal readings', () => expect(classify(good).classification).toBe('COMPLIANT'))
  it('diverts critical pH and TDS readings', () => { expect(classify({ ...good, ph: 5.1 }).classification).toBe('NON_COMPLIANT'); expect(classify({ ...good, tds: 2200 }).classification).toBe('NON_COMPLIANT') })
  it('handles alkaline pH and escalates multiple warnings', () => { expect(classify({ ...good, ph: 9 }).classification).toBe('NON_COMPLIANT'); expect(classify({ ...good, tds: 1600, turbidity: 25 }).classification).toBe('NON_COMPLIANT') })
  it('returns a fault for missing input', () => expect(classify({ ...good, ph: null }).classification).toBe('SENSOR_FAULT'))
  it('activates diversion and restores after consecutive compliant readings', () => { let state = advance(initialEngine(), { ...good, tds: 2600 }, 'AUTOMATIC', false); expect(state.valve).toBe('DIVERTING'); state = advance(state, good, 'AUTOMATIC', false); expect(state.valve).toBe('DIVERTING'); state = advance(state, good, 'AUTOMATIC', false); expect(state.valve).toBe('NORMAL') })
  it('logs maintenance bypass and protects a full holding tank', () => { let state = advance(initialEngine(), good, 'AUTOMATIC', true); expect(state.systemState).toBe('MAINTENANCE'); expect(state.events[state.events.length - 1]?.mode).toBe('AUTOMATIC'); state = { ...state, tankLevel: 99 }; state = advance(state, { ...good, ph: 5 }, 'AUTOMATIC', false); expect(state.valve).toBe('CLOSED'); expect(state.systemState).toBe('SENSOR_FAULT') })
})
