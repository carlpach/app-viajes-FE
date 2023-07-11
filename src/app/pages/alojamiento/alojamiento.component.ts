import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI, RoomI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent {

  public alojamiento?: AccommodationsI;
  public habitaciones?: RoomI[] = [];
  public nightsSearched: any;
  public mainImage?: string;
  public userRole: string | undefined;

  constructor(private accommodationApi: AccommodationService, public AuthService:AuthService, private router: Router) {
    // this.token=this.AuthService.getToken()
    // console.log(this.token)
    this.userRole = this.AuthService.getRole();
    console.log("user role --------", this.userRole);
    

  }


  ngOnInit(): void {

    this.alojamiento = this.accommodationApi.getAccommodSelected()
    this.nightsSearched = sessionStorage.getItem('nights');
    this.mainImage = this.alojamiento.images[0];

    for (const roomId of this.alojamiento.rooms) {
      this.accommodationApi.getRoomsByID(roomId).subscribe((data: any) => {
        console.log("get room ---", data);
        this.habitaciones!.push(data);
      });
    }

    console.log("this.habitaciones  ---", this.alojamiento );

  }

  public editRoom(room: RoomI) {
    this.accommodationApi.setRoomSelected(room);
    this.router.navigate(["/edit-room"]);
  }

  public clickBook(room: RoomI) {
    this.accommodationApi.setRoomSelected(room);
    this.router.navigate(["/reserva"]);

  }

}
