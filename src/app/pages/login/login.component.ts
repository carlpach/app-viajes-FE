import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserI } from '../../models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error:any;
  loginForm!: FormGroup;
  submitted: boolean = false;
  constructor(private form: FormBuilder, private authApi: AuthService, private router: Router){}
  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')]]
    })
    // if(this.authApi.getToken()){
    //   this.router.navigate(['/']);
    // }

  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.submitted= true;
    if(this.loginForm.valid){
      let user: UserI = this.loginForm.value;

        this.authApi.login(user).subscribe((data: any) => {
          console.log(data);
          // localStorage.setItem('token', data.token);
          // localStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/']);

        },(error)=>{this.error=error})
      }
    }
}
