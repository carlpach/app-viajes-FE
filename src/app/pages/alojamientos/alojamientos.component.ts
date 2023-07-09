import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.scss']
})
export class AlojamientosComponent {

  alojamientosList: AccommodationsI[] = [];
  token:any;

  constructor(private accommodationApi: AccommodationService, public AuthService:AuthService) {
    // this.token=this.AuthService.getToken()
    // console.log(this.token)


  }


  ngOnInit(): void {
    // this.service.getAlojamientos().subscribe((data: any) => {
    //   this.alojamientosList = [...data];
    // })

    // get alojamientos searched from service
    this.alojamientosList = this.accommodationApi.getAccommodSearched();
    console.log(this.alojamientosList);
    
  }
}

