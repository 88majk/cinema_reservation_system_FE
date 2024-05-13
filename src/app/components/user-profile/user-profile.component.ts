import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent {
  isDisabled: boolean = true;
  visible: boolean = false;

  authService = inject(AuthService);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    
  }

  showDialog() {
    this.visible = !this.visible;
  }
}
