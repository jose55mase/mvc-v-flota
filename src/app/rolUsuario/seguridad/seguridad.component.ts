import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'seguridadUsuarioRol-app',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css'],
  providers: []
})
export class SeguridadUsuarioRolComponent implements OnInit{
  // VARIABLES
  rol : boolean = false;
  inicio : boolean = true;
  permiso : boolean = false;

  // METODOS USADOS DE CONSTRUCCION
  ngOnInit(){}
  constructor(){}

  // METOS DE ACCION
  verInicio(){
    this.inicio = true;

    this.rol = false;
    this.permiso = false;
  }
  verRol(){
    this.rol = true;

    this.inicio = false;    
    this.permiso = false;
  }
  verPermiso(){
    this.permiso = true;

    this.inicio = false;
    this.rol = false;    
  }
}
