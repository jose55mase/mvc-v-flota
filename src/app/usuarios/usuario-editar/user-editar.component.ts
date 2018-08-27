import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from "./../modeloUsuarios";
import { UserService } from "./../user.service";
import { UserServiceE } from "./user-crear.service";
import { MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from "@angular/router";

@Component({
  selector: 'app-editar-editar',
  templateUrl: './user-editar.component.html',
  
  providers: [UserService]
})
export class UserEditarComponent implements OnInit {

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
    this.ver.open(ModalUserEditar, { }) 
  };

  
}



@Component({  
  templateUrl: './modalUserEditar.html',  
  providers: [ UserServiceE]
})
export class ModalUserEditar implements OnInit{
  user: User;
  private users: User[];
  ngOnInit(){}
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router : Router, private userServiceE : UserServiceE) {
   
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.user = new User();
    }

  }  
  
  public editar(user : User): void{
    this.userServiceE.saveOrUpdate(this.user)
      .subscribe( dato => {
        alert("Usuario se a actualizado ")
      } ) 
  }
 
}

