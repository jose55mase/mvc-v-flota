import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from "./../modeloUsuarios";
import { UserService } from "./../user.service";
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from "@angular/router";
import { Logs } from '../../modelo/logs';
import { LogsService } from '../../logs/logsService';

@Component({
  selector: 'app-user-eliminar',
  templateUrl: './user-eliminar.component.html',
  
  providers: [UserService]
})
export class UserEliminarComponent implements OnInit {

  private users: User[];
  user : User;
  listaUser : User[];
  displayedColumns = ['Nombre' ,'Correo'  ,'Cargo' ,'Accion'];
  dataSource;
  constructor(private userService: UserService, public ver : MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  elemento =  new MatTableDataSource<User>(this.users);
  ngOnInit(){    
    this.getAllUsers();
    this.userService.findAll().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })    
   }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  getAllUsers() {
    this.userService.findAll().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  } 
  public verUsuario(user : User){       
    sessionStorage.setItem('user', JSON.stringify(user));
    this.ver.open(ModalUserEliminar, {   }) 
  };

  
}



@Component({  
  templateUrl: './modalUserEliminar.html',  
  providers: [UserService, LogsService]
})
export class ModalUserEliminar implements OnInit{
  user: User;
  private logs : Logs;
  private users: User[];
  ngOnInit(){}
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router : Router, private userService : UserService, private logsService : LogsService) {
   
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.user = new User();
    }
    this.logs = new Logs();     
    this.logs.modulo = "Usuario",
    this.logs.accion = "Eliminar"
 

  }  
  
  public eliminar(user : User): void{
    this.userService.saveOrUpdate(this.user)
      .subscribe( dato => {  } ) 
    this.logsService.crearlog(this.logs).subscribe( dato => { } )      
  }
 
}

