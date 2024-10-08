import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/register`, { username, password }, { responseType: 'text' });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, { username, password }, { responseType: 'text' });
  }
}
