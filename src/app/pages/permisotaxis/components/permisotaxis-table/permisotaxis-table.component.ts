import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxisInterface } from './permisotaxis.interface';
import { PermisotaxisResponseInterface } from './permisotaxis-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisotaxisService } from './permisotaxis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisotaxisAddModalComponent } from './permisotaxis-add-modal/permisotaxis-add-modal.component';
import { PermisotaxisEditModalComponent } from './permisotaxis-edit-modal/permisotaxis-edit-modal.component';

@Component({
  selector: 'permisotaxis-table',
  templateUrl: './permisotaxis-table.html',
  styleUrls: ['./permisotaxis-table.scss'],
})
export class PermisotaxisTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisotaxi';
    sortOrder = 'asc';

    constructor(
      private service: PermisotaxisService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addPermisotaxisModalShow() {
      this.dialogService.addDialog(PermisotaxisAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null )
    }

    editPermisotaxisModalShow(permisotaxis: PermisotaxisInterface) {
      this.dialogService.addDialog(PermisotaxisEditModalComponent, permisotaxis)
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
        this.getAllPermisotaxis();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllPermisotaxis();
    }
    
    private getAllPermisotaxis(): void {
      this.service.all()
        .subscribe( (data: PermisotaxisResponseInterface) =>
          this.data = data.result,
          error => console.log(error),
          () => console.log('Get all Items complete'))
    } 
}
