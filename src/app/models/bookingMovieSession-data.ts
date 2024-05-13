import { BookingSeat } from "./bookingSeat-data"
 
export interface BookingMovieSession {
    movieSessionId: number;
    bookingSeatDtoList: BookingSeat[];
  }