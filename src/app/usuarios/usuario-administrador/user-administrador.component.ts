import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from "./../modeloUsuarios";
import { UserService } from "./../user.service";
import { MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
import { UserServiceE } from './user-administrador.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user-administrador',
  templateUrl: './user-administrador.component.html',
  
  providers: [UserService]
})
export class UserAdministradorComponent implements OnInit {

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
    this.userService.findAllUsuario().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })    
   }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  getAllUsers() {
    this.userService.findAllUsuario().subscribe(
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
    this.ver.open(ModalAministradorEditar, { }) 
  };

  
}



@Component({  
  templateUrl: './modalUserAdministrador.html',  
  providers: [ UserServiceE]
})
export class ModalAministradorEditar implements OnInit{
  user: User;
  private users: User[];
  ngOnInit(){}
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router : Router, private userServiceE : UserServiceE, private modalService: NgbModal) {
   
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.user = new User();
    }

  }  
  
  public editar(content): void{
    this.userServiceE.saveOrUpdate(this.user)
      .subscribe( dato => {   })
      this.modalService.open(content, { size: 'sm' });

  }
 
}

