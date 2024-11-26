import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../models/register-data';
import { Observable } from 'rxjs';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;
  
  constructor() { }

  postRegisterData(data: RegisterData): Observable<string> {
    return this.http.post(this.baseUrl + '/users/register', data, {responseType: 'text'});
  }
}
