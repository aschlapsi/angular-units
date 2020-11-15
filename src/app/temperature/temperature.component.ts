import { Component, OnInit } from '@angular/core';
import { ConversionsService, Unit, Measurement } from '../conversions.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  units: readonly Unit[];
  measurement1: Measurement = {value: 32, unitId: 0};
  measurement2: Measurement = {value: 0, unitId: 0};

  constructor(private conversionsService: ConversionsService) {
    this.units = this.conversionsService.units;
    this.measurement1.unitId = this.units[0].id;
    this.measurement2.unitId = this.units[1].id;
    this.onConvert1To2();
  }

  ngOnInit(): void {
  }

  onConvert1To2() {
    this.convert(this.measurement1, this.measurement2);
  }

  onConvert2To1() {
    this.convert(this.measurement2, this.measurement1);
  }

  onSelectUnit1(unitId: string) {
    this.measurement1.unitId = parseInt(unitId);
    this.onConvert1To2();
  }

  onSelectUnit2(unitId: string) {
    this.measurement2.unitId = parseInt(unitId);
    this.onConvert2To1();
  }

  convert(from: Measurement, to: Measurement): void {
    const conversionId = [from.unitId, to.unitId] as const;
    const conversion = this.conversionsService.findConversion(conversionId);
    to.value = conversion(from.value);
  }
}
