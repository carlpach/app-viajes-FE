import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { AccommodationsI } from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private db_url = `${environment.db_url}/accommodation`;
  public placeholderImg: string =  "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";

  accommodSearched!: AccommodationsI[];


  constructor(private http: HttpClient) { }

  public getAccommodations() {
    return this.http.get(this.db_url); 
  }   

  public getAccommodationsBySearch(city: String, checkin: String, checkout: String, adults: String) {
    return this.http.get(`${this.db_url}/search?city=${city}&checkin=${checkin}&checkout=${checkout}&adults=${adults}`);
  }   


  public setAccommodSearched(accommodSearched: any){
    this.accommodSearched = accommodSearched;
  }

  public getAccommodSearched(){
    return this.accommodSearched;
  }

}
