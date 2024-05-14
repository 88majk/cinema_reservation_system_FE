import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { OrderDetails } from '../../models/order-details';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  @Input() bookingId: any;
  @Output() showDialog = new EventEmitter<void>();

  orderDetails: OrderDetails[] = [];

  private orderService = inject(OrdersService);

  constructor() {}

  ngOnInit() {
    console.log('hello');
    this.getBookingDetails(this.bookingId);
  }
  close() {
    this.showDialog.emit();
  }

  getBookingDetails(bookingId: number) {
    this.orderService.getBookingDetails(bookingId).subscribe(
      (response: OrderDetails[]) => {
        this.orderDetails = response;
        console.table(this.orderDetails);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
