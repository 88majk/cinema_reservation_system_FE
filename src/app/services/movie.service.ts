import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movies-data';
import { GenreDto } from '../models/genre-data';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  private baseUrl = this.apiUrl + '/movie/';
  private genreUrl = this.apiUrl + 'genre/';

  constructor() { }

  sendNewMovie(movie: Movie): Observable<any> {
    return this.http.post(this.baseUrl + 'add', movie);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + 'all');
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}${id}`);
  }

  getAllGenres(): Observable<GenreDto[]> {
    return this.http.get<GenreDto[]>(this.genreUrl + 'all');
  }

  updateMovieById(movieId: number, movie: Movie): Observable<string> {
    return this.http.put(`${this.baseUrl}update/${movieId}`, movie, {responseType: 'text'});
  }
}
