import { Time } from "@angular/common";

export type Order = {
    bookingId: number;
    bookingNumber: number;
    totalPrice: number;
    cinemaName: string;
    movieSessionId: number;
    movieName: string;
    sessionDate: Date;
    sessionTime: Time;
    status: {
        dictBookingStatusId: number;
        name: string;
    }
}