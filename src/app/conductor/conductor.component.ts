import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Conductor } from '../modelo/conductor.module';
import { ConductorService } from './service';

@Component({
  selector: 'conductor-modulo',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css'],
  providers: [ConductorService]
})
export class ConductorComponent {

  fullImagePath : any;
  constructor(){ this.fullImagePath ="../../assets/images/conductor.jpg" }
  crear_conductor : boolean = false;
  editar_conductor : boolean = false;
  ver_conductor : boolean = false;
  eliminar_conductor : boolean = false;
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

}

