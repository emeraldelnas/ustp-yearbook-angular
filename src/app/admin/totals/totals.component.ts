import { Component, OnInit } from '@angular/core';

import { GraduateService } from '../../services/graduate.service';
import { Observable } from 'rxjs';


export interface Totals {
  total_initial?: number;
  total_balance?: number;
}

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {

  totals$: Observable<Totals>;

  constructor(private gs: GraduateService) { }

  ngOnInit(): void {
    this.totals$ = this.gs.getTotals();
  }

}
