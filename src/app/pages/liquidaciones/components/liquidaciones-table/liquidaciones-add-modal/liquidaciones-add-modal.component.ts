import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { LiquidacionesService } from './../liquidaciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { LiquidacionesInterface } from './../liquidaciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./liquidaciones-add-modal.component.scss')],
  templateUrl: './liquidaciones-add-modal.component.html'
})

export class LiquidacionesAddModalComponent extends DialogComponent<LiquidacionesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;


  cantidadRecibidaAC: AbstractControl;
  cambioAC: AbstractControl;
  folioAC: AbstractControl;
  kilometrajeAC: AbstractControl;
  fechaAC: AbstractControl;
  notaAC: AbstractControl;
  cantPagadaAC: AbstractControl;
  cantDeudaAC: AbstractControl;
  statusAC: AbstractControl;
  bonificadoAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;


  constructor(
    private service: LiquidacionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({


      'cantidadRecibidaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cambioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'folioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'kilometrajeAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'notaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantPagadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantDeudaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'bonificadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    
        this.cantidadRecibidaAC = this.form.controls['cantidadRecibidaAC'];
        this.cambioAC = this.form.controls['cambioAC'];
        this.folioAC = this.form.controls['folioAC'];
        this.kilometrajeAC = this.form.controls['kilometrajeAC'];
        this.fechaAC = this.form.controls['fechaAC'];
        this.notaAC = this.form.controls['notaAC'];
        this.cantPagadaAC = this.form.controls['cantPagadaAC'];
        this.cantDeudaAC = this.form.controls['cantDeudaAC'];
        this.statusAC = this.form.controls['statusAC'];
        this.bonificadoAC = this.form.controls['bonificadoAC'];
        this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: LiquidacionesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addLiquidaciones(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
