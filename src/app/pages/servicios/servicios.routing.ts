import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ServiciosComponent } from './servicios.component';
import { ServiciosTableComponent } from './components/servicios-table/servicios-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    children: [
      { path: 'servicios-table', component: ServiciosTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
