import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BoundEventAst } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehiculo } from '../modelo/vehiculos.modele';
import { TablaService } from './tablaService';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'tablas-app',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css'],
  providers: [ TablaService ]
})
export class TablasComponent {

  conductor : boolean = false;
  vehiculo : boolean = false;
  mantenimiento : boolean = false;
  dannos : boolean = false;

  verConductor(){
    this.conductor = true;
    
    this.dannos =  false;
    this.vehiculo = false;
    this.mantenimiento = false;
  }
  verVehiculo(){
    this.vehiculo = true;

    this.dannos =  false;
    this.conductor = false;
    this.mantenimiento = false;
  }
  verMantenimiento(){
    this.mantenimiento = true;

    this.dannos =  false;
    this.conductor = false;
    this.vehiculo = false;
  }
  verDanno(){
    this.dannos =  true;

    this.conductor = false;
    this.mantenimiento = false;
    this.vehiculo = false;
  }
}

@Component({  
  templateUrl: './modalTabla.html',  
  providers: [TablaService]
})
export class ModalTabla implements OnInit{
  vehiculo: Vehiculo;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tablaService: TablaService) {
    if (sessionStorage.getItem("vehiculo")) {
      this.vehiculo = JSON.parse(sessionStorage.getItem("vehiculo"));
    } else {
      this.vehiculo = new Vehiculo();
    }

  }
  estado = 'bien';
  ngOnInit(){ /* */ };
  vehiculos : Vehiculo[];
  public eliminarVehiculo(vehiculo : Vehiculo): void {
    this.tablaService.crearVehiculo(this.vehiculo).subscribe(
      dato => {  },      
    );
  }
}

