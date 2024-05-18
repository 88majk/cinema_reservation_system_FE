import { Time } from "@angular/common";

export type Order = {
    bookingId: number;
    bookingNumber: number;
    totalPrice: number;
    cinemaName: string;
    movieName: string;
    sessionDate: Date;
    sessionTime: Time;
    status: {
        dictBookingStatusId: number;
        name: string;
    }
}