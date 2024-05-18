import { Component, ViewEncapsulation, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order-data';
import { AuthService } from '../../services/auth.service';
import { OrderDetails } from '../../models/order-details';
import { Time } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserOrdersComponent {
  private ordersService = inject(OrdersService);
  private authService = inject(AuthService);

  userBookings: Order[] = [];
  orderDetails: OrderDetails[] = [];
  visible: boolean = false;
  activeOrder: boolean = false;
  visibleDialogId: number | null = null;
  totalOrderPrice: number | null = null;

  constructor() {}

  ngOnInit() {
    this.getBookingsByUserId();
    this.authService.checkTokenExpiration();
  }

  getBookingsByUserId(): void {
    this.ordersService.getBookingsByUserId().subscribe(
      (response: Order[]) => {
        this.userBookings = response;
        console.log(this.userBookings);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBookingDetails(bookingId: number) {
    this.ordersService.getBookingDetails(bookingId).subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
        console.table(this.orderDetails);

        this.totalOrderPrice = this.orderDetails.reduce(
          (acc, order) => acc + order.price,
          0
        );
        this.activeOrder = this.checkActiveBooking(this.orderDetails[0].sessionDate, this.orderDetails[0].sessionTime);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkActiveBooking(date: Date, time: Time): boolean {
    const currentDateTime = new Date();

    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(time.hours, time.minutes - 15, 0, 0);
    console.log('sprawdzam');
    return bookingDateTime > currentDateTime;
  }

  setSeverity(value: string): string {
    if (value == 'Pending') {
      return 'warning';
    } else if (value == 'Canceled') {
      return 'danger';
    } else if (value == 'Confirmed') {
      return 'info';
    } else {
      return 'success';
    }
  }

  showDialog(): void {
    this.visible = !this.visible;
  }
}
