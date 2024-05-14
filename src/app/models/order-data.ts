export type Order = {
    bookingNumber: number;
    totalPrice: number;
    status: {
        dictBookingStatusId: number;
        name: string;
    }
}