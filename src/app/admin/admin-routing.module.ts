import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashComponent } from './dash/dash.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { GraduateDetailComponent } from './graduate-detail/graduate-detail.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';

export const routes: Routes = [
  {
    path: 'dash',
    component: DashComponent,
    children: [
      {
        path: 'pending',
        component: PendingListComponent,
        children: [
          {
            path: ':id',
            component: GraduateDetailComponent
          }
        ]
      },
      {
        path: 'approved',
        component: ApprovedListComponent,
        children: [
          {
            path: ':id',
            component: GraduateDetailComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
