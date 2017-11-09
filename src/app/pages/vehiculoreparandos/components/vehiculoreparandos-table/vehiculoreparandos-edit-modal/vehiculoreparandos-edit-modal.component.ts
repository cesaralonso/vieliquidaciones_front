import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculoreparandosService } from './../vehiculoreparandos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { VehiculoreparandosInterface } from './../vehiculoreparandos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./vehiculoreparandos-edit-modal.component.scss')],
  templateUrl: './vehiculoreparandos-edit-modal.component.html'
})

export class VehiculoreparandosEditModalComponent extends DialogComponent<VehiculoreparandosInterface, any> implements OnInit, VehiculoreparandosInterface {


  idvehiculoreparando: number;
  taller_idtaller: number;
  enviotaller_idenviotaller: number;
  fechaIngresa: string;
  mecanico_idmecanico: number;
  fechaSalida: string;
  fechaEstimada: string;
  inventario:string;
  motivo:string;
  status: string;
  orden:string;
  permisotaxiasignado_idpermisotaxiasignado:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  vehiculoreparando: VehiculoreparandosInterface = {

    idvehiculoreparando: 0,
    taller_idtaller: 0,
    enviotaller_idenviotaller: 0,
    fechaIngresa: '',
    mecanico_idmecanico: 0,
    fechaSalida: '',
    fechaEstimada: '',
    inventario:'',
    motivo:'',
    status: '',
    orden:'',
    permisotaxiasignado_idpermisotaxiasignado:0,
  };

  idvehiculoreparandoAC: AbstractControl;
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
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idvehiculoreparandoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
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


    this.idvehiculoreparandoAC = this.form.controls['idvehiculoreparandoAC'];
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
        .editVehiculoreparandos({


          idvehiculoreparando: this.idvehiculoreparando,
          taller_idtaller: this.taller_idtaller,
          enviotaller_idenviotaller: this.enviotaller_idenviotaller,
          fechaIngresa: this.fechaIngresa,
          mecanico_idmecanico: this.mecanico_idmecanico,
          fechaSalida: this.fechaSalida,
          fechaEstimada: this.fechaEstimada,
          inventario: this.inventario,
          motivo: this.motivo,
          status: this.status,
          orden: this.orden,
          permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getVehiculoreparandos(): void {
    this.service.getVehiculoreparandos(this.id)
        .subscribe( data => {
          this.vehiculoreparando = data[1];
        },
        error => console.log(error),
        () => console.log('Get vehiculoreparando complete'));
  }

}
