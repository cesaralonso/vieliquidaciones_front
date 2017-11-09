import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { LiquidacionesService } from './../liquidaciones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { LiquidacionesInterface } from './../liquidaciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./liquidaciones-edit-modal.component.scss')],
  templateUrl: './liquidaciones-edit-modal.component.html'
})

export class LiquidacionesEditModalComponent extends DialogComponent<LiquidacionesInterface, any> implements OnInit, LiquidacionesInterface {


  idliquidacion: number;
  cantidadRecibida: number;
  cambio: number;
  folio: string;
  kilometraje: number;
  fecha: string;
  nota: string;
  cantPagada:number;
  cantDeuda:number;
  status: string;
  bonificado:number;
  chofer_idchofer:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  liquidacion: LiquidacionesInterface = {

    idliquidacion: 0,
    cantidadRecibida: 0,
    cambio: 0,
    folio: '',
    kilometraje: 0,
    fecha: '',
    nota: '',
    cantPagada:0,
    cantDeuda:0,
    status: '',
    bonificado:0,
    chofer_idchofer:0,
  };

  idliquidacionAC: AbstractControl;
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
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idliquidacionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
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


    this.idliquidacionAC = this.form.controls['idliquidacionAC'];
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
        .editLiquidaciones({


          idliquidacion: this.idliquidacion,
          cantidadRecibida: this.cantidadRecibida,
          cambio: this.cambio,
          folio: this.folio,
          kilometraje: this.kilometraje,
          fecha: this.fecha,
          nota: this.nota,
          cantPagada: this.cantPagada,
          cantDeuda: this.cantDeuda,
          status: this.status,
          bonificado: this.bonificado,
          chofer_idchofer: this.chofer_idchofer,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getLiquidaciones(): void {
    this.service.getLiquidaciones(this.id)
        .subscribe( data => {
          this.liquidacion = data[1];
        },
        error => console.log(error),
        () => console.log('Get liquidacion complete'));
  }

}
