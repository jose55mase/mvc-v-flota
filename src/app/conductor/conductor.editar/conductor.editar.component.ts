import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Conductor } from '../../modelo/conductor.module';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConductorService } from '../service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'conductor-editar',
  templateUrl: './conductor.editar.component.html',
  styleUrls: ['./conductor.editar.component.css'],

  providers: [ConductorService]
})
export class ConductorEditarComponent implements OnInit {
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
    this.ver.open(ModalConductorEditar, {});
  }

}


@Component({  
  templateUrl: './modalConductorEditar.html',  
  providers: [ConductorService],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ModalConductorEditar implements OnInit{
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