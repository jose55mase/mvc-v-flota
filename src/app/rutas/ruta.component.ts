import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Conductor } from '../modelo/conductor.module';
import { RolUsuarioService } from '../rolUsuario/service';
import { Permisos } from '../modelo/permisos.module';
import { Rol } from '../modelo/rol.module';

@Component({
  selector: 'ruta-modulo',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css'],
  providers: [RolUsuarioService]
})
export class RutaComponent implements OnInit {

  

  // Variables
  crear_conductor : boolean = false;
  editar_conductor : boolean = false;
  ver_conductor : boolean = false;
  eliminar_conductor : boolean = false;
  main : boolean = true;
  fullImagePath : any;
  vistaModulo : any;
  fecha = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();

  // ACCION DE LOS BOTOENES A USAR 
  crearAccion : boolean = true;
  verAccion : boolean = true;
  editarAccion : boolean = true;
  eliminarAccion : boolean = false;

  // METODOS POR DEFECTO
  constructor(private rolUsuarioService : RolUsuarioService){ this.fullImagePath ="../../assets/images/vehiculos.jpg", this.vistaModulo ="../../assets/images/auto1.jpg" }
  ngOnInit() { }

  serguridadArray : Permisos[]; // PERMISOS PARA LOS USUARIO QUE ESTAMOS EN CAPA
  rolArray : Rol[]; // ROLES PARA LOS USUARIO QUE ESTAMOS EN CAPA

   //FUNCCION PARA DETERMINAR BOTONES DE USUARIO
   rol_correcto : boolean;
   public rolXusuario(){
     this.rolUsuarioService.findAllPermiso().subscribe(dato => { this.serguridadArray = dato 
       for(var elementoSeguridad in this.serguridadArray){
         if(localStorage.getItem("rol_id_usuario") === this.serguridadArray[elementoSeguridad].id_rol){         
           if(this.serguridadArray[elementoSeguridad].crear && this.serguridadArray[elementoSeguridad].modulo == "rutas"){ this.crearAccion = true }
           if(this.serguridadArray[elementoSeguridad].ver && this.serguridadArray[elementoSeguridad].modulo == "rutas"){ this.verAccion = true }
           if(this.serguridadArray[elementoSeguridad].editar && this.serguridadArray[elementoSeguridad].modulo == "rutas"){ this.editarAccion = true }
           if(this.serguridadArray[elementoSeguridad].eliminar && this.serguridadArray[elementoSeguridad].modulo == "rutas"){ this.eliminarAccion = true }
         }        
       }
       
     })
   }

  // METODOS DE MANEJO DE INFORMACION
  crear(){
    this.crear_conductor = true;
    this.editar_conductor = false;
    this.ver_conductor = false;
    this.eliminar_conductor = false;
    this.main = false;
  }
  
  editar(){
    this.crear_conductor = false;
    this.editar_conductor = true;
    this.ver_conductor = false;
    this.eliminar_conductor = false;
    this.main = false;
  }
  ver(){
    this.crear_conductor = false;
    this.editar_conductor = false;
    this.ver_conductor = true;
    this.eliminar_conductor = false;
    this.main = false;
  }
  eliminar(){
    this.crear_conductor = false;
    this.editar_conductor = false;
    this.ver_conductor = false;
    this.eliminar_conductor = true;
    this.main = false;
  }
}
