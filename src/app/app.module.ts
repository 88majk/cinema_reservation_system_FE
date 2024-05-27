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
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MovieSessionComponent } from './components/movie-session/movie-session.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { DataViewModule } from 'primeng/dataview';
import { ImageModule } from 'primeng/image';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MoviesComponent } from './components/admin-components/movies/movies.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [AppComponent, RegisterPageComponent, LoginPageComponent, HomePageComponent, MovieSessionComponent, UserOrdersComponent, UserProfileComponent, ReservationComponent, AdminPageComponent, MoviesComponent],
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
    OverlayPanelModule,
    FieldsetModule,
    AccordionModule,
    SidebarModule,
    TabViewModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
    TagModule,
    PanelModule,
    DataViewModule,
    ImageModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule
  ],
  providers: [provideHttpClient(), provideAnimations(), ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
