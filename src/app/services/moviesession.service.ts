import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieAndSessions } from '../models/movieAndSession-data';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from '../enviroment';


@Injectable({
  providedIn: 'root'
})
export class MovieSessionService {

  private baseUrl = environment.apiUrl + '/cinemas';

  constructor(private http: HttpClient) { }

  getMovieSessions(cinemaId: number, movieSessionDate: string): Observable<any> {
    const url = `${this.baseUrl}/${cinemaId}/movieSession`;
    const params = new HttpParams()
      .set('cinemaId', cinemaId.toString())
      .set('movieSessionDate', movieSessionDate);

      return this.http.get<MovieAndSessions[]>(url, { params }).pipe(
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
