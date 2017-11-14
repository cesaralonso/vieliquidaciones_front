import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { LiquidacionesInterface } from './liquidaciones.interface';
import { LiquidacionesResponseInterface } from './liquidaciones-response.interface';
import { Component, OnInit } from '@angular/core';
import { LiquidacionesService } from './liquidaciones.service';
import { LiquidacionesAddModalComponent } from './liquidaciones-add-modal/liquidaciones-add-modal.component';
import { LiquidacionesEditModalComponent } from './liquidaciones-edit-modal/liquidaciones-edit-modal.component';


@Component({
  selector: 'liquidaciones-table',
  templateUrl: './liquidaciones-table.html',
  styleUrls: ['./liquidaciones-table.scss'],
})
export class LiquidacionesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idliquidacion';
    sortOrder = 'asc';

    constructor(
      private liquidacionesService: LiquidacionesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService
    ) {
    }

    addLiquidacionesModalShow() {
      this.dialogService.addDialog(LiquidacionesAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null)
    }

    editLiquidacionesModalShow(liquidaciones: LiquidacionesInterface) {
      this.dialogService.addDialog(LiquidacionesEditModalComponent, liquidaciones)
        .subscribe( data =>
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.liquidacionesService.remove(id)
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
        this.getAllLiquidaciones();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllLiquidaciones();
    }
    
    private getAllLiquidaciones(): void {
      this.liquidacionesService
        .all().subscribe( (data: LiquidacionesResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
}
