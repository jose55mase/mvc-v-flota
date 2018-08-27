import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import { User } from '../modelo/usuario.modulo';
import { LogsService } from './logsService';
import { Logs } from '../modelo/logs';



@Component({
  selector: 'logs-app',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  providers :[ LogsService ]
})

export class LogsAppComponent implements OnInit {
  private logs : Logs;
  public Arraylogs : Logs[];
  dataSource : any;
  displayedColumns = ['usuario','modulo','accion','fecha'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  ngOnInit(){
    this.getListaLogs();
    this.logsService.findAll().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })
  }
  constructor( private logsService : LogsService ) { this.logs = new Logs() }
  
  public crearVehiculo(): void{ 
    this.logsService.crearlog(this.logs).subscribe( 
      dato => { alert ("Creado") } );
  }
  getListaLogs() {
    this.logsService.findAll().subscribe(
      dato => { this.Arraylogs = dato }, err => { console.log(err) }
    );
  }
  elemento =  new MatTableDataSource<Logs>(this.Arraylogs);
  public verLogs(Arraylogs){ sessionStorage.setItem('logsLista',JSON.stringify(Arraylogs))   }

  public tablaLogs(){
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}