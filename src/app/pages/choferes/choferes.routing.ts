import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ChoferesComponent } from './choferes.component';
import { ChoferesTableComponent } from './components/choferes-table/choferes-table.component';
import { ChoferesCreateComponent } from 'app/pages/choferes/components/choferes-create/choferes-create.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ChoferesComponent,
    children: [
      { path: 'all', component: ChoferesTableComponent },
      { path: 'create', component: ChoferesCreateComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
