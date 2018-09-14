import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Conductor } from '../modelo/conductor.module';
import { ConductorService } from './service';
import { RolUsuarioService } from '../rolUsuario/service';
import { Permisos } from '../modelo/permisos.module';
import { Rol } from '../modelo/rol.module';

@Component({
  selector: 'conductor-modulo',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css'],
  providers: [ConductorService, RolUsuarioService]
})
export class ConductorComponent implements OnInit {

  fullImagePath : any;
  constructor(private rolUsuarioService : RolUsuarioService){ this.fullImagePath ="../../assets/images/conductor.jpg" }
  crear_conductor : boolean = false;
  editar_conductor : boolean = false;
  ver_conductor : boolean = false;
  eliminar_conductor : boolean = false;

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

  contar = 0;


  //FUNCCION PARA DETERMINAR BOTONES DE USUARIO
  rol_correcto : boolean;
  public rolXusuario(){
    this.rolUsuarioService.findAllPermiso().subscribe(dato => { this.serguridadArray = dato 
      for(var elementoSeguridad in this.serguridadArray){
        if(localStorage.getItem("rol_id_usuario") === this.serguridadArray[elementoSeguridad].id_rol){         
          if(this.serguridadArray[elementoSeguridad].crear && this.serguridadArray[elementoSeguridad].modulo == "conductores"){ this.crearAccion = true }
          if(this.serguridadArray[elementoSeguridad].ver && this.serguridadArray[elementoSeguridad].modulo == "conductores"){ this.verAccion = true }
          if(this.serguridadArray[elementoSeguridad].editar && this.serguridadArray[elementoSeguridad].modulo == "conductores"){ this.editarAccion = true }
          if(this.serguridadArray[elementoSeguridad].eliminar && this.serguridadArray[elementoSeguridad].modulo == "conductores"){ this.eliminarAccion = true }
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
  }
  
  editar(){
    this.crear_conductor = false;
    this.editar_conductor = true;
    this.ver_conductor = false;
    this.eliminar_conductor = false;
  }
  ver(){
    this.crear_conductor = false;
    this.editar_conductor = false;
    this.ver_conductor = true;
    this.eliminar_conductor = false;
  }
  eliminar(){
    this.crear_conductor = false;
    this.editar_conductor = false;
    this.ver_conductor = false;
    this.eliminar_conductor = true;
  }

}

/*

 this.contar = 1 + this.contar
                console.log(this.rolArray[elementoRol].rol+"for--cantidad => "+this.contar)
                console.log(rolUsuario+"varial--cantidad => "+this.contar)


this.rolUsuarioService.findAllPermiso().subscribe(dato => { this.serguridadArray = dato            
            for(var elemento in this.serguridadArray){
              if("usuarios"==this.serguridadArray[elemento].modulo){
                if(this.serguridadArray[elemento].crear){
                  console.log(this.serguridadArray[elemento].modulo)
                  console.log("Crear ==> "+this.serguridadArray[elemento].crear)
                  console.log("______________________________________________")
                  
                }               
              }              
            }
          })

if(this.serguridadArray[elemento].modulo == "conductores"){
            console.log(localStorage.getItem('rolUsuario')) 
            console.log("crear :"+this.serguridadArray[elemento].modulo)
            console.log("crear :"+this.serguridadArray[elemento].crear)
            console.log("__________________________________________")
          }    
          if(this.serguridadArray[elemento].crear){ this.crearAccion = true }
        }
        if(localStorage.getItem('rolUsuario')  == this.serguridadArray[elemento].modulo){          
          if(this.serguridadArray[elemento].ver && this.serguridadArray[elemento].modulo == "conductores"){ this.verAccion = true }
          console.log("ver :"+this.serguridadArray[elemento].modulo)
        }
        if(localStorage.getItem('rolUsuario')  == this.serguridadArray[elemento].modulo){          
          if(this.serguridadArray[elemento].editar && this.serguridadArray[elemento].modulo == "conductores"){ this.editarAccion = true }
          console.log("editar :"+this.serguridadArray[elemento].modulo)
        }
        if(localStorage.getItem('rolUsuario')  == this.serguridadArray[elemento].modulo){          
          if(this.serguridadArray[elemento].eliminar && this.serguridadArray[elemento].modulo == "conductores"){ this.eliminarAccion = true }
          console.log("eliminar :"+this.serguridadArray[elemento].modulo)
        }        
*/