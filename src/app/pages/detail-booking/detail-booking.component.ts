import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent {
  _id!: any;
  booking: any
  submitted: boolean = false;
  reservaForm!: FormGroup;

  constructor(private accommodation: AccommodationService, private form: FormBuilder, private router: Router){

    this.booking = this.accommodation.getMyBooking();
    this._id = this.accommodation.getMyId();
  }
  ngOnInit(): void {
    this.reservaForm = this.form.group({
      dateEntry: [this.booking.dateEntry, [Validators.required]], 
      dateDeparture:[this.booking.dateDeparture, [Validators.required]],
      people:[this.booking.people, [Validators.required]],
      nights:[this.booking.nights, [Validators.required]],

    })

    this.reservaForm.valueChanges.subscribe((data) => {
      this.booking = data;
    })
  }
  editBooking(){
    this.submitted = true;
    if(this.reservaForm.valid){
      this.accommodation.putBookings(this.booking, this._id).subscribe((data) => {
        console.log(data);
        this.reservaForm.reset();
        this.submitted = false;
        this.router.navigate(["/profile"]);
      })
    }
  }
}
