import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

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
      title: 'Student List',
      icon: 'people-outline',
      link: ''
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: ''
    },
  ];

  constructor(private sidebarService: NbSidebarService, private authService: NbAuthService) { }

  ngOnInit(): void {

  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

}
