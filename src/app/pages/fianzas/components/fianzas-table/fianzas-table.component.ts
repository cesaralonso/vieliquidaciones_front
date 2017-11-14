import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FianzasInterface } from './fianzas.interface';
import { FianzasResponseInterface } from './fianzas-response.interface';
import { Component, OnInit } from '@angular/core';
import { FianzasService } from './fianzas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FianzasAddModalComponent } from './fianzas-add-modal/fianzas-add-modal.component';
import { FianzasEditModalComponent } from './fianzas-edit-modal/fianzas-edit-modal.component';


@Component({
  selector: 'fianzas-table',
  templateUrl: './fianzas-table.html',
  styleUrls: ['./fianzas-table.scss'],
})
export class FianzasTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfianza';
    sortOrder = 'asc';

    constructor(
      private fianzasService: FianzasService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService
    ) {
    }

    addFianzasModalShow() {
      this.dialogService.addDialog(FianzasAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null )
    }

    editFianzasModalShow(fianzas: FianzasInterface) {
      this.dialogService.addDialog(FianzasEditModalComponent, fianzas)
        .subscribe( data => 
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.fianzasService.remove(id)
          .subscribe(
            data => this.showToast(data),
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
        this.getAllFianzas();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllFianzas();
    }
    
    private getAllFianzas(): void {
      this.fianzasService.all()
        .subscribe( (data: FianzasResponseInterface) =>
          this.data = data.result,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
