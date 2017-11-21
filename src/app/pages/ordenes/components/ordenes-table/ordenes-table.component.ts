import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdenesInterface } from './ordenes.interface';
import { OrdenesResponseInterface } from './ordenes-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdenesService } from './ordenes.service';
import { OrdenesAddModalComponent } from './ordenes-add-modal/ordenes-add-modal.component';
import { OrdenesEditModalComponent } from './ordenes-edit-modal/ordenes-edit-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'ordenes-table',
  templateUrl: './ordenes-table.html',
  styleUrls: ['./ordenes-table.scss'],
})
export class OrdenesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idorden';
    sortOrder = 'asc';

    constructor(
      private ordenesService: OrdenesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService,
      private router: Router,
    ) {
    }

    addOrdenesModalShow() {
      this.dialogService.addDialog(OrdenesAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null)
    }

    editOrdenesModalShow(ordenes: OrdenesInterface) {
      this.dialogService.addDialog(OrdenesEditModalComponent, ordenes)
        .subscribe( data =>
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.ordenesService.remove(id)
          .subscribe(
            data => this.showToast(data),
            error => console.log(error),
            () => console.log('Delete completed'));
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast( data ) {
      if ( data.success ) {
        this.toastrService.success(data.message);
        this.getAllOrdenes();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllOrdenes();
    }
    
    private getAllOrdenes(): void {
      this.ordenesService.all() 
        .subscribe( (data: OrdenesResponseInterface) =>
          data.success ? this.data = data.result : null,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 

    seeOrden( idorden ) {
      this.router.navigate(['pages/ordenes/show', idorden]);
    }
}
