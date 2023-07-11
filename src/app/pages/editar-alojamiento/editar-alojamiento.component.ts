import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccommodationsI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-editar-alojamiento',
  templateUrl: './editar-alojamiento.component.html',
  styleUrls: ['./editar-alojamiento.component.scss']
})
export class EditarAlojamientoComponent implements OnInit {
  id!:number;
  accommodation!:AccommodationsI;
  submitted: boolean = false;
  accommodationForm!: FormGroup;

  constructor(private accommodationApi: AccommodationService, private form: FormBuilder, private router: Router){
    this.accommodation = this.accommodationApi.getMyAccommodation();
    this.id = this.accommodationApi.getMyId();
  }
  ngOnInit(): void {
    this.accommodationForm = this.form.group({
      name: [this.accommodation.name, [Validators.required]],
      city:[this.accommodation.city, [Validators.required]],
      lowerPrice: [this.accommodation.lowerPrice, [Validators.required]],
      type: [this.accommodation.type, [Validators.required]],
      level: [this.accommodation.level, [Validators.required]],
      location: [this.accommodation.location, [Validators.required]],
      images: [this.accommodation.images, [Validators.required]],
      rooms: [this.accommodation.rooms, [Validators.required]]
    })

    this.accommodationForm.valueChanges.subscribe((data) => {
      this.accommodation = data;
    })
  }


  editarAlojamiento(){
    this.submitted = true;
    if(this.accommodationForm.valid){
      this.accommodationApi.putAlojamiento(this.accommodation, this._id).subscribe((data) => {
        console.log(data);
        this.accommodationForm.reset();
        this.submitted = false;
        this.router.navigate(["/"]);
      })
    }
  }
}
