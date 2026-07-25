#include "classifier.h"
#include "config.h"
Classification classify(const Readings &r) {
  if (!isfinite(r.ph) || !isfinite(r.tds) || !isfinite(r.turbidity) || !isfinite(r.colourIntensity) || !isfinite(r.flowRate) || r.ph < 0 || r.ph > 14 || r.tds < 0 || r.turbidity < 0 || r.flowRate < 0 || r.flowRate > 40) return SENSOR_FAULT;
  int critical = r.ph < PH_MIN || r.ph > PH_MAX || r.tds > TDS_VIOLATION || r.turbidity > TURBIDITY_VIOLATION || r.colourIntensity > COLOUR_VIOLATION;
  int warnings = (r.tds > TDS_WARNING) + (r.turbidity > TURBIDITY_WARNING) + (r.colourIntensity > COLOUR_WARNING);
  return critical || warnings >= 2 ? NON_COMPLIANT : warnings ? WARNING : COMPLIANT;
}
const char* classificationName(Classification c) { return c == COMPLIANT ? "COMPLIANT" : c == WARNING ? "WARNING" : c == NON_COMPLIANT ? "NON_COMPLIANT" : "SENSOR_FAULT"; }
