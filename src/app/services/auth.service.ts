import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(
    private http: HttpClient,
    private fetchService: FetchService
  ) {}

  login(): Observable<any> {
    return this.http.get(`${this.fetchService.api}/token`)
      .pipe(
        tap((response) => {
          localStorage.setItem('auth-token', response.token);
          this.setToken(response.token);
        })
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}