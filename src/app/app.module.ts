import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgAutoCompleteModule} from "ng-auto-complete";

import {CdkTableModule} from '@angular/cdk/table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatExpansionModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,

} from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';


/*  REPORTE DE DAÑOS   */   
import { CreaDannosComponent } from './reporte_dannos/crea/creaDannos.component';
import { ListaDannosComponent } from './reporte_dannos/lista/listaDannos.component';
import { DannosComponent } from './reporte_dannos/dannos.component';
/*  MANTENIMIENTO   */
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { CreaMantenimientoComponent } from './mantenimiento/crea/creaMantenimiento.component';
import { ListarMantenimientoComponent } from './mantenimiento/listar/listarMantenimiento.component';
/*  PARA INICIAR SESION   */
import { LoginGuard } from './logIng-app/login.guard';
import { LogInAppComponent } from './logIng-app/logIng-app.component';
/*   INICIAR APP   */
import { InicioAppComponent } from './inicio-app/inicio-app.component';
/*   USUARIOS   */
import { UserEditarComponent, ModalUserEditar } from './usuarios/usuario-editar/user-editar.component';
import { UserCrearComponent } from './usuarios/usuario.crear/user-crear.component';
import { UserListComponent, ModalUserVista } from './usuarios/usuario-lista/user-list.component';
import { UserEliminarComponent, ModalUserEliminar } from './usuarios/usuario-eliminar/user-eliminar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
 /*   CANDUCTOR   */
import { ConductorCrearComponent } from './conductor/conductor.crear/conductor-crear.component';
import { ConductorComponent } from './conductor/conductor.component';
import { ConductorListarComponent } from './conductor/conductor-lista/conductor-list.component';
/*   TABLAS   */
import { TablasComponent, ModalTabla } from './tablas/tablas.component';
/*   VEHICULOS   */
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { VehiculoCrearComponent } from './vehiculo/crear/crear.vehiculo';
import { VehiculoVerComponent, ModalVehiculoVista } from './vehiculo/ver/ver.vehiculo';
import { VehiculoEditarComponent, ModalVehiculoEditar } from './vehiculo/editar/editar.vehiculo';
import { VehiculoEliminarComponent, ModalVehiculoEliminar } from './vehiculo/eliminar/eliminar.vehiculo';
import { LogsAppComponent } from './logs/logs.component';



@NgModule({
  declarations: [
    AppComponent,

    /*  MANTENIMIENTO   */
    MantenimientoComponent,
    CreaMantenimientoComponent,
    ListarMantenimientoComponent,
    /*  REPORTE DE DAÑOS   */    
    DannosComponent,
    ListaDannosComponent,
    CreaDannosComponent,
    /*  PARA INICIAR SESION   */
    LogInAppComponent,
    /*   INICIAR APP   */
    InicioAppComponent,
    /*   USUARIOS   */
    UsuariosComponent,
    UserEditarComponent,
    UserCrearComponent,
    UserListComponent,
    UserEliminarComponent,
    ModalUserEliminar,
    ModalUserEditar,
    ModalUserVista,
    /*   CANDUCTOR   */
    ConductorComponent,
    ConductorCrearComponent,
    ConductorListarComponent,
    /*   TABLAS   */
    TablasComponent,
    ModalTabla,
    /*   VEHICULOS   */
    VehiculoComponent,
    VehiculoCrearComponent,
    VehiculoVerComponent,
    ModalVehiculoVista,
    VehiculoEditarComponent,
    ModalVehiculoEditar,
    VehiculoEliminarComponent,
    ModalVehiculoEliminar,
    /*   LOGS   */
    LogsAppComponent,
    

  ],

  entryComponents: [
    /*   USUARIOS   */
    ModalUserEliminar,
    ModalUserEditar,
    ModalUserVista,
    /*   VEHICULOS   */
    ModalVehiculoVista,
    ModalVehiculoEditar,
    ModalVehiculoEliminar,
    /*   TABLAS   */
    ModalTabla,
    /*   LOGS   */
    LogsAppComponent,
    
  ],

  imports: [
    NgAutoCompleteModule,
    NgbModule.forRoot(),
    CdkTableModule,
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatExpansionModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,    
  ],


  providers: [LoginGuard],
  bootstrap: [AppComponent]
})

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,

    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class AppModule { }
