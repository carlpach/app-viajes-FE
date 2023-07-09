import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent {
  mostrarFormulario: boolean = true;
  nombre = 'pepito';
  apellido = 'gomez';
  email = 'pepitogomez@example.com';
}

const routes: Routes = [
  { path: 'reservas', component: ReservasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }