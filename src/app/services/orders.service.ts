import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order-data';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);

  constructor() { }

  getBookingsByUserId(userId: any): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8080/booking/' + userId);
  }
}
