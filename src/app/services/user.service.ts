import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UpdateUserData } from '../models/user-update-data';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserData } from '../models/user-data';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = environment.apiUrl;
  constructor() { }

  getUserData(): Observable<UserData> {
    return this.http.get<UserData>(this.baseUrl + `/users/${localStorage.getItem('user_token')}`);
  }

  updateUserData(updateData: UpdateUserData): Observable<any> {
    return this.http.put(this.baseUrl + `/users/update/` + localStorage.getItem('user_token'), updateData)
    .pipe(
      tap((response: any) => {
          localStorage.removeItem('user_token');
          localStorage.setItem('user_token', response.token);
          this.authService.decodeToken();
      })
    );
  }

  updateUserPassword(passsword: string): Observable<string> {
    return this.http.post(this.baseUrl + `/users/changePassword/` +
     localStorage.getItem('user_token'), passsword, {responseType: 'text'});
  }

  deleteAccount(): Observable<string> {
    return this.http.delete(this.baseUrl + `/users/deleteAccount/` + localStorage.getItem('user_token'), {responseType: 'text'});
  }
}
