import { Component, ViewEncapsulation, inject, input } from '@angular/core';
import { RegisterData } from '../../models/register-data';
import { RegisterService } from '../../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../models/login-data';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPageComponent {
  registerForm: FormGroup = new FormGroup({});

  private registerService = inject(RegisterService);
  private authService = inject(AuthService);

  errorMessage: string = "";
  isRegistering: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      password: ['', [Validators.required]],
      retPassword: ['', [Validators.required]],
    });
  }

  sendRegisterData() {
    if (this.validateForm()) {
      const { email, name, surname, date_of_birth, password } = this.registerForm.value;
      const registerData: RegisterData = { email, name, surname, date_of_birth, password };
      const loginData: LoginData = { email, password };
      setTimeout(() => {
        this.registerService.postRegisterData(registerData).subscribe(
          (response) => {
            console.log(response);
            this.authService.authorization(loginData).subscribe(
              (response) => {
                console.log(response);
                this.router.navigate(['/homePage']);
              },
              (error) => {
                console.log(error); 
              }
            );
          },
          (error) => {
            console.log(error);
            this.errorMessage = error.error;
            this.clearErrorAfterTimeout();
          }
        );
      }, 1000);
    }
  }

  clearErrorAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = "";
    }, 5000);
  }

  validateForm(): boolean {
    return this.registerForm.valid && 
    (this.registerForm.value.password === this.registerForm.value.retPassword);
  }

  registerClick(): void {
    if(this.validateForm())
    this.isRegistering = true;
    setTimeout(() => {
      this.isRegistering = false;
    }, 1200);
  }
}
