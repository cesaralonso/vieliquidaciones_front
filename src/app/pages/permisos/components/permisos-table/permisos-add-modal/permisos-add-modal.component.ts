import { ModulosService } from './../../../../modulos/components/modulos-table/modulos.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'app/shared/rol.service';
import { ModulosInterface } from 'app/pages/modulos/components/modulos-table/modulos.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisos-add-modal.component.scss')],
  templateUrl: './permisos-add-modal.component.html',
  providers: [
    ModulosService,
    RolService
  ]
})

export class PermisosAddModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;

  public acceso: AbstractControl;
  public rol_idrol: AbstractControl;
  public modulo_idmodulo: AbstractControl;
  public roles: any[];
  public modulos: ModulosInterface[];
  constructor(
    private permisosService: PermisosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private modulosService: ModulosService,
    private rolService: RolService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'acceso' : ['', ],
      'rol_idrol' : ['', Validators.required],
      'modulo_idmodulo' : ['', Validators.required],
    });
    this.acceso = this.form.controls['acceso'];
    this.rol_idrol = this.form.controls['rol_idrol'];
    this.modulo_idmodulo = this.form.controls['modulo_idmodulo'];
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
    this.permisosService.create(values)
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }
}
