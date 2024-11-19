import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaService } from '../../../services/cinema.service';
import { AccessService } from '../../../services/access.service';
import { Cinema } from '../../../models/cinema-data';
import { Router } from '@angular/router'; // Import Router
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrl: './access.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AccessComponent implements OnInit {
  newAccess: FormGroup = new FormGroup({});
  deleteAccess: FormGroup = new FormGroup({});
  errorMessage: string = '';
  private cinemaService = inject(CinemaService);
  private accessService = inject(AccessService);
  messages: any[] = [];

  fullCinemas: Cinema[] = [];
  selectedCinema: any;
  private router = inject(Router); // Inject Router

  constructor(private fb: FormBuilder,
    private location: Location
  ) {}
  ngOnInit() {
    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {

      localStorage.removeItem('successMessage');
      this.messages.push({ severity: 'success', summary: 'Success', detail: successMessage });

      setTimeout(() => {
        this.messages = [];
      }, 5000);
    }

    this.getAllCinemasFull();
    this.newAccess = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      isAdmin: [false], // Domyślnie isAdmin ustawione na false
      selectedCinema: [''] // Wybrany kinema, jeśli isAdmin = false
    });
    this.deleteAccess = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addAccess() {
    if (this.newAccess.valid) {
      // Here you can add the logic to perform on form submission
      const token = localStorage.getItem('user_token'); 
      if (!token) {
        this.router.navigate(['/login']); // Przenieś do strony logowania
        return;
      }
      const formValue = this.newAccess.value;

      const body = {
        token: token,
        email: formValue.email,
        allCinema: formValue.isAdmin,
        cinemaId: formValue.isAdmin ? 0 : formValue.selectedCinema.id
      };
      this.accessService.sendNewAdmin(body).subscribe(
        response => {
            this.messages = []
            localStorage.setItem('successMessage', 'Success: New admin created successfully.');
            window.location.reload();

          },
        error => {
          this.messages = []
          this.messages.push({severity:'error', summary:'Error', detail:`${error.error}.`});
          setTimeout(() => {
            this.messages = [];
          }, 5000);
        }
      );
      
      this.errorMessage = ''; // Clear any previous error message
    } else {
      this.errorMessage = 'Please enter a valid email.'; // Set error message
    }
  }

  getAllCinemasFull() {
    this.cinemaService.getAllCinemasFull().subscribe(
      (response) => {
        this.fullCinemas = response;
      },
      (error) => {
      }
    );
  }

  onIsAdminChange() {
    if (this.newAccess && this.newAccess.get('isAdmin')?.value) {
      // Jeśli isAdmin = true, czyli admin dla wszystkich kin, ukryj pole wyboru kina
      this.newAccess.get('selectedCinema')?.setValue(''); // Resetuj wybrany kinema
    }
    
  }

  deleteAdmin() {
    if (this.deleteAccess.valid) {
      // Here you can add the logic to perform on form submission
      const token = localStorage.getItem('user_token'); 
      if (!token) {
        this.router.navigate(['/login']); // Przenieś do strony logowania
        return;
      }
      const formValue = this.deleteAccess.value;


      const body = {
        token: token,
        email: formValue.email,
      };
      this.accessService.deleteAdmin(body).subscribe(
        response => {
            this.messages = []
            localStorage.setItem('successMessage', 'Success: Admin successfully deleted.');
            window.location.reload();

          },
        error => {
          this.messages = []
          this.messages.push({severity:'error', summary:'Error', detail:`${error.error}.`});
          setTimeout(() => {
            this.messages = [];
          }, 5000);
        }
      );
      
      this.errorMessage = ''; // Clear any previous error message
    } else {
      this.errorMessage = 'Please enter a valid email.'; // Set error message
    }
  }

}
