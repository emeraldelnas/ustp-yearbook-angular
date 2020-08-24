import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NbDateService } from '@nebular/theme';

import { DateFormatService } from '../services/date-format.service';
import { GraduateService } from '../services/graduate.service';
import { Graduate } from '../models/graduate';

@Component({
  selector: 'app-graduate-form',
  templateUrl: './graduate-form.component.html',
  styleUrls: ['./graduate-form.component.scss']
})
export class GraduateFormComponent implements OnInit {

  submitted = false;

  minDate: Date;
  maxDate: Date;

  timePeriods = [
    {period: 'am'},
    {period: 'pm'}
  ];

  graduateForm: FormGroup;

  availableTimeSlots = [];
  latestTimeSlots = [];


  constructor(
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    private df: DateFormatService,
    private gs: GraduateService
    ) {

    this.minDate = new Date('2020, 7');
    this.maxDate = new Date('2020, 9');
  }

  ngOnInit(): void {
    this.graduateForm = this.fb.group({
      id_number: ['', [
        Validators.required,
      ]],
      first_name: ['', Validators.required],
      mid_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[\s\S]{10}$/),
      ]],
      birthday: [new Date('1992'), Validators.required],
      course: ['', Validators.required],
      college: ['', Validators.required],
      affiliations: ['', [
        Validators.required,
        Validators.maxLength(400)
      ]],
      awards: ['', [
        Validators.required,
        Validators.maxLength(400)
      ]],
      motto: ['', [
        Validators.required,
        Validators.maxLength(400)
      ]],
      package: ['', Validators.required],
      shoot_date: [new Date(2020, 7), Validators.required],
      time_period: ['', Validators.required],
      shoot_time: ['', Validators.required],
      receipt_details: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]]
    });



    this.populateTime();

    this.onDateChange(new Date(2020, 7));

  }



  onDateChange(e) {
    const date = this.df.formatDate(e);
    this.gs.queryTimeSlots(date).subscribe(timeSlots => {
      this.latestTimeSlots = this.availableTimeSlots
      .filter(timeSlot =>
        !timeSlots.includes(timeSlot.value)
      );
    });

  }




  filterTimeSlotsOfType(period: string) {
    return this.latestTimeSlots.filter(x => x.period == period);
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

    // console.log(this.availableTimeSlots);

  }


  submit() {
    // console.log(this.graduateForm.value as Graduate);

    const graduate: Graduate = this.graduateForm.value;
    graduate.birthday = this.df.formatDate(this.graduateForm.value.birthday);
    graduate.shoot_date = this.df.formatDate(this.graduateForm.value.shoot_date);
    graduate.submitted = true;

    this.gs.addGraduate(graduate);

    this.submitted = true;
  }





















  get id_number(): AbstractControl {
    return this.graduateForm.get('id_number');
  }

  get first_name(): AbstractControl {
    return this.graduateForm.get('first_name');
  }

  get mid_name(): AbstractControl {
    return this.graduateForm.get('mid_name');
  }

  get last_name(): AbstractControl {
    return this.graduateForm.get('last_name');
  }

  get email(): AbstractControl {
    return this.graduateForm.get('email');
  }

  get mobile(): AbstractControl {
    return this.graduateForm.get('mobile');
  }

  get birthday(): AbstractControl {
    return this.graduateForm.get('birthday');
  }

  get course(): AbstractControl {
    return this.graduateForm.get('course');
  }

  get college(): AbstractControl {
    return this.graduateForm.get('college');
  }

  get affiliations(): AbstractControl {
    return this.graduateForm.get('affiliations');
  }

  get awards(): AbstractControl {
    return this.graduateForm.get('awards');
  }

  get motto(): AbstractControl {
    return this.graduateForm.get('motto');
  }

  get package(): AbstractControl {
    return this.graduateForm.get('package');
  }

  get shoot_date(): AbstractControl {
    return this.graduateForm.get('shoot_date');
  }

  get time_period(): AbstractControl {
    return this.graduateForm.get('time_period');
  }

  get shoot_time(): AbstractControl {
    return this.graduateForm.get('shoot_time');
  }

  get receipt_details(): AbstractControl {
    return this.graduateForm.get('receipt_details');
  }
}
