import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { GroupsService } from './../groups.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { GroupsInterface } from './../groups.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./groups-add-modal.component.scss')],
  templateUrl: './groups-add-modal.component.html'
})

export class GroupsAddModalComponent extends DialogComponent<GroupsInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nicknameauth: AbstractControl;
  usuarioauth: AbstractControl;
  claveauth: AbstractControl;
  rol: AbstractControl;
  descripcion: AbstractControl;
  visible: AbstractControl;


  private _claveauth: string;
  private _usuarioauth: string;
  private _nicknameauth: string;

  constructor(
    private service: GroupsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    const credenciales = this.authLocalstorage.getCredentials();

    this._claveauth = credenciales.claveauth;
    this._usuarioauth = credenciales.usuarioauth;
    this._nicknameauth = credenciales.nicknameauth;

    this.form = fb.group({
      'claveauth': this._claveauth,
      'nicknameauth': this._nicknameauth,
      'usuarioauth': this._usuarioauth,
      'rol': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcion': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'visible': [''],
    });

    this.rol = this.form.controls['rol'];
    this.descripcion = this.form.controls['descripcion'];
    this.visible = this.form.controls['visible'];
  }


  ngOnInit() {}

  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: GroupsInterface): void {
    this.submitted = true;
    if (this.form.valid) {

      this.service
        .addGroups(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

}


















