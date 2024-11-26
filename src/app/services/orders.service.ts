import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order-data';
import { OrderDetails } from '../models/order-details';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  constructor() { }

  getBookingsByUserId(): Observable<Order[]> {
    return this.http.get<Order[]>( this.baseUrl + '/booking/userBookings/' + localStorage.getItem('user_token'));
  }

  getBookingDetails(bookingId: number): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.baseUrl + `/booking/userBookings/bookingDetails/${bookingId}`);
  }

  changeBookingStatus(bookingId: number, newStatus: string) {
    const url = this.baseUrl + `/booking/changeStatus/${bookingId}`;
    const body = { newStatus: newStatus };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(url, body, { headers: headers });
  }
}
