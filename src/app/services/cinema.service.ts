import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl = 'http://localhost:8080/cinema';

  constructor(private http: HttpClient) { }

  getAllCinemas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
}
