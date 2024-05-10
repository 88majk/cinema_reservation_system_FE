import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Cinema } from '../../models/getAllCinema-data'; // Importuj stworzony interfejs
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  homePageForm: FormGroup = new FormGroup({});

  cinemas: Cinema[] = [];
  dates: Date[] = [];

  selectedDate: Date = new Date();

  constructor(private cinemaService: CinemaService, 
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {

    this.loadCinemas();
    this.generateDateTiles();
  }

  loadCinemas(): void {
    this.cinemaService.getAllCinemas().subscribe(
      (response: Cinema[]) => { // Użyj stworzonego interfejsu w odpowiedzi
        this.cinemas = response;
        console.log('Cinemas loaded successfully:', this.cinemas);
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
      if (i == 0) {
        this.selectDate(date);
      }
    }
  }

  // Metoda wywoływana po kliknięciu na kafelek daty
  selectDate(date: Date): void {
      this.selectedDate = date;
  }

  formatDate(date: Date, format: string): string {
    return formatDate(date, format, 'en-US');
  }

  goToMovieSessions(event: any, date: Date) {
    const selectedCinemaName = event.target.value;
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
