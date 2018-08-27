import { Component, OnInit, ViewChild } from '@angular/core';
import { Mantenimiento } from '../../modelo/mantenimiento.modelo';
import { Dannos } from '../../modelo/dannos.modelo';
import { MantenimientoService } from '../serviceMantenimiento';
import {MatPaginator, MatTableDataSource} from '@angular/material'

@Component({
  selector: 'listarMantenimiento',
  templateUrl: './listarMantenimiento.component.html',
  styleUrls: ['./listarMantenimiento.component.css'],
  providers: [MantenimientoService]
})
export class ListarMantenimientoComponent implements OnInit {
  
  private mantenimientos : Mantenimiento[];
  private dannos : Dannos[];    
  displayedColumns = ['Titulo' ,'Informe'  ,'Reporte' ,'Estado'];
  dataSource;

  constructor(private mantenimientoService: MantenimientoService) { }  

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
