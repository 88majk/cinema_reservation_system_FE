import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { Cinema } from '../../models/getAllCinema-data';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-session',
  templateUrl: './movie-session.component.html',
  styleUrls: ['./movie-session.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieSessionComponent implements OnInit {
  homePageForm: FormGroup = new FormGroup({});
  selectedCinemaName: string = ''; 
  selectedCinema: Cinema | null = null; 
  selectedDate: Date = new Date();
  selectedDateTileIndex: number = 0; // Indeks wybranego kafelka daty
  cinemas: Cinema[] = [];
  dates: Date[] = [];
  cinemasLoaded: boolean = false; 

  constructor(private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCinemas();
  }

  loadCinemas(): void {
    this.cinemaService.getAllCinemas().subscribe(
      (response: Cinema[]) => {
        this.cinemas = response;
        this.cinemasLoaded = true;
        console.log('Cinemas loaded successfully:', this.cinemas);
        
        // Po załadowaniu kin, pobierz daty i znajdź odpowiedni kafelek dla daty ze ścieżki
        this.generateDateTiles();
        this.route.paramMap.subscribe(params => {
          const cinemaId = Number(params.get('cinemaId'));
          const dateFromParams = new Date(params.get('date') || '');
          this.selectedCinemaName = ''; 

          if (this.cinemasLoaded) {
            this.findSelectedCinema(cinemaId);
            this.findSelectedDateTile(dateFromParams);
          } else {
            console.log('Waiting for cinemas data to load...');
          }
        });
      },
      (error) => {
        console.error('Error while loading cinemas:', error);
      }
    );
  }

  generateDateTiles(): void {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.dates.push(date);
      if (i === 0) {
        this.selectDate(date);
      }
    }
  }
  selectDate(date: Date): void {
    this.selectedDate = date;
}

  selectDateEvent(event: any, date: Date): void {
    this.selectedDate = date;
    this.goToMovieSessions(event, date);
}

  formatDate(date: Date, format: string): string {
    return formatDate(date, format, 'en-US');
  }

  findSelectedCinema(cinemaId: number): void {
    const cinema = this.cinemas.find(cinema => cinema.id === cinemaId);
    if (cinema) {
      this.selectedCinema = cinema;
      this.selectedCinemaName = cinema.name;
    } else {
      console.error('Cinema not found for id:', cinemaId);
    }
  }

  findSelectedDateTile(date: Date): void {
    this.selectedDateTileIndex = this.dates.findIndex(d => this.isSameDay(d, date));
    this.selectDate(this.dates[this.selectedDateTileIndex]);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  goToMovieSessions(event: any, date: Date) {
    let selectedCinemaName = '';
    if (event && event.target && event.target.value) {
      selectedCinemaName = event.target.value;
    } else {
      selectedCinemaName = this.selectedCinemaName;
    }
  
    const selectedCinema = this.cinemas.find(cinema => cinema.name === selectedCinemaName);
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
  
    if (selectedCinema) {
      const cinemaId = selectedCinema.id;
      this.router.navigate(['/homePage/cinemas', cinemaId, 'movieSession', formattedDate]);
    } else {
      console.error('Selected cinema not found:', selectedCinemaName);
    }
  }
  
}
