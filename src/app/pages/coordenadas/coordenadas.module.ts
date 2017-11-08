
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './coordenadas.routing';
import { CoordenadasComponent } from './coordenadas.component';

import { CoordenadasAddModalComponent } from './components/coordenadas-table/coordenadas-add-modal/coordenadas-add-modal.component';
import { CoordenadasEditModalComponent } from './components/coordenadas-table/coordenadas-edit-modal/coordenadas-edit-modal.component';
import { CoordenadasService } from './components/coordenadas-table/coordenadas.service';

import { CoordenadasTableComponent } from './components/coordenadas-table/coordenadas-table.component';
import { DataFilterPipe } from './components/coordenadas-table/data-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })    
    
  ],
  declarations: [
    CoordenadasComponent,
    CoordenadasTableComponent,
    DataFilterPipe,
    CoordenadasAddModalComponent,
    CoordenadasEditModalComponent,
  ],
  entryComponents: [
    CoordenadasAddModalComponent,
    CoordenadasEditModalComponent,
  ],
  providers: [
    CoordenadasService,
  ]
})
export class CoordenadasModule {
}
