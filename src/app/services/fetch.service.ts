import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  api = 'https://frontend-test-assignment-api.abz.agency/api/v1';
  page = 1;
  count = 6;

  constructor(
    private http: HttpClient
  ) { }

  getActiveUser(): Observable<any> {
    return this.http.get(`${this.api}/users/1`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.api}/users?page=${this.page}&count=${this.count}`);
  }

  getPositions(): Observable<any> {
    return this.http.get(`${this.api}/positions`);
  }

  sendData(data): Observable<any> {
    return this.http.post(`${this.api}/users`, data);
  }
}
