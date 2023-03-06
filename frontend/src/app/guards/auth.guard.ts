import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const isRedirect = state.url === '/login' || state.url === '/register';

    if (!token && !isRedirect) {
      return this.router.navigateByUrl('/login').then(() => false);
    }

    if (token && isRedirect) {
      return this.router.navigateByUrl('/home').then(() => false);
    }

    return true;
  }
}