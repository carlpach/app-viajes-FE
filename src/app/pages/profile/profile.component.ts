import { BookingI } from './../../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
booking!: BookingI
_id: any
user: any
books: any [] = []
  constructor(private authApi: AuthService, private accommodationApi: AccommodationService, private router: Router){}

  ngOnInit(): void {
    this.user = this.authApi.getUser()
    console.log(this.user);

    for (const bookId of this.user.bookings) {
      this.accommodationApi.getBookingsByID(bookId).subscribe((data: any) => {
        console.log("get booking ---", data);
        this.books = [...this.books,data];
      })}
  }
  
  deleteBooking(){
    this.accommodationApi.deleteBooking(this._id).subscribe((data) => {
      console.log("Reserva cancelada");
      this.router.navigate(["/profile"]);
    })
  }

  

}
