import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public db_url : string = 'http://localhost:5000/search';
  constructor(private http:HttpClient) { }

  getSearch(data:any):Observable<any>{

    return this.http.get(`${this.db_url}/${data.nombre}`)
  }
}
