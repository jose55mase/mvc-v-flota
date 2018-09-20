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
export class UserServiceE {
  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})
  
  constructor(private http: HttpClient) { } 
  private urlUsuario = 'http://localhost:8080/saveOrUpdate';

   
public saveOrUpdate(user: User): Observable<RestResponse> {
return this.http.post<RestResponse>("http://localhost:8080/saveOrUpdate", JSON.stringify(user));
}
/*
public  saveUser(user : User){
    return this.http.post("http://localhost:8080/create",JSON.stringify(user)
    // ,this.options).map((response:Response)=>response.json())
        
  }*/

  
         
  /*      
  public saveOrUpdate(user : User) {
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.urlUsuario,user,{headers: headers});
  }
*/
}