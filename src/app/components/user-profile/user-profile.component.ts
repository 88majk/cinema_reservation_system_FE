import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateUserData } from '../../models/user-update-data';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent {
  isDisabled: boolean = true;
  visible: boolean = false;
  visibleConfirm: boolean = false;
  userUpdateErrorMessage: string = '';
  userUpdateResponseMessage: string = '';
  passwordUpdateErrorMessage: string = '';
  passwordUpdateResponseMessage: string = '';
  messages: any[] = [];
  userData: UserData = {
    name: '',
    surname: '',
    email: '',
    dateOfBirth: new Date(),
  };

  authService = inject(AuthService);
  userService = inject(UserService);

  updateForm: FormGroup = new FormGroup({});
  updatePasswordForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userData.dateOfBirth = new Date();
    this.getUserData();
    this.authService.checkTokenExpiration();

    this.updateForm = this.formBuilder.group({
      email: [{ value: '', disabled: this.isDisabled }, Validators.required],
      name: [{ value: '', disabled: this.isDisabled }, Validators.required],
      surname: [{ value: '', disabled: this.isDisabled }, Validators.required],
      dateOfBirth: [
        { value: '', disabled: this.isDisabled },
        Validators.required,
      ],
    } as unknown as UpdateUserData);

    this.updatePasswordForm = this.formBuilder.group({
      password: [
        '',
       [ Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)]
      ],
      retPassword: ['', Validators.required],
    });
  }

  getUserData() {
    return this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
        this.updateForm.patchValue({
          name: this.userData.name,
          surname: this.userData.surname,
          email: this.userData.email,
          dateOfBirth: this.userData.dateOfBirth,
        });
      },
      (error) => {
      }
    );
  }

  updateUserData() {
    if (this.updateForm.valid) {
      const data = { ...this.updateForm.value };
      this.userService.updateUserData(data).subscribe(
        (response) => {
          this.userUpdateResponseMessage = 'Your account has been updated.';
          this.clearMessageAfterTimeout();
        },
        (error) => {
          this.userUpdateErrorMessage = error.error;
          this.clearMessageAfterTimeout();
        }
      );
    } else {
      this.userUpdateErrorMessage = 'Please fill all the fields.';
      this.clearMessageAfterTimeout();
    }
  }

  updateUserPassword() {
    const password = this.updatePasswordForm.value.password;
    const retPassword = this.updatePasswordForm.value.retPassword;
    if (this.updatePasswordForm.valid && password == retPassword) {
      const password = this.updatePasswordForm.value.password;
      this.userService.updateUserPassword(password).subscribe(
        (response) => {
          this.passwordUpdateResponseMessage =
            'Password has been updated successfully.';
          this.clearMessageAfterTimeout();
        },
        (error) => {
        }
      );
    } else {
      if (password != retPassword) {
        this.passwordUpdateErrorMessage = 'Passwords do not match.';
        this.clearMessageAfterTimeout();
      } else if (password.length < 8 || password.length > 32) {
        this.passwordUpdateErrorMessage =
          'Password must be between 8 and 32 characters.';
        this.clearMessageAfterTimeout();
      }
    }
  }

  deleteUserAccount(): void {
    this.userService.deleteAccount().subscribe(
      (response) => {
        this.authService.loggingOut();
        this.messages = [];
          this.messages.push({severity:'info', summary:'Warning', detail:`You reject the payment. Your temporary reservation numbe
           You can change your booking here and confirm your payment or do it in the my orders tab. `});
    }, 
    (error) => {
    });
  }

  showDialog() {
    this.visible = !this.visible;
  }

  showDialogConfirm(): void {
    this.visibleConfirm =!this.visibleConfirm;
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.updateForm.disable();
    } else {
      this.updateForm.enable();
    }
  }

  clearMessageAfterTimeout(): void {
    setTimeout(() => {
      this.userUpdateErrorMessage = '';
      this.userUpdateResponseMessage = '';
      this.passwordUpdateErrorMessage = '';
      this.passwordUpdateResponseMessage = '';
    }, 5000);
  }
}
