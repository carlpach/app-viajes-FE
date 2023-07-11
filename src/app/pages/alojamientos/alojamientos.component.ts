import { Component, ViewChild, OnInit } from '@angular/core';
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

  public citySearched: any;
  public startSearched: any;
  public endSearched: any;
  public peopleSearched: any;
  public nightsSearched: any;
  public userRole: string | undefined;


  alojamientosList: AccommodationsI[] = [];
  token:any;
  public mapBounds = new google.maps.LatLngBounds();
  @ViewChild(GoogleMap) map!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
  };

  constructor(private accommodationApi: AccommodationService, private AuthService:AuthService, private router: Router) {}

  ngAfterViewInit(): void {

    this.citySearched = sessionStorage.getItem('city');
    this.startSearched = sessionStorage.getItem('start');
    this.endSearched = sessionStorage.getItem('end');
    this.peopleSearched = sessionStorage.getItem('people');
    this.nightsSearched = sessionStorage.getItem('nights');
    this.userRole = this.AuthService.getRole();

    this.map.googleMap!.setCenter({lat: 40.394150, lng: -3.596239}); // Center of Spain
    this.map.googleMap!.setZoom(6);

    // get alojamientos searched from service
    this.alojamientosList = this.accommodationApi.getAccommodSearched();
    console.log(this.alojamientosList);

    // zoom to existing markers
    let bounds = new google.maps.LatLngBounds();
    console.log(this.alojamientosList!);

    if (this.alojamientosList) {
      for (let alojamiento of this.alojamientosList) {
        let latLng = new google.maps.LatLng(alojamiento.location.lat, alojamiento.location.lng);
        bounds.extend(latLng);
      }
      console.log("bounds ---", bounds);

      this.map.googleMap!.fitBounds(bounds);
    }

  }

  clickAlojamientoDetalle(accommodSelected: AccommodationsI) {
    this.accommodationApi.setAccommodSelected(accommodSelected);
    this.router.navigate(["/alojamiento"]);
  }

  onClickItem (alojamiento: AccommodationsI) {
    console.log(alojamiento);

    this.map.googleMap!.setCenter(alojamiento.location);
    this.map.googleMap!.setZoom(13);

  }

}

