import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { BonificacionesInterface } from './bonificaciones.interface';
import { BonificacionesResponseInterface } from './bonificaciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { BonificacionesService } from './bonificaciones.service';
import { BonificacionesAddModalComponent } from './bonificaciones-add-modal/bonificaciones-add-modal.component';
import { BonificacionesEditModalComponent } from './bonificaciones-edit-modal/bonificaciones-edit-modal.component';


@Component({
  selector: 'bonificaciones-table',
  templateUrl: './bonificaciones-table.html',
  styleUrls: ['./bonificaciones-table.scss'],
})
export class BonificacionesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idbonificacion';
    sortOrder = 'asc';

    constructor(
      private service: BonificacionesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addBonificacionesModalShow() {
      this.dialogService.addDialog(BonificacionesAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null)
    }

    editBonificacionesModalShow(bonificaciones: BonificacionesInterface) {
      this.dialogService.addDialog(BonificacionesEditModalComponent, bonificaciones)
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
      if (data.success) {
        this.toastrService.success(data.message);
        this.getAllBonificaciones();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllBonificaciones();
    }
    
    private getAllBonificaciones(): void {
      this.service.all()
        .subscribe( (data: BonificacionesResponseInterface) =>
          this.data = data.result,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    }
}
