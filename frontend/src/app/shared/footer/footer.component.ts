import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  data: Date = new Date();
  date: { year: number; month: number };

  model: NgbDateStruct;

  constructor() {}

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  ngOnInit() {}
}
