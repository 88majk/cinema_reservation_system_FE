import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';
import { LoginData } from '../models/login-data';
import { BehaviorSubject, interval, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterData } from '../models/register-data';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLogged$ = new BehaviorSubject<boolean>(false);
  isLogged$ = this._isLogged$.asObservable();
  decodedToken: any;

  private loginService = inject(LoginService);
  private registerService = inject(RegisterService);
  
  constructor(private router: Router) {
    const user_token = localStorage.getItem('user_token');
    this._isLogged$.next(!!user_token);
    this.decodeToken();
  }

  authorization(data: LoginData){
    return this.loginService.postLoginData(data).pipe(
      tap((response: any) => {
        this._isLogged$.next(true);
          localStorage.setItem('user_token', response.token);
          this.decodeToken();
      })
    )
  }

  registerAuthorization(data: RegisterData) {
    return this.registerService.postRegisterData(data).pipe(
      tap((response: any) => {
        this._isLogged$.next(true);
          localStorage.setItem('user_token', response.token);
          this.decodeToken();
      })
    )
  }

  checkTokenExpiration(): void {
    const expirationTime = this.decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if (expirationTime <= currentTime) {
      this._isLogged$.next(false);
      localStorage.removeItem('user_token');
      this.router.navigate(['/login']);
    }
  }

  decodeToken() {
    const user_token = localStorage.getItem('user_token');
    if (user_token) {
      this.decodedToken = JSON.parse(atob(user_token.split('.')[1]));
      console.log('decoding token...');
    } else {
      this.decodedToken = null;
    }
  }

  loggingOut() {
    this._isLogged$.next(false);
    localStorage.removeItem('user_token');
    this.router.navigate(['/homePage']);
  }
}
