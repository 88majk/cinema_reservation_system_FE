import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  constructor() { }

  getUserData(email: string) {
    return this.http.get(`http://localhost:8080/users/${email}`);
  }
}
