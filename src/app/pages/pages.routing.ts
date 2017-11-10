import { Routes, RouterModule, CanActivate } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '../shared/auth-guard.service';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'forgot',
    loadChildren: 'app/pages/forgot/forgot.module#ForgotModule'
  },
  {
    path: 'change-password',
    loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule', 
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'bonificaciones', loadChildren: './bonificaciones/bonificaciones.module#BonificacionesModule' },
      { path: 'choferes', loadChildren: './choferes/choferes.module#ChoferesModule' },
      { path: 'conceptos', loadChildren: './conceptos/conceptos.module#ConceptosModule' },
      { path: 'coordenadas', loadChildren: './coordenadas/coordenadas.module#CoordenadasModule' },
      { path: 'corralones', loadChildren: './corralones/corralones.module#CorralonesModule' },
      { path: 'egresoconceptos', loadChildren: './egresoconceptos/egresoconceptos.module#EgresoconceptosModule' },
      { path: 'enviotalleres', loadChildren: './enviotalleres/enviotalleres.module#EnviotalleresModule' },
      { path: 'fianzas', loadChildren: './fianzas/fianzas.module#FianzasModule' },
      { path: 'folios', loadChildren: './folios/folios.module#FoliosModule' },
      { path: 'liquidaciones', loadChildren: './liquidaciones/liquidaciones.module#LiquidacionesModule' },
      { path: 'mecanicos', loadChildren: './mecanicos/mecanicos.module#MecanicosModule' },
      { path: 'modulos', loadChildren: './modulos/modulos.module#ModulosModule' },
      { path: 'permisos', loadChildren: './permisos/permisos.module#PermisosModule' },
      { path: 'permisotaxiasignados', loadChildren: './permisotaxiasignados/permisotaxiasignados.module#PermisotaxiasignadosModule' },
      { path: 'permisotaxis', loadChildren: './permisotaxis/permisotaxis.module#PermisotaxisModule' },
      { path: 'personas', loadChildren: './personas/personas.module#PersonasModule' },
      { path: 'talleres', loadChildren: './talleres/talleres.module#TalleresModule' },
      { path: 'vehiculoreparandos', loadChildren: './vehiculoreparandos/vehiculoreparandos.module#VehiculoreparandosModule' },
      { path: 'vehiculos', loadChildren: './vehiculos/vehiculos.module#VehiculosModule' },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',
      //   canActivateChild: [AuthGuard] },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
