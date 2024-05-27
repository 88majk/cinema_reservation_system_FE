import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UpdateUserData } from '../models/user-update-data';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  constructor() { }

  getUserData(email: string) {
    return this.http.get(`http://localhost:8080/users/${email}`);
  }

  updateUserData(updateData: UpdateUserData): Observable<any> {
    return this.http.put(`http://localhost:8080/users/update/` + localStorage.getItem('user_token'), updateData)
    .pipe(
      tap((response: any) => {
          console.log(response.token);
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
