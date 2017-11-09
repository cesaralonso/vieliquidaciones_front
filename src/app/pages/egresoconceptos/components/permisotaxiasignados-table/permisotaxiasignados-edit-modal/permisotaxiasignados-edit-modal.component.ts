import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EgresoconceptosService } from './../egresoconceptos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { EgresoconceptosInterface } from './../egresoconceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./egresoconceptos-edit-modal.component.scss')],
  templateUrl: './egresoconceptos-edit-modal.component.html'
})

export class EgresoconceptosEditModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit, EgresoconceptosInterface {


  idegresoconcepto: number;
  vehiculo_idvehiculo: number;
  permisotaxi_idpermisotaxi: number;
  fecha: string;
  status: string;
  chofer_idchofer:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  egresoconcepto: EgresoconceptosInterface = {

    idegresoconcepto: 0,
    vehiculo_idvehiculo: 0,
    permisotaxi_idpermisotaxi: 0,
    fecha: '',
    status: '',
    chofer_idchofer:0,
  };

  idegresoconceptoAC: AbstractControl;
  vehiculo_idvehiculoAC: AbstractControl;
  permisotaxi_idpermisotaxiAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;



  constructor(
    private service: EgresoconceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idegresoconceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'vehiculo_idvehiculoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxi_idpermisotaxiAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idegresoconceptoAC = this.form.controls['idegresoconceptoAC'];
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

  onSubmit(values: EgresoconceptosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editEgresoconceptos({


          idegresoconcepto: this.idegresoconcepto,
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
  }

  private getEgresoconceptos(): void {
    this.service.getEgresoconceptos(this.id)
        .subscribe( data => {
          this.egresoconcepto = data[1];
        },
        error => console.log(error),
        () => console.log('Get egresoconcepto complete'));
  }

}
