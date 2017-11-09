
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './mecanicos.routing';
import { MecanicosComponent } from './mecanicos.component';

import { MecanicosAddModalComponent } from './components/mecanicos-table/mecanicos-add-modal/mecanicos-add-modal.component';
import { MecanicosEditModalComponent } from './components/mecanicos-table/mecanicos-edit-modal/mecanicos-edit-modal.component';
import { MecanicosService } from './components/mecanicos-table/mecanicos.service';

import { MecanicosTableComponent } from './components/mecanicos-table/mecanicos-table.component';
import { DataFilterPipe } from './components/mecanicos-table/data-filter.pipe';

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
    MecanicosComponent,
    MecanicosTableComponent,
    DataFilterPipe,
    MecanicosAddModalComponent,
    MecanicosEditModalComponent,
  ],
  entryComponents: [
    MecanicosAddModalComponent,
    MecanicosEditModalComponent,
  ],
  providers: [
    MecanicosService,
  ]
})
export class MecanicosModule {
}
