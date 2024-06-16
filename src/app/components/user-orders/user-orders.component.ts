import { Component, ViewEncapsulation, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order-data';
import { AuthService } from '../../services/auth.service';
import { OrderDetails } from '../../models/order-details';
import { Time } from '@angular/common';
import { Router } from '@angular/router';


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
  downloadedOrderDetails: boolean = false;
  visible: boolean = false;
  activeOrder: boolean = false;
  visibleDialogId: number | null = null;
  totalOrderPrice: number | null = null;
  selectedBookingDetails: Order | null = null;

  constructor(    
    private router: Router
  ) {}

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

  getBookingDetails(booking: Order) {
    this.ordersService.getBookingDetails(booking.bookingId).subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
        this.downloadedOrderDetails = true;
        console.table(this.orderDetails);

        this.totalOrderPrice = this.orderDetails.reduce(
          (acc, order) => acc + order.price,
          0
        );
        this.activeOrder = this.checkActiveBooking(this.orderDetails[0].sessionDate, this.orderDetails[0].sessionTime);
        this.selectedBookingDetails = booking;
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
    } else if (value == 'Cancelled') {
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

  updateStatus(bookingId: number | undefined, status: string): void {
    if (bookingId !== undefined) {
      this.ordersService.changeBookingStatus(bookingId, status).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }  

  editBooking(bookingId: number | undefined, movieSessionId: number | undefined, bookingNumber: number | undefined) {
    if (bookingId !== undefined && bookingNumber !== undefined) {
      localStorage.setItem('editingBookingId', bookingId.toString());
      localStorage.setItem('editingBookingNumber', bookingNumber.toString());

      this.router.navigate(['booking/movieSession/', movieSessionId]);
    }
  }
}
