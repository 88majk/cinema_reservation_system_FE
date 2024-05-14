export type Order = {
    bookingNumber: number;
    totalPrice: number;
    cinemaName: string;
    movieName: string;
    sessionDate: Date;
    status: {
        dictBookingStatusId: number;
        name: string;
    }
}