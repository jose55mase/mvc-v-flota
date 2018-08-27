import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoundEventAst } from '@angular/compiler';

@Component({
  selector: 'vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {

  fullImagePath: any;
  constructor(){ this.fullImagePath ="../../assets/images/vehiculos.jpg" }

  crear_conductor: boolean = false;
  editar_conductor: boolean = false;
  ver_conductor: boolean = false;
  eliminar_conductor: boolean = false;
  editar_item: boolean = false;

  crear(){
    this.crear_conductor = true;
    this.editar_conductor = false;
    this.ver_conductor = false;
    this.eliminar_conductor = false;
  }
  
  editar(){
    this.crear_conductor = false;
    this.editar_conductor = true;
    this.ver_conductor = false;
    this.eliminar_conductor = false;
  }
  ver(){
    this.crear_conductor = false;
    this.editar_conductor = false;
    this.ver_conductor = true;
    this.eliminar_conductor = false;
  }
  eliminar(){
    this.crear_conductor = false;
    this.editar_conductor = false;
    this.ver_conductor = false;
    this.eliminar_conductor = true;
  }
 
  
 
  editarUsuario(conductor){
   
    this.crear_conductor = true;
    this.editar_conductor = false;
    this.editar_item = true;
  }
}
