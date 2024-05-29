export interface Seat {
    seatId: number;
    row: string;
    column: number;
    seatClass: string;
    available: boolean;
    price: number;
    bookingStatus: string;
    inBooking: boolean;
}
