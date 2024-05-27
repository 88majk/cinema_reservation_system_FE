import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateUserData } from '../../models/user-update-data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent {
  isDisabled: boolean = true;
  visible: boolean = false;
  userData: any;

  authService = inject(AuthService);
  userService = inject(UserService);

  updateForm: FormGroup = new FormGroup({});
  updatePasswordForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getUserData(this.authService.decodedToken.sub);
    this.authService.checkTokenExpiration();

    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    }as unknown as UpdateUserData);

    this.updatePasswordForm = this.formBuilder.group({
      password: ['', ],
      retPassword: ['', ],
    });
  }

  getUserData(email: string) {
    return this.userService.getUserData(email).subscribe(
      (data) => {
        console.log(data);
        this.userData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUserData() {
    const data = {...this.updateForm.value}
    this.userService.updateUserData(data).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUserPassword() {
    const passsword = this.updatePasswordForm.value.password;
    console.log(passsword);
    this.userService.updateUserPassword(passsword).subscribe(
      (response) => {
        // console.log(response.token);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDialog() {
    this.visible = !this.visible;
  }
}
