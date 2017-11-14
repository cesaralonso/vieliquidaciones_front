import { PermisotaxiasignadosInterface } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
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
  selector: 'edit-service-modal',
  styleUrls: [('./enviotalleres-edit-modal.component.scss')],
  templateUrl: './enviotalleres-edit-modal.component.html',
  providers: [
    TalleresService,
    PermisotaxiasignadosService
  ]
})
// Aqui falta agregar los métodos de getAllTalleres() y getAllPermisos()
export class EnviotalleresEditModalComponent extends DialogComponent<EnviotalleresInterface, any> implements OnInit, EnviotalleresInterface {
  idenviotaller: number;
  taller_idtaller: number;
  permisotaxiasignado_idpermisotaxiasignado: number;
  fecha: string;
  motivo: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public taller_idtallerAC: AbstractControl;
  public permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;
  public fechaAC: AbstractControl;
  public motivoAC: AbstractControl;
  public talleres: TalleresInterface[]
  public permisos: PermisotaxiasignadosInterface[]
  constructor(
    private enviotalleresService: EnviotalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'motivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
    this.motivoAC = this.form.controls['motivoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
  }

  ngOnInit() {
    this.getAllPermisos()
    this.getAllTalleres()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: EnviotalleresInterface): void {
    this.enviotalleresService.edit({
        idenviotaller: this.idenviotaller,
        taller_idtaller: this.taller_idtaller,
        permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
        fecha: this.fecha,
        motivo: this.motivo
      }).subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => res.success ? this.talleres = res.result : null)
  }

  getAllPermisos() {
    this.permisotaxiasignadosService.all()
      .subscribe( res => res.success ? this.permisos = res.result : null)
  }

  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }
}
