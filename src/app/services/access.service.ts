import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cinema } from '../models/cinema-data';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private baseUrl = 'http://localhost:8080';

  private http = inject(HttpClient)


  sendNewAdmin(adminRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/createAdmin`, adminRequest);
  }

  deleteAdmin(adminRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/deleteAdmin`, adminRequest);
  }

}
