import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token && (this.isLoginPage() || this.isRegisterPage()) && !this.isOnHomePage()) {
      return this.router.parseUrl('/home');
    } else if (!token && !this.isLoginPage() && !this.isRegisterPage()) {
      return this.router.parseUrl('/login');
    } else {
      return true;
    }
  }
  
  isLoginPage() {
    return this.router.url.includes('/login');
  }
  
  isRegisterPage() {
    return this.router.url.includes('/register');
  }
  
  isOnHomePage() {
    return this.router.url.includes('/home');
  }
  
}
