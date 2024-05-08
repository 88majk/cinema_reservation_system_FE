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
}
