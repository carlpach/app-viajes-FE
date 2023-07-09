import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { date_TO_String } from 'src/utils/utils';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

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
      people: new FormControl()
    });
  }


  searchAccommodation() {
    this.submitted = true;
    console.log(this.searchForm.value.city);
    const city = this.searchForm.value.city;
    const people = this.searchForm.value.people;
    const start = date_TO_String(this.searchForm.value.start);
    const end = date_TO_String(this.searchForm.value.end);

    
    console.log(start);
    
    if(this.searchForm.valid){
      this.accommodationApi.getAccommodationsBySearch(city, start, end, people).subscribe((data) => {
        console.log(data);
        this.accommodationApi.setAccommodSearched(data);
        this.searchForm.reset();
        this.submitted = false;
        this.router.navigate(["/alojamientos"]);
      })
    }
  }
  }

