
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './fianzas.routing';
import { FianzasComponent } from './fianzas.component';

import { FianzasAddModalComponent } from './components/fianzas-table/fianzas-add-modal/fianzas-add-modal.component';
import { FianzasEditModalComponent } from './components/fianzas-table/fianzas-edit-modal/fianzas-edit-modal.component';
import { FianzasService } from './components/fianzas-table/fianzas.service';

import { FianzasTableComponent } from './components/fianzas-table/fianzas-table.component';
import { DataFilterPipe } from './components/fianzas-table/data-filter.pipe';

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
    FianzasComponent,
    FianzasTableComponent,
    DataFilterPipe,
    FianzasAddModalComponent,
    FianzasEditModalComponent,
  ],
  entryComponents: [
    FianzasAddModalComponent,
    FianzasEditModalComponent,
  ],
  providers: [
    FianzasService,
  ]
})
export class FianzasModule {
}
