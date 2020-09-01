import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';

import { DateFormatService } from '../services/date-format.service';


import { AngularFirestore } from '@angular/fire/firestore';
import { debounceTime, take, map, switchMap, startWith } from 'rxjs/operators';
import { Observable, timer, of } from 'rxjs';

import { SettingsService } from '../services/settings.service';
import { GraduateService } from '../services/graduate.service';

import { Graduate } from '../models/graduate';
import { CourseGroup } from '../models/coursegroup';

@Component({
  selector: 'app-graduate-form',
  templateUrl: './graduate-form.component.html',
  styleUrls: ['./graduate-form.component.scss']
})
export class GraduateFormComponent implements OnInit {

  courseGroups: CourseGroup[];
  filteredCourseGroup$: Observable<CourseGroup[]>;

  colleges: string[];
  filteredColleges$: Observable<string[]>;

  submitted = false;
  success = false;

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
    private settings: SettingsService,
    private gs: GraduateService,
    private afs: AngularFirestore,
    private dialogService: NbDialogService,
    ) {

    this.minDate = new Date('2020, 9, 7');
    this.maxDate = new Date('2020, 9, 8');
  }

  checkDetails(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  ngOnInit(): void {

    this.initGraduateForm();

    this.getShootDateFromDB();

    this.populateTime();

    this.onDateChange(new Date(2020, 7));

    // this.fa.signInAnonymously()
    //   .then(() => {
    //     this.onDateChange(new Date(2020, 7));
    //   })
    //   .catch(errors => {
    //     console.error(errors);
    //   });

    this.initAutocomplete();


  }


  initGraduateForm(): void {
    this.graduateForm = this.fb.group({
      id_number: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ],
        CustomValidator.checkIdNo(this.afs)
      ],
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
      shoot_date: [, Validators.required],
      time_period: ['', Validators.required],
      shoot_time: ['', Validators.required],
      receipt_details: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]],
      agreed_to_rules: [false, Validators.requiredTrue],
    });
  }

  getShootDateFromDB(): void {
    this.settings.getOpenedDates().subscribe(dates => {
      if(dates) {
        this.minDate = new Date(dates.from);
        this.maxDate = new Date(dates.to);
        this.graduateForm.get('shoot_date').setValue(this.minDate);
      }
    });
  }

  initAutocomplete(): void {
    this.colleges = [
      'College of Technology',
      'College of Science and Mathematics',
      'College of Engineering and Architecture',
      'College of Science and Technology Education',
      'College of Information Technology and Computing'
    ];

    this.filteredColleges$ = of(this.colleges);
    this.filteredColleges$ = this.college.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filterColleges(filterString)),
      );


    this.courseGroups = [
      {
        college: 'CT',
        courses: [
          'B.S. in Automotive Mechanical Technology Major in Automotive Technology',
          'B.S. in Automotive Mechanical Technology Major in Mechanical Technology',
          'B.S. in Electrical and Technology Management',
          'B.S. in Electro-Mechanical Technology',
          'B.S. in Electronics and Communication Technology'
        ]
      },
      {
        college: 'CSM',
        courses: [
          'B.S. in Applied Mathematics',
          'B.S. in Applied Physical Sciences',
          'B.S. in Chemistry',
          'B.S. in Environmental Science and Technology',
          'B.S. in Food Science and Technology',
          'M.S. in Applied Mathematical Sciences',
          'M.S. in Environmental Science and Technology Major in Natural Science',
          'PH. D. in Mathematical Sciences (Applied Mathematics)'
        ]
      },
      {
        college: 'CEA',
        courses: [
          'B.S. in Architecture',
          'B.S. in Civil Engineering',
          'B.S. in Electrical Engineering',
          'B.S. in Electronics Engineering',
          'B.S. in Mechanical Engineering',
          'Master of Engineering – Civil Engineering',
          'Master of Engineering – Mechanical Engineering',
          'Master of Engineering – Electrical Engineering',
          'Master of Science in Electrical Engineering',
          'Master of Science in Sustainable Development Major in Urban Planning and Sustainable Development',
          'Professional Science Master of Power Systems Engineering and Management'
        ]
      },
      {
        college: 'CSTE',
        courses: [
          'Bachelor of Elementary Education Major in Special Education',
          'Bachelor of Public Administration',
          'Bachelor of Secondary Education Major in Mathematics',
          'Bachelor of Secondary Education Major in Physical Sciences',
          'Bachelor of Secondary Education Major in Technology and Livelihood Education',
          'Bachelor of Technical Teacher Education',
          'Post-Baccalaureate Certificate of Teaching',
          'Post-Graduate Diploma in Special Education',
          'Master of Arts in Teaching English as a Second Language',
          'Master of Arts in Teaching Special Education',
          'Master of Science in Teaching Physical Sciences Major in Physics',
          'Master of Science in Science Education Major in Chemistry',
          'Master of Science in Teaching Mathematics',
          'Master in Education Planning and Management',
          'Master in Public Administration',
          'Master in Technician Teacher Education',
          'Doctor in Technology Education',
          'Doctor of Philosophy in Science Education Major in Chemistry',
          'Doctor of Philosophy in Educational Planning and Management',
          'Doctor of Philosophy in Mathematical Sciences Major in Mathematics Education',
          'Doctor in Public Administration Masters/Doctors of Philosophy in Science Education - Chemistry Straight Program'
        ]
      },
      {
        college: 'CITC',
        courses: [
          'B.S. in Computer Engineering',
          'B.S. in Information Technology',
          'B.S. in Technology Communication Management',
          'B.S. in Data Science',
          'Master of Science in Technology Communication Management',
          'Master of Information Technology'
        ]
      }
    ];

    this.filteredCourseGroup$ = of(this.courseGroups);
    this.filteredCourseGroup$ = this.course.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }


  onDateChange(e) {
    const date = this.df.formatDate(e);
    this.gs.getTimeSlots(date).subscribe(timeSlots => {
      this.latestTimeSlots = this.availableTimeSlots
      .filter(timeSlot =>
        !timeSlots.includes(timeSlot.value)
      );
    });

    this.graduateForm.controls['time_period'].reset();
    this.graduateForm.controls['shoot_time'].reset();

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

  }


  submit(ref) {
    this.submitted = true;

    const graduate: Graduate = this.graduateForm.value;
    graduate.birthday = this.df.formatDate(this.graduateForm.value.birthday);
    graduate.shoot_date = this.df.formatDate(this.graduateForm.value.shoot_date);
    graduate.approved = false;

    this.gs.addGraduate(graduate)
      .then(value => {
        ref.close();
        this.submitted = false;
        this.initGraduateForm();
        this.success = true;
      })
      .catch(value => {
        console.error('Something went wrong...');
      });

  }





  private filterColleges(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.colleges.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }


  private filterCourses(courses: string[], filterValue: string) {
    return courses.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filter(value: string): CourseGroup[] {
    const filterValue = value.toLowerCase();
    return this.courseGroups
      .map(group => {
        return {
          college: group.college,
          courses: this.filterCourses(group.courses, filterValue),
        }
      })
      .filter(group => group.courses.length);
  }

  trackByFn(index, item) {
    return item.name;
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

  get agreed_to_rules(): AbstractControl {
    return this.graduateForm.get('agreed_to_rules');
  }
}



export class CustomValidator {
  static checkIdNo(afs: AngularFirestore) {
    return (control: AbstractControl) => {

      const idNo = control.value;

      if(idNo.length != 10) {
        return of(null);
      }


      return timer(1000).pipe(
        switchMap(() => {
          if(!control.value) {
            return of(null);
          }

          return afs.collection('graduates', ref => ref.where('id_number', '==', idNo))
          .valueChanges().pipe(
            debounceTime(500),
            take(1),
            map(arr => arr.length ? {idNoTaken: true} : null),
          )
        })
      )
    }
  }
}
