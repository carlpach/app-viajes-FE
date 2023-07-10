import { Component, ViewChild } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AccommodationsI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.scss']
})
export class AlojamientosComponent {

  alojamientosList: AccommodationsI[] = [];
  token:any;
  public mapBounds = new google.maps.LatLngBounds();
  public map!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
  };

  constructor(private accommodationApi: AccommodationService, public AuthService:AuthService, private router: Router) {}


  ngOnInit(): void {

    this.map.googleMap!.setZoom(13);

    // // get alojamientos searched from service
    // this.alojamientosList = this.accommodationApi.getAccommodSearched();
    // console.log(this.alojamientosList);

    // // zoom to existing markers
    // let bounds = new google.maps.LatLngBounds();
    // console.log(this.alojamientosList!);

    // for (let alojamiento of this.alojamientosList) {
    //   let latLng = new google.maps.LatLng(alojamiento.location.lat, alojamiento.location.lng);
    //   bounds.extend(latLng);  
    // }
    // console.log("bounds ---", bounds);
    // this.map.googleMap!.setZoom(13);

    // this.map.googleMap!.fitBounds(bounds);  
    
  }

  clickAlojamientoDetalle(accommodSelected: AccommodationsI) {
    this.accommodationApi.setAccommodSelected(accommodSelected);
    this.router.navigate(["/alojamiento"]);
  }
}

