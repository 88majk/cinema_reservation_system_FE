import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../models/login-data';
import { LoginService } from '../../services/login.service';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({});

  private authService = inject(AuthService);

  isLogging: boolean = false;
  errorMessage: string = "";

  loginClick() {
    this.isLogging = true;
    setTimeout(() => {
      this.isLogging = false;
    }, 1200);
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    } as unknown as LoginData);
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  sendLoginData() {
    const data = {...this.loginForm.value};
    if(this.loginForm.valid) {
      setTimeout(() => {
        this.authService.authorization(data).subscribe((response) => {
          console.log(response);
          this.router.navigate(['/homePage']);
        },
        error => {
          console.log(error.error);
          this.errorMessage = error.error;
          this.clearErrorAfterTimeout();
        }
        ); 
      }, 1200);
    }
  }

  clearErrorAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = "";
    }, 5000);
  }
}
