import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { date_TO_String } from 'src/utils/utils';
import { AuthService } from 'src/app/services/auth.service';


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
  public user: any;


  constructor (private accommodationApi: AccommodationService, private router: Router, public AuthService: AuthService) {

  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
      people: new FormControl(null, [Validators.required])
    });

    sessionStorage.removeItem('city');
    sessionStorage.removeItem('start');
    sessionStorage.removeItem('end');
    sessionStorage.removeItem('people');
    sessionStorage.removeItem('nights');

    this.user = this.AuthService.getUser();

  }


  searchAccommodation() {
    this.submitted = true;

    const city = this.searchForm.value.city;

    const start = date_TO_String(this.searchForm.value.start);
    const end = date_TO_String(this.searchForm.value.end);    
    const people = this.searchForm.value.people;

    const dateStart = this.searchForm.value.start.getTime();
    const dateEnd = this.searchForm.value.end.getTime();
    const diffDays = (dateEnd - dateStart) / (1000 * 3600 * 24);


    console.log("start checkin-----", start);

    sessionStorage.setItem('city', city);
    sessionStorage.setItem('start', start);
    sessionStorage.setItem('end', end);
    sessionStorage.setItem('people', people);
    sessionStorage.setItem('nights', diffDays.toString());

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

