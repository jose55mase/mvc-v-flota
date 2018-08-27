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
 
@Injectable()
export class MantenimientoService {
  
  private apiUrl = 'http://localhost:8080/getMantenimiento';
  private saveUrl = 'http://localhost:8080/saveMantenimiento';
  baseUrl: string = 'http://localhost:8080/getDannos';
  queryUrl: string = '?search=';
  constructor(private http: Http, public httpClient : HttpClient) {
  }
  //Lista Usuario
  findAll(): Observable<Mantenimiento[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
  // Guardar
  public guardarMantenimiento(mantenimiento : Mantenimiento):Observable<RestResponse>{
    return this.httpClient.post<RestResponse>(this.saveUrl, JSON.stringify(mantenimiento));
  }

  search(terms: Observable<Dannos>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http
        .get(this.baseUrl + this.queryUrl + term)
        .map((res:Response) => res.json());
  }

}