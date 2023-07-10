import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = { 
  name: "",
  email: "",
  img: ""
}
  constructor(private authApi: AuthService, private router: Router){

    this.user = this.authApi.getRole()
  }
}
