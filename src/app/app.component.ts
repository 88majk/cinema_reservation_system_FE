import { Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'CinemaResSys';
  authService = inject(AuthService);
 

  constructor() {}

}
