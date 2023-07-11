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
  alojamiento!:AccommodationsI;
  submitted: boolean = false;
  alojamientoForm!: FormGroup;

  constructor(private accommodationApi: AccommodationService, private form: FormBuilder, private router: Router){
    this.alojamiento = this.accommodationApi.getMyAccommodation();
    this.id = this.accommodationApi.getMyId();
  }
  ngOnInit(): void {
    this.alojamientoForm = this.form.group({
      name: [this.alojamiento.name, [Validators.required]],
      city:[this.alojamiento.city, [Validators.required]],
      lowerPrice: [this.alojamiento.lowerPrice, [Validators.required]],
      type: [this.alojamiento.type, [Validators.required]],
      level: [this.alojamiento.level, [Validators.required]],
      location: [this.alojamiento.location, [Validators.required]],
      images: [this.alojamiento.images, [Validators.required]],
      rooms: [this.alojamiento.rooms, [Validators.required]]
    })

    this.alojamientoForm.valueChanges.subscribe((data) => {
      this.alojamiento = data;
    })
  }


  editarAlojamiento() {
    this.submitted = true;
    if (this.alojamientoForm.invalid) {
      return;
    }
}
