import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI } from '../../models/interfaces';

@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent {
  alojamientosList: AccommodationsI[] = [];
  token:any;
  constructor(public AuthService:AuthService) {
    this.token=this.AuthService.getToken()
    console.log(this.token)
  }

  ngOnInit(): void {
    // this.service.getAlojamientos().subscribe((data: any) => {
    //   this.alojamientosList = [...data];
    // })
  }
}
