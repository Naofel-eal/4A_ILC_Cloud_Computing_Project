import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isLoginPage() && !this.isRegisterPage()) {
      request = this.addAuthToken(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem("token")
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }

  public addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    if (token) {
      return request.clone({
          withCredentials: true,
          setHeaders: {
            Authorization: `${token}`
          }
      });
    } else {
      return request;
    }
  }

  public isLoginPage() {
    return this.router.url.includes('/login');
  }

  public isRegisterPage() {
    return this.router.url.includes('/register');
  }
}
