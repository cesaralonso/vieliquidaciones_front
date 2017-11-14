import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CorralonesService } from './../corralones.service';
import { CorralonesInterface } from './../corralones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosInterface } from 'app/pages/permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./corralones-add-modal.component.scss')],
  templateUrl: './corralones-add-modal.component.html',
  providers: [
    PermisotaxiasignadosService
  ]
})

export class CorralonesAddModalComponent extends DialogComponent<CorralonesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  public infraccionNumero: AbstractControl;
  public corralonNombre: AbstractControl;
  public fecha: AbstractControl;
  public motivo: AbstractControl;
  public status: AbstractControl;
  public permisotaxiasignado_idpermisotaxiasignado: AbstractControl;

  public permisos: PermisotaxiasignadosInterface[];
  constructor(
    private corralonesService: CorralonesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'permisotaxiasignado_idpermisotaxiasignado' : ['', Validators.compose([Validators.required])],
      'infraccionNumero' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'corralonNombre' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fecha' : ['', Validators.compose([Validators.required])],
      'motivo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.permisotaxiasignado_idpermisotaxiasignado = this.form.controls['permisotaxiasignado_idpermisotaxiasignado'];
    this.infraccionNumero = this.form.controls['infraccionNumero'];
    this.corralonNombre = this.form.controls['corralonNombre'];
    this.fecha = this.form.controls['fecha'];
    this.motivo = this.form.controls['motivo'];
    this.status = this.form.controls['status'];
    this.permisotaxiasignado_idpermisotaxiasignado = this.form.controls['permisotaxiasignado_idpermisotaxiasignado'];
  }

  ngOnInit() {
    this.getAllPermisos()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: CorralonesInterface): void {
    this.corralonesService.create( values )
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

  getAllPermisos() {
    this.permisotaxiasignadosService.all()
      .subscribe( res => res.success ? this.permisos = res.result : null)
  }
}
