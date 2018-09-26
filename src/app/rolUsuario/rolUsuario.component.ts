import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {map, startWith} from 'rxjs/operators';
import { RolUsuarioService } from './service';
import { Rol } from '../modelo/rol.module';
import { CreaRolComponent } from './crear-rol/crear-rol.component';
import { EditarRolComponent } from './editar-ro/editar-rol.component';


@Component({
  selector: 'rolUsuario-app',
  templateUrl: './rolUsuario.component.html',
  styleUrls: ['./rolUsuario.component.css'],
  providers: [RolUsuarioService]
})
export class RolUsuarioComponent implements OnInit{
  constructor( private rolUsuarioService : RolUsuarioService,  public ver : MatDialog){  }
  private rolesArray : Rol[];
  public dataSource : any;


  displayedColumns = ['rol','id','accion' ];
  getAllRoles(){
    this.rolUsuarioService.findAllRol().subscribe(dato => {this.rolesArray = dato})
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  elemento =  new MatTableDataSource<Rol>(this.rolesArray);
  ngOnInit(){ 
    this.getAllRoles();
    this.rolUsuarioService.findAllRol().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remueve al preciona 
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defecto de daracteres
    this.dataSource.filter = filterValue;
  }

  public crearRol(rol){  //CREAR UN NUEVO ROL LANZA MODAL
    this.ver.open(CreaRolComponent,{})
  }

  public verEditar(rol){
    sessionStorage.setItem('rol', JSON.stringify(rol));
    this.ver.open(EditarRolComponent, {})
  }


}
