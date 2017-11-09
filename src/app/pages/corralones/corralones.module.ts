
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './corralones.routing';
import { CorralonesComponent } from './corralones.component';

import { CorralonesAddModalComponent } from './components/corralones-table/corralones-add-modal/corralones-add-modal.component';
import { CorralonesEditModalComponent } from './components/corralones-table/corralones-edit-modal/corralones-edit-modal.component';
import { CorralonesService } from './components/corralones-table/corralones.service';

import { CorralonesTableComponent } from './components/corralones-table/corralones-table.component';
import { DataFilterPipe } from './components/corralones-table/data-filter.pipe';

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
    CorralonesComponent,
    CorralonesTableComponent,
    DataFilterPipe,
    CorralonesAddModalComponent,
    CorralonesEditModalComponent,
  ],
  entryComponents: [
    CorralonesAddModalComponent,
    CorralonesEditModalComponent,
  ],
  providers: [
    CorralonesService,
  ]
})
export class CorralonesModule {
}
