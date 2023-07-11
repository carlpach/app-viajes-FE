import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { AccommodationsI, RoomI } from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private db_url = `${environment.db_url}/accommodation`;
  public placeholderImg: string =  "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";


  accommodDataSearch: any;
  accommodSearched!: AccommodationsI[];
  accommodSelected!: AccommodationsI;
  roomSelected!: RoomI;

  constructor(private http: HttpClient) { }

  public getAccommodations() {
    return this.http.get(this.db_url); 
  }   

  public getAccommodationsBySearch(city: String, checkin: String, checkout: String, people: String) {
    this.accommodDataSearch = { 
      checkin: checkin, 
      checkout: checkout, 
      people: people
    };
    return this.http.get(`${this.db_url}/search?city=${city}&checkin=${checkin}&checkout=${checkout}&people=${people}`);
  }


  // set accommodation list searched by city by user
  public setAccommodSearched(accommodSearched: any){
    this.accommodSearched = accommodSearched;
    // sessionStorage.setItem('AccommodSearched', accommodSearched);

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

  public getRoomsByID(id: string){
    return this.http.get(`${environment.db_url}/rooms/${id}`);
  }

  
  putRoom(updatedRoom: RoomI) {
    console.log("roomSelected --------->", this.roomSelected);
    
    return this.http.put(`${environment.db_url}/${this.roomSelected._id}`, updatedRoom);
  }

  // set room selected by user
  public setRoomSelected(room: any){
    this.roomSelected = room;
  }

  // get room selected by user
  public getRoomSelected(){
    return this.roomSelected;
  }

    public getBookingsByID(id: string){
      return this.http.get(`${environment.db_url}/bookings/id/${id}`);
    }

}
