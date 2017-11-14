import { ChoferesInterface } from './../../../../choferes/components/choferes-table/choferes.interface';
import { ChoferesService } from './../../../../choferes/components/choferes-table/choferes.service';
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
  templateUrl: './bonificaciones-add-modal.component.html',
  providers: [
    ChoferesService
  ]
})

export class BonificacionesAddModalComponent extends DialogComponent<BonificacionesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public validado: AbstractControl;
  public status: AbstractControl;
  public cantidad: AbstractControl;
  public concepto: AbstractControl;
  public chofer_idchofer: AbstractControl;

  public choferes: ChoferesInterface[];

  constructor(
    private bonificacionesService: BonificacionesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'validado' : ['',],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantidad' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'concepto' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchofer' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.validado = this.form.controls['validado'];
    this.status = this.form.controls['status'];
    this.cantidad = this.form.controls['cantidad'];
    this.concepto = this.form.controls['concepto'];
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
      .subscribe( res => res.success ? this.choferes = res.result : null)
  }

  onSubmit(values: BonificacionesInterface): void {
    this.bonificacionesService.create( values )
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
}
