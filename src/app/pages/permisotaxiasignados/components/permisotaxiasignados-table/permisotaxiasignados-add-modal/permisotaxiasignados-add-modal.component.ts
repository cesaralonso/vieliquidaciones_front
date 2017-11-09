import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosService } from './../permisotaxiasignados.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisotaxiasignadosInterface } from './../permisotaxiasignados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisotaxiasignados-add-modal.component.scss')],
  templateUrl: './permisotaxiasignados-add-modal.component.html'
})

export class PermisotaxiasignadosAddModalComponent extends DialogComponent<PermisotaxiasignadosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  vehiculo_idvehiculoAC: AbstractControl;
  permisotaxi_idpermisotaxiAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;


  constructor(
    private service: PermisotaxiasignadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
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
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addPermisotaxiasignados(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
