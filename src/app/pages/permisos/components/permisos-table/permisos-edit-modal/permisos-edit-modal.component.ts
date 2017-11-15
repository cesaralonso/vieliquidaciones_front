import { ModulosInterface } from 'app/pages/modulos/components/modulos-table/modulos.interface';
import { RolService } from './../../../../../shared/rol.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModulosService } from 'app/pages/modulos/components/modulos-table/modulos.service';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisos-edit-modal.component.scss')],
  templateUrl: './permisos-edit-modal.component.html',
  providers: [
    ModulosService,
    RolService
  ]
})

export class PermisosEditModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit, PermisosInterface {

  idpermiso: number;
  acceso: boolean;
  rol_idrol: number;
  modulo_idmodulo: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public accesoAC: AbstractControl;
  public rol_idrolAC: AbstractControl;
  public modulo_idmoduloAC: AbstractControl;

  public roles: any[];
  public modulos: ModulosInterface[];

  constructor(
    private permisosService: PermisosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private modulosService: ModulosService,
    private rolService: RolService,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({
      'accesoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'rol_idrolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'modulo_idmoduloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.accesoAC = this.form.controls['accesoAC'];
    this.rol_idrolAC = this.form.controls['rol_idrolAC'];
    this.modulo_idmoduloAC = this.form.controls['modulo_idmoduloAC'];
  }

  ngOnInit() {
    this.getModulos()
    this.getRoles()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  getRoles() {
    this.rolService.all()
      .subscribe( res => this.roles = res.success ? res.result : null )
  }

  getModulos() {
    this.modulosService.all()
      .subscribe( res => this.modulos = res.success ? res.result : null)
  }

  onSubmit(values: PermisosInterface): void {
    this.permisosService.edit({
        idpermiso: this.idpermiso,
        acceso: this.acceso,
        rol_idrol: this.rol_idrol,
        modulo_idmodulo: this.modulo_idmodulo,
    }).subscribe( data => {
        this.data = data;
        this.confirm();
    });
  }

}
