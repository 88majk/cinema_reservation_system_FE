import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieSessionComponent } from './components/movie-session/movie-session.component';
import { ReservationComponent } from './components/reservation/reservation.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/homePage',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'homePage',
    component: HomePageComponent
  },
  { 
    path: 'homePage/cinemas/:cinemaId/movieSession/:date', 
    component: MovieSessionComponent 
  },
  { 
    path: 'booking/movieSession/:sessionId', 
    component: ReservationComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
