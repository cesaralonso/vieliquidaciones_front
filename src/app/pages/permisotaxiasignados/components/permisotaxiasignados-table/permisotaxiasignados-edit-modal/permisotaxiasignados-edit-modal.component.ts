import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosService } from './../permisotaxiasignados.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisotaxiasignadosInterface } from './../permisotaxiasignados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisotaxiasignados-edit-modal.component.scss')],
  templateUrl: './permisotaxiasignados-edit-modal.component.html'
})

export class PermisotaxiasignadosEditModalComponent extends DialogComponent<PermisotaxiasignadosInterface, any> implements OnInit, PermisotaxiasignadosInterface {

  idpermisotaxiasignado: number;
  vehiculo_idvehiculo: number;
  permisotaxi_idpermisotaxi: number;
  fecha: string;
  status: string;
  chofer_idchofer:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public vehiculo_idvehiculoAC: AbstractControl;
  public permisotaxi_idpermisotaxiAC: AbstractControl;
  public fechaAC: AbstractControl;
  public statusAC: AbstractControl;
  public chofer_idchoferAC: AbstractControl;

  constructor(
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({
      'vehiculo_idvehiculoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxi_idpermisotaxiAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.vehiculo_idvehiculoAC = this.form.controls['vehiculo_idvehiculoAC'];
    this.permisotaxi_idpermisotaxiAC = this.form.controls['permisotaxi_idpermisotaxiAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  }

  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisotaxiasignadosInterface): void {
      this.permisotaxiasignadosService.edit({
          idpermisotaxiasignado: this.idpermisotaxiasignado,
          vehiculo_idvehiculo: this.vehiculo_idvehiculo,
          permisotaxi_idpermisotaxi: this.permisotaxi_idpermisotaxi,
          fecha: this.fecha,
          status: this.status,
          chofer_idchofer: this.chofer_idchofer,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
  }

  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }
}
