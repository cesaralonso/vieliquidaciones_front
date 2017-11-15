import { PermisotaxiasignadosInterface } from 'app/pages/permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.interface';
import { MecanicosInterface } from './../../../../mecanicos/components/mecanicos-table/mecanicos.interface';
import { TalleresInterface } from './../../../../talleres/components/talleres-table/talleres.interface';
import { EnviotalleresInterface } from './../../../../enviotalleres/components/enviotalleres-table/enviotalleres.interface';
import { TalleresService } from './../../../../talleres/components/talleres-table/talleres.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculoreparandosService } from './../vehiculoreparandos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { VehiculoreparandosInterface } from './../vehiculoreparandos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnviotalleresService } from 'app/pages/enviotalleres/components/enviotalleres-table/enviotalleres.service';
import { MecanicosService } from 'app/pages/mecanicos/components/mecanicos-table/mecanicos.service';
import { PermisotaxiasignadosService } from 'app/pages/permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';

@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./vehiculoreparandos-edit-modal.component.scss')],
  templateUrl: './vehiculoreparandos-edit-modal.component.html',
  providers: [
    EnviotalleresService,
    TalleresService,
    MecanicosService,
    PermisotaxiasignadosService
  ]
})

export class VehiculoreparandosEditModalComponent extends DialogComponent<VehiculoreparandosInterface, any> implements OnInit, VehiculoreparandosInterface {
  idvehiculoreparando: number;
  taller_idtaller: number;
  enviotaller_idenviotaller: number;
  fechaIngresa: string;
  mecanico_idmecanico: number;
  fechaSalida: string;
  fechaEstimada: string;
  inventario:string;
  motivo:string;
  status: string;
  orden:string;
  permisotaxiasignado_idpermisotaxiasignado:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public taller_idtallerAC: AbstractControl;
  public enviotaller_idenviotallerAC: AbstractControl;
  public fechaIngresaAC: AbstractControl;
  public mecanico_idmecanicoAC: AbstractControl;
  public fechaSalidaAC: AbstractControl;
  public fechaEstimadaAC: AbstractControl;
  public inventarioAC: AbstractControl;
  public motivoAC: AbstractControl;
  public statusAC: AbstractControl;
  public ordenAC: AbstractControl;
  public permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;

  public enviotalleres: EnviotalleresInterface[];
  public talleres: TalleresInterface[];
  public mecanicos: MecanicosInterface[];
  public permisos: PermisotaxiasignadosInterface[];

  constructor(
    private vehiculoreparandosService: VehiculoreparandosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private enviotalleresService: EnviotalleresService,
    private talleresService: TalleresService,
    private mecanicosService: MecanicosService,
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'taller_idtallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'enviotaller_idenviotallerAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaIngresaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'mecanico_idmecanicoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaSalidaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaEstimadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'inventarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'motivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'ordenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.enviotaller_idenviotallerAC = this.form.controls['enviotaller_idenviotallerAC'];
    this.fechaIngresaAC = this.form.controls['fechaIngresaAC'];
    this.mecanico_idmecanicoAC = this.form.controls['mecanico_idmecanicoAC'];
    this.fechaSalidaAC = this.form.controls['fechaSalidaAC'];
    this.fechaEstimadaAC = this.form.controls['fechaEstimadaAC'];
    this.inventarioAC = this.form.controls['inventarioAC'];
    this.motivoAC = this.form.controls['motivoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.ordenAC = this.form.controls['ordenAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
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
  
  parseDate(dateString: string): Date {
    return dateString ? new Date(dateString) : null
  }

  onSubmit(values: VehiculoreparandosInterface): void {
    this.vehiculoreparandosService.edit({
        idvehiculoreparando: this.idvehiculoreparando,
        taller_idtaller: this.taller_idtaller,
        enviotaller_idenviotaller: this.enviotaller_idenviotaller,
        fechaIngresa: this.fechaIngresa,
        mecanico_idmecanico: this.mecanico_idmecanico,
        fechaSalida: this.fechaSalida,
        fechaEstimada: this.fechaEstimada,
        inventario: this.inventario,
        motivo: this.motivo,
        status: this.status,
        orden: this.orden,
        permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
      })
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

}
