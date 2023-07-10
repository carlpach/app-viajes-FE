import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  public booking: any;

  constructor(private router: Router, private bookingApi: BookingService) {}

  ngOnInit(): void {

  this.booking = this.bookingApi.getBooking()
  }
}
