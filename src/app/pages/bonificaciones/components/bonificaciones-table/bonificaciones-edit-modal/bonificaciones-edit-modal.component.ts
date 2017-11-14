import { ChoferesInterface } from './../../../../choferes/components/choferes-table/choferes.interface';
import { ChoferesService } from 'app/pages/choferes/components/choferes-table/choferes.service';
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
  templateUrl: './bonificaciones-edit-modal.component.html',
  providers: [
    ChoferesService
  ]
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

  public validadoAC: AbstractControl;
  public statusAC: AbstractControl;
  public cantidadAC: AbstractControl;
  public conceptoAC: AbstractControl;
  public chofer_idchoferAC: AbstractControl;
  public choferes: ChoferesInterface[];
  constructor(
    private service: BonificacionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private choferesService: ChoferesService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'validadoAC' : ['', ],
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
    console.log(this.chofer_idchofer)
    this.getAllChoferes()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }
  
  getAllChoferes() {
    this.choferesService.all()
      .subscribe( res => res.success ? this.choferes = res.result : null)
  }

  onSubmit(values: BonificacionesInterface): void {
      this.service.edit({
          idbonificacion: this.idbonificacion,
          validado: this.validado,
          status: this.status,
          cantidad: this.cantidad,
          concepto: this.concepto,
          chofer_idchofer: this.chofer_idchofer,
        }).subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }

}
