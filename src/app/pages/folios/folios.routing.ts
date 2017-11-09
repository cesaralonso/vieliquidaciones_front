import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FoliosComponent } from './folios.component';
import { FoliosTableComponent } from './components/folios-table/folios-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: FoliosComponent,
    children: [
      { path: 'folios-table', component: FoliosTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
