import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaService } from '../../../services/cinema.service';
import { Cinema } from '../../../models/cinema-data';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrl: './cinemas.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CinemasComponent {
  newCinemaForm: FormGroup = new FormGroup({});
  updateCinemaForm: FormGroup = new FormGroup({});
  private cinemaService = inject(CinemaService);

  addCinemaMessage: string = '';
  updCinemaId: number = 0;
  fullCinemas: Cinema[] = [];
  cinemaById: Cinema = {
    id: 0,
    name: '',
    address: '',
    localization: '',
    phoneNumber: '',
    emailContact: '',
  };
  visibleDialog: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getAllCinemasFull();

    this.newCinemaForm = this.formBuilder.group({
      address: ['', Validators.required],
      name: ['', Validators.required],
      localization: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailContact: ['', Validators.required],
    } as unknown as Cinema);

    this.updateCinemaForm = this.formBuilder.group({
      address: ['', Validators.required],
      name: ['', Validators.required],
      localization: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailContact:['', Validators.required],
    }as unknown as Cinema);
  }

  sendNewCinema() {
    const data = { ...this.newCinemaForm.value };
    if (this.newCinemaForm.valid) {
      this.cinemaService.sendNewCinema(data).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          this.addCinemaMessage = error.error;
          this.clearMessageAfterTimeout();
        }
      );
    } else {
      this.addCinemaMessage = 'Do not leave empty forms!';
      this.clearMessageAfterTimeout();
    }
  }

  updateCinemaById(cinemaId: number) {
    if (this.updateCinemaForm.valid) {
      const data = this.updateCinemaForm.value;
      console.log(data)
      this.cinemaService.updateCinemaById(cinemaId, data).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          this.addCinemaMessage = error.error;
          this.clearMessageAfterTimeout();
        }
      );
    }
  }

  getCinemaById(cinemaId: number) {
    this.updCinemaId = cinemaId;
    this.cinemaService.getCinemaById(cinemaId).subscribe(
      (response) => {
        console.log(response);
        this.cinemaById = response;
        this.updateCinemaForm.patchValue({
          name: this.cinemaById.name,
          address: this.cinemaById.address,
          localization: this.cinemaById.localization,
          phoneNumber: this.cinemaById.phoneNumber,
          emailContact: this.cinemaById.emailContact,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllCinemasFull() {
    this.cinemaService.getAllCinemasFull().subscribe(
      (response) => {
        console.log(response);
        this.fullCinemas = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearMessageAfterTimeout() {
    setTimeout(() => {
      this.addCinemaMessage = '';
    }, 5000);
  }
}
