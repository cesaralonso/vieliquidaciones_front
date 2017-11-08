import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ChoferesComponent } from './choferes.component';
import { ChoferesTableComponent } from './components/choferes-table/choferes-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ChoferesComponent,
    children: [
      { path: 'choferes-table', component: ChoferesTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
