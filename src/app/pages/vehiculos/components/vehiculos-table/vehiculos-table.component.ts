import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { VehiculosInterface } from './vehiculos.interface';
import { VehiculosResponseInterface } from './vehiculos-response.interface';
import { Component, OnInit } from '@angular/core';
import { VehiculosService } from './vehiculos.service';
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
      private vehiculosService: VehiculosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }

    addVehiculosModalShow() {
      this.dialogService.addDialog(VehiculosAddModalComponent)
        .subscribe( data => data ? this.showToast(data) : null )
    }

    editVehiculosModalShow(vehiculos: VehiculosInterface) {
      this.dialogService.addDialog(VehiculosEditModalComponent, vehiculos)
        .subscribe( data => 
          data ? this.showToast(data) : null,
          error => console.log(error),
          () => console.log('Modified complete'));
    }

    onDeleteConfirm(event, id): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
        this.vehiculosService.remove(id)
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
        this.getAllVehiculos();
      } else {
        this.toastrService.error(data.message);
      }
    }

    ngOnInit() {
      this.getAllVehiculos();
    }
    
    private getAllVehiculos(): void {
      this.vehiculosService.all()
          .subscribe( (data: VehiculosResponseInterface) =>
              this.data = data.result,
              error => console.log(error),
              () => console.log('Get all Items complete'))
    } 
}
