import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, NbAuthJWTToken, getDeepFromObject, NbTokenService } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent {

  strategy: string = '';

  user: any = {};

  constructor(
    protected authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router, private firebase: NbFirebasePasswordStrategy, private nbTokenService: NbTokenService)
    {
      super(authService, options, cd, router );
      this.strategy = 'password';
    }

  login() {
    this.firebase.authenticate(this.user).subscribe((result: NbAuthResult) => {
      // console.log(this.authService.isAuthenticated());
      // console.log(this.authService.getToken());

      this.nbTokenService.set(result.getToken());


      // console.log(result.isSuccess());
      if(result.isSuccess()) {
        this.router.navigateByUrl(result.getRedirect());
      }
      // console.log(this.authService.isAuthenticated());
      // this.authService.logout(this.strategy).subscribe((result: NbAuthResult) => {
        // this.router.navigateByUrl('/login');
      // console.log(result.getToken());
      // this.nbTokenService.set(result.getToken()).subscribe();
      // this.nbTokenService.get().subscribe((token: NbAuthJWTToken) => {
      //   console.log(token);
      // });
      // });
      // console.log(this.strategy);
      // this.authService.getToken().subscribe((token: NbAuthJWTToken) => { console.log(token);});
      // this.router.navigateByUrl(result.getRedirect());
      // this.authService.onTokenChange()
      // .subscribe((token: NbAuthJWTToken) => {
        // console.log(token);
        // console.log(token.getPayload());
        // console.log(token.getTokenExpDate());
        // if (token.isValid()) {
          // console.log(token.getPayload()); // here we receive a payload from the token and assigns it to our `user` variable
        // }

      // });
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
