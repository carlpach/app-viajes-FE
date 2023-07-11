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
  alojamientoForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accommodationService: AccommodationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const alojamientoSelected = this.accommodationService.getAccommodSelected();
    if (!alojamientoSelected) {
      // Manejar el caso en que no haya alojamiento seleccionado
      return;
    }

    this.alojamientoForm = this.formBuilder.group({
      name: [alojamientoSelected.name, Validators.required],
      city: [alojamientoSelected.city, Validators.required],
      lowerPrice: [alojamientoSelected.lowerPrice, Validators.required],
      type: [alojamientoSelected.type, Validators.required],
      level: [alojamientoSelected.level, Validators.required],
      location: [alojamientoSelected.location, Validators.required],
      images: [alojamientoSelected.images, Validators.required],
      rooms: [alojamientoSelected.rooms, Validators.required]
    });
  }

  get formControls() {
    return this.alojamientoForm.controls;
  }

  editarAlojamiento() {
    this.submitted = true;
    if (this.alojamientoForm.invalid) {
      return;
    }

    const alojamientoSelected = this.accommodationService.getAccommodSelected();
    if (!alojamientoSelected) {
      // Manejar el caso en que no haya alojamiento seleccionado
      return;
    }

    const editedAlojamiento: AccommodationsI = {
      ...alojamientoSelected,
      ...this.alojamientoForm.value
    };

    this.accommodationService
      .putAccommodation(editedAlojamiento, alojamientoSelected._id)
      .subscribe(
        () => {
          this.alojamientoForm.reset();
          this.submitted = false;
          this.router.navigate(['/']);
        },
        (error) => {
          // Manejar el error en caso de fallo en la actualización del alojamiento
        }
      );
  }
}
