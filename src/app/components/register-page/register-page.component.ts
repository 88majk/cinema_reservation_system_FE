import { Component, ViewEncapsulation, inject } from '@angular/core';

import { RegisterData } from '../../models/register-data';
import { RegisterService } from '../../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPageComponent {
  registerForm: FormGroup = new FormGroup({});

  private registerService = inject(RegisterService);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      password: ['', [Validators.required]]
    } as unknown as RegisterData);
  }

  sendRegisterData(){
    const data = {...this.registerForm.value};
    if (this.registerForm.valid) {
      this.registerService.postRegisterData(data).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
