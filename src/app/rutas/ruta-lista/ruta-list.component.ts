import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatTableDataSource, MatDialogRef } from '@angular/material';
import { Conductor } from '../../modelo/conductor.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RutasService } from '../service';
import { Rutas } from '../../modelo/rutas.module';


@Component({
  selector: 'ruta-list',
  templateUrl: './ruta-list.component.html',
  styleUrls: ['./ruta-list.component.css'],
  
  providers: [RutasService]
})
export class RutaListarComponent implements OnInit {
  private rutas: Rutas[];
  displayedColumns = ['Vehiculo' ,'Conductor','Accion'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  elemento =  new MatTableDataSource<Rutas>(this.rutas);
  constructor(private rutasService : RutasService, public ver : MatDialog) { }

  ngOnInit() {
    this.getAllUsers();
    this.lista();
   
  }
  
  getAllUsers() {
    this.rutasService.findAll().subscribe(
      dato => { this.rutas = dato },
        err => { console.log(err) }
    );
  }
  lista(){
    this.rutasService.findAll().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;      
    })  
  }

  public verRuta(ruta){
    sessionStorage.setItem('ruta', JSON.stringify(ruta));
    this.ver.open(ModalRutaVista, {});
  }

}

@Component({  
  templateUrl: './modalRutaVista.html',  
  providers: [RutasService],
  
})
export class ModalRutaVista implements OnInit{
  ruta : Rutas;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private rutasService : RutasService, private modalService: NgbModal ,public modal: MatDialogRef<ModalRutaVista>) {
    if (sessionStorage.getItem("ruta")) {
      this.ruta = JSON.parse(sessionStorage.getItem("ruta"));
    } else {
      this.ruta = new Rutas();
    }

  }
  
  ngOnInit(){ this.getAllUsers(); };
  rutas : Rutas[];
  getAllUsers() {
    this.rutasService.findAll().subscribe(
      dato => {
        this.rutas = dato;
      },
      err => {
        console.log(err);
      }
    );
  }
 
  public salirModal(){
    this.modal.close();
  }
  
}