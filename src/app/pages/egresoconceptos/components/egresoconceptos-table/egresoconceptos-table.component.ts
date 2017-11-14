import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EgresoconceptosInterface } from './egresoconceptos.interface';
import { EgresoconceptosResponseInterface } from './egresoconceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { EgresoconceptosService } from './egresoconceptos.service';
import { EgresoconceptosAddModalComponent } from './egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EgresoconceptosEditModalComponent } from './egresoconceptos-edit-modal/egresoconceptos-edit-modal.component';

@Component({
  selector: 'egresoconceptos-table',
  templateUrl: './egresoconceptos-table.html',
  styleUrls: ['./egresoconceptos-table.scss'],
})
export class EgresoconceptosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idegresoconcepto';
    sortOrder = 'asc';

    constructor(
      private egresoconceptosService: EgresoconceptosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addEgresoconceptosModalShow() {
      this.dialogService.addDialog(EgresoconceptosAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null)
    }

    editEgresoconceptosModalShow(egresoconceptos: EgresoconceptosInterface) {
      this.dialogService.addDialog(EgresoconceptosEditModalComponent, egresoconceptos)
        .subscribe( data => 
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
  }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.egresoconceptosService.remove(id)
          .subscribe(
            (data) => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed')
          );
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if ( data.success ) {
        this.toastrService.success(data.message);
        this.getAllEgresoconceptos();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllEgresoconceptos();
    }
    
    private getAllEgresoconceptos(): void {
      this.egresoconceptosService.all()
        .subscribe( (data: EgresoconceptosResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
}
