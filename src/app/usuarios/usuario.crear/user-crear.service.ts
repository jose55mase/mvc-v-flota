import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from "../modeloUsuarios";
import { RestResponse } from '../../modelo/restResponse.model';

const httpOptions = {
  headers : {'Content-Type':'application/json'}
};

 
@Injectable()
export class UserService {
  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})
  
  constructor(private http: HttpClient) { }
  private saveUrl = 'http://localhost:8080/saveOrUpdate';
  private getUrl = 'http://localhost:8080/getUsers';

   
  public saveOrUpdate(user: User): Observable<RestResponse> {
  return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdate", JSON.stringify(user));
  }
  public getUser() : Observable<User[]>{
    return this.http.get(this.getUrl).map((res:Response)=>res.json()).catch((error:any) => Observable.throw(error.json().error || 'Hay problemas' ));
  }

}