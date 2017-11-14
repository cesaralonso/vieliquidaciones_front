import { PermisotaxiasignadosInterface } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { MecanicosInterface } from './../../../../mecanicos/components/mecanicos-table/mecanicos.interface';
import { EnviotalleresInterface } from './../../../../enviotalleres/components/enviotalleres-table/enviotalleres.interface';
import { TalleresService } from 'app/pages/talleres/components/talleres-table/talleres.service';
import { EnviotalleresService } from './../../../../enviotalleres/components/enviotalleres-table/enviotalleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculoreparandosService } from './../vehiculoreparandos.service';
import { VehiculoreparandosInterface } from './../vehiculoreparandos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MecanicosService } from 'app/pages/mecanicos/components/mecanicos-table/mecanicos.service';
import { PermisotaxiasignadosService } from 'app/pages/permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./vehiculoreparandos-add-modal.component.scss')],
  templateUrl: './vehiculoreparandos-add-modal.component.html',
  providers: [
    EnviotalleresService,
    TalleresService,
    MecanicosService,
    PermisotaxiasignadosService
  ]
})

export class VehiculoreparandosAddModalComponent extends DialogComponent<VehiculoreparandosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public taller_idtaller: AbstractControl;
  public enviotaller_idenviotaller: AbstractControl;
  public fechaIngresa: AbstractControl;
  public mecanico_idmecanico: AbstractControl;
  public fechaSalida: AbstractControl;
  public fechaEstimada: AbstractControl;
  public inventario: AbstractControl;
  public motivo: AbstractControl;
  public status: AbstractControl;
  public orden: AbstractControl;
  public permisotaxiasignado_idpermisotaxiasignado: AbstractControl;

  public enviotalleres: EnviotalleresInterface[];
  public talleres: TalleresInterface[];
  public mecanicos: MecanicosInterface[];
  public permisos: PermisotaxiasignadosInterface[];

  constructor(
    private service: VehiculoreparandosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private enviotalleresService: EnviotalleresService,
    private talleresService: TalleresService,
    private mecanicosService: MecanicosService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'taller_idtaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'enviotaller_idenviotaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaIngresa' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'mecanico_idmecanico' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaSalida' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaEstimada' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'inventario' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'motivo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'orden' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.taller_idtaller = this.form.controls['taller_idtaller'];
    this.enviotaller_idenviotaller = this.form.controls['enviotaller_idenviotaller'];
    this.fechaIngresa = this.form.controls['fechaIngresa'];
    this.mecanico_idmecanico = this.form.controls['mecanico_idmecanico'];
    this.fechaSalida = this.form.controls['fechaSalida'];
    this.fechaEstimada = this.form.controls['fechaEstimada'];
    this.inventario = this.form.controls['inventario'];
    this.motivo = this.form.controls['motivo'];
    this.status = this.form.controls['status'];
    this.orden = this.form.controls['orden'];
    this.permisotaxiasignado_idpermisotaxiasignado = this.form.controls['permisotaxiasignado_idpermisotaxiasignado'];
  }

  ngOnInit() {
    this.getAllTalleres()
    this.getAllEnviotalleres()
    this.getAllPermisos()
    this.getAllMecanicos()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => this.talleres = res.success ? res.result : null )
  }

  getAllEnviotalleres() {
    this.enviotalleresService.all()
      .subscribe( res => this.enviotalleres = res.success ? res.result : null )
  }

  getAllPermisos() {
    this.permisotaxiasignadosService.all()
      .subscribe( res => this.permisos = res.success ? res.result : null )
  }

  getAllMecanicos() {
    this.mecanicosService.all()
      .subscribe( res => this.mecanicos = res.success ? res.result : null )
  }
  onSubmit(values: VehiculoreparandosInterface): void {
    this.service.create(values)
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
}
