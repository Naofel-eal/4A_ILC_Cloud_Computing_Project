import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isLoginPage() && !this.isRegisterPage()) {
      request = this.addAuthToken(request);
    }
    return next.handle(request);
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    if (token) {
      return request.clone({
          setHeaders: {
            Authorization: `${token}`
          }
      });
    } else {
      return request;
    }
  }

  isLoginPage() {
    return this.router.url.includes('/login');
  }

  isRegisterPage() {
    return this.router.url.includes('/register');
  }
}
