import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  token:any;

url?:string;
constructor(private router:Router, private AuthService:AuthService, private service:NavbarService){
  this.token=this.AuthService.getToken();
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.events.subscribe((val) => {
    // see also
    if(val instanceof NavigationEnd) {
      console.log(val.url);
      this.url = val.url;
    }
  });

}
searchResult:any;
searchForm=new FormGroup({
  "nombre":new FormControl(null)

})
submitForm(){
  console.log(this.searchForm.value)
  this.service.getSearch(this.searchForm.value).subscribe((result)=>{

    this.searchResult=result;
    console.log(this.searchResult[0])

  })
}
limpiar(){
  this.searchResult=[];
  this.searchForm.reset();
  this.router.navigate(["/"]);
}


  logOut(){
    // localStorage.clear(); //COn este borrariamos todo en localstorage
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user')
    location.reload();
    this.router.navigate(["/"]);


  }
}
