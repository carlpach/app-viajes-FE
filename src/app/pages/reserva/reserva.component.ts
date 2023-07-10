import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccommodationsI, RoomI, UserI, BookingI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent {

  public user: any;
  public submittedDetails: boolean = false;
  public isPaid: boolean = false;
  public room!: RoomI;
  public bookingForm!: FormGroup;
  public payForm!: FormGroup;
  public booking!: BookingI;
  public bookingResponse!: any;

  constructor(private accommodationApi: AccommodationService, public AuthService: AuthService, private router: Router, private bookingApi: BookingService) {}

  ngOnInit(): void {
    // get room selected from service api
    this.room = this.accommodationApi.getRoomSelected();
    console.log("selected room is -------", this.room);
    console.log("accommod is -------", this.accommodationApi.getAccommodSelected());

    // this.user = this.AuthService.getUser();
    this.user = JSON.parse(String(this.AuthService.getUser()));
    console.log(this.user);
    

    this.bookingForm = new FormGroup({
      name: new FormControl(this.user.name),
      lastname: new FormControl(this.user.lastname),
      peticiones: new FormControl('')

    });

    this.bookingForm.valueChanges.subscribe((data) => {
      console.log("form values changes ----------", data);
      console.log("submittedDetails ----------", this.submittedDetails);
      
      this.booking = data;
    })


    this.payForm = new FormGroup({
      name: new FormControl(this.user.name),
      lastname: new FormControl(this.user.lastname),
      numeroTarjeta: new FormControl(),
      FechaCaducidad: new FormControl(),
      CVC: new FormControl()

    });

    
  }

  public clickIrAPagar() {
      console.log("click  ir a pagar");

      this.submittedDetails = true;
      console.log("this.bookingForm.valid -->", this.bookingForm.valid);
      
      if (this.bookingForm.valid) {
        this.bookingApi.setBooking(this.booking); // set details of booking in service
        this.bookingForm.reset();
        }
    }
     

  public clickPagar() {
    // get booking data from service
    this.booking = this.bookingApi.getBooking();
    console.log("this.booking ----->", this.booking);
    this.isPaid = true;

    this.booking.bookingCode = Math.floor(Math.random()*1000000);
    this.booking.dateEntry = this.accommodationApi.accommodDataSearch.checkin;
    this.booking.dateDeparture = this.accommodationApi.accommodDataSearch.checkout;
    this.booking.room = this.room._id;
    // delete this.booking.CVC;


    if (this.bookingForm.valid && this.isPaid) {

      // post booking in api
      this.bookingApi.postBooking(this.booking).subscribe((data: any) => {
        console.log(data);
        console.log("user id", this.user._id);
        const userId = {
          _id: this.user._id
        }
        // Put booking in user db
        this.bookingApi.putUserBooking(userId, data._id).subscribe((data) => {
          console.log("added booking to user ---------", data);   
        });
    });

    }
  }

}
