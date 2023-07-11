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
      features: [this.room.features, [Validators.required]],
      price: [this.room.price, [Validators.required]],
      images: [this.room.images, [Validators.required]],

    })

    this.roomForm.valueChanges.subscribe((data) => {
      this.roomEdited = data;
    })
  }


  editarRoom(){
    this.submitted = true;
    if(this.roomForm.valid){
      this.accommodationApi.putRoom(this.room).subscribe((data) => {
        console.log("returned data from put -----------", data);
        this.roomForm.reset();
        this.submitted = false;
        this.router.navigate(["/"]);
      })
    }
  }
}

