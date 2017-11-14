import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { RefaccionesInterface } from './refacciones.interface';
import { RefaccionesResponseInterface } from './refacciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { RefaccionesService } from './refacciones.service';
import { RefaccionesAddModalComponent } from './refacciones-add-modal/refacciones-add-modal.component';
import { RefaccionesEditModalComponent } from './refacciones-edit-modal/refacciones-edit-modal.component';

@Component({
  selector: 'refacciones-table',
  templateUrl: './refacciones-table.html',
  styleUrls: ['./refacciones-table.scss'],
})
export class RefaccionesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idrefaccion';
    sortOrder = 'asc';

    constructor(
      private service: RefaccionesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addRefaccionesModalShow() {
      this.dialogService.addDialog(RefaccionesAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null )
    }

    editRefaccionesModalShow(refacciones: RefaccionesInterface) {
      this.dialogService.addDialog(RefaccionesEditModalComponent, refacciones)
        .subscribe( data =>
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
  }
    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.remove(id)
          .subscribe(
            data => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed'));
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if ( data.success ) {
        this.toastrService.success(data.message);
        this.getAllRefacciones();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllRefacciones();
    }
    
    private getAllRefacciones(): void {
      this.service.all() 
        .subscribe( (data: RefaccionesResponseInterface) =>
          data.success ? this.data = data.result : null,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
