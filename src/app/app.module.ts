import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { environment } from '../app/environments/environment.local';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlojamientoComponent } from './pages/alojamiento/alojamiento.component';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ProfileComponent } from './pages/profile/profile.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    AlojamientosComponent,
    AlojamientoComponent,

    ProfileComponent,
    ReservaComponent,
    ConfirmationComponent,
    EditRoomComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule

  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
