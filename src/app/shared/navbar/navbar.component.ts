import { AuthService } from './../../services/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

constructor(private router:Router, public AuthService:AuthService){}

  ngOnInit(): void {
    
  }

  logOut(){
    this.AuthService.logOut();
    this.router.navigate(['/']);
  }
}
