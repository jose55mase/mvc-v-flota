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
  selector: 'crear-rol-app',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css'],
  providers: [ RolUsuarioService ]
})
export class CreaRolComponent implements OnInit{
  // VARIABLES
  private rol : Rol

  // METODOS USADOS DE CONSTRUCCION
  ngOnInit(){}
  constructor( public ver : MatDialog, private rolUsuarioService : RolUsuarioService,private modalService: NgbModal,public modal: MatDialogRef<CreaRolComponent> ){ this.rol = new Rol() }

  // METOS DE ACCION
  creaRol(content): void{
    this.rolUsuarioService.guardarRol(this.rol).subscribe(dato => {  })
    this.modal.close();
    this.modalService.open(content, { size: 'sm' });
  }
}
