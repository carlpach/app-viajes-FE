import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReservasComponent } from '../reservas/reservas.component';
@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent {

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
@NgModule({
    imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [ReservasComponent]
})
export class AppModule { }