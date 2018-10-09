import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Mantenimiento } from '../../modelo/mantenimiento.modelo';
import { Dannos } from '../../modelo/dannos.modelo';
import { MantenimientoService } from '../serviceMantenimiento';
import {MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA} from '@angular/material'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logs } from '../../modelo/logs';
import { LogsService } from '../../logs/logsService';

@Component({
  selector: 'editar-mantenimiento',
  templateUrl: './editarMantenimiento.component.html',
  styleUrls: ['./editarMantenimiento.component.css'],
  providers: [MantenimientoService]
})
export class EditarMantenimientoComponent implements OnInit {
  
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
  
  verMantenimiento(mantenimiento){
    sessionStorage.setItem('mantenimiento', JSON.stringify(mantenimiento))
    this.ver.open(ModalMantenimientoEditar)
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
  templateUrl: './modalMantenimientoEditar.html',  
  providers: [MantenimientoService, LogsService]
})
export class ModalMantenimientoEditar implements OnInit{
  mantenimiento: Mantenimiento;
  private logs : Logs;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mantenimientoService: MantenimientoService, public ver : MatDialog, private modalService: NgbModal, private logsService : LogsService) {
    if (sessionStorage.getItem("mantenimiento")) {
      this.mantenimiento = JSON.parse(sessionStorage.getItem("mantenimiento"));
    } else {
      this.mantenimiento = new Mantenimiento();
    }
    this.logs = new Logs();     
    this.logs.modulo = "Mantenimiento",
    this.logs.accion = "Editar"
  }
  ngOnInit(){  };

  editarMantenimiento(content): void {
    this.mantenimientoService.guardarMantenimiento(this.mantenimiento).subscribe(
      dato => {  }      
    );
    this.modalService.open(content, { size: 'sm' });
    this.logsService.crearlog(this.logs).subscribe( dato => { } )
  }
  
}
