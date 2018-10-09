import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InicioService } from './inicioService';
import { User } from '../modelo/usuario.modulo';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { RolUsuarioService } from '../rolUsuario/service';
import { Permisos } from '../modelo/permisos.module';
import { Rol } from '../modelo/rol.module';



@Component({
  selector: 'inicio-app',
  templateUrl: './inicio-app.component.html',
  styleUrls: ['./inicio-app.component.css'],
  providers :[ InicioService, NgbCarouselConfig, RolUsuarioService ]
})

export class InicioAppComponent implements OnInit {
  logCargo  : string = "";
  lognombre : string = ""; 
  logApellido : string = "";
  logUsuario : string = "";
  arrayUsuairio : User[];
  serguridadArray : Permisos[]; // PERMISOS PARA LOS USUARIO QUE ESTAMOS EN CAPA
  rolArray : Rol[]; // ROLES PARA LOS USUARIO QUE ESTAMOS EN CAPA
  vandera : boolean = false; //  PARA ARRANCAR EL ARRAY
  validar : string = "";
  validaciones 
  logoFondo : any;
  sinFondo : any;

  inicioImagen: any;

  ngOnInit(){ 
    this.getAllpermisos();
    this.listaUsuarios();
  }
  constructor( private router :  Router, private inicioService : InicioService, private rolUsuarioService : RolUsuarioService ) { 
    this.inicioImagen = "../../assets/images/vehiculos.jpg";
    this.logoFondo = "../../assets/images/logoFondo.png";
    this.sinFondo = "../../assets/images/logosinfodo.png";
    

  }

  mantenimientos : boolean = false;
  siniestros : boolean = false;
  usuarios : boolean = false;
  conductores : boolean = false;
  tablas : boolean = false;
  Vehiculos : boolean = false;
  logs : boolean = false;
  roles : boolean = false;

  rutas : boolean = true;

  public listaUsuarios(){
    this.inicioService.findAll().subscribe(
      dato => { this.arrayUsuairio = dato 
        for(var elemento in this.arrayUsuairio){
          if(this.arrayUsuairio[elemento].correo === localStorage.getItem('correoLogUser')){
            this.logCargo = this.arrayUsuairio[elemento].cargo;
            this.lognombre = this.arrayUsuairio[elemento].nombre;
            this.logApellido = this.arrayUsuairio[elemento].apellido;
            this.logUsuario = this.arrayUsuairio[elemento].usuario;  
            
                      
          }
        }
      }
    )
  }
  
  getAllpermisos(){    
    this.rolUsuarioService.findAllRol().subscribe(dato => { this.rolArray = dato
      for(var elemento in this.rolArray){
        if(this.rolArray[elemento].rol == localStorage.getItem('rolUsuario')){
          localStorage.setItem("rol_id_usuario", this.rolArray[elemento].id)       
          var rolUsuario = this.rolArray[elemento].id;
          this.rolUsuarioService.findAllPermiso().subscribe(dato => {this.serguridadArray = dato
            for(var elementoSeguridad in this.serguridadArray){
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "usuarios"){ this.usuarios = true}
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "conductores"){ this.conductores = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "mantenimientos"){ this.mantenimientos = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "siniestros"){ this.siniestros = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "Vehiculos"){ this.Vehiculos = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "rutas"){ this.rutas = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "logs"){ this.logs = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "tablas" ){  this.tablas = true }
              }
              if(this.serguridadArray[elementoSeguridad].id_rol == rolUsuario ){
                if(this.serguridadArray[elementoSeguridad].modulo == "roles"){ this.roles = true }
              }
            }
          })          
        }
      }
    })
  }
   

  public cerrarSesion(){
    localStorage.removeItem('correoLogUser');
    localStorage.removeItem('rolUsuario');
    this.router.navigate(['/entrar-router'])
  }   
}