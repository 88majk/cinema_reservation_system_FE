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
import { MovieSessionInfo } from '../../models/movieSessionInfo-data';



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
  movieSessionInfo: MovieSessionInfo | null = null;
  selectedSeats: Seat[] = []; 
  isSeatsSelected: boolean = true;
  movieSessionId!: number;
  bookingNumber: number = -1;
  errorMessage: string = '';
  messages: any[] = [];
  bookingId: number = -1;
  @ViewChild('confirmation') confirmation: any;


  ngOnInit(): void {
    this.bookingId = Number(localStorage.getItem('editingBookingId'));
    this.bookingNumber = Number(localStorage.getItem('editingBookingNumber'));

    if (this.bookingId == null || this.bookingNumber == null ) {
      this.bookingId = -1;
      this.bookingNumber = -1;
    }
    else {
      localStorage.removeItem('editingBookingId');
      localStorage.removeItem('editingBookingNumber');
    }
    this.loadMovieSessionInfo();
    this.loadCinemaHallSeats();
    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
        this.messages.push({severity:'success', summary:'Success', detail: successMessage});
        localStorage.removeItem('successMessage'); // Usuń komunikat po wyświetleniu
        
        setTimeout(() => {
          this.messages = [];
        }, 5000);
    }
    this.authService.checkTokenExpiration();

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
            seatsClass.push(this.seatImages[0]);
          }
          else if (seat.seatClass == 'VIP'){
            seatsClass.push(this.seatImages[2]);
          }
          else if (seat.seatClass == 'Premium'){
            seatsClass.push(this.seatImages[1]);
          }
          else {
            seatsClass.push(this.seatImages[3]);

          }

          if (seat.inBooking == true) {
            setTimeout(() => {
              this.selectedSeats.push(seat);
              const rowIndex = row.rowName.toLowerCase().charCodeAt(0) - 97;
              const seatElement = document.querySelector(`.row:nth-child(${rowIndex + 1}) .seat:nth-child(${seat.column})`);
              if (seatElement) {
                seatElement.classList.add('clicked');
              }
            }, 0);
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

    const index = this.selectedSeats.findIndex(selectedSeat => selectedSeat.seatId === seat.seatId);

    if (index !== -1) {
        // Usuwamy miejsce z listy wybranych miejsc i usuwamy podświetlenie
        this.selectedSeats.splice(index, 1);
        target.classList.remove('clicked');
        img?.classList.remove('clicked');
    } else {
        // Dodajemy miejsce do listy wybranych miejsc i dodajemy podświetlenie
        this.selectedSeats.push(seat);
        target.classList.add('clicked');
        img?.classList.add('clicked');
    }

    console.log(this.selectedSeats);
}


  deleteButtonClick(event: MouseEvent, seat: Seat){
    const rowIndex = seat.row.toLowerCase().charCodeAt(0) - 97;

    console.log("Usuwam siedzenie z rzędu", rowIndex, "i kolumny", seat.column);

    const seatToRemoveIndex = this.selectedSeats.findIndex(selectedSeat => selectedSeat.seatId === seat.seatId);
    if (seatToRemoveIndex !== -1) {
        this.selectedSeats.splice(seatToRemoveIndex, 1);

        // Znajdź siedzenie odpowiadające klikniętemu przyciskowi
        const seatElement = document.querySelector(`.row:nth-child(${rowIndex + 1}) .seat:nth-child(${seat.column})`);
        if (seatElement) {
            seatElement.classList.remove('clicked');
        }
    }
  }
  
  loadCinemaHallSeats(): void {
    this.route.paramMap.subscribe(params => {
      this.movieSessionId = Number(params.get('sessionId'));

      this.reservationService.getCinemaHallSeats(this.movieSessionId, this.bookingId).subscribe(
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

  handleButtonClick(bookingStatus: number): void {
    if (!this.selectedSeats || this.selectedSeats.length === 0){
      this.isSeatsSelected = false;
      return;
    }
    else{
      this.isSeatsSelected = true;
      const createBookingRequestData = this.createBookingRequestData(bookingStatus);
      console.log(createBookingRequestData)
      this.reservationService.postNewBooking(createBookingRequestData).subscribe({
        next: (response) => {
          this.bookingNumber = Number(response.reservationNumber);
          this.showConfirmationDialog();
          console.log(this.bookingNumber)
        },
        error: (error) => {
          console.log(error.error)
          this.messages = [];
          this.messages.push({severity:'error', summary:'Error', detail:`${error.error}. Please reload page.`});
                
        }
      });
    }
  }

  createBookingRequestData(bookingStatus: number): BookingRequestData {
    const bookingSeats: BookingSeat[] = [];
    const user_token = localStorage.getItem('user_token');

    for (let i = 0; i < this.selectedSeats.length; i++){
      const bookingSeat: BookingSeat = {
        bookingStatus: bookingStatus,
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
      bookingStatus: bookingStatus,
      bookingNumber: this.bookingNumber,
      bookingMovieSessionDtoList: bookingMovieSessions
    }

    return bookingRequestData;
  } 

  showConfirmationDialog() {

    const totalPrice = this.calculateTotalPrice();
    const numberOfTickets = this.selectedSeats.length;
    this.confirmationService.confirm({
      message: `You buy ${numberOfTickets} ticket for a total of ${totalPrice}$`,
      header: 'Confirm payment',
      accept: () => {
          // Akcja po zaakceptowaniu dialogu
          this.handleButtonClick(2);
          console.log('Accepted');
          //this.selectedSeats = []
          localStorage.setItem('successMessage', `You have completed the payment. Your reservation number is ${this.bookingNumber}.`);
          window.location.reload();
                },
      reject: () => {
          // Akcja po odrzuceniu dialogu
          console.log('Rejected');
          this.messages = [];
          this.messages.push({severity:'info', summary:'Info', detail:`You reject the payment. Your temporary reservation number is ${this.bookingNumber}.
           You can change your booking here and confirm your payment or do it in the my orders tab. `});
      }
    });
  }

  loadMovieSessionInfo(): void {
    this.route.paramMap.subscribe(params => {
      this.movieSessionId = Number(params.get('sessionId'));

      this.reservationService.getMovieSessionInfo(this.movieSessionId).subscribe(
        (response: any) => {
          this.movieSessionInfo = response as MovieSessionInfo;
          console.log(response);
        },
        (error) => {
          // Obsłuż błąd
          console.error(error);
        }
      );
    });
  }

}
