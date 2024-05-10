import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';
import { LoginData } from '../models/login-data';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLogged$ = new BehaviorSubject<boolean>(false);
  isLogged$ = this._isLogged$.asObservable();

  decoded_token = this.decodeToken();

  private loginService = inject(LoginService);
  
  constructor() {
    const user_token = localStorage.getItem('user_token');
    this._isLogged$.next(!!user_token);
  }

  authorization(data: LoginData){
    return this.loginService.postLoginData(data).pipe(
      tap((response: any) => {
        this._isLogged$.next(true);
          localStorage.setItem('user_token', response.token);
      })
    )
  }

  decodeToken() {
    const user_token = localStorage.getItem('user_token');
    if (user_token) {
      const decoded_token = JSON.parse(atob(user_token.split('.')[1]));
      return decoded_token;
    } else {
      return null;
    }
  }

  loggingOut() {
    this._isLogged$.next(false);
    localStorage.removeItem('user_token');
  }
}
