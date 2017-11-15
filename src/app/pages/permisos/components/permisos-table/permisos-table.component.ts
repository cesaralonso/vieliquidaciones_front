import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisosInterface } from './permisos.interface';
import { PermisosResponseInterface } from './permisos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisosService } from './permisos.service';
import { PermisosAddModalComponent } from './permisos-add-modal/permisos-add-modal.component';
import { PermisosEditModalComponent } from './permisos-edit-modal/permisos-edit-modal.component';

@Component({
  selector: 'permisos-table',
  templateUrl: './permisos-table.html',
  styleUrls: ['./permisos-table.scss'],
})
export class PermisosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermiso';
    sortOrder = 'asc';

    constructor(
      private service: PermisosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    addPermisosModalShow() {
      this.dialogService.addDialog(PermisosAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null)
    }

    editPermisosModalShow(permisos: PermisosInterface) {
      this.dialogService.addDialog(PermisosEditModalComponent, permisos)
        .subscribe( data =>
          data ? this.showToast(data) :null ,
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
        this.getAllPermisos();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
        this.getAllPermisos();
    }
    
    private getAllPermisos(): void {
      this.service.all()
        .subscribe( (data: PermisosResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
}
