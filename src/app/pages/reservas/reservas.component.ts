import { Component } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent {

}
export class ReservaComponent {
  mostrarFormulario: boolean = true;
  nombre = 'pepito';
  apellido = 'gomez';
  email = 'pepitogomez@example.com';
}