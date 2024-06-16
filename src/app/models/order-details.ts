import { Time } from "@angular/common";

export type OrderDetails = {
    seats: string;
    seatType: string;
    price: number;
    movieName: string;
    cinemaName: string;
    hallName: string;
    sessionDate: Date;
    sessionTime: Time;
    movieSessionId: number;
    bookingNumber: number;
}