import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from "@angular/router";

import { Mantenimiento } from '../../modelo/mantenimiento.modelo';
import { Dannos } from '../../modelo/dannos.modelo';
import { DannosService } from '../../reporte_dannos/dannosService';
import { LogsService } from '../../logs/logsService';
import { Logs } from '../../modelo/logs';

@Component({
  selector: 'editarDannos',
  templateUrl: './editarDannos.component.html',
  styleUrls: ['./editarDannos.component.css'],
  providers: [DannosService]
})
export class EditarDannosComponent implements OnInit {
  private dannos : Dannos[];

  constructor(private dannosService: DannosService ,public ver : MatDialog) { }

  displayedColumns = ['Titulo' ,'Vehiculo' ,'Fecha' ,'Accion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  elemento =  new MatTableDataSource<Dannos>(this.dannos);
  dataSource;
  ngOnInit(){ this.getAllDannos(); this.tablaDannos(); }
  getAllDannos(){
    this.dannosService.findAll().subscribe(
      danno =>{
        this.dannos = danno;
      },
      error =>{
        console.log(error);
      }
    )
  }
  tablaDannos(){
    this.dannosService.findAll().subscribe(resultado => {
      if(!resultado){
        return
      }
      this.dataSource = new MatTableDataSource(resultado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  public verDanno(danno : Dannos){       
    sessionStorage.setItem('danno', JSON.stringify(danno));
    this.ver.open(ModalDannosEditar, { }) 
  };
}


// Este componenet es para las modales
@Component({  
  templateUrl: './modalDannoEditar.html',  
  providers: [ DannosService, LogsService ]
})
export class ModalDannosEditar implements OnInit{
  danno: Dannos;
  private dannos: Dannos[];
  private logs : Logs;
  ngOnInit(){  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router : Router,  private logsService : LogsService,private dannosService : DannosService, private modalService: NgbModal) {
   
    if (sessionStorage.getItem("danno")) {
      this.danno = JSON.parse(sessionStorage.getItem("danno"));
    } else {
      this.danno = new Dannos();
    }
    this.logs = new Logs(); 
    this.logs.modulo = "Siniestro",
    this.logs.accion = "Editar"
  }
  public editarDanno(content){
    this.dannosService.guardarDanno(this.danno).subscribe(
      dato => { }
    );
    this.modalService.open(content, { size : 'sm'})
    this.logsService.crearlog(this.logs).subscribe( dato => { } ) 
  }
}