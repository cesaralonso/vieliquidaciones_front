import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CorralonesInterface } from './corralones.interface';
import { CorralonesResponseInterface } from './corralones-response.interface';
import { Component, OnInit } from '@angular/core';
import { CorralonesService } from './corralones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CorralonesAddModalComponent } from './corralones-add-modal/corralones-add-modal.component';
import { CorralonesEditModalComponent } from './corralones-edit-modal/corralones-edit-modal.component';


@Component({
  selector: 'corralones-table',
  templateUrl: './corralones-table.html',
  styleUrls: ['./corralones-table.scss'],
})
export class CorralonesTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcorralon';
    sortOrder = 'asc';

    constructor(
      private service: CorralonesService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addCorralonesModalShow() {
      const disposable = this.dialogService.addDialog(CorralonesAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editCorralonesModalShow(corralones: CorralonesInterface) {
      const disposable = this.dialogService.addDialog(CorralonesEditModalComponent, corralones)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
  }

    uploadModalShow(id: number, descripcion: string) {
      const activeModal = this.modalService.open(UploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Corralon';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Corralon';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Corralon';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Corralon';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarCorralon(id)
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
      if (data.idRespuesta === 0) {
        this.toastrService.success(data.mensajeRespuesta);
        this.getAllCorralones();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllCorralones();
    }
    
    private getAllCorralones(): void {
      this.service
          .getAllCorralones()
          .subscribe(
              (data: CorralonesInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
