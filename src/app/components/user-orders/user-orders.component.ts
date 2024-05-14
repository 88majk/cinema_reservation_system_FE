import { Component, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
  private ordersService = inject(OrdersService);
  private authService = inject(AuthService);

  userBookings: Order[] = [];

  constructor() {}

  ngOnInit() {
    this.getBookingsByUserId(this.authService.decodedToken.id);
    this.authService.checkTokenExpiration();
  }

  getBookingsByUserId(userId: any): void {
    this.ordersService.getBookingsByUserId(userId).subscribe(
      (response: Order[]) => {
        this.userBookings = response;
        console.log(this.userBookings);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
