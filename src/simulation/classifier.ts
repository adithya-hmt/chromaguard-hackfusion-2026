import type { ClassificationResult, Rule, Sensors } from '../types'
export const LIMITS = { phMin: 6.5, phMax: 8.5, tdsWarning: 1500, tdsViolation: 2100, turbidityWarning: 20, turbidityViolation: 50, colourWarning: 55, colourViolation: 78, flowMax: 40 }
const makeRule = (id: string, label: string, severity: Rule['severity']): Rule => ({ id, label, severity })
export function classify(s: Sensors): ClassificationResult {
  const rules: Rule[] = []
  if (Object.entries(s).some(([key, value]) => value === null || !Number.isFinite(value) || (key === 'ph' && (value! < 0 || value! > 14)) || (key === 'tds' && value! < 0) || (key === 'turbidity' && value! < 0) || (key === 'flowRate' && (value! < 0 || value! > LIMITS.flowMax)))) return { classification: 'SENSOR_FAULT', score: 0, confidence: 'high', rules: [makeRule('sensor-fault', 'Missing or implausible sensor input', 'fault')] }
  if (s.ph! < LIMITS.phMin) rules.push(makeRule('ph-low', `pH below ${LIMITS.phMin}`, 'critical'))
  if (s.ph! > LIMITS.phMax) rules.push(makeRule('ph-high', `pH above ${LIMITS.phMax}`, 'critical'))
  if (s.tds! > LIMITS.tdsViolation) rules.push(makeRule('tds-critical', `TDS above ${LIMITS.tdsViolation} mg/L`, 'critical'))
  else if (s.tds! > LIMITS.tdsWarning) rules.push(makeRule('tds-warning', `TDS above ${LIMITS.tdsWarning} mg/L`, 'warning'))
  if (s.turbidity! > LIMITS.turbidityViolation) rules.push(makeRule('turbidity-critical', `Turbidity above ${LIMITS.turbidityViolation} NTU`, 'critical'))
  else if (s.turbidity! > LIMITS.turbidityWarning) rules.push(makeRule('turbidity-warning', `Turbidity above ${LIMITS.turbidityWarning} NTU`, 'warning'))
  if (s.colourIntensity! > LIMITS.colourViolation) rules.push(makeRule('colour-critical', `Colour intensity above ${LIMITS.colourViolation}`, 'critical'))
  else if (s.colourIntensity! > LIMITS.colourWarning) rules.push(makeRule('colour-warning', `Colour intensity above ${LIMITS.colourWarning}`, 'warning'))
  const critical = rules.some(r => r.severity === 'critical'), warnings = rules.filter(r => r.severity === 'warning').length
  const classification = critical || warnings >= 2 ? 'NON_COMPLIANT' : warnings ? 'WARNING' : 'COMPLIANT'
  const score = Math.max(0, Math.round(100 - rules.reduce((total, r) => total + (r.severity === 'critical' ? 42 : 14), 0)))
  return { classification, score, confidence: critical || warnings >= 2 ? 'high' : warnings ? 'medium' : 'high', rules }
}
