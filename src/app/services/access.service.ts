import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cinema } from '../models/cinema-data';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private baseUrl = environment.apiUrl;

  private http = inject(HttpClient)


  sendNewAdmin(adminRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/createAdmin`, adminRequest);
  }

  deleteAdmin(adminRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/deleteAdmin`, adminRequest);
  }

}
