
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './enviotalleres.routing';
import { EnviotalleresComponent } from './enviotalleres.component';

import { EnviotalleresAddModalComponent } from './components/enviotalleres-table/enviotalleres-add-modal/enviotalleres-add-modal.component';
import { EnviotalleresEditModalComponent } from './components/enviotalleres-table/enviotalleres-edit-modal/enviotalleres-edit-modal.component';
import { EnviotalleresService } from './components/enviotalleres-table/enviotalleres.service';

import { EnviotalleresTableComponent } from './components/enviotalleres-table/enviotalleres-table.component';
import { DataFilterPipe } from './components/enviotalleres-table/data-filter.pipe';

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
    EnviotalleresComponent,
    EnviotalleresTableComponent,
    DataFilterPipe,
    EnviotalleresAddModalComponent,
    EnviotalleresEditModalComponent,
  ],
  entryComponents: [
    EnviotalleresAddModalComponent,
    EnviotalleresEditModalComponent,
  ],
  providers: [
    EnviotalleresService,
  ]
})
export class EnviotalleresModule {
}
