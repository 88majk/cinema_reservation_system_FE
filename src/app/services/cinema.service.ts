import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cinema } from '../models/cinema-data';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl = environment.apiUrl + '/cinema';

  private http = inject(HttpClient)


  getAllCinemas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getAllCinemasFull(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.baseUrl}/all`);
  }

  getCinemaById(cinemaId: number): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.baseUrl}/${cinemaId}`);
  }

  sendNewCinema(cinema: Cinema): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, cinema, {responseType: 'text'});
  }

  updateCinemaById(cinemaId: number, cinema: Cinema): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${cinemaId}`, cinema, {responseType: 'text'});
  }

}
