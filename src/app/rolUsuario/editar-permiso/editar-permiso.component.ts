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



@Component({
  selector: 'editar-permiso-app',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.css'],
  providers: [ RolUsuarioService ]
})
export class EditarPermisoComponent implements OnInit{
  // VARIABLES
  private permiso : Permisos
  private roles : Rol[]

  // METODOS USADOS DE CONSTRUCCION
  ngOnInit(){ this.tomarTodoRol() }
  constructor( public ver : MatDialog, private rolUsuarioService : RolUsuarioService,private modalService: NgbModal){ this.permiso = new Permisos()
    if(sessionStorage.getItem("permiso")){
      this.permiso = JSON.parse(sessionStorage.getItem("permiso"))
    }else{
      this.permiso = new Permisos();
    }
  }
  // METOS DE ACCION
  public editar(content){
    this.rolUsuarioService.guardarPermiso(this.permiso).subscribe(dato => {  })
    this.modalService.open(content, {size: 'sm'})
  }
  public eliminar(rol){
    this.rolUsuarioService.delete(rol)
  }
  tomarTodoRol(){
    this.rolUsuarioService.findAllRol().subscribe(
      dato => { this.roles = dato }
    )
  }
}
