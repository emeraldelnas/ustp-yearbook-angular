import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GraduateService } from '../../services/graduate.service';
import { Observable } from 'rxjs';
import { Graduate } from 'src/app/models/graduate';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent implements OnInit {

  selectedId: string;

  approvedGraduates: Observable<Graduate[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gs: GraduateService,
  ) { }

  ngOnInit(): void {
    this.approvedGraduates = this.gs.getGraduatesByApproved(true);
  }

  goToBooking(id: string) {
    this.selectedId = id;
    this.router.navigate(['admin/dash/approved/' + id]);
  }
}
