import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UpdateUserData } from '../models/user-update-data';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  constructor() { }

  getUserData(): Observable<UserData> {
    return this.http.get<UserData>(`http://localhost:8080/users/${localStorage.getItem('user_token')}`);
  }

  updateUserData(updateData: UpdateUserData): Observable<any> {
    return this.http.put(`http://localhost:8080/users/update/` + localStorage.getItem('user_token'), updateData)
    .pipe(
      tap((response: any) => {
          localStorage.removeItem('user_token');
          localStorage.setItem('user_token', response.token);
          this.authService.decodeToken();
      })
    );
  }

  updateUserPassword(passsword: string): Observable<string> {
    return this.http.post(`http://localhost:8080/users/changePassword/` +
     localStorage.getItem('user_token'), passsword, {responseType: 'text'});
  }
}
