import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {map, startWith} from 'rxjs/operators';
import { RolUsuarioService } from './service';
import { Rol } from '../modelo/rol.module';
import { Permisos } from '../modelo/permisos.module';
import { CreaPermisoComponent } from './crear-permiso/crear-permiso.component';
import { EditarPermisoComponent } from './editar-permiso/editar-permiso.component';


@Component({
  selector: 'seguridad-app',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css'],
  providers: [RolUsuarioService]
})
export class SeguridadComponent implements OnInit{
  constructor( private rolUsuarioService : RolUsuarioService, public ver : MatDialog){  }
  private serguridadArray : Permisos[];
  public dataSource : any;


  displayedColumns = ['id_rol','modulo','accion' ];
  getAllRoles(){
    this.rolUsuarioService.findAllPermiso().subscribe(dato => {this.serguridadArray = dato})
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  elemento =  new MatTableDataSource<Permisos>(this.serguridadArray);
  ngOnInit(){ 
    this.getAllRoles();
    this.rolUsuarioService.findAllPermiso().subscribe(results =>{
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
  public creaPermisos(){  //CREAR UN NUEVO ROL LANZA MODAL
    this.ver.open(CreaPermisoComponent,{})
  }

  public verEditar(permiso){
    sessionStorage.setItem('permiso', JSON.stringify(permiso));
    this.ver.open(EditarPermisoComponent, {})
  }

}
