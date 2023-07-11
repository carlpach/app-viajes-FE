import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { AlojamientoComponent } from './pages/alojamiento/alojamiento.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { EditBookingComponent } from './pages/edit-booking/edit-booking.component';
import { DetailBookingComponent } from './pages/detail-booking/detail-booking.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent, canActivate: [authGuard]
  },
  {
    path: 'alojamientos', component: AlojamientosComponent, canActivate: [authGuard]
  },
  {
    path:'alojamiento', component: AlojamientoComponent, canActivate: [authGuard]
  },
  {
    path:'reserva', component: ReservaComponent, canActivate: [authGuard]
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'detailBooking', component: DetailBookingComponent
  },
  {
    path:'profile', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path:':_id', component: EditBookingComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
