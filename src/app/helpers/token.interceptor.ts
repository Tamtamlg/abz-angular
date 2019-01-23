import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor  implements HttpInterceptor {

  constructor (private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      request = request.clone({
        setHeaders: {
          Token: this.authService.getToken(),
          'Accept': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}