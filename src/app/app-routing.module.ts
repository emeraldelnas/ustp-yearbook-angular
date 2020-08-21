import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/guard/auth-guard.service';
import { DashComponent } from './admin/dash/dash.component';
import { GraduateFormComponent } from './graduate-form/graduate-form.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule'
  },
  {  path: '', component: GraduateFormComponent  },
  {  path: '**', redirectTo: '/'  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
