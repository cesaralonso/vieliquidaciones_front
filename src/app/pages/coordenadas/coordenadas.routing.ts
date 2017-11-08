import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CoordenadasComponent } from './coordenadas.component';
import { CoordenadasTableComponent } from './components/coordenadas-table/coordenadas-table.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CoordenadasComponent,
    children: [
      { path: 'coordenadas-table', component: CoordenadasTableComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
