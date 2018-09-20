import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { AppComponent } from './app.component';
import { DannosComponent } from './reporte_dannos/dannos.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { LoginGuard } from './logIng-app/login.guard';
import { LogInAppComponent } from './logIng-app/logIng-app.component';
import { InicioAppComponent } from './inicio-app/inicio-app.component';
import { ConductorComponent } from './conductor/conductor.component';
import { TablasComponent } from './tablas/tablas.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { NoLoginGuard } from './logIng-app/noLogin.guard';



const APP_ROUTES: Routes = [
   // { path: '', redirectTo: 'usuarios-router', pathMatch: 'full' },
  { path: '', redirectTo: 'entrar-router', pathMatch: 'full' },
  { path : 'app-router', component : AppComponent, canActivate: [LoginGuard] },
  { path : 'dannos-router', component : DannosComponent,  },
  { path : 'mantenimiento-router', component : MantenimientoComponent,  },
  { path : 'entrar-router', component : LogInAppComponent, canActivate:[NoLoginGuard] },
  { path : '', component : LogInAppComponent },

  { path : 'inicio-router', component : InicioAppComponent,canActivate: [LoginGuard] },
  /*   USUARIOS   */
  { path : 'usuario-router', component : InicioAppComponent,canActivate: [LoginGuard]  },
  /*   CANDUCTOR   */
  { path : 'conductor-router', component : ConductorComponent,  },
  /*   TABLAS   */
  {path : 'tablas-router', component : TablasComponent,  },
  /*   VEHICULOS   */
  {path : 'vehiculos-router', component : VehiculoComponent, }


  // { path: 'saludo', component:  }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule,]
  })

export class AppRoutingModule { }