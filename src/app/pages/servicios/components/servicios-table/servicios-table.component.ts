import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ServiciosInterface } from './servicios.interface';
import { ServiciosResponseInterface } from './servicios-response.interface';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { ServiciosAddModalComponent } from './servicios-add-modal/servicios-add-modal.component';
import { ServiciosEditModalComponent } from './servicios-edit-modal/servicios-edit-modal.component';


@Component({
  selector: 'servicios-table',
  templateUrl: './servicios-table.html',
  styleUrls: ['./servicios-table.scss'],
})
export class ServiciosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idservicio';
    sortOrder = 'asc';

    constructor(
      private service: ServiciosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addServiciosModalShow() {
      this.dialogService.addDialog(ServiciosAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null )
    }

    editServiciosModalShow(servicios: ServiciosInterface) {
      this.dialogService.addDialog(ServiciosEditModalComponent, servicios)
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
      if ( data.success ) {
        this.toastrService.success(data.message);
        this.getAllServicios();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllServicios();
    }
    
    private getAllServicios(): void {
      this.service.all() 
        .subscribe( (data: ServiciosResponseInterface) =>
          data.success ? this.data = data.result : null,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
