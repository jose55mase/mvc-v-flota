import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Observable } from "rxjs/Observable";


import { RestResponse } from '../modelo/restResponse.model';
import { Mantenimiento } from '../modelo/mantenimiento.modelo';
import { HttpClient } from '@angular/common/http';
import { Dannos } from '../modelo/dannos.modelo';
import { Vehiculo } from '../modelo/vehiculos.modele';
 
@Injectable()
export class TablaService {

  constructor(private http: Http, public httpClient : HttpClient) {  }

  
  // VEHICULOS
  public verVehiculos():Observable<Vehiculo[]>{
    return this.http.get("http://localhost:8080/getVehiculos")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Estammos teniendo problemas'))
  }
  public crearVehiculo( vehiculo : Vehiculo ): Observable<RestResponse>{
    return this.httpClient.post<RestResponse>('http://localhost:8080/saveVehiculos', JSON.stringify(vehiculo));
  }
 

}