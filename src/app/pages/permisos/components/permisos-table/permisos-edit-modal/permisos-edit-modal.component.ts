import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisos-edit-modal.component.scss')],
  templateUrl: './permisos-edit-modal.component.html'
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
  submitted: boolean = false;

  permiso: PermisosInterface = {
    idpermiso: 0,
    acceso: false,
    rol_idrol: 0,
    modulo_idmodulo: 0,
  };

  idpermisoAC: AbstractControl;
  accesoAC: AbstractControl;
  rol_idrolAC: AbstractControl;
  modulo_idmoduloAC: AbstractControl;

  constructor(
    private service: PermisosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idpermisoAC' : this.id,
      'accesoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'rol_idrolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'modulo_idmoduloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.idpermisoAC = this.form.controls['idpermisoAC'];
    this.accesoAC = this.form.controls['accesoAC'];
    this.rol_idrolAC = this.form.controls['rol_idrolAC'];
    this.modulo_idmoduloAC = this.form.controls['modulo_idmoduloAC'];
  }

  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editPermisos({

          idpermiso: this.idpermiso,
          acceso: this.acceso,
          rol_idrol: this.rol_idrol,
          modulo_idmodulo: this.modulo_idmodulo,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getPermisos(): void {
    this.service.getPermisos(this.id)
        .subscribe( data => {
          this.permiso = data[1];
        },
        error => console.log(error),
        () => console.log('Get permiso complete'));
  }

}
