import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculoreparandosService } from './../vehiculoreparandos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { VehiculoreparandosInterface } from './../vehiculoreparandos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./vehiculoreparandos-add-modal.component.scss')],
  templateUrl: './vehiculoreparandos-add-modal.component.html'
})

export class VehiculoreparandosAddModalComponent extends DialogComponent<VehiculoreparandosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  taller_idtallerAC: AbstractControl;
  enviotaller_idenviotallerAC: AbstractControl;
  fechaIngresaAC: AbstractControl;
  mecanico_idmecanicoAC: AbstractControl;
  fechaSalidaAC: AbstractControl;
  fechaEstimadaAC: AbstractControl;
  inventarioAC: AbstractControl;
  motivoAC: AbstractControl;
  statusAC: AbstractControl;
  ordenAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;


  constructor(
    private service: VehiculoreparandosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

    'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'enviotaller_idenviotallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaIngresaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'mecanico_idmecanicoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaSalidaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaEstimadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'inventarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'motivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'ordenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'permisotaxiasignado_idpermisotaxiasignadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


        this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
        this.enviotaller_idenviotallerAC = this.form.controls['enviotaller_idenviotallerAC'];
        this.fechaIngresaAC = this.form.controls['fechaIngresaAC'];
        this.mecanico_idmecanicoAC = this.form.controls['mecanico_idmecanicoAC'];
        this.fechaSalidaAC = this.form.controls['fechaSalidaAC'];
        this.fechaEstimadaAC = this.form.controls['fechaEstimadaAC'];
        this.inventarioAC = this.form.controls['inventarioAC'];
        this.motivoAC = this.form.controls['motivoAC'];
        this.statusAC = this.form.controls['statusAC'];
        this.ordenAC = this.form.controls['ordenAC'];
        this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: VehiculoreparandosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addVehiculoreparandos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
