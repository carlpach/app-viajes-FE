import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { AccommodationsI, RoomI, BookingI } from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private db_url = `${environment.db_url}/accommodation`;
  public placeholderImg: string =  "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";

  accommodSearched!: AccommodationsI[];
  accommodSelected!: AccommodationsI;
  roomSelected!: RoomI;

  constructor(private http: HttpClient) { }

  public getAccommodations() {
    return this.http.get(this.db_url); 
  }   

  public getAccommodationsBySearch(city: String, checkin: String, checkout: String, adults: String) {
    return this.http.get(`${this.db_url}/search?city=${city}&checkin=${checkin}&checkout=${checkout}&adults=${adults}`);
  }   


  // set accommodation list searched by city by user
  public setAccommodSearched(accommodSearched: any){
    this.accommodSearched = accommodSearched;
  }

  public getAccommodSearched(){
    return this.accommodSearched;
  }


  // set accommodation selected by user
  public setAccommodSelected(accommodSelected: AccommodationsI){
    this.accommodSelected = accommodSelected;
  }  

  public getAccommodSelected(){
    return this.accommodSelected;
  }

  public getRoomsByID(id: number){
    return this.http.get(`${environment.db_url}/rooms/${id}`);
  }

    // set room selected by user
    public setRoomSelected(room: any){
      this.roomSelected = room;
    }

    // get room selected by user
    public getRoomSelected(){
      return this.roomSelected;
    }


    postBooking(booking: BookingI) {
      return this.http.post(environment.base_url, booking);
    }
  

}
