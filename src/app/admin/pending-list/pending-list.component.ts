import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GraduateService } from '../../services/graduate.service';
import { Observable } from 'rxjs';
import { Graduate } from 'src/app/models/graduate';


@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnInit {

  selectedId: string;

  pendingGraduates: Observable<Graduate[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gs: GraduateService,
  ) { }

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe(params => {
      this.selectedId = params.id;
    });

    this.pendingGraduates = this.gs.getGraduatesByApproved(false);
  }

  goToBooking(id: string) {
    this.router.navigate(['admin/dash/pending/' + id]);
  }

}
