import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { RestResponse } from '../modelo/restResponse.model';
import { User } from '../modelo/usuario.modulo';
 
@Injectable()
export class InicioService {
  
  private apiUrl = 'http://localhost:8080/getUsersTrue';
  
  constructor(private http: Http, private _http: HttpClient) {
  }
  //Lista Usuario
  findAll(): Observable<User[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
}