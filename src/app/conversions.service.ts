import { Injectable } from '@angular/core';

const UNIT_DEGREES_CENTIGRADE = 0;
const UNIT_DEGREES_FAHRENHEIT = 1;
const UNIT_KELVIN = 2;

export interface Unit {
  id: number;
  name: string;
}

export interface Measurement {
  value: number;
  unitId: number;
}

type Conversion = (value: number) => number;
type ConversionId = readonly [number, number];
const CONVERSIONS: readonly {id: ConversionId, conversion: Conversion}[] = [
  {id: [UNIT_DEGREES_CENTIGRADE, UNIT_DEGREES_FAHRENHEIT], conversion: value => value * 9 / 5 + 32},
  {id: [UNIT_DEGREES_CENTIGRADE, UNIT_KELVIN], conversion: value => value + 273},
  {id: [UNIT_DEGREES_FAHRENHEIT, UNIT_DEGREES_CENTIGRADE], conversion: value => (value - 32) * 5 / 9},
  {id: [UNIT_DEGREES_FAHRENHEIT, UNIT_KELVIN], conversion: value => (value - 32) * 5 / 9 + 273},
  {id: [UNIT_KELVIN, UNIT_DEGREES_CENTIGRADE], conversion: value => value - 273},
  {id: [UNIT_KELVIN, UNIT_DEGREES_FAHRENHEIT], conversion: value => (value - 273) * 9 / 5 + 32},
];
const defaultConversion: Conversion = (value: number) => value;
const isConversion = (unitIds1: ConversionId, unitIds2: ConversionId) => {
  return unitIds1[0] == unitIds2[0] && unitIds1[1] == unitIds2[1];
};

const UNITS: readonly Unit[] = [
  {id: UNIT_DEGREES_CENTIGRADE, name: "Grad Celsius"},
  {id: UNIT_DEGREES_FAHRENHEIT, name: "Grad Fahreheit"},
  {id: UNIT_KELVIN, name: "Kelvin"}
];

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {
  units: readonly Unit[] = UNITS;

  constructor() { }

  findConversion(id: ConversionId): Conversion {
    for (let conversionEntry of CONVERSIONS) {
      if (isConversion(id, conversionEntry.id)) {
        return conversionEntry.conversion;
      }
    }
    return defaultConversion;
  }
}
