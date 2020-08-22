import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }


  formatDate(date: Date) {
    return date.toDateString().substr(4);
  }

  formatTime(d, hour12) {
    function z(n){return (n<10?'0':'')+n}
    var h = d.getHours();

    if(hour12) {
      return (h%12 || 12) + ':' + z(d.getMinutes());
    }

    return (h || 12) + ':' + z(d.getMinutes());
  }


  createTime(time: string, minutes:number = 0): Date {
    return new Date(new Date("2000/01/01 " + time).getTime() + minutes * 60000);
  }

  addMinutes(time: Date, minsToAdd: number) {
    return new Date(time.getTime() + minsToAdd * 60000);
  }


}
