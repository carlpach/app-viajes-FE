import { Component } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from 'src/app/models/interfaces';
import { AlojamientoService } from 'src/app/services/alojamiento.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
  alojamiento!: Accommodation;
  id!: string;
  token:any;
  constructor(
    private service: AlojamientoService,
    private activatedRoute: ActivatedRoute,
    private AuthService:AuthService,
    private router: Router) {
      this.token=this.AuthService.getToken();
    }

  ngOnInit() : void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
    })
    this.service.getAlojamientoById(this.id).subscribe((data:any) => {
      this.alojamiento = data;
    })
  }

  deleteAlojamiento(){
    this.service.deleteAlojamiento(this.id).subscribe((data) => {
      alert('Elemento eliminado')
      this.router.navigate(['/alojamientos'])
    })
  }
  putAlojamiento(){
    this.service.setAlojamiento(this.alojamiento, this.id)
    this.router.navigate(['editAlojamiento'])
  }
}
