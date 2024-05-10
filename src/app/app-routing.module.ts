import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieSessionComponent } from './components/movie-session/movie-session.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';


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
    path: 'user/profile',
    component: UserProfileComponent
  },
  {
    path: 'user/orders',
    component: UserOrdersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
