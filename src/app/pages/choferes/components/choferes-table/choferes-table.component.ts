import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ChoferesInterface } from './choferes.interface';
import { ChoferesResponseInterface } from './choferes-response.interface';
import { Component, OnInit } from '@angular/core';
import { ChoferesService } from './choferes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChoferesAddModalComponent } from './choferes-add-modal/choferes-add-modal.component';
import { ChoferesEditModalComponent } from './choferes-edit-modal/choferes-edit-modal.component';

@Component({
  selector: 'choferes-table',
  templateUrl: './choferes-table.html',
  styleUrls: ['./choferes-table.scss'],
})
export class ChoferesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idchofer';
    sortOrder = 'asc';

    constructor(
      private choferesService: ChoferesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addChoferesModalShow() {
      this.dialogService.addDialog(ChoferesAddModalComponent)
      .subscribe( data =>  data ? this.showToast(data) : null )
    }

    editChoferesModalShow(choferes: ChoferesInterface) {
      const disposable = this.dialogService.addDialog(ChoferesEditModalComponent, choferes)
      .subscribe( data => {
        data ? this.showToast(data) : null
      },
      error => console.log(error),
      () => console.log('Modified complete'));
  }

    uploadModalShow(id: number, descripcion: string) {
      const activeModal = this.modalService.open(UploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Chofer';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Chofer';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Chofer';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Chofer';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.choferesService.remove(id)
          .subscribe(
            (data) => this.showToast(data),
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
        this.getAllChoferes();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllChoferes();
    }
    
    private getAllChoferes(): void {
      this.choferesService.all() 
        .subscribe( (data: ChoferesResponseInterface) => {
          data.success ? this.data = data.result : null
        },
        error => console.log(error),
        () => console.log('Get all Items complete'))
    } 
}
