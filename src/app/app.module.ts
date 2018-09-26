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
import { ListaDannosComponent, ModalDannosVer } from './reporte_dannos/lista/listaDannos.component';
import { DannosComponent } from './reporte_dannos/dannos.component';
import { ModalDannosEditar, EditarDannosComponent } from './reporte_dannos/editar/editarDannos.component';
import { ModalDannosEliminar, EliminarDannosComponent } from './reporte_dannos/eliminar/eliminarDannos.component';
import { ModalDannosAdministrador, AdministradorDannosComponent } from './reporte_dannos/administrador/administradorDannos.component';

/*  MANTENIMIENTO   */
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { CreaMantenimientoComponent } from './mantenimiento/crea/creaMantenimiento.component';
import { ListarMantenimientoComponent } from './mantenimiento/listar/listarMantenimiento.component';
import { EditarMantenimientoComponent, ModalMantenimientoEditar } from './mantenimiento/editar/editarMantenimiento.component';
import { EliminarMantenimientoComponent, ModalMantenimientoEliminar } from './mantenimiento/eliminar/eliminarMantenimiento.component';
import { AdministradorMantenimientoComponent, ModalMantenimientoAdministrador } from './mantenimiento/administrador/administradorMantenimiento.component';
/*  PARA INICIAR SESION   */
import { LoginGuard } from './logIng-app/login.guard';
import { LogInAppComponent } from './logIng-app/logIng-app.component';
import { NoLoginGuard } from './logIng-app/noLogin.guard';
/*   INICIAR APP   */
import { InicioAppComponent } from './inicio-app/inicio-app.component';
/*   USUARIOS   */
import { UserEditarComponent, ModalUserEditar } from './usuarios/usuario-editar/user-editar.component';
import { UserCrearComponent } from './usuarios/usuario.crear/user-crear.component';
import { UserListComponent, ModalUserVista } from './usuarios/usuario-lista/user-list.component';
import { UserEliminarComponent, ModalUserEliminar } from './usuarios/usuario-eliminar/user-eliminar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UserAdministradorComponent, ModalAministradorEditar } from './usuarios/usuario-administrador/user-administrador.component';
 /*   CANDUCTOR   */
import { ConductorCrearComponent } from './conductor/conductor.crear/conductor-crear.component';
import { ConductorComponent } from './conductor/conductor.component';
import { ConductorListarComponent, ModalConductorVista } from './conductor/conductor-lista/conductor-list.component';
import { ConductorEditarComponent, ModalConductorEditar } from './conductor/conductor.editar/conductor.editar.component';
import { ConductorEliminarComponent, ModalConductorEliminar } from './conductor/conductor.eliminar/conductor.eliminar.component';
import { ModalConductorAdministrador, ConductorAdministradorComponent } from './conductor/conductor.administrador/conductor.administrador.component';
/*   TABLAS   */
import { TablasComponent, ModalTabla } from './tablas/tablas.component';
/*   VEHICULOS   */
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { VehiculoCrearComponent } from './vehiculo/crear/crear.vehiculo';
import { VehiculoVerComponent, ModalVehiculoVista } from './vehiculo/ver/ver.vehiculo';
import { VehiculoEditarComponent, ModalVehiculoEditar } from './vehiculo/editar/editar.vehiculo';
import { VehiculoEliminarComponent, ModalVehiculoEliminar } from './vehiculo/eliminar/eliminar.vehiculo';
import { ModalVehiculoAdministrador, VehiculoAdministradorComponent } from './vehiculo/administrador/administrador.vehiculo';
/*   LOGS   */
import { LogsAppComponent } from './logs/logs.component';
/*   ROLES   */
import { RolUsuarioComponent } from './rolUsuario/rolUsuario.component';
/*   SEGURIDAD   */
import { SeguridadComponent } from './rolUsuario/seguridad.component';
import { SeguridadUsuarioRolComponent } from './rolUsuario/seguridad/seguridad.component'; // SEGURIDAD ENCAPSULADA EN COPONENTES.
import { CreaRolComponent } from './rolUsuario/crear-rol/crear-rol.component'; // CREAR UN ROL
import { CreaPermisoComponent } from './rolUsuario/crear-permiso/crear-permiso.component'; // CREAR PERMISOS
import { EditarRolComponent } from './rolUsuario/editar-ro/editar-rol.component'; // EDITAR ROL
import { EditarPermisoComponent } from './rolUsuario/editar-permiso/editar-permiso.component'; // EDITAR PERMISO


@NgModule({
  declarations: [
    AppComponent,

    /*  MANTENIMIENTO   */
    MantenimientoComponent,
    CreaMantenimientoComponent,
    ListarMantenimientoComponent,
    EditarMantenimientoComponent,
    ModalMantenimientoEditar,
    EliminarMantenimientoComponent,
    ModalMantenimientoEliminar,
    AdministradorMantenimientoComponent,
    ModalMantenimientoAdministrador, 
    /*  REPORTE DE DAÑOS   */    
    DannosComponent,
    ListaDannosComponent,
    CreaDannosComponent,
    EditarDannosComponent,
    ModalDannosEditar,
    EliminarDannosComponent,
    ModalDannosEliminar,
    AdministradorDannosComponent,
    ModalDannosAdministrador,
    ModalDannosVer,
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
    UserAdministradorComponent,
    ModalAministradorEditar,
    /*   CANDUCTOR   */
    ConductorComponent,
    ConductorCrearComponent,
    ConductorListarComponent,
    ConductorEditarComponent,
    ModalConductorEditar,
    ModalConductorVista,
    ConductorEliminarComponent,
    ModalConductorEliminar,
    ConductorAdministradorComponent,
    ModalConductorAdministrador,
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
    VehiculoAdministradorComponent,
    ModalVehiculoAdministrador,
    /*   LOGS   */
    LogsAppComponent,
    /*   ROLES   */
    RolUsuarioComponent,
    /*   SEGURIDAD   */
    SeguridadComponent,
    SeguridadUsuarioRolComponent,//  SEGURIDAD ENCAPSULADA EN UNA COMPONENTES..
    CreaRolComponent, // CREAR UN ROL
    CreaPermisoComponent, // CREAR PERMISOS
    EditarRolComponent, // EDITAR ROL
    EditarPermisoComponent, //EDITAR PERMISO
    
  
    

  ],

  entryComponents: [
    /*   USUARIOS   */
    ModalUserEliminar,
    ModalUserEditar,
    ModalUserVista,
    ModalAministradorEditar,
    /*   VEHICULOS   */
    ModalVehiculoVista,
    ModalVehiculoEditar,
    ModalVehiculoEliminar,
    ModalVehiculoAdministrador,
    /*   TABLAS   */
    ModalTabla,
    /*   LOGS   */
    LogsAppComponent,
    /*   CANDUCTOR   */
    ModalConductorEditar,
    ModalConductorVista,
    ModalConductorEliminar,
    ModalConductorAdministrador,
    /*  MANTENIMIENTO   */
    ModalMantenimientoEditar,
    EliminarMantenimientoComponent,
    ModalMantenimientoEliminar,
    ModalMantenimientoAdministrador,
    /*  REPORTE DE DAÑOS   */ 
    ModalDannosEditar,
    ModalDannosEliminar,
    ModalDannosAdministrador,
    ModalDannosVer,
    /*SEGURIDAD*/
    CreaRolComponent,
    CreaPermisoComponent,
    EditarRolComponent, // EDITAR ROL
    EditarPermisoComponent, // EDITAR PERMISO
    
    
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

  
  providers: [LoginGuard, NoLoginGuard],
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
