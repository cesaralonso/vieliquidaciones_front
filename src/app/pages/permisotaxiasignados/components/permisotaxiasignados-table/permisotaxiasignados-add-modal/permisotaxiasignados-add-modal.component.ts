import { PermisotaxisInterface } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis.interface';
import { ChoferesInterface } from './../../../../choferes/components/choferes-table/choferes.interface';
import { VehiculosService } from 'app/pages/vehiculos/components/vehiculos-table/vehiculos.service';
import { PermisotaxisService } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis.service';
import { PersonasService } from 'app/pages/personas/components/personas-table/personas.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosService } from './../permisotaxiasignados.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisotaxiasignadosInterface } from './../permisotaxiasignados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChoferesService } from 'app/pages/choferes/components/choferes-table/choferes.service';
import { VehiculosInterface } from 'app/pages/vehiculos/components/vehiculos-table/vehiculos.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisotaxiasignados-add-modal.component.scss')],
  templateUrl: './permisotaxiasignados-add-modal.component.html',
  providers: [
    ChoferesService,
    PermisotaxisService,
    VehiculosService
  ]
})

export class PermisotaxiasignadosAddModalComponent extends DialogComponent<PermisotaxiasignadosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public vehiculo_idvehiculo: AbstractControl;
  public permisotaxi_idpermisotaxi: AbstractControl;
  public fecha: AbstractControl;
  public status: AbstractControl;
  public chofer_idchofer: AbstractControl;
  
  public choferes: ChoferesInterface[];
  public permisos: PermisotaxisInterface[];
  public vehiculos: VehiculosInterface[];

  constructor(
    private permisotaxiasignadosService: PermisotaxiasignadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,
    private permisotaxiService: PermisotaxisService,
    private vehiculosService: VehiculosService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'vehiculo_idvehiculo' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxi_idpermisotaxi' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fecha' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchofer' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });
    this.vehiculo_idvehiculo = this.form.controls['vehiculo_idvehiculo'];
    this.permisotaxi_idpermisotaxi = this.form.controls['permisotaxi_idpermisotaxi'];
    this.fecha = this.form.controls['fecha'];
    this.status = this.form.controls['status'];
    this.chofer_idchofer = this.form.controls['chofer_idchofer'];

  }


  ngOnInit() {
    this.getAllChoferes()
    this.getAllPermisos()
    this.getAllVehiculos()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisotaxiasignadosInterface): void {
    console.log(values)
    this.permisotaxiasignadosService.create( values )
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

  getAllChoferes() {
    this.choferesService.all()
      .subscribe( res => res.success ? this.choferes = res.result : null)
  }

  getAllPermisos() {
    this.permisotaxiService.all()
      .subscribe( res => res.success ? this.permisos = res.result : null)
  }

  getAllVehiculos() {
    this.vehiculosService.all()
      .subscribe( res => res.success ? this.vehiculos = res.result : null)
  }
}
