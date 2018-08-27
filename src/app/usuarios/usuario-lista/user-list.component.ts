import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { User } from "./../modeloUsuarios";
import { UserService } from "./../user.service";
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  private users: User[];   
  displayedColumns = ['Nombre' ,'Correo'  ,'Cargo' , 'Accion'];
  dataSource;

  constructor(private userService: UserService, public ver : MatDialog) { }

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
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  elemento =  new MatTableDataSource<User>(this.users);
  
  ngOnInit() {    
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



  public delete(user: User): void {
    this.userService.delete(user);
  }
  public verUsuario(user){
    sessionStorage.setItem('user', JSON.stringify(user));
    this.ver.open(ModalUserVista, { 
      
    });
  }

  
}


@Component({  
  templateUrl: './modalUserVista.html',  
  providers: [UserService]
})
export class ModalUserVista implements OnInit{
  user: User;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.user = new User();
    }

  }
  estado = 'bien';
  ngOnInit(){ this.getAllUsers(); };
  users : User[];
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
}
