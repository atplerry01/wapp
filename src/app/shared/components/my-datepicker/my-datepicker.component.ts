import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'll',
  },
  display: {
    dateInput: 'll',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'DD MMM YYYY',
  },
};

@Component({
  selector: 'app-my-datepicker',
  templateUrl: './my-datepicker.component.html',
  styleUrls: ['./my-datepicker.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MyDatepickerComponent implements OnInit {

    //  date = new FormControl(moment([2017, 0, 1]));
  // dateFrom = new FormControl(moment());
  date1_minDate: Date;
  date1_maxDate: Date;
  date2_minDate: Date;

  @Input() maxDate: Date;
  @Input() isDateRange = false;
  @Input() dateFormat = 'DD-MMM-YYYY';

  date1: Date;
  date2: Date;

  @Output()date1Triggered: EventEmitter<string> = new EventEmitter<string>();
  @Output()date2Triggered: EventEmitter<string> = new EventEmitter<string>();

  @Input() placeholderPrefix = 'Choose';
  @Input() placeholderDate1 = 'Start Date...';
  @Input() placeholderDate2 = 'End Date...';

  _placeholderDate1 = '';
  _placeholderDate2 = '';

  constructor( ) {}

  ngOnInit() {
    this.date1_minDate = new Date(2000, 0, 1);
    if (!this.maxDate) {
      this.maxDate = new Date();
    }
    this.date1_maxDate = this.maxDate;
    this._placeholderDate1 = `${this.placeholderPrefix} ${this.placeholderDate1}`;
    this._placeholderDate2 = `${this.placeholderPrefix} ${this.placeholderDate2}`;
  }

  Date1_Changed() {

    if (this.isDateRange && this.date1 > this.date2) {
    this.date2Triggered.emit('');
    this.date2 = null;
    this._placeholderDate2 = `${this.placeholderPrefix} ${this.placeholderDate2}`;
    }

    const dt1 = moment(this.date1).format(this.dateFormat);
    this.date1Triggered.emit(dt1);
    // console.log('date1:', dt1);

    if (this._placeholderDate1 !== this.placeholderDate1) {
      this._placeholderDate1 = this.placeholderDate1;
    }

    if (this.isDateRange) {
      this.date2_minDate = new Date(this.date1);
      this.date1_maxDate = this.maxDate;
    }
  }

  Date2_Changed() {
    const dt2 = moment(this.date2).format(this.dateFormat);
    this.date2Triggered.emit(dt2);
   // console.log('date2:', dt2);
    this.date1_maxDate = new Date(this.date2);

    if (this._placeholderDate2 !==  this.placeholderDate2) {
      this._placeholderDate2 =  this.placeholderDate2;
    }
  }

}
