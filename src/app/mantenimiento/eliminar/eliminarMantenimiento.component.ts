import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Mantenimiento } from '../../modelo/mantenimiento.modelo';
import { Dannos } from '../../modelo/dannos.modelo';
import { MantenimientoService } from '../serviceMantenimiento';
import {MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA} from '@angular/material'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logs } from '../../modelo/logs';
import { LogsService } from '../../logs/logsService';

@Component({
  selector: 'eliminar-mantenimiento',
  templateUrl: './eliminarMantenimiento.component.html',
  styleUrls: ['./eliminarMantenimiento.component.css'],
  providers: [MantenimientoService]
})
export class EliminarMantenimientoComponent implements OnInit {
  
  private mantenimientos : Mantenimiento[];
  private dannos : Dannos[];    
  displayedColumns = ['Titulo' ,'Informe'  ,'Reporte' ,'Estado', 'Accion'];
  dataSource;

  constructor(private mantenimientoService: MantenimientoService, public ver : MatDialog) { }  

  getAllUsers() {
    this.mantenimientoService.findAll().subscribe(
      mantenimiento => {
        this.mantenimientos = mantenimiento;
      },
      err => {
        console.log(err);
      }
    );
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;  
  elemento =  new MatTableDataSource<Mantenimiento>(this.mantenimientos);
  
  eliminarMantenimiento(mantenimiento){
    sessionStorage.setItem('mantenimiento', JSON.stringify(mantenimiento))
    this.ver.open(ModalMantenimientoEliminar)
  }

  ngOnInit() {    
    this.getAllUsers();
    this.mantenimientoService.findAll().subscribe(results =>{
      if(!results){
        return
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.applyFilter = this.applyFilter;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
}

@Component({  
  templateUrl: './modalMantenimientoEliminar.html',  
  providers: [MantenimientoService, LogsService]
})
export class ModalMantenimientoEliminar implements OnInit{
  mantenimiento: Mantenimiento;
  private logs : Logs;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private logsService : LogsService, private mantenimientoService: MantenimientoService, public ver : MatDialog, private modalService: NgbModal) {
    if (sessionStorage.getItem("mantenimiento")) {
      this.mantenimiento = JSON.parse(sessionStorage.getItem("mantenimiento"));
    } else {
      this.mantenimiento = new Mantenimiento();
    }
    this.logs = new Logs();     
    this.logs.modulo = "Mantenimiento",
    this.logs.accion = "Eliminar"
  }
  ngOnInit(){  };
  
  public confirmarEliminar(content){
    this.modalService.open(content, { size: 'sm' });
  }
  public eliminarMantenimiento(mantenimiento){
    this.mantenimientoService.delete(mantenimiento)
    this.logsService.crearlog(this.logs).subscribe( dato => { } )
  }
}
