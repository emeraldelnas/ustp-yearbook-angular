import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbIconModule, NbCardModule, NbInputModule } from '@nebular/theme';

import { DashComponent } from './dash/dash.component';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    DashComponent,
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
    AdminRoutingModule
  ],
  exports: [
    DashComponent
  ],
  providers: [
  ]
})
export class AdminModule { }
