import { ChoferesService } from './../../../../choferes/components/choferes-table/choferes.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { LiquidacionesService } from './../liquidaciones.service';
import { LiquidacionesInterface } from './../liquidaciones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChoferesInterface } from 'app/pages/choferes/components/choferes-table/choferes.interface';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./liquidaciones-add-modal.component.scss')],
  templateUrl: './liquidaciones-add-modal.component.html',
  providers: [
    ChoferesService
  ]
})

export class LiquidacionesAddModalComponent extends DialogComponent<LiquidacionesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  public cantidadRecibida: AbstractControl;
  public cambio: AbstractControl;
  public folio: AbstractControl;
  public kilometraje: AbstractControl;
  public fecha: AbstractControl;
  public nota: AbstractControl;
  public cantPagada: AbstractControl;
  public cantDeuda: AbstractControl;
  public status: AbstractControl;
  public bonificado: AbstractControl;
  public chofer_idchofer: AbstractControl;
  
  public choferes: ChoferesInterface[];
  constructor(
    private service: LiquidacionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'cantidadRecibida' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cambio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'folio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'kilometraje' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fecha' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nota' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantPagada' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantDeuda' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'bonificado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchofer' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.cantidadRecibida = this.form.controls['cantidadRecibida'];
    this.cambio = this.form.controls['cambio'];
    this.folio = this.form.controls['folio'];
    this.kilometraje = this.form.controls['kilometraje'];
    this.fecha = this.form.controls['fecha'];
    this.nota = this.form.controls['nota'];
    this.cantPagada = this.form.controls['cantPagada'];
    this.cantDeuda = this.form.controls['cantDeuda'];
    this.status = this.form.controls['status'];
    this.bonificado = this.form.controls['bonificado'];
    this.chofer_idchofer = this.form.controls['chofer_idchofer'];
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
  onSubmit(values: LiquidacionesInterface): void {
      this.service.create(values)
        .subscribe( data => {
          this.data = data;
          this.confirm();
        });
    }
}
