import { Component, OnInit } from '@angular/core';
import { DateFormatService } from 'src/app/services/date-format.service';
import { GraduateService } from 'src/app/services/graduate.service';

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.scss']
})
export class BookingReportComponent implements OnInit {

  shootDate = new Date();
  currentDateGraduates;

  colleges = [
    'College of Technology',
    'College of Science and Mathematics',
    'College of Engineering and Architecture',
    'College of Science and Technology Education',
    'College of Information Technology and Computing'
  ];

  collegesShort = [
    'CT',
    'CSM',
    'CEA',
    'CSTE',
    'CITC'
  ];

  constructor(
    private gs: GraduateService,
    private df: DateFormatService) { }

  ngOnInit(): void {
  }

  onShootDateChange(e) {
    const date = this.df.formatDate(e);
    this.gs.getGraduatesByShootDate(date).subscribe(
      graduates => {
        this.currentDateGraduates = graduates.sort((a, b) => a.shoot_time_obj - b.shoot_time_obj);
      }
    );
  }

  getCollegeShort(college: string): string {

    const collegeIndex = this.colleges.indexOf(college.trim());

    if(collegeIndex >= 0) {
      return this.collegesShort[collegeIndex];
    }

    return college;
  }

  printDiv() {
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    mywindow.document.write(`
    <html>
    <head>
    <title>Schedule for ${this.df.formatDate(this.shootDate)}</title>
    <style>
    table { border-spacing: 1rem .35rem; }
    th, td {font-size: 0.8rem;}
    </style>
    `);
    mywindow.document.write('</head><body>');
    mywindow.document.write(document.getElementById('booking-report').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // mywindow.close();

    return true;
  }

}
