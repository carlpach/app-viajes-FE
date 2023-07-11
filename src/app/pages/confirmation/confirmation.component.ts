import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  public booking: any;
  public user: any;
  
  constructor(private router: Router, private bookingApi: BookingService, public AuthService: AuthService) {}

  ngOnInit(): void {
  this.user = this.AuthService.getUser();
  this.booking = this.bookingApi.getBooking()
  }
}
