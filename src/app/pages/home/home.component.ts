import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccommodationService } from 'src/app/services/accommodation.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

const city: String = "valencia";
const checkin: Date = new Date();
const checkout: Date = new Date();
const adults: String = "valencia";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  submitted: boolean = false;
  searchForm!: FormGroup;


  constructor (private accommodationApi: AccommodationService, private router: Router) {

  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      city: new FormControl(''),
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
      personas: new FormControl()
    });
  }


  searchAccommodation() {
    this.submitted = true;
    if(this.searchForm.valid){
      this.accommodationApi.getAccommodationsBySearch(city, checkin, checkout, adults).subscribe((data) => {
        console.log(data);
        this.searchForm.reset();
        this.submitted = false;
        this.router.navigate(["/"]);
      })
    }
  }
  }

