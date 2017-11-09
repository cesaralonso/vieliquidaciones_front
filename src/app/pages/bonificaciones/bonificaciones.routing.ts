import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BonificacionesComponent } from './bonificaciones.component';
import { BonificacionesTableComponent } from './components/bonificaciones-table/bonificaciones-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BonificacionesComponent,
    children: [
      { path: 'bonificaciones-table', component: BonificacionesTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
