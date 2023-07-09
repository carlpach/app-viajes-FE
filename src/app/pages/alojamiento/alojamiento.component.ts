import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI, RoomI } from '../../models/interfaces';
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

  public alojamiento?: AccommodationsI;
  public habitaciones?: RoomI[] = [];

  constructor(private accommodationApi: AccommodationService, public AuthService:AuthService) {
    // this.token=this.AuthService.getToken()
    // console.log(this.token)

  }


  ngOnInit(): void {

    this.alojamiento = this.accommodationApi.getAccommodSelected()

    for (const roomId of this.alojamiento.rooms) {
      this.accommodationApi.getRoomsByID(roomId).subscribe((data: any) => {
        console.log("get room ---", data);
        this.habitaciones!.push(data);
      });
    }

    console.log("this.habitaciones  ---", this.alojamiento );

 
}
@NgModule({
    imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [ReservasComponent]
})
export class AppModule { }