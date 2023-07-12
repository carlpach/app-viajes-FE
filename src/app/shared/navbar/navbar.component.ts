import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
user: any
constructor(private router:Router, public AuthService:AuthService){}

  ngOnInit(): void {
    this.user = this.AuthService.getUser()
    console.log(this.user);
  }

  logOut(){
    this.AuthService.logOut();
    this.router.navigate(['/']);
  }
}
