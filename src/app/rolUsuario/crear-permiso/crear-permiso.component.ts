import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {map, startWith} from 'rxjs/operators';
import { Rol } from '../../modelo/rol.module';
import { RolUsuarioService } from '../service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Permisos } from '../../modelo/permisos.module';
import { DataSource } from '@angular/cdk/table';




@Component({
  selector: 'crear-permiso-app',
  templateUrl: './crear-permiso.component.html',
  styleUrls: ['./crear-permiso.component.css'],
  providers: [ RolUsuarioService ]
})
export class CreaPermisoComponent implements OnInit{
  // VARIABLES
  private permiso : Permisos;
  private roles : Rol[];

  // METODOS USADOS DE CONSTRUCCION
  ngOnInit(){ this.tomarTodoRol(); }
  constructor( public ver : MatDialog, private rolUsuarioService : RolUsuarioService,private modalService: NgbModal,public modal: MatDialogRef<CreaPermisoComponent> ){ this.permiso = new Permisos() }

  // METOS DE ACCION
  creaPermiso(content): void{
    this.rolUsuarioService.guardarPermiso(this.permiso).subscribe(dato => {  })
    this.modal.close();
    this.modalService.open(content, { size: 'sm' });
  }
  tomarTodoRol(){
    this.rolUsuarioService.findAllRol().subscribe(
      dato => { this.roles = dato }
    )
  }
}
