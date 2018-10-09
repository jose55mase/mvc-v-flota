import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services.log';
import { User } from '../modelo/usuario.modulo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'logIng-app',
  templateUrl: './logIng-app.component.html',
  styleUrls: ['./logIng-app.component.css'],
  providers: [UserService]
})
export class LogInAppComponent {
  logoImagePath: string;
  loginImagePath : string;
  correolog : string = ""; // campos de input " usuario " 
  clave : string = "" ; // campos de input " calve "
  estado : boolean = false
  mensaje : string = "";
  alertUsuarioIncorrecto : boolean = false;
  alertClaveIncorrecto : boolean = false;
  alertUsuario : boolean = false;
  alertClave : boolean = false;
  entrarClav :boolean = false;
  entrarUse : boolean = false;
  modeloUsuario : User;
  arrayUsuario : User[];

  //Usuario de inicio
  logUsuario : String = "";
  logCargo  : String = "";
  lognombre : String = "";
  logApellido : String = "";
  usuarioLogMenu : boolean = false;
  usuarioInactivo : boolean = false;
  usuarioNocreado : boolean = false; 


  constructor(  private router : Router, private userService : UserService,private modalService: NgbModal ){ 
    this.logoImagePath = "../../assets/images/logo.jpg";
    this.loginImagePath = "../../assets/images/sesiones.png";
  }




  public  alertCerrar(){
    this.alertClave = false;
    this.alertUsuario = false;
    this.alertClaveIncorrecto = false;
    this.alertUsuarioIncorrecto = false;
  }
  
  // VALIDAR INICO DE SESION
  public ingresaLogin( content ){
    this.userService.findAll().subscribe( users => {
      this.arrayUsuario = users;
      
      if(this.correolog == "" || this.correolog == null){
        this.alertUsuarioIncorrecto = false
        this.alertUsuario = true;
        this.usuarioInactivo = false;  
      }      
      if(this.clave == "" || this.clave == null){
        this.alertClaveIncorrecto = false;
        this.alertClave = true;
        this.usuarioInactivo = false;           
      }      
      
      for(var elemento in this.arrayUsuario){
        if(this.arrayUsuario[elemento].correo != this.correolog && this.alertUsuario == false){
                            
        }
      }          
      for(var elemento in this.arrayUsuario){
        if(this.arrayUsuario[elemento].clave != this.clave ){              
          this.alertClave = false;
          this.entrarClav = true;
          this.usuarioInactivo = false;
          if(this.entrarClav){ this.alertClaveIncorrecto = true }
        }
      }
      for(var elemento in this.arrayUsuario){
        if(this.arrayUsuario[elemento].correo != this.correolog ){              
          this.alertUsuario = false;
          this.entrarUse = true;
          this.usuarioInactivo = false;
          if(this.entrarUse){ this.alertUsuarioIncorrecto = true }
        }
      }
      

      for (var elemento in this.arrayUsuario){
        if(this.arrayUsuario[elemento].correo === this.correolog){
          this.alertUsuario = false;
          this.alertUsuarioIncorrecto = false
          this.usuarioInactivo = false;
          if(this.arrayUsuario[elemento].clave === this.clave){
            this.alertClaveIncorrecto = false;
            this.alertClave = false;
            this.usuarioInactivo = false;
            if(this.arrayUsuario[elemento].estado){
              this.logUsuario = this.arrayUsuario[elemento].usuario;
              this.logCargo  = this.arrayUsuario[elemento].cargo;
              this.lognombre = this.arrayUsuario[elemento].nombre;
              this.logApellido = this.arrayUsuario[elemento].apellido;
              this.usuarioLogMenu = true;
              this.usuarioInactivo = false;

              this.alertClave = false;
              this.alertUsuario = false;
              this.alertClaveIncorrecto = false;
              this.alertUsuarioIncorrecto = false;
              this.usuarioInactivo = false;              
              localStorage.setItem('correoLogUser',this.correolog);
              localStorage.setItem('rolUsuario', this.arrayUsuario[elemento].cargo)
              localStorage.setItem('usuario', this.arrayUsuario[elemento].usuario)
              this.correolog = null;
              this.clave = null ;              
              this.router.navigate( ['/inicio-router'] );              
              this.modalService.open(content, { size: 'sm' });
            }
            if(!this.arrayUsuario[elemento].estado){
              this.usuarioInactivo = true;
              this.correolog = null;
              this.clave = null ;
            }
            
          }
        }
      }

    })
  }  
}
