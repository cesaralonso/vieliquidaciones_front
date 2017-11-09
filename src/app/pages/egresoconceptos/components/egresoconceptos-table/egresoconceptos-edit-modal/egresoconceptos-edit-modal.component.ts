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
  total: number;
  taller_idtaller: number;
  fecha: string;
  concepto_idconcepto:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  egresoconcepto: EgresoconceptosInterface = {

    idegresoconcepto: 0,
    total: 0,
    taller_idtaller: 0,
    fecha: '',
    concepto_idconcepto:0,
  };

  idegresoconceptoAC: AbstractControl;
  totalAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  fechaAC: AbstractControl;
  concepto_idconceptoAC: AbstractControl;



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
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'concepto_idconceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idegresoconceptoAC = this.form.controls['idegresoconceptoAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.concepto_idconceptoAC = this.form.controls['concepto_idconceptoAC'];

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
          total: this.total,
          taller_idtaller: this.taller_idtaller,
          fecha: this.fecha,
          concepto_idconcepto: this.concepto_idconcepto,


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
