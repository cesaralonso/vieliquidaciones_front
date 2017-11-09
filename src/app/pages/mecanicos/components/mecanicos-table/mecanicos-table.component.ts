import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { MecanicosInterface } from './mecanicos.interface';
import { MecanicosResponseInterface } from './mecanicos-response.interface';
import { Component, OnInit } from '@angular/core';
import { MecanicosService } from './mecanicos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MecanicosAddModalComponent } from './mecanicos-add-modal/mecanicos-add-modal.component';
import { MecanicosEditModalComponent } from './mecanicos-edit-modal/mecanicos-edit-modal.component';


@Component({
  selector: 'mecanicos-table',
  templateUrl: './mecanicos-table.html',
  styleUrls: ['./mecanicos-table.scss'],
})
export class MecanicosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmecanico';
    sortOrder = 'asc';

    constructor(
      private service: MecanicosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addMecanicosModalShow() {
      const disposable = this.dialogService.addDialog(MecanicosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editMecanicosModalShow(mecanicos: MecanicosInterface) {
      const disposable = this.dialogService.addDialog(MecanicosEditModalComponent, mecanicos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Mecanico';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Mecanico';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Mecanico';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Mecanico';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarMecanico(id)
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
        this.getAllMecanicos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllMecanicos();
    }
    
    private getAllMecanicos(): void {
      this.service
          .getAllMecanicos()
          .subscribe(
              (data: MecanicosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
