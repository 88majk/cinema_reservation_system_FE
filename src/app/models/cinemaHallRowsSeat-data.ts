import { Rows } from './rows-data';

export interface CinemaHallRowsSeat {
    cinemaHallId: number,
    cinemaHallName: string
    rows: Rows[];
}
