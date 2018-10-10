import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Conductor } from '../../modelo/conductor.module';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogsService } from '../../logs/logsService';
import { Logs } from '../../modelo/logs';
import { Rutas } from '../../modelo/rutas.module';
import { RutasService } from '../service';

@Component({
  selector: 'ruta-editar',
  templateUrl: './ruta.editar.component.html',
  styleUrls: ['./ruta.editar.component.css'],

  providers: [LogsService, RutasService]
})
export class RutaEditarComponent implements OnInit {
  private rutas: Rutas[];
  displayedColumns = ['Vehiculo' ,'Conductor','Accion'];
  dataSource;
  private logs : Logs;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  elemento =  new MatTableDataSource<Rutas>(this.rutas);
  constructor( public ver : MatDialog, private logsService : LogsService, private rutasService : RutasService) {
    
  }

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
    this.ver.open(ModalRutaEditar, {});
  }

}


@Component({  
  templateUrl: './modalRutaEditar.html',  
  providers: [RutasService, LogsService],
  
})
export class ModalRutaEditar implements OnInit{
  ruta : Rutas;
  private logs : Logs;  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rutasService : RutasService,private logsService : LogsService, private modalService: NgbModal ,public modal: MatDialogRef<ModalRutaEditar>) {
    if (sessionStorage.getItem("ruta")) {
      this.ruta = JSON.parse(sessionStorage.getItem("ruta"));
    } else {
      this.ruta = new Rutas();
    }
    this.logs = new Logs();     
    this.logs.modulo = "Rutas",
    this.logs.accion = "Editar"

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
  
  closeResult: string;
  public editarRuta(content){
    this.rutasService.guardarRuta(this.ruta).subscribe(dato => {  })
    this.logsService.crearlog(this.logs).subscribe( dato => { } )
    this.modal.close();
    this.modalService.open(content, { size: 'sm' });
  }
  public salirModal(){
    this.modal.close();
  }
  
}