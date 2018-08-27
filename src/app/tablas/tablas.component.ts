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
export class TablasComponent implements OnInit {
  fechaHoy = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  constructor(
    private modalService: NgbModal,
    private tablaService : TablaService,
    public ver : MatDialog,
  )
  {    }
  ngOnInit( ){ 
    /* Tabla de los VEHICULOS */
    this.getAllVehiculos();
    this.vehiculoTabla()
  }


  /* Tabla de los VEHICULOS */
  dataSource: any;
  private vehiculos : Vehiculo[];
  displayedColumns = ['Propietario', 'Modelo', 'Placa', 'Accion'];
  elemento =  new MatTableDataSource<Vehiculo>(this.vehiculos);
  public modalVehiculo(vehiculo){
    sessionStorage.setItem('vehiculo', JSON.stringify(vehiculo));
    this.ver.open(ModalTabla);
        
  }
  getAllVehiculos(){
    this.tablaService.verVehiculos().subscribe(
      dato => {
        this.vehiculos = dato;
      },
      err => {
        console.log(" tenemos problemas para traer ");
      }
    )
  }
  public abrirVehiculo(content){
    this.modalService.open(content, { size: 'lg' });
  }  
  public vehiculoTabla(){    
    this.tablaService.verVehiculos().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
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

