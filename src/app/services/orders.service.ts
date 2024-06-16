import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order-data';
import { OrderDetails } from '../models/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);

  constructor() { }

  getBookingsByUserId(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8080/booking/userBookings/' + localStorage.getItem('user_token'));
  }

  getBookingDetails(bookingId: number): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`http://localhost:8080/booking/userBookings/bookingDetails/${bookingId}`);
  }

  changeBookingStatus(bookingId: number, newStatus: string) {
    const url = `http://localhost:8080/booking/changeStatus/${bookingId}`;
    const body = { newStatus: newStatus };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(url, body, { headers: headers });
  }
}
