import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoundEventAst } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from '../../modelo/vehiculos.modele';
import { VehiculoService } from '../vehiculoService';


@Component({
  selector: 'vehiculo-crear',
  templateUrl: './crear.vehiculo.html',
  styleUrls: ['./crear.vehiculo.css'],
  providers:[VehiculoService]
})
export class VehiculoCrearComponent implements OnInit {
  formulario : FormGroup;
  private vehiculo : Vehiculo; 
  modelo :string; 
  constructor(private fb:FormBuilder, private vehiculoServise : VehiculoService) {
    this.vehiculo = new Vehiculo()
        
  }
  ngOnInit(){
    this.validar();
  }
  

  public validar( ){
    this.formulario = this.fb.group({
      'modelo':[null, Validators.compose([Validators.required, Validators.pattern("[Aa-zZ].*[0-9]")])],
      'capasidad_carga':[null, Validators.compose([Validators.required, Validators.pattern("[0-9]{0}.*[^Aa-zZ]") ])],
      'tipo_motor':[null, Validators.compose([Validators.required])],
      'tipo_caja_velocidad':[null, Validators.compose([Validators.required])],
      'trasmision':[null, Validators.compose([Validators.required])],
      'municipio_matricula':[null, Validators.compose([Validators.required])],
      'numero_motor':[null, Validators.compose([Validators.required])],
      'placa':[null, Validators.compose([Validators.required])],
      'propietario':[null, Validators.compose([Validators.required])],
  
    })
   }
  add(algo){
    this.modelo = algo.modelo;
  }

  public crearVehiculo(): void{ 
    this.vehiculoServise.crearVehiculo(this.vehiculo).subscribe( 
      dato => { alert ("Creado") } );
  }
}