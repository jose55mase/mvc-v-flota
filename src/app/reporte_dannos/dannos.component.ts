import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Conductor } from '../modelo/conductor.module';
import { DannosService } from './dannosService';
import { Dannos } from '../modelo/dannos.modelo';

@Component({
  selector: 'dannos',
  templateUrl: './dannos.component.html',
  styleUrls: ['./dannos.component.css'],
  providers: [DannosService]
})
export class DannosComponent implements OnInit {
  fullImagePath: any;

  ngOnInit() { }
  constructor(){ this.fullImagePath ="../../assets/images/siniestro.jpg" }

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
}