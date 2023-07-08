import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  public placeholderImg: string =  "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";


  constructor(private http: HttpClient) { }

  public getAccommodations() {
    return this.http.get(environment.db_url); 
  }   

  public getAccommodationsBySearch(city: String, checkin: Date, checkout: Date, adults: String) {
    return this.http.get(`${environment.db_url}/?city=${city}&checkin=${checkin}&checkout=${checkout}&adults=${adults}`);
  }   



}
