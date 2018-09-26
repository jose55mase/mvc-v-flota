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
  private crearRol = 'http://localhost:8080/guardarRol'
  
  constructor(private http: Http, public _http: HttpClient) {
  }
  //Lista rol
  findAllRol(): Observable<Rol[]>  {
    return this.http.get(this.rolUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
  guardarRol( rol : Rol): Observable<RestResponse>{
    return this._http.post<RestResponse>("http://localhost:8080/guardarRol", JSON.stringify(rol));
  }
  // Eliminar mantenimiento
  public delete(rol : Rol){
    this.http.post("http://localhost:8080/deleteMantenimiento", JSON.stringify(rol)).subscribe();
  }

  
  // lista Permisos => guardarPermisos
  findAllPermiso(): Observable<Permisos[]>  {
    return this.http.get(this.permisoUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
  guardarPermiso( permisos : Permisos): Observable<RestResponse>{
    return this._http.post<RestResponse>("http://localhost:8080/guardarPermisos", JSON.stringify(permisos));
  }
 /*
  guardarCanductor( conductor : Conductor): Observable<RestResponse>{
    return this._http.post<RestResponse>("http://localhost:8080/saveConductor", JSON.stringify(conductor));
  }
*/
   
 
}
