import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Graduate } from 'src/app/models/graduate';
import { GraduateService } from 'src/app/services/graduate.service';

@Component({
  selector: 'app-graduate-detail',
  templateUrl: './graduate-detail.component.html',
  styleUrls: ['./graduate-detail.component.scss']
})
export class GraduateDetailComponent implements OnInit {

  graduate$: Observable<Graduate>;
  currentDocId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gs: GraduateService,
    ) { }

  ngOnInit(): void {
    this.graduate$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.currentDocId = params.get('id');

        return this.gs.getGraduate(this.currentDocId);
      })
    )
  }

  approve(status: boolean): void {
    this.gs.approveGraduate(this.currentDocId, status).then(success => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });

  }
}
