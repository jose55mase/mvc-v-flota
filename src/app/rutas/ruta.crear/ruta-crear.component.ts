import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Alert } from 'selenium-webdriver';

import { Conductor } from '../../modelo/conductor.module';
import { LogsService } from '../../logs/logsService';
import { Logs } from '../../modelo/logs';
import { Permisos } from '../../modelo/permisos.module';
import { Rol } from '../../modelo/rol.module';
import { RutasService } from '../service';
import { Rutas } from '../../modelo/rutas.module';
import { UserService } from '../../usuarios/usuario.crear/user-crear.service';
import { User } from '../../usuarios/modeloUsuarios';
import { VehiculoService } from '../../vehiculo/vehiculoService';
import { Vehiculo } from '../../modelo/vehiculos.modele';
import { ConductorService } from '../../conductor/service';

@Component({
  selector: 'ruta-crear',
  templateUrl: './ruta-crear.component.html',  
  styleUrls: ['./ruta-crear.component.css'],
  providers: [LogsService, RutasService, ConductorService, VehiculoService]
})
export class RutaCrearComponent implements OnInit {
  // Variables
  formulario : FormGroup;
  fullImagePath : any;
  vistaModulo : any;
  fecha = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
  vehiculo : any;
  ruta : Rutas;
  private logs : Logs;
  conductores : Conductor[]
  vehiculos : Vehiculo[]

  // ACCION DE LOS BOTOENES A USAR 
  

  // METODOS POR DEFECTO
  constructor(private vehiculoService : VehiculoService,private conductorService : ConductorService ,private fb:FormBuilder, private rutasService : RutasService, private logsService : LogsService){ 
    this.fullImagePath ="../../assets/images/vehiculos.jpg";
    this.vistaModulo ="../../assets/images/auto1.jpg"
    this.ruta = new Rutas();
    this.logs = new Logs(); 
    this.logs.modulo = "Rutas",
    this.logs.accion = "Crear" 
  }
  ngOnInit(){
    this.validar();
    this.vehiculosTodos();
    this.conductoresTodos();
  }

  // METODOS DE MANEJO DE INFORMACION
  public validar( ){
    this.formulario = this.fb.group({
      'vehiculo':[null, Validators.compose([Validators.required])],
      'conductor':[null, Validators.compose([Validators.required])],
      'ruta':[null, Validators.compose([Validators.required])],
      'inicial_combustible':[null, Validators.compose([Validators.required, Validators.pattern("[0-9]{0}.*[^Aa-zZ]")])],
      'inicial_km':[null, Validators.compose([Validators.required, Validators.pattern("[0-9]{0}.*[^Aa-zZ]")])],
    })
  }
  add(algo){
    this.vehiculo = algo.vehiculo;
  } 
  public crearRuta(){
    this.rutasService.guardarRuta(this.ruta).subscribe( dato => { alert("listo") });
    this.logsService.crearlog(this.logs).subscribe( dato => { } ) 
  }

  conductoresTodos(){
    this.conductorService.findAll().subscribe(
      dato => { this.conductores = dato }
    )
  }

  vehiculosTodos(){
    this.vehiculoService.verVehiculos().subscribe(
      dato => { this.vehiculos = dato }
    )
  }
}
