import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { AlojamientoComponent } from './pages/alojamiento/alojamiento.component';
import { HabitacionComponent } from './pages/habitacion/habitacion.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'alojamientos', component: AlojamientosComponent
  },
  {
    path:'alojamiento', component: AlojamientoComponent
  },
  {
    path:'habitacion', component: HabitacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
