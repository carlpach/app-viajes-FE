import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.local';
import { AccommodationsI, BookingI, RoomI } from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private db_url = `${environment.db_url}/accommodation`;
  public placeholderImg: string =  "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";
  _id: any
  booking!: BookingI;
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

  
  public putRoom(updatedRoom: RoomI) {
    console.log("roomSelected --------->", this.roomSelected);
    console.log("room id --------->", this.roomSelected._id);
    
    return this.http.put(`${environment.db_url}/rooms/${this.roomSelected._id}`, updatedRoom);
  }

  public deleteRoom(rommId: string) {
    return this.http.delete(`${environment.db_url}/rooms/${rommId}`);
  }

  // set room selected by user
  public setRoomSelected(room: any){
    this.roomSelected = room;
  }

  // get room selected by user
  public getRoomSelected(){
    return this.roomSelected;
  }

    public getBookingsByID(_id: String){
      return this.http.get(`${environment.db_url}/bookings/id/${_id}`);
    }
    public putBookings(booking: BookingI, _id: String){
      return this.http.put(`${environment.db_url}/bookings/${_id}`, booking);
    }

    setBookings(booking: BookingI, _id: String){
      this.booking = booking;
      this._id = _id;
    }
    
    deleteBooking(_id: String){
      return this.http.delete(`${environment.db_url}/bookings/${_id}`);
    }

    getMyBooking(){
      return this.booking;
    }
    getMyId(){
      return this._id;
    }
}
