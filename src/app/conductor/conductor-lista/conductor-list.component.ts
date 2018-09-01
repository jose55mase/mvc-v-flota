import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatTableDataSource, MatDialogRef } from '@angular/material';
import { Conductor } from '../../modelo/conductor.module';
import { ConductorService } from '../service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConductorEditar } from '../conductor.editar/conductor.editar.component';


@Component({
  selector: 'app-conductor-list',
  templateUrl: './conductor-list.component.html',
  styleUrls: ['./conductor-list.component.css'],
  
  providers: [ConductorService]
})
export class ConductorListarComponent implements OnInit {
  private conductor: Conductor[];
  displayedColumns = ['Nombre' ,'Correo'  ,'Tipo' ,'Accion'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  elemento =  new MatTableDataSource<Conductor>(this.conductor);
  constructor(private conductorService: ConductorService, public ver : MatDialog) { }

  ngOnInit() {
    this.getAllUsers();
    this.lista();
   
  }
  
  getAllUsers() {
    this.conductorService.findAll().subscribe(
      conductor => {
        this.conductor = conductor;
      },
      err => {
        console.log(err);
      }
    );
  }
  lista(){
    this.conductorService.findAll().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;      
    })  
  }

  public verConductor(conductor){
    sessionStorage.setItem('conductor', JSON.stringify(conductor));
    this.ver.open(ModalConductorVista, {});
  }

}

@Component({  
  templateUrl: './modalConductorVista.html',  
  providers: [ConductorService],
  
})
export class ModalConductorVista implements OnInit{
  conductor : Conductor;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private conductorService : ConductorService, private modalService: NgbModal ,public modal: MatDialogRef<ModalConductorEditar>) {
    if (sessionStorage.getItem("conductor")) {
      this.conductor = JSON.parse(sessionStorage.getItem("conductor"));
    } else {
      this.conductor = new Conductor();
    }

  }
  
  ngOnInit(){ this.getAllUsers(); };
  conductores : Conductor[];
  getAllUsers() {
    this.conductorService.findAll().subscribe(
      dato => {
        this.conductores = dato;
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