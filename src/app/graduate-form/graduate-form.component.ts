import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NbDateService } from '@nebular/theme';

import { DateFormatService } from '../services/date-format.service';

@Component({
  selector: 'app-graduate-form',
  templateUrl: './graduate-form.component.html',
  styleUrls: ['./graduate-form.component.scss']
})
export class GraduateFormComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  timePeriods = [
    {period: 'AM'},
    {period: 'PM'}
  ];

  graduateForm: FormGroup;

  availableTimeSlots = [];


  constructor(
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    private df: DateFormatService) {
    this.minDate = new Date('2020, 7');
    this.maxDate = new Date('2020, 9');
  }

  ngOnInit(): void {
    this.graduateForm = this.fb.group({
      idNo: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      birthday: [new Date('1992'), Validators.required],
      course: ['', Validators.required],
      college: ['', Validators.required],
      affiliations: ['', Validators.required],
      awards: ['', Validators.required],
      motto: ['', Validators.required],
      package: ['', Validators.required],
      shootDate: [new Date(), Validators.required],
      timePeriod: ['', Validators.required],
      shootTime: ['', Validators.required],
      receiptDetails: ['', Validators.required]
    });


    this.populateTime();

  }

  get package(): AbstractControl {
    return this.graduateForm.get('package');
  }

  get timePeriod(): AbstractControl {
    return this.graduateForm.get('timePeriod');
  }


  filterTimeSlotsOfType(period: string){
    return this.availableTimeSlots.filter(x => x.period == period.toLowerCase());
  }


  populateTime() {
    let start = this.df.createTime("08:00");
    let end = this.df.createTime("17:00");
    let breakTime = {from: this.df.createTime("11:59"), to: this.df.createTime("13:00")};
    let minsToAdd = 12;

    let time = start;

    while (time < end) {

      let period = time < breakTime.to ? 'am' : 'pm';

      if(!(time > breakTime.from && time < breakTime.to)) {
        this.availableTimeSlots.push(
          {
            value: this.df.formatTime(time, false),
            time: this.df.formatTime(time, true),
            period: period
          }
        )
      }

      time = this.df.addMinutes(time, minsToAdd);

    }

    console.log(this.availableTimeSlots);

  }


  submit() {
    console.log(this.graduateForm.value);
  }
}
