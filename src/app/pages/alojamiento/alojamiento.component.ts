import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AlojamientoService } from 'src/app/services/alojamiento.service';
import { Accommodation } from '../models/interfaces';

@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent {
  alojamientosList: Accommodation[] = [];
  token:any;
  constructor(private service: AlojamientoService, public AuthService:AuthService) {
    this.token=this.AuthService.getToken()
    console.log(this.token)
  }

  ngOnInit(): void {
    this.service.getAlojamientos().subscribe((data: any) => {
      this.alojamientosList = [...data];
    })
  }
}
