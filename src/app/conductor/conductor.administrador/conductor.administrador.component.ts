import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Conductor } from '../../modelo/conductor.module';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConductorService } from '../service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConductorEditar } from '../conductor.editar/conductor.editar.component';

@Component({
  selector: 'conductor-administrador',
  templateUrl: './conductor.administrador.component.html',
  styleUrls: ['./conductor.administrador.component.css'],

  providers: [ConductorService]
})
export class ConductorAdministradorComponent implements OnInit {
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
    this.conductorService.findAllAdmin().subscribe(
      conductor => {
        this.conductor = conductor;
      },
      err => {
        console.log(err);
      }
    );
  }
  lista(){
    this.conductorService.findAllAdmin().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;      
    })  
  }
  public verConductor(conductor){
    sessionStorage.setItem('conductor', JSON.stringify(conductor));
    this.ver.open(ModalConductorAdministrador, {});
  }

}


@Component({  
  templateUrl: './modalConductorAdministrador.html',  
  providers: [ConductorService],
  
})
export class ModalConductorAdministrador implements OnInit{
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
    this.conductorService.findAllAdmin().subscribe(
      dato => {
        this.conductores = dato;
      },
      err => {
        console.log(err);
      }
    );
  }
  
  closeResult: string;
  public editarConductor(content){
    this.conductorService.guardarCanductor(this.conductor).subscribe(dato => {  })
    this.modal.close();
    this.modalService.open(content, { size: 'sm' });
  }
  public salirModal(){
    this.modal.close();
  }
  
}