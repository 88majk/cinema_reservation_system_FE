import { BookingMovieSession } from './bookingMovieSession-data'; // Upewnij się, że ścieżka do pliku jest poprawna


export interface BookingRequestData {
    token: string;
    totalPrice: number;
    bookingStatus: number;
    bookingMovieSessionDtoList: BookingMovieSession[];
  }
  