import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EnviotalleresInterface } from './enviotalleres.interface';
import { EnviotalleresResponseInterface } from './enviotalleres-response.interface';
import { Component, OnInit } from '@angular/core';
import { EnviotalleresService } from './enviotalleres.service';
import { EnviotalleresAddModalComponent } from './enviotalleres-add-modal/enviotalleres-add-modal.component';
import { EnviotalleresEditModalComponent } from './enviotalleres-edit-modal/enviotalleres-edit-modal.component';

@Component({
  selector: 'enviotalleres-table',
  templateUrl: './enviotalleres-table.html',
  styleUrls: ['./enviotalleres-table.scss'],
})
export class EnviotalleresTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idenviotaller';
    sortOrder = 'asc';

    constructor(
      private service: EnviotalleresService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addEnviotalleresModalShow() {
      this.dialogService.addDialog(EnviotalleresAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null)
    }

    editEnviotalleresModalShow(enviotalleres: EnviotalleresInterface) {
      this.dialogService.addDialog(EnviotalleresEditModalComponent, enviotalleres)
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
        this.getAllEnviotalleres();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllEnviotalleres();
    }
    
    private getAllEnviotalleres(): void {
      this.service.all()
        .subscribe( (data: EnviotalleresResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
}
