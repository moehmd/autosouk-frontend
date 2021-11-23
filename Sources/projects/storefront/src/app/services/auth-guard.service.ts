import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { JwtAuthService } from './jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad{
    constructor(public auth: JwtAuthService, public router: Router) {}

    canActivate(): boolean {
        //
      if (!this.auth.isAuthenticated()) {
        //this.router.createUrlTree(['account/login']);
        this.router.navigateByUrl('/account/login').then();
        return false;
      }
      return true;
    }

    canActivateChild(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl('/account/login').then();
          return false;
        }
        return true;
      }

    canLoad(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl('/account/login').then();
          return false;
        }
        return true;
    }
}
