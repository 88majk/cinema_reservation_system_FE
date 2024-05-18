import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UpdateUserData } from '../models/user-update-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  constructor() { }

  getUserData(email: string) {
    return this.http.get(`http://localhost:8080/users/${email}`);
  }

  updateUserData(updateData: UpdateUserData) {
    return this.http.put(`http://localhost:8080/users/update/` + localStorage.getItem('user_token'), updateData);
  }

  updateUserPassword(passsword: string) {
    return this.http.post(`http://localhost:8080/users/changePassword/` + localStorage.getItem('user_token'), passsword);
  }
}
