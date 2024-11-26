import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginData } from '../models/login-data';
import { Observable } from 'rxjs';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() { }

  postLoginData(data: LoginData): Observable<string> {
    return this.http.post<string>(this.baseUrl + "/users/login", data);
  }
}
