import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FianzasComponent } from './fianzas.component';
import { FianzasTableComponent } from './components/fianzas-table/fianzas-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: FianzasComponent,
    children: [
      { path: 'fianzas-table', component: FianzasTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
