import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../modelo/vehiculos.modele';
import { RestResponse } from '../modelo/restResponse.model';




const httpOptions = {
  headers : {'Content-Type':'application/json'}
};

 
@Injectable()
export class VehiculoService {
  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})
  
  constructor( private httpClient : HttpClient, private http : Http ) {  }
  private creaVehiculo = 'http://localhost:8080/saveVehiculos';
  private verVehiculo = 'http://localhost:8080/getVehiculos'

  //GUARDA UN VEHICULO NUEVO
  public crearVehiculo( vehiculo : Vehiculo ): Observable<RestResponse>{
    return this.httpClient.post<RestResponse>(this.creaVehiculo, JSON.stringify(vehiculo));
  }

  public verVehiculos():Observable<Vehiculo[]>{
    return this.http.get(this.verVehiculo)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Estammos teniendo problemas'))
  }

}