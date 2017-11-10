import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RefaccionesComponent } from './refacciones.component';
import { RefaccionesTableComponent } from './components/refacciones-table/refacciones-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: RefaccionesComponent,
    children: [
      { path: 'refacciones-table', component: RefaccionesTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
