import { UploadModalComponent } from './../../../../shared/components/upload-modal/upload-modal.component';
import { FilesUploadModalComponent } from './../../../../shared/components/files-upload-modal/files-upload-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculosInterface } from './vehiculos.interface';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculosService } from './vehiculos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculosAddModalComponent } from './vehiculos-add-modal/vehiculos-add-modal.component';
import { VehiculosEditModalComponent } from './vehiculos-edit-modal/vehiculos-edit-modal.component';


@Component({
  selector: 'vehiculos-table',
  templateUrl: './vehiculos-table.html',
  styleUrls: ['./vehiculos-table.scss'],
})
export class VehiculosTableComponent implements OnInit {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idvehiculo';
    sortOrder = 'asc';

    constructor(
      private service: VehiculosService, 
      private modalService: NgbModal, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    toInt(num: string) {
        return +num;
    }

    addVehiculosModalShow() {
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent)
      .subscribe( data => {
        if (data) {
          this.showToast(data);
        }
      })
    }

    editVehiculosModalShow(vehiculos: VehiculosInterface) {
      const disposable = this.dialogService.addDialog(VehiculosEditModalComponent, vehiculos)
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
      activeModal.componentInstance.modalHeader = 'Agregar Archivo a Vehiculo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.descripcion = descripcion;
      activeModal.componentInstance.referencia = 'Vehiculo';
    }

    filesModalShow(id: number) {
      const activeModal = this.modalService.open(FilesUploadModalComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'Ver Archivos de Vehiculo';
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.referencia = 'Vehiculo';
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.service.cancelarVehiculo(id)
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
        this.getAllVehiculos();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

    ngOnInit() {
        this.getAllVehiculos();
    }
    
    private getAllVehiculos(): void {
      this.service
          .getAllVehiculos()
          .subscribe(
              (data: VehiculosInterface[]) =>  {
                this.data = data;
              },
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
