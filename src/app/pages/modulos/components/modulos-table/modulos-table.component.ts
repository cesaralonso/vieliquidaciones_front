import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ModulosInterface } from './modulos.interface';
import { ModulosResponseInterface } from './modulos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ModulosService } from './modulos.service';
import { ModulosAddModalComponent } from './modulos-add-modal/modulos-add-modal.component';
import { ModulosEditModalComponent } from './modulos-edit-modal/modulos-edit-modal.component';


@Component({
  selector: 'modulos-table',
  templateUrl: './modulos-table.html',
  styleUrls: ['./modulos-table.scss'],
})
export class ModulosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmodulo';
    sortOrder = 'asc';

    constructor(
      private service: ModulosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addModulosModalShow() {
      this.dialogService.addDialog(ModulosAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null )
    }

    editModulosModalShow(modulos: ModulosInterface) {
      this.dialogService.addDialog(ModulosEditModalComponent, modulos)
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
            () => console.log('Delete completed')
          );
      } else {
        console.log('item.id cancelando', id);
      }
    }

    showToast(data) {
      if (data.success) {
        this.toastrService.success(data.message);
        this.getAllModulos();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllModulos();
    }
    
    private getAllModulos(): void {
      this.service.all()
        .subscribe( (data:ModulosResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
}
