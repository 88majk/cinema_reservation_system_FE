import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CinemaHallRowsSeat } from '../models/cinemaHallRowsSeat-data';
import { Observable, throwError, catchError } from 'rxjs';
import { MovieSessionInfo } from '../models/movieSessionInfo-data';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCinemaHallSeats(movieSessionId: number): Observable<any> {
    const url = `${this.baseUrl}/seats/movieSession/${movieSessionId}`;
    const params = new HttpParams()
      .set('movieSessionId', movieSessionId.toString())
      return this.http.get<CinemaHallRowsSeat>(url, { params }).pipe(
        catchError(error => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // Błąd klienta
            errorMessage = `An error occurred: ${error.error.message}`;
          } else {
            // Błąd serwera
            errorMessage = `Server returned code ${error.status}: ${error.error}`;
          }
          // Zwraca błąd jako string
          return throwError(errorMessage);
        })
      );
    }

    postNewBooking(bookingData: any){    
      return this.http.post<any>(`${this.baseUrl}/booking/newBooking`, bookingData);
    }

    getMovieSessionInfo(movieSessionId: number): Observable<any> {
      const url = `${this.baseUrl}/movieSession/${movieSessionId}`;

      const params = new HttpParams()
      .set('movieSessionId', movieSessionId.toString())
      return this.http.get<MovieSessionInfo>(url, { params }).pipe(
        catchError(error => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // Błąd klienta
            errorMessage = `An error occurred: ${error.error.message}`;
          } else {
            // Błąd serwera
            errorMessage = `Server returned code ${error.status}: ${error.error}`;
          }
          // Zwraca błąd jako string
          return throwError(errorMessage);
        })
      );
    }
}
