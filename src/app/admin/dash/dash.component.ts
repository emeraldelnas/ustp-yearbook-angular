import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuItem } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import { NbAuthResult } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  isSidebarFixed = false;
  responsive = true;
  collapsedBreakpoints = ['xs', 'is', 'sm', 'md'];
  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'grid-outline',
      link: '/admin/dash/main'
    },
    {
      title: 'Pending List',
      icon: 'square-outline',
      link: '/admin/dash/pending'
    },
    {
      title: 'Approved List',
      icon: 'checkmark-square-outline',
      link: '/admin/dash/approved'
    },
  ];

  constructor(
    protected router: Router,
    private sidebarService: NbSidebarService,
    private firebase: NbFirebasePasswordStrategy,
    ) { }

  ngOnInit(): void { }

  toggle(): void {
    this.sidebarService.toggle(false, 'left');
  }

  logout(): void {
    this.firebase.logout().subscribe((result: NbAuthResult) => {
      // console.log(result.isSuccess());
      if(result.isSuccess) {
        this.router.navigateByUrl(result.getRedirect());
      }
    })
  }

}
