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



@Component({
  selector: 'editar-rol-app',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css'],
  providers: [ RolUsuarioService ]
})
export class EditarRolComponent implements OnInit{
  // VARIABLES
  private rol : Rol

  // METODOS USADOS DE CONSTRUCCION
  ngOnInit(){}
  constructor( public ver : MatDialog, private rolUsuarioService : RolUsuarioService,private modalService: NgbModal){ this.rol = new Rol()
    if(sessionStorage.getItem("rol")){
      this.rol = JSON.parse(sessionStorage.getItem("rol"))
    }else{
      this.rol = new Rol();
    }
  }
  // METOS DE ACCION
  public editar(content){
    this.rolUsuarioService.guardarRol(this.rol).subscribe(dato => { })
    this.modalService.open(content, {size: 'sm'})
  }
  public eliminar(rol){
    this.rolUsuarioService.delete(rol)
  }

}
