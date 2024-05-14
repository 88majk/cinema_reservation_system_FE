import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';


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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getUserData(this.authService.decodedToken.sub);
    this.authService.checkTokenExpiration();
  }

  getUserData(email: string) {
    return this.userService.getUserData(email).subscribe((data) => {
      console.log(data)
      this.userData = data
      console.log(this.userData.dateOfBirth)
    }, (error) => {
      console.log(error);
    });
  }

  showDialog() {
    this.visible = !this.visible;
  }
}
