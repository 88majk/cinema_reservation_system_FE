import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service'
import { CinemaHallRowsSeat } from '../../models/cinemaHallRowsSeat-data'
import { Seat } from '../../models/seat-data'
import { Rows } from '../../models/rows-data';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ReservationComponent implements OnInit {
  reservationPage: FormGroup = new FormGroup({});
  seatImageUrl: string = 'assets/chair.png';
  seatImages = ['assets/chair-grey.png', 'assets/chair-green.png', 'assets/chair-red.png', 'assets/chair-blue.png'];
  seatingLayout!: any[][];
  isDataLoaded: boolean = false;
  cinemaHallSeats: CinemaHallRowsSeat | null = null;
  selectedSeats: Seat[] = []; // Lista przechowująca wybrane miejsca


  ngOnInit(): void {
    this.loadCinemaHallSeats();
  }

  // seatingLayout: any[][];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {
    // Tablica definiująca nieregularną liczbę miejsc w każdym rzędzie
    // const seatsPerRow = [4, 3, 6, 7, 8, 2, 10];

  }

  generateSeatingLayout(): any[][] {
    const layout = [];
    if (this.cinemaHallSeats && this.cinemaHallSeats.rows) {
      for (const row of this.cinemaHallSeats.rows) {
        const seatsClass = [];
        for (const seat of row.seats) {
          console.log(seat.seatClass)
          if (seat.available == false){
            seatsClass.push(this.seatImages[0]); // Losujemy obrazek z tablicy
          }
          else if (seat.seatClass == 'VIP'){
            seatsClass.push(this.seatImages[2]); // Losujemy obrazek z tablicy
          }
          else if (seat.seatClass == 'Premium'){
            seatsClass.push(this.seatImages[1]); // Losujemy obrazek z tablicy
          }
          else {
            seatsClass.push(this.seatImages[3]); // Losujemy obrazek z tablicy

          }
        }
        layout.push(seatsClass);
      }
    }
    console.log(layout)
    return layout;
  }

  handleClick(event: MouseEvent, i: number, j: number) {
    const target = event.currentTarget as HTMLElement;
    const img = target.querySelector('img');
    const imageUrl = img?.getAttribute('src');

    const seat = this.cinemaHallSeats?.rows[i]?.seats[j];

    if (!seat) {
        return; // Zabezpieczenie przed brakiem miejsca dla indeksów
    }

    if (imageUrl && imageUrl === 'assets/chair-grey.png') {
      return; // Nie wykonujemy żadnych działań dla szarego siedzenia
    }

    if (target.classList.contains('clicked')) {
      // Usuwamy miejsce z listy wybranych miejsc
      const index = this.selectedSeats.findIndex(selectedSeat => selectedSeat.seatId === seat.seatId);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }

      target.classList.remove('clicked');
      img?.classList.remove('clicked');
    } else {
      // Dodajemy miejsce do listy wybranych miejsc
      this.selectedSeats.push(seat);

      target.classList.add('clicked');
      img?.classList.add('clicked');
    }

    console.log(this.selectedSeats);
  }

  
  loadCinemaHallSeats(): void {
    this.route.paramMap.subscribe(params => {
      const movieSessionId = Number(params.get('sessionId'));

      this.reservationService.getCinemaHallSeats(movieSessionId).subscribe(
        (response: any) => {
          this.cinemaHallSeats = response as CinemaHallRowsSeat;
          this.seatingLayout = this.generateSeatingLayout();
          console.log(response);
          this.isDataLoaded = true; // Ustaw flagę na true po załadowaniu danych

        },
        (error) => {
          // Obsłuż błąd
          console.error(error);
        }
      );
    });
  }

}
