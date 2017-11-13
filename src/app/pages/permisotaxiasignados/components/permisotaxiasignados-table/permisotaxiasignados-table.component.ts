import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxiasignadosService } from './permisotaxiasignados.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisotaxiasignadosAddModalComponent } from './permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
import { PermisotaxiasignadosEditModalComponent } from './permisotaxiasignados-edit-modal/permisotaxiasignados-edit-modal.component';


@Component({
  selector: 'permisotaxiasignados-table',
  templateUrl: './permisotaxiasignados-table.html',
  styleUrls: ['./permisotaxiasignados-table.scss'],
})
export class PermisotaxiasignadosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxiasignado';
    sortOrder = 'asc';

  constructor(
    private service: PermisotaxiasignadosService, 
    private modalService: NgbModal, 
    private toastrService: ToastrService, 
    private dialogService: DialogService) {
  }

  addPermisotaxiasignadosModalShow() {
    this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => data ? this.showToast(data) : null )
  }

  editPermisotaxiasignadosModalShow(permisotaxiasignados: PermisotaxiasignadosInterface) {
      this.dialogService.addDialog(PermisotaxiasignadosEditModalComponent, permisotaxiasignados)
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
        this.getAllPermisotaxiasignados();
      } else {
        this.toastrService.error(data.message);
      }
  }

  ngOnInit() {
    this.getAllPermisotaxiasignados();
  }
    
  private getAllPermisotaxiasignados(): void {
    this.service.all()
        .subscribe( (data: PermisotaxiasignadosResponseInterface) =>
            this.data = data.result,
            error => console.log(error),
            () => console.log('Get all Items complete'))
  } 
}
