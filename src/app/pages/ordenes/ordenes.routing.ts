import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrdenesComponent } from './ordenes.component';
import { OrdenesTableComponent } from './components/ordenes-table/ordenes-table.component';
import { OrdenesCreateComponent } from 'app/pages/ordenes/components/ordenes-create/ordenes-create.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OrdenesComponent,
    children: [
      { path: 'all', component: OrdenesTableComponent },
      { path: 'create', component: OrdenesCreateComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
