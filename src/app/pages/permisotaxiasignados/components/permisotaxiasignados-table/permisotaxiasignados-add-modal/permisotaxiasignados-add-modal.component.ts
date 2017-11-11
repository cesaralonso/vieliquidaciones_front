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

  vehiculo_idvehiculoAC: AbstractControl;
  permisotaxi_idpermisotaxiAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  public choferes: ChoferesInterface[];
  public permisos: PermisotaxisInterface[];
  public vehiculos: VehiculosInterface[];

  constructor(
    private service: PermisotaxiasignadosService,
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
      'vehiculo_idvehiculoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxi_idpermisotaxiAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });
    this.vehiculo_idvehiculoAC = this.form.controls['vehiculo_idvehiculoAC'];
    this.permisotaxi_idpermisotaxiAC = this.form.controls['permisotaxi_idpermisotaxiAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];

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
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addPermisotaxiasignados(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
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
