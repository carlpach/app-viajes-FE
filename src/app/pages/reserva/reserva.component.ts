import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccommodationsI, RoomI, UserI, BookingI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/app/environments/environment.local';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent {

  public user: any;
  public room!: RoomI;
  public alojamiento!: AccommodationsI;
  public submittedDetails: boolean = false;
  public submittedPayForm: boolean = false;
  public isPaid: boolean = false;
  public bookingForm!: FormGroup;
  public payForm!: FormGroup;
  public booking!: BookingI;
  public bookingResponse!: any;

  public citySearched: any;
  public startSearched: any;
  public endSearched: any;
  public peopleSearched: any;
  public nightsSearched: any;

  public showResumenHab: boolean = true;
  public showInfoIzq: boolean = true;
  public showPayment: boolean = true;


  constructor(private accommodationApi: AccommodationService, public AuthService: AuthService, private router: Router, private bookingApi: BookingService) {}

  ngOnInit(): void {

    // get data of search
    this.citySearched = sessionStorage.getItem('city');
    this.startSearched = sessionStorage.getItem('start');
    this.endSearched = sessionStorage.getItem('end');
    this.peopleSearched = sessionStorage.getItem('people');
    this.nightsSearched = sessionStorage.getItem('nights');

    // get room selected from service api
    this.room = this.accommodationApi.getRoomSelected();
    console.log("selected room is -------", this.room);
    this.alojamiento = this.accommodationApi.getAccommodSelected();

    // this.user = this.AuthService.getUser();
    this.user = this.AuthService.getUser();
    console.log(this.user);

    this.bookingForm = new FormGroup({
      name: new FormControl(this.user.name),
      lastname: new FormControl(this.user.lastname),
      peticiones: new FormControl(''),
      email: new FormControl(this.user.email),

    });

    this.bookingForm.valueChanges.subscribe((data) => {
      console.log("form values changes ----------", data);
      console.log("submittedDetails ----------", this.submittedDetails);

      this.booking = data;
    })


    this.payForm = new FormGroup({
      name: new FormControl(this.user.name),
      lastname: new FormControl(this.user.lastname),
      numeroTarjeta: new FormControl("", [Validators.required, Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')]),
      FechaCaducidad: new FormControl("", [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$')]),
      CVC: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{3,4}$')]),
    });


  }

  public clickIrAPagar() {
      console.log("click  ir a pagar");

      console.log("this.bookingForm.valid -->", this.bookingForm.valid);

      if (this.bookingForm.valid) {
        this.submittedDetails = true;
        this.booking = this.bookingForm.value;
        this.bookingApi.setBooking(this.booking); // set details of booking in service
        this.bookingForm.reset();
        console.log("bookingForm sent ----------", this.bookingForm);
        this.showResumenHab = false;
        this.showInfoIzq = false;
        this.showPayment = false;
      }
    }


  public clickPagar() {
    // get booking data from service
    this.booking = this.bookingApi.getBooking();
    console.log("payForm ----->", this.payForm.valid);
    // this.isPaid = true;
    this.submittedPayForm = true;

    this.booking.bookingCode = Math.floor(Math.random()*1000000);
    this.booking.dateEntry = this.accommodationApi.accommodDataSearch.checkin;
    this.booking.dateDeparture = this.accommodationApi.accommodDataSearch.checkout;
    this.booking.room = this.room._id;
    this.booking.nights = parseInt(sessionStorage.getItem('nights')!);
    this.booking.people = parseInt(sessionStorage.getItem('people')!);
    this.booking.image = this.alojamiento.images[0];
    this.booking.nameAlojamiento = this.alojamiento.name;
    this.booking.price = this.room.price * this.nightsSearched;
    // delete this.booking.CVC;


    if (this.payForm.valid) {
      this.isPaid = true;
      // post booking in api
      this.bookingApi.postBooking(this.booking).subscribe((data: any) => {
        console.log("booking details --------->", data);
        console.log("user id", this.user._id);
        const userId = {
          _id: this.user._id
        }
        // Put booking in user db
        this.bookingApi.putUserBooking(userId, data._id).subscribe((data) => {
          console.log("added booking to user: ---------", data);
          sessionStorage.setItem('user', JSON.stringify(data));
        });

        // send email to user
        this.sendEmail();
    });

    }
  }



  public sendEmail() {

    const emailParams: Record<string, unknown> = {
      name: this.booking.name,
      email: this.user.email,
      bookingCode: this.booking.bookingCode,
      nights: this.booking.nights,
      people: this.booking.people,
      nameAlojamiento: this.booking.nameAlojamiento,
      dateEntry: this.booking.dateEntry,
      dateDeparture: this.booking.dateDeparture,
    }

    emailjs.send(environment.email_service_id, environment.email_template_id, emailParams, environment.email_public_key, )
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

}

}
