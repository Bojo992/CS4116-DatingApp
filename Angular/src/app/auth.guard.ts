import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    const userUid = this.cookieService.get('UID');
    if (!userUid) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


  // add check here for admin cookie
}

