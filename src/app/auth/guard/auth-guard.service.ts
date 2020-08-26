import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router, private nbTokenService: NbTokenService) {
  }

  canActivate(): any {
    // return this.authService.isAuthenticated(); // canActive can return Observable<boolean>, which is exactly what isAuthenticated returns
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          // console.log(authenticated);
          if (!authenticated) {
            // console.log('NOT Authenticated!');
            this.router.navigate(['auth/login']);
          }
        }),
      );
    // return this.nbTokenService.get()
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if(!token) {
    //       this.router.navigate(['auth/login']);
    //     }
    //   });
    // return this.authService.onTokenChange().pipe(
    //   tap((token: NbAuthJWTToken) => {
    //     console.log(token);
    //   })
    // );

    // this.nbTokenService.get().subscribe((token: NbAuthJWTToken) => {
    //   if(!token) {
    //     return this.router.navigate(['aut/login']);
    //   }
    // })

  }
}
