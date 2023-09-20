import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from '@aarancibia96/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.loginService.isTokenExpired()) { // el token no ha expirado
      return true;
    }
    if (!this.loginService.isRefreshTokenExpired()) { // el refresh-token no ha expirado
      return true;
    }
    // el token y refresh-token han expirado
    this.router.navigate(['/login']);
    return false;
  }

}
