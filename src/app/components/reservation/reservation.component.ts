import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service'
import { CinemaHallRowsSeat } from '../../models/cinemaHallRowsSeat-data'
import { Seat } from '../../models/seat-data'
import { Rows } from '../../models/rows-data';
import { BookingRequestData } from '../../models/booking-data';
import { BookingMovieSession } from '../../models/bookingMovieSession-data';
import { BookingSeat } from '../../models/bookingSeat-data';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';



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
  selectedSeats: Seat[] = []; 
  isSeatsSelected: boolean = true;
  movieSessionId!: number;
  bookingNumber: number | null = null;
  errorMessage: string = '';
  @ViewChild('confirmation') confirmation: any;


  ngOnInit(): void {
    this.loadCinemaHallSeats();
  }

  // seatingLayout: any[][];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

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
      this.movieSessionId = Number(params.get('sessionId'));

      this.reservationService.getCinemaHallSeats(this.movieSessionId).subscribe(
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

  calculateTotalPrice(): number {
    let totalPrice = 0;

    if (this.selectedSeats) {
        for (const seat of this.selectedSeats) {
            totalPrice += seat.price;
        }
    }

    return totalPrice;
  }

  handleButtonClick(): void {
    if (!this.selectedSeats || this.selectedSeats.length === 0){
      this.isSeatsSelected = false;
      return;
    }
    else{
      this.isSeatsSelected = true;
      const createBookingRequestData = this.createBookingRequestData();
      console.log(createBookingRequestData)
      this.reservationService.postNewBooking(createBookingRequestData).subscribe({
        next: (response) => {
          this.bookingNumber = Number(response.reservationNumber); // Zakładając, że backend zwraca numer rezerwacji
          this.loadCinemaHallSeats();
          this.showConfirmationDialog();
          console.log(this.bookingNumber)
        },
        error: (error) => {
          console.log(error.error)
        }
      });
    }
  }

  createBookingRequestData(): BookingRequestData {
    const bookingSeats: BookingSeat[] = [];
    const user_token = localStorage.getItem('user_token');

    for (let i = 0; i < this.selectedSeats.length; i++){
      const bookingSeat: BookingSeat = {
        bookingStatus: 1,
        seatId: this.selectedSeats[i].seatId
      };
      bookingSeats.push(bookingSeat);
    }

    const bookingMovieSessions: BookingMovieSession[] = [];
    const bookingMovieSession: BookingMovieSession = {
      movieSessionId: this.movieSessionId,
      bookingSeatDtoList: bookingSeats
    };
    bookingMovieSessions.push(bookingMovieSession);

    const bookingRequestData: BookingRequestData = {
      token: user_token ?? "",
      totalPrice: this.calculateTotalPrice(),
      bookingStatus: 1,
      bookingMovieSessionDtoList: bookingMovieSessions
    }

    return bookingRequestData;
  } 

  showConfirmationDialog() {
    this.confirmationService.confirm({
      message: 'Your message goes here',
      header: 'Confirmation',
      accept: () => {
          // Akcja po zaakceptowaniu dialogu
          this.selectedSeats = []
          console.log('Accepted');
      },
      reject: () => {
          // Akcja po odrzuceniu dialogu
          console.log('Rejected');
      }
    });
  }

}
