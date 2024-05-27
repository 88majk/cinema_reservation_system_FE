import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginData } from '../models/login-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  constructor() { }

  postLoginData(data: LoginData): Observable<string> {
    return this.http.post<string>("http://localhost:8080/users/login", data);
  }
}
