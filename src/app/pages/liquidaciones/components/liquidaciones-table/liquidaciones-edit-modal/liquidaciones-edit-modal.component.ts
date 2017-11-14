import { ChoferesService } from './../../../../choferes/components/choferes-table/choferes.service';
import { ChoferesInterface } from './../../../../choferes/components/choferes-table/choferes.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { LiquidacionesService } from './../liquidaciones.service';
import { LiquidacionesInterface } from './../liquidaciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./liquidaciones-edit-modal.component.scss')],
  templateUrl: './liquidaciones-edit-modal.component.html',
  providers: [
    ChoferesService
  ]
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

  public idliquidacionAC: AbstractControl;
  public cantidadRecibidaAC: AbstractControl;
  public cambioAC: AbstractControl;
  public folioAC: AbstractControl;
  public kilometrajeAC: AbstractControl;
  public fechaAC: AbstractControl;
  public notaAC: AbstractControl;
  public cantPagadaAC: AbstractControl;
  public cantDeudaAC: AbstractControl;
  public statusAC: AbstractControl;
  public bonificadoAC: AbstractControl;
  public chofer_idchoferAC: AbstractControl;
  public choferes: ChoferesInterface[];
  
  constructor(
    private liquidacionesService: LiquidacionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,    
    dialogService: DialogService,
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
    this.getAllChoferes()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }
  
  getAllChoferes() {
    this.choferesService.all()
      .subscribe( res => this.choferes = res.success ? res.result : null)
  }

  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }
  
  onSubmit(values: LiquidacionesInterface): void {
      this.liquidacionesService.edit({
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
        }).subscribe( data => {
            this.data = data;
            this.confirm();
          });
  }

}
