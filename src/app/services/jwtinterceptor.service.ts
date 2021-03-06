import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService {

  constructor(
    private readonly authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      const token = localStorage.getItem('token');
      if (token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`
              }
          });
      }

      return next.handle(request);
  }
}
