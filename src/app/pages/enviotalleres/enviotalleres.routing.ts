import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EnviotalleresComponent } from './enviotalleres.component';
import { EnviotalleresTableComponent } from './components/enviotalleres-table/enviotalleres-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EnviotalleresComponent,
    children: [
      { path: 'enviotalleres-table', component: EnviotalleresTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
