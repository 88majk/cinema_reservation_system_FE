import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginData } from '../models/login-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  constructor() { }

  postLoginData(data: LoginData) {
    return this.http.post("http://localhost:8080/users/login", data);
  }
}
