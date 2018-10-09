import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl ,FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Dannos } from '../../modelo/dannos.modelo';
import { DannosService } from '../../reporte_dannos/dannosService';
import { Mantenimiento } from '../../modelo/mantenimiento.modelo';
import { Logs } from '../../modelo/logs';
import { LogsService } from '../../logs/logsService';




@Component({
  selector: 'creaDannos',
  templateUrl: './creaDannos.component.html',
  styleUrls: ['./creaDannos.component.css'],
  providers: [CreaDannosComponent, LogsService]
})
export class CreaDannosComponent implements OnInit {
  private danno : Dannos;
  formulario : FormGroup;
  informe :string; 
  fechas = new Date();
  private logs : Logs;

  constructor(private dannosService: DannosService, private fb:FormBuilder, private logsService : LogsService) {
    this.danno = new Dannos();
    this.logs = new Logs();     
    this.logs.modulo = "Siniestro",
    this.logs.accion = "Crear"     
  }
  staticAlertClosed = false;

  ngOnInit(){ this.validar();
    setTimeout(() => this.staticAlertClosed = true, 20000);
  }

  public validar( ){
   this.formulario = this.fb.group({
     'titulo':[null, Validators.compose([Validators.required, Validators.minLength(6)])],
     'vehiculo':[null, Validators.required],     
     'informe': [null,Validators.compose([Validators.required , Validators.minLength(20)])]
    
   })
  }
  add(algo){
    this.informe = algo.informe;
  }
  //Gurdar daños
  public saveDannos(): void{
    this.dannosService.guardarDanno(this.danno).subscribe( )
    this.logsService.crearlog(this.logs).subscribe( dato => { } ) 
  }

  vehiculo: any=[
    {id: 1 ,name : '12-AB', ruta : 'Laureles'  },
    {id: 2 ,name : '45-B', ruta : 'Laureles'  },
    {id: 3 ,name : '1-LFB-H', ruta : 'Laureles'  },
    {id: 4 ,name : '1G-H', ruta : 'Poblado'  },
  ]
}

