import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Conductor } from '../modelo/conductor.module';
import { DannosService } from './dannosService';
import { Dannos } from '../modelo/dannos.modelo';
import { RolUsuarioService } from '../rolUsuario/service';
import { Rol } from '../modelo/rol.module';
import { Permisos } from '../modelo/permisos.module';

@Component({
  selector: 'dannos',
  templateUrl: './dannos.component.html',
  styleUrls: ['./dannos.component.css'],
  providers: [DannosService]
})
export class DannosComponent implements OnInit {
  fullImagePath : any;
  vistaModulo : any;

  
  constructor(private rolUsuarioService : RolUsuarioService){ this.fullImagePath ="../../assets/images/siniestro.jpg", this.vistaModulo ="../../assets/images/vistaModulo.jpg" }
  crear_conductor : boolean = false;
  editar_conductor : boolean = false;
  ver_conductor : boolean = false;
  eliminar_conductor : boolean = false;
  main : boolean = true;

  fecha = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();

  serguridadArray : Permisos[]; // PERMISOS PARA LOS USUARIO QUE ESTAMOS EN CAPA
  rolArray : Rol[]; // ROLES PARA LOS USUARIO QUE ESTAMOS EN CAPA

  ngOnInit(){
    this.accionesUsuario();
    this.rolXusuario();
  }

  // ACCION DE LOS BOTOENES A USAR 
  crearAccion : boolean = false;
  verAccion : boolean = false;
  editarAccion : boolean = false;
  eliminarAccion : boolean = false;

  


  //FUNCCION PARA DETERMINAR BOTONES DE USUARIO
  rol_correcto : boolean;
  public rolXusuario(){
    this.rolUsuarioService.findAllPermiso().subscribe(dato => { this.serguridadArray = dato 
      for(var elementoSeguridad in this.serguridadArray){
        if(localStorage.getItem("rol_id_usuario") === this.serguridadArray[elementoSeguridad].id_rol){         
          if(this.serguridadArray[elementoSeguridad].crear && this.serguridadArray[elementoSeguridad].modulo == "siniestros"){ this.crearAccion = true }
          if(this.serguridadArray[elementoSeguridad].ver && this.serguridadArray[elementoSeguridad].modulo == "siniestros"){ this.verAccion = true }
          if(this.serguridadArray[elementoSeguridad].editar && this.serguridadArray[elementoSeguridad].modulo == "siniestros"){ this.editarAccion = true }
          if(this.serguridadArray[elementoSeguridad].eliminar && this.serguridadArray[elementoSeguridad].modulo == "siniestros"){ this.eliminarAccion = true }
        }        
      }
      
    })
  }

  public accionesUsuario(){
    
  }

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