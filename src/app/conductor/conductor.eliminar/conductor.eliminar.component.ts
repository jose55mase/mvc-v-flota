import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Conductor } from '../../modelo/conductor.module';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConductorService } from '../service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConductorEditar } from '../conductor.editar/conductor.editar.component';
import { Logs } from '../../modelo/logs';
import { LogsService } from '../../logs/logsService';

@Component({
  selector: 'conductor-eliminar',
  templateUrl: './conductor.eliminar.component.html',
  styleUrls: ['./conductor.eliminar.component.css'],

  providers: [ConductorService]
})
export class ConductorEliminarComponent implements OnInit {
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
    this.ver.open(ModalConductorEliminar, {});
  }

}


@Component({  
  templateUrl: './modalConductorEliminar.html',  
  providers: [ConductorService, LogsService],
  
})
export class ModalConductorEliminar implements OnInit{
  conductor : Conductor;
  private logs : Logs;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private conductorService : ConductorService,private logsService : LogsService, private modalService: NgbModal ,public modal: MatDialogRef<ModalConductorEditar>) {
    if (sessionStorage.getItem("conductor")) {
      this.conductor = JSON.parse(sessionStorage.getItem("conductor"));
    } else {
      this.conductor = new Conductor();
    }
    this.logs = new Logs();     
    this.logs.modulo = "Conductor",
    this.logs.accion = "Eliminar"
  }
  
  ngOnInit(){  };
  
  
  closeResult: string;
  public editarConductor(content){
    this.conductorService.guardarCanductor(this.conductor).subscribe(dato => {  })
    this.logsService.crearlog(this.logs).subscribe( dato => { } )
    this.modal.close();
    this.modalService.open(content, { size: 'sm' });
  }
  public salirModal(){
    this.modal.close();
  }
  
}