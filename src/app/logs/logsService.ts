import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { RestResponse } from '../modelo/restResponse.model';
import { User } from '../modelo/usuario.modulo';
import { Logs } from '../modelo/logs';
 
@Injectable()
export class LogsService {
  
  private crearLog = 'http://localhost:8080/saveLogs';
  public tomarListaLogs = 'http://localhost:8080/saveLogs';
  
  constructor(private http: Http, private _http: HttpClient) {
  }
  //Lista Logs
  
  public findAll():Observable<Logs[]>{
    return this.http.get('http://localhost:8080/getLogs')
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Estammos teniendo problemas'))
  }

  public crearlog( logs : Logs ): Observable<RestResponse>{
    return this._http.post<RestResponse>(this.crearLog, JSON.stringify(logs));
  }
}