import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { BonificacionesService } from './../bonificaciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { BonificacionesInterface } from './../bonificaciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./bonificaciones-add-modal.component.scss')],
  templateUrl: './bonificaciones-add-modal.component.html'
})

export class BonificacionesAddModalComponent extends DialogComponent<BonificacionesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;


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
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({


            'validadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'cantidadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'conceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

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
        .addBonificaciones(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
