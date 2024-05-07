import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MovieSessionComponent } from './components/movie-session/movie-session.component';


@NgModule({
  declarations: [AppComponent, RegisterPageComponent, LoginPageComponent, HomePageComponent, MovieSessionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    TreeSelectModule,
  ],
  providers: [provideHttpClient(), provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
