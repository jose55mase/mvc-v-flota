import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RestResponse } from '../modelo/restResponse.model';
import { Rol } from '../modelo/rol.module';
import { Permisos } from '../modelo/permisos.module';


const httpOptions = {
  headers : {'Content-Type':'application/json'}
};
@Injectable()
export class RolUsuarioService {
  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})
  
  
  private rolUrl = 'http://localhost:8080/getRoles';
  private permisoUrl = 'http://localhost:8080/getPermisos';
  
  constructor(private http: Http, public _http: HttpClient) {
  }
  //Lista rol
  findAllRol(): Observable<Rol[]>  {
    return this.http.get(this.rolUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }

  // lista Permisos => getPermisos
  findAllPermiso(): Observable<Permisos[]>  {
    return this.http.get(this.permisoUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
 /*
  guardarCanductor( conductor : Conductor): Observable<RestResponse>{
    return this._http.post<RestResponse>("http://localhost:8080/saveConductor", JSON.stringify(conductor));
  }
*/
   
 
}
