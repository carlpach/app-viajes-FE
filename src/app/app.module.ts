import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlojamientoComponent } from './pages/alojamiento/alojamiento.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { InterfacesComponent } from './pages/models/interfaces/interfaces.component';

@NgModule({
  declarations: [
    AppComponent,
    AlojamientoComponent,
    LoginComponent,
    RegisterComponent,
    ExperienciasComponent,
    NavbarComponent,
    InterfacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
