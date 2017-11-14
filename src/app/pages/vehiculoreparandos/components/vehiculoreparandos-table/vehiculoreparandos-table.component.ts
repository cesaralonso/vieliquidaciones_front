import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculoreparandosInterface } from './vehiculoreparandos.interface';
import { VehiculoreparandosResponseInterface } from './vehiculoreparandos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculoreparandosService } from './vehiculoreparandos.service';
import { VehiculoreparandosAddModalComponent } from './vehiculoreparandos-add-modal/vehiculoreparandos-add-modal.component';
import { VehiculoreparandosEditModalComponent } from './vehiculoreparandos-edit-modal/vehiculoreparandos-edit-modal.component';

@Component({
  selector: 'vehiculoreparandos-table',
  templateUrl: './vehiculoreparandos-table.html',
  styleUrls: ['./vehiculoreparandos-table.scss'],
})
export class VehiculoreparandosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idvehiculoreparando';
    sortOrder = 'asc';

    constructor(
      private service: VehiculoreparandosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addVehiculoreparandosModalShow() {
      this.dialogService.addDialog(VehiculoreparandosAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null )
    }

    editVehiculoreparandosModalShow(vehiculoreparandos: VehiculoreparandosInterface) {
      this.dialogService.addDialog(VehiculoreparandosEditModalComponent, vehiculoreparandos)
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
        this.getAllVehiculoreparandos();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllVehiculoreparandos();
    }
    
    private getAllVehiculoreparandos(): void {
      this.service.all()
        .subscribe( (data: VehiculoreparandosResponseInterface) =>
          this.data = data.result,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
