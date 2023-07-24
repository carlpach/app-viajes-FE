import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomI } from '../../models/interfaces';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent {
  id!:number;
  room!: RoomI;
  roomEdited!: RoomI;
  submitted: boolean = false;
  roomForm!: FormGroup;

  constructor(private accommodationApi: AccommodationService, private form: FormBuilder, private router: Router){
    this.room = this.accommodationApi.getRoomSelected();
  }

  ngOnInit(): void {
    this.roomForm = this.form.group({
      name: [this.room.name, [Validators.required]],
      description:[this.room.description, [Validators.required]],
      features: [this.room.features],
      price: [this.room.price, [Validators.required]],
      images: [this.room.images ],

    })

    this.roomForm.valueChanges.subscribe((data) => {
      this.roomEdited = data;
      console.log("roomEdited -----------", this.roomEdited);
    })
  }


  editarRoom(){
    this.submitted = true;
    console.log("click edit room");
    console.log(this.roomForm.valid);
    if(this.roomForm.valid){
      this.accommodationApi.putRoom(this.roomEdited).subscribe(
        (data) => {
          console.log("returned data from put -----------", data);
          this.roomForm.reset();
          this.submitted = false;
          this.router.navigate(["/"]);
        },
        (err) => { 
          this.roomForm.reset();
          this.submitted = false;
          this.router.navigate(["/alojamiento"]);
          console.log("error -------", err);
        }
      )
    }
  }

  deleteRoom() {
    const alojamiento = this.accommodationApi.getAccommodSelected();
    for (const [ix, roomId] of alojamiento.rooms.entries()) {
      if (roomId === this.room._id) {
        delete alojamiento.rooms[ix];
      }
    }
    console.log("alojamiento.rooms", alojamiento.rooms);
    this.router.navigate(["/alojamiento"]);
  }

}

