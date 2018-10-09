import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Alert } from 'selenium-webdriver';

import { Conductor } from '../../modelo/conductor.module';
import { ConductorService } from '../service';
import { LogsService } from '../../logs/logsService';
import { Logs } from '../../modelo/logs';

@Component({
  selector: 'app-conductor-crear',
  templateUrl: './conductor-crear.component.html',  
  styleUrls: ['./conductor-crear.component.css'],
  providers: [LogsService]
})
export class ConductorCrearComponent  {
 
  private conductor: Conductor;
  private logs : Logs;
  constructor( private conductorService : ConductorService, private logsService : LogsService ) { 
    this.conductor = new Conductor();   
    this.logs = new Logs();     
    this.logs.modulo = "Conductor",
    this.logs.accion = "Crear"
    
  }
  nombre : string = "[a-z].*"
  apellido : string = ""
  cedula : string =  ""
  correo : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  telefono : string = ""


  creaConductor(): void{
    if(this.conductor.correo != ""){      
      this.conductorService.guardarCanductor(this.conductor).subscribe( dato => { alert(" Usuario creado " ) } )
      this.logsService.crearlog(this.logs).subscribe( dato => { } )
    }else{
      alert("correo")
    }
  }
}
