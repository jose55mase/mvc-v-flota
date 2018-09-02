import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BoundEventAst } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from '../../modelo/vehiculos.modele';
import { VehiculoService } from '../vehiculoService';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Alert } from 'selenium-webdriver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'vehiculo-eliminar',
  templateUrl: './eliminar.vehiculo.html',
  styleUrls: ['./eliminar.vehiculo.css'],
  providers:[VehiculoService]
})
export class VehiculoEliminarComponent implements OnInit {
  
  fullImagePath: any;
 
  private vehiculos : Vehiculo[];
  displayedColumns = ['Propietario', 'Modelo', 'Placa', 'Accion'];
  constructor( private vehiculoService : VehiculoService, public ver : MatDialog  ){  }
  dataSource;  

  getAllVehiculos(){
    this.vehiculoService.verVehiculos().subscribe(
      dato => {
        this.vehiculos = dato;
      },
      err => {
        console.log(" tenemos problemas para traer ");
      }
    )
  }

  public verVehiculo(vehiculo){
    sessionStorage.setItem('vehiculo', JSON.stringify(vehiculo));
    this.ver.open(ModalVehiculoEliminar)
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  elemento =  new MatTableDataSource<Vehiculo>(this.vehiculos);
  ngOnInit(){ 
    this.getAllVehiculos();
    this.vehiculoService.verVehiculos().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remueve al preciona 
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defecto de daracteres
    this.dataSource.filter = filterValue;
  }
}

@Component({  
  templateUrl: './modalVehiculoEliminar.html',  
  providers: [VehiculoService]
})
export class ModalVehiculoEliminar implements OnInit{
  vehiculo: Vehiculo;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private vehiculoService: VehiculoService, private modalService: NgbModal) {
    if (sessionStorage.getItem("vehiculo")) {
      this.vehiculo = JSON.parse(sessionStorage.getItem("vehiculo"));
    } else {
      this.vehiculo = new Vehiculo();
    }

  }
  estado = 'bien';
  ngOnInit(){ /* */ };
  vehiculos : Vehiculo[];
  public eliminarVehiculo(content): void {
    this.vehiculoService.crearVehiculo(this.vehiculo).subscribe(
      dato => {  },      
    );
    this.modalService.open(content, { size: 'sm' });
  }
}
