import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieSessionComponent } from './components/movie-session/movie-session.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MoviesComponent } from './components/admin-components/movies/movies.component';
import { CinemasComponent } from './components/admin-components/cinemas/cinemas.component';
import { AccessComponent } from './components/admin-components/access/access.component';


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
  },
  {
    path: 'user/profile',
    component: UserProfileComponent
  },
  {
    path: 'user/orders',
    component: UserOrdersComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'cinemas',
        component: CinemasComponent
      },
      {
        path: 'access',
        component: AccessComponent
      }
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
