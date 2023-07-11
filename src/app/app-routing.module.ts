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
import { EditRoomComponent } from './pages/edit-room/edit-room.component';

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
    path:'profile', component: ProfileComponent, canActivate: [authGuard]
  },
  {
    path: 'edit-room', component: EditRoomComponent, canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
