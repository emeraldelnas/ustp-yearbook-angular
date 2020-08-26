import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbIconModule, NbCardModule, NbInputModule, NbActionsModule } from '@nebular/theme';

import { DashComponent } from './dash/dash.component';
import { PendingListComponent } from './pending-list/pending-list.component';

import { AdminRoutingModule } from './admin-routing.module';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { GraduateDetailComponent } from './graduate-detail/graduate-detail.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';


@NgModule({
  declarations: [
    DashComponent,
    PendingListComponent,
    GraduateDetailComponent,
    ApprovedListComponent,
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbCardModule,
    NbInputModule,
    AdminRoutingModule,
    NbActionsModule,
  ],
  exports: [
  ],
  providers: [
    NbFirebasePasswordStrategy
  ]
})
export class AdminModule { }
