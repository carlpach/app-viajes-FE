import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accommodation } from 'src/app/models/interfaces';
import { AljamientoService } from 'src/app/services/alojamiento.service';

@Component({
  selector: 'app-forms-a',
  templateUrl: './forms-a.component.html',
  styleUrls: ['./forms-a.component.scss']
})
export class FormsAComponent {

  alojamientoForm! : FormGroup
  _id!: string
  alojamiento!: Accommodation
  submitted: boolean = false

  constructor(private service: AlojamientoService, private form: FormBuilder, private router: Router){
    this.alojamiento = this.service.getOneAlojamiento()
    this._id = String(this.service.getId())
  }
  ngOnInit(): void {
console.log(this._id, this.alojamiento)
    this.alojamientoForm = this.form.group({
      Nombre:[this.alojamiento?.Nombre, [Validators.required]],
      Ubicacion:[this.alojamiento?.Ubicacion, [Validators.required]],
      Precio:[this.alojamiento?.Precio, [Validators.required]],
      Descripcion:[this.alojamiento?.Descripcion, [Validators.required]],
      Caratula:[this.alojamiento?.Caratula],
      Imagen:[this.alojamiento?.Imagen, [Validators.required]],
      Actividades: this.form.group({
        Itinerario: this.form.group({
          Dia1:[this.alojamiento?.Actividades.Itinerario.Dia1],
          Dia2:[this.alojamiento?.Actividades.Itinerario.Dia2]
        })
      })
    })

    this.alojamientoForm.valueChanges.subscribe((data) => {
      this.alojamiento = data
    })
  }
  editalojamiento(){
    console.log(this._id)
    this.submitted = true
    if(this.alojamientoForm.valid){
      console.log("entro aqui8")
      if (this._id!== ""){
        this.service.editalojamiento(this.alojamiento, this._id).subscribe((data) => {
          this.alojamientoForm.reset()
          this.submitted = false
          this.router.navigate(["/alojamientos"]) })
      }
      else {
        console.log(this.alojamiento)
        this.service.postalojamiento(this.alojamiento).subscribe((data) => {
          this.alojamientoForm.reset()
          this.submitted = false
          this.router.navigate(["/alojamientos"])
        })
      }
    }
  }
}
