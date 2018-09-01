import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Conductor } from '../modelo/conductor.module';
import { RestResponse } from '../modelo/restResponse.model';


const httpOptions = {
  headers : {'Content-Type':'application/json'}
};
@Injectable()
export class ConductorService {
  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})
  
  
  private apiUrl = 'http://localhost:8080/getConductorTrue';
  private apiUrlAll = 'http://localhost:8080/getConductores';
  
  constructor(private http: Http, public _http: HttpClient) {
  }
  //Lista Usuario
  findAll(): Observable<Conductor[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }

  findAllAdmin(): Observable<Conductor[]>  {
    return this.http.get(this.apiUrlAll)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
 
  guardarCanductor( conductor : Conductor): Observable<RestResponse>{
    return this._http.post<RestResponse>("http://localhost:8080/saveConductor", JSON.stringify(conductor));
  }

   
 
}
