import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, throwError } from 'rxjs';

import { environment } from 'src/app/environments/environment.local';
import { UserI } from 'src/app/models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(user: UserI){
    return this.http.post(`${environment.db_url}/users/register`, user)
  }

  login(user: UserI){
    return this.http.post(`${environment.db_url}/users/login`, user)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  getRole(){
    let user = JSON.parse(String(localStorage.getItem('user')));

    return user?.role;
  }

  logOut(){
    // localStorage.clear(); //COn este borrariamos todo en localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  checkSession(){
    return this.http.get(`${environment.db_url}/users/checksession`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return throwError(error.error.message)
  }
}
