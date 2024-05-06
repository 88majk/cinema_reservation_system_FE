import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../models/register-data';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  
  constructor() { }

  postRegisterData(data: RegisterData) {
    return this.http.post('http://localhost:8080/users/register', data);
  }
}
