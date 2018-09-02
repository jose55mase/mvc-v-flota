import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BoundEventAst } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from '../../modelo/vehiculos.modele';
import { VehiculoService } from '../vehiculoService';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'vehiculo-editar',
  templateUrl: './editar.vehiculo.html',
  styleUrls: ['./editar.vehiculo.css'],
  providers:[VehiculoService]
})
export class VehiculoEditarComponent implements OnInit {
  
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

  public editarVehiculo(vehiculo){
    sessionStorage.setItem('vehiculo', JSON.stringify(vehiculo));
    this.ver.open(ModalVehiculoEditar)
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
  templateUrl: './modalVehiculoEditar.html',  
  providers: [VehiculoService]
})
export class ModalVehiculoEditar implements OnInit{
  vehiculo: Vehiculo;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private vehiculoService: VehiculoService, public ver : MatDialog, private modalService: NgbModal) {
    if (sessionStorage.getItem("vehiculo")) {
      this.vehiculo = JSON.parse(sessionStorage.getItem("vehiculo"));
    } else {
      this.vehiculo = new Vehiculo();
    }

  }
  estado = 'bien';
  ngOnInit(){  };
  vehiculos : Vehiculo[];
  editarVehiculo(content): void {
    this.vehiculoService.crearVehiculo(this.vehiculo).subscribe(
      dato => {  },
      
    );
    this.modalService.open(content, { size: 'sm' })
  }
}
