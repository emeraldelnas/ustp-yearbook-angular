import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { OpenedDates } from 'src/app/models/openeddates';

@Component({
  selector: 'app-open-dates',
  templateUrl: './open-dates.component.html',
  styleUrls: ['./open-dates.component.scss']
})
export class OpenDatesComponent implements OnInit {

  fromDate = new Date();
  toDate = new Date();

  saved = false;

  constructor(private settings: SettingsService) { }

  ngOnInit(): void {

    this.settings.getOpenedDates().subscribe(dates => {
      if(dates) {
        this.fromDate = new Date(dates.from);
        this.toDate = new Date(dates.to);
      }
    });
  }

  updateOpenedDates(): void {
    const open = {
      from: this.getFormattedDate(this.fromDate),
      to: this.getFormattedDate(this.toDate)
    }

    this.settings.updateOpenedDates(open as OpenedDates).then(result => {
      this.saved = true;

      setTimeout(() => {
        this.saved = false;
      }, 4000)
    });
  }

  getFormattedDate(date: Date): string {
    return `${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}`;
  }
}
