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

  public citySearched: any;
  public startSearched: any;
  public endSearched: any;
  public peopleSearched: any;
  public nightsSearched: any;

  alojamientosList: AccommodationsI[] = [];
  filteredalojamientosList?: AccommodationsI[];

  token:any;
  public mapBounds = new google.maps.LatLngBounds();
  @ViewChild(GoogleMap) map!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
  };

  constructor(private accommodationApi: AccommodationService, public AuthService:AuthService, private router: Router) {}

  valueDown = 0;
  valueUp = 0;
  priceDown: any;
  priceUp: any;

  ngAfterViewInit(): void {

    this.citySearched = sessionStorage.getItem('city');
    this.startSearched = sessionStorage.getItem('start');
    this.endSearched = sessionStorage.getItem('end');
    this.peopleSearched = sessionStorage.getItem('people');
    this.nightsSearched = sessionStorage.getItem('nights');

    this.map.googleMap!.setCenter({lat: 40.394150, lng: -3.596239}); // Center of Spain
    this.map.googleMap!.setZoom(6);

    // get alojamientos searched from service
    this.alojamientosList = this.accommodationApi.getAccommodSearched();
    console.log("alojamientoList", this.alojamientosList);
    console.log("alojamientoList length", this.alojamientosList.length == 0);
    console.log("valueUp", this.valueUp);
    console.log("valueUp", this.valueDown);

    // zoom to existing markers
    let bounds = new google.maps.LatLngBounds();
    console.log(this.alojamientosList!);

    if (this.alojamientosList.length > 0) {  
      for (let alojamiento of this.alojamientosList) {
        let latLng = new google.maps.LatLng(alojamiento.location.lat, alojamiento.location.lng);
        bounds.extend(latLng);  
      }
      console.log("bounds ---", bounds);

      this.map.googleMap!.fitBounds(bounds);  
    }
    console.log("filteredalojamientosList length 1---------", this.filteredalojamientosList?.length);

    
  }

  changeDown(event: any) {
    console.log("event down ----------", event);
    this.priceDown = event;
  }
  changeUp(event: any) {
    console.log("event up ----------", event);
    this.priceUp = event;
  }

  clickFilter() {
    // Filter hotels in the hotel list
    this.filteredalojamientosList = this.alojamientosList.filter((item) => {
      return item.lowerPrice >= this.valueDown && item.lowerPrice <= this.valueUp;
    })
    console.log("filteredalojamientosList ---------", this.filteredalojamientosList);
    console.log("filteredalojamientosList length---------", this.filteredalojamientosList.length);
    
  }

  generateStarsArray(level: number): number[] {
    return Array(level).fill(0).map((_, i) => i + 1);
  }

  generateNoStarsArray(level: number): number[] {
    const levelReturn = Math.abs(level - 5)
    return Array(levelReturn).fill(0).map((_, i) => i + 1);
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
