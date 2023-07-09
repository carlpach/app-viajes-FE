import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI, RoomI, UserI, BookingI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss']
})
export class HabitacionComponent {

  public room!: RoomI;
  public bookingForm!: FormGroup;
  public user = {
    name: "Paco",
    surname: "Alonso"
  }
  public booking!: BookingI;

  constructor(private accommodationApi: AccommodationService, public AuthService: AuthService, private router: Router) {

  }

  
  ngOnInit(): void {
    // get room selected from service api
    this.room = this.accommodationApi.getRoomSelected();
    console.log("selected room is -------", this.room);
    console.log("accommod is -------", this.accommodationApi.getAccommodSelected());

    // this.user = this.AuthService.getUser();
    this.user = this.user;

    this.bookingForm = new FormGroup({
      name: new FormControl(this.user.name),
      surname: new FormControl(this.user.surname),
      peticiones: new FormControl('')

    });

    this.bookingForm.valueChanges.subscribe((data) => {
      console.log("form values changes ----------", data);
      
      this.booking = data;
    })
    
  }

  public clickAPagar() {
    // create object booking
    reserva: BookingI = 

  }

}
