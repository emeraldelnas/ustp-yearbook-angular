import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbIconModule, NbCardModule, NbInputModule, NbActionsModule, NbDatepickerModule } from '@nebular/theme';

import { DashComponent } from './dash/dash.component';
import { PendingListComponent } from './pending-list/pending-list.component';

import { AdminRoutingModule } from './admin-routing.module';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { GraduateDetailComponent } from './graduate-detail/graduate-detail.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OpenDatesComponent } from './open-dates/open-dates.component';
import { MainboardComponent } from './mainboard/mainboard.component';
import { BookingReportComponent } from './booking-report/booking-report.component';


@NgModule({
  declarations: [
    DashComponent,
    PendingListComponent,
    GraduateDetailComponent,
    ApprovedListComponent,
    OpenDatesComponent,
    MainboardComponent,
    BookingReportComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbCardModule,
    NbInputModule,
    AdminRoutingModule,
    NbActionsModule,
    NbDatepickerModule.forRoot(),
  ],
  exports: [
  ],
  providers: [
    NbFirebasePasswordStrategy
  ]
})
export class AdminModule { }
