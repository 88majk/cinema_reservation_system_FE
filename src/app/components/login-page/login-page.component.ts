import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../models/login-data';
import { LoginService } from '../../services/login.service';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({});

  private authService = inject(AuthService);
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    } as unknown as LoginData);
  }

  constructor(private formBuilder: FormBuilder) {}

  sendLoginData() {
    const data = {...this.loginForm.value};
    if(this.loginForm.valid) {
      this.authService.authorization(data).subscribe((response) => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
      );
    }
  }
}
