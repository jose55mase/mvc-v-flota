import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dannos } from '../modelo/dannos.modelo';
import { RestResponse } from '../modelo/restResponse.model';


const httpOptions = {
  headers : {'Content-Type':'application/json'}
};

 
@Injectable()
export class DannosService {
  private headers = new Headers({'Content_Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})
  
  constructor(private httpClient: HttpClient, private http :Http) { }
  
  private apiUrl = 'http://localhost:8080/getDannos';
  private cUrl = 'http://localhost:8080/saveDannosDannos';  
  
  //Lista Daños creados
  findAll(): Observable<Dannos[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Tenemos un error en server'));
  }
  //Guardar
  public guardarDanno(dannos : Dannos):Observable<RestResponse>{
    return this.httpClient.post<RestResponse>(this.cUrl, JSON.stringify(dannos));
  }

  //Eliminar
  public delete(dannos : Dannos) : void{
    this.http.post("http://localhost:8080/deleteDannos", JSON.stringify(dannos)).subscribe();
  }
}