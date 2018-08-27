import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InicioService } from './inicioService';
import { User } from '../modelo/usuario.modulo';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'inicio-app',
  templateUrl: './inicio-app.component.html',
  styleUrls: ['./inicio-app.component.css'],
  providers :[ InicioService, NgbCarouselConfig]
})

export class InicioAppComponent implements OnInit {
  logCargo  : string = "";
  lognombre : string = ""; 
  logApellido : string = "";
  logUsuario : string = "";
  arrayUsuairio : User[];
  
  inicioImagen: any;

  ngOnInit(){ 
   
  }
  constructor( private router :  Router, private inicioService : InicioService,  private _http: HttpClient ) { 
    this.inicioImagen = "../../assets/images/vehiculos.jpg";

  }





  
  
  public listaUsuarios(){
    this.inicioService.findAll().subscribe(
      dato => { this.arrayUsuairio = dato 
        for(var elemento in this.arrayUsuairio){
          if(this.arrayUsuairio[elemento].correo === localStorage.getItem('correoLogUser')){
            this.logCargo = this.arrayUsuairio[elemento].cargo;
            this.lognombre = this.arrayUsuairio[elemento].nombre;
            this.logApellido = this.arrayUsuairio[elemento].apellido;
            this.logUsuario = this.arrayUsuairio[elemento].usuario;            
          }
        }
      }
    )
  }

  

  public cerrarSesion(){
    localStorage.removeItem('correoLogUser');
    this.router.navigate(['/entrar-router'])
  }   
}