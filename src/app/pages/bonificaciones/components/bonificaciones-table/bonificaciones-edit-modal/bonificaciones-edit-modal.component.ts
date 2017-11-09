import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { BonificacionesService } from './../bonificaciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { BonificacionesInterface } from './../bonificaciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./bonificaciones-edit-modal.component.scss')],
  templateUrl: './bonificaciones-edit-modal.component.html'
})

export class BonificacionesEditModalComponent extends DialogComponent<BonificacionesInterface, any> implements OnInit, BonificacionesInterface {


  idbonificacion: number;
  validado: boolean;
  status: string;
  cantidad: number;
  concepto: string;
  chofer_idchofer: number;


  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  bonificacion: BonificacionesInterface = {
    idbonificacion: 0,
    validado: false,
    status: '',
    cantidad: 0,
    concepto: '',
    chofer_idchofer: 0,

  };

  idbonificacionAC: AbstractControl;
  validadoAC: AbstractControl;
  statusAC: AbstractControl;
  cantidadAC: AbstractControl;
  conceptoAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;



  constructor(
    private service: BonificacionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idbonificacionAC' : this.id,
      'validadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantidadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'conceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idbonificacionAC = this.form.controls['idbonificacionAC'];
    this.validadoAC = this.form.controls['validadoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
    this.conceptoAC = this.form.controls['conceptoAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: BonificacionesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editBonificaciones({

          idbonificacion: this.idbonificacion,
          validado: this.validado,
          status: this.status,
          cantidad: this.cantidad,
          concepto: this.concepto,
          chofer_idchofer: this.chofer_idchofer,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getBonificaciones(): void {
    this.service.getBonificaciones(this.id)
        .subscribe( data => {
          this.bonificacion = data[1];
        },
        error => console.log(error),
        () => console.log('Get bonificacion complete'));
  }

}
