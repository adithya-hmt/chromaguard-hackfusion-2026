#pragma once
enum Classification { COMPLIANT, WARNING, NON_COMPLIANT, SENSOR_FAULT };
struct Readings { float ph, tds, turbidity, colourIntensity, flowRate; };
Classification classify(const Readings &r);
const char* classificationName(Classification c);
