import { Component, OnInit, Inject } from '@angular/core';
import { User } from "./../modeloUsuarios";
import { UserService } from "./user-crear.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Alert } from 'selenium-webdriver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-crear',
  templateUrl: './user-crear.component.html',  
  styleUrls: ['./user-crear.component.css'],
  providers: [UserService]
})
export class UserCrearComponent implements OnInit {
  private user : User
  
  users : User[];
  nombre :string;
  validarCorreo : boolean = false;
  formulario : FormGroup;
  public usuario : User;
  input : string;
  content: any;
  hide : boolean = true;
  

  ngOnInit() { 
    this.validar();
    this.getUsuarios();
    this.saveOrUpdate(this.content);
    this.input = this.usuario.clave
    
  }

  constructor(private userService: UserService, public ver : MatDialog, private fb :FormBuilder, private modalService: NgbModal) { 
    this.user = new User();
 
  }



  public getUsuarios(){
    this.userService.getUser().subscribe(
      datos => {this.users = datos
        for(var elemento in this.users){
          if(this.user.correo == this.users[elemento].correo){
            this.validarCorreo = false;            
          }else{
            this.validarCorreo = true;
          }
        }
        
      }     
    )
  }
  

  public validar( ){
    this.formulario = this.fb.group({
      'nombre':[null, Validators.compose([Validators.required, Validators.pattern("[A-Z].*[A-Z]")])],
      'apellido':[null, Validators.compose([Validators.required, Validators.pattern("[A-Z].*[A-Z]")])],
      'cedula':[null, Validators.compose([Validators.required, Validators.pattern('[0-9]{7,11}')])],
      'correo':[null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])],
      'telefono':[null, Validators.compose([Validators.required, Validators.pattern('[0-9]{7,10}')])],
      
      'usuario':[null, Validators.compose([Validators.required])],
      'clave':[null, Validators.compose([Validators.required])],
      'cargo':[null, Validators.compose([Validators.required])],
      'estado':[null, Validators.compose([Validators.required])],   
      
    })
  }
  // Validar clave *************
  public validarClaveLog(content){
    this.modalService.open(content, { size: 'sm' })
  }

  
  add(algo){
    this.nombre = algo.nombre;
  }

   
  public saveOrUpdate(content): void{  
    this.userService.saveOrUpdate(this.user).subscribe(       
      dato => {  }
    )          
  }
}


@Component({  
  templateUrl: './modalUserCrea.html',  
  providers: [UserService]
})
export class ModalUserCrear{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,public cerrar : MatDialog){}
  cerrarModalCrea(){
    this.cerrar.closeAll()
  }
}
