import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbMenuModule, NbIconModule, NbCardModule, NbInputModule, NbStepperModule, NbDatepickerModule, NbRadioModule, NbSpinnerModule, NbAlertModule, NbDialogModule, NbAutocompleteModule, NbCheckboxModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { NgxAuthModule } from './auth/auth.module';

import { NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { AuthGuard } from './auth/guard/auth-guard.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AdminModule } from './admin/admin.module';

import { GraduateFormComponent } from './graduate-form/graduate-form.component';
import { GraduateService } from './services/graduate.service';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    GraduateFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    NbAuthModule.forRoot({
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: {
            redirect: {
              success: '/admin/dash',
            },
          },
          logout: {
            redirect: {
              success: '/auth/login',
            },
          },
          token: {
            class: NbAuthJWTToken,

            key: 'idToken'
          }
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    NgxAuthModule,
    AdminModule,
    NbLayoutModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbStepperModule,
    NbDatepickerModule.forRoot(),
    NbRadioModule,
    NbSpinnerModule,
    NbAlertModule,
    NbDialogModule.forRoot(),
    NbAutocompleteModule,
    NbCheckboxModule,
  ],
  providers: [NbFirebasePasswordStrategy, AuthGuard, SettingsService, GraduateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
