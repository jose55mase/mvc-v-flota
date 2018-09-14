import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent} from "ng-auto-complete";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {map, startWith} from 'rxjs/operators';
import { RolUsuarioService } from './service';
import { Rol } from '../modelo/rol.module';


@Component({
  selector: 'rolUsuario-app',
  templateUrl: './rolUsuario.component.html',
  styleUrls: ['./rolUsuario.component.css'],
  providers: [RolUsuarioService]
})
export class RolUsuarioComponent implements OnInit{
  constructor( private rolUsuarioService : RolUsuarioService){  }
  private rolesArray : Rol[];
  public dataSource : any;


  displayedColumns = ['rol','accion' ];
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

}
