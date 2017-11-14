import { PermisotaxiasignadosInterface } from 'app/pages/permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { TalleresService } from 'app/pages/talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EnviotalleresService } from './../enviotalleres.service';
import { EnviotalleresInterface } from './../enviotalleres.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./enviotalleres-add-modal.component.scss')],
  templateUrl: './enviotalleres-add-modal.component.html',
  providers: [
    TalleresService,
    PermisotaxiasignadosService
  ]
})

export class EnviotalleresAddModalComponent extends DialogComponent<EnviotalleresInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public taller_idtaller: AbstractControl;
  public enviotaller_idenviotaller: AbstractControl;
  public fecha: AbstractControl;
  public motivo: AbstractControl;
  public permisotaxiasignado_idpermisotaxiasignado: AbstractControl;

  public talleres: TalleresInterface[]
  public permisos: PermisotaxiasignadosInterface[]
  constructor(
    private enviotalleresService: EnviotalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'taller_idtaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fecha' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'motivo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.permisotaxiasignado_idpermisotaxiasignado = this.form.controls['permisotaxiasignado_idpermisotaxiasignado'];
    this.taller_idtaller = this.form.controls['taller_idtaller'];
    this.fecha = this.form.controls['fecha'];
    this.motivo = this.form.controls['motivo'];
  }

  ngOnInit() {
    this.getAllTalleres()
    this.getAllPermisos()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => res.success ? this.talleres = res.result : null)
  }

  getAllPermisos() {
    this.permisotaxiasignadosService.all()
      .subscribe( res => res.success ? this.permisos = res.result : null)
  }

  onSubmit(values: EnviotalleresInterface): void {
    this.enviotalleresService.create(values)
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
}
