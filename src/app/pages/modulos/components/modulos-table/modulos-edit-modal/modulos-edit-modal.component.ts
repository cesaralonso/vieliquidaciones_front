import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ModulosService } from './../modulos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ModulosInterface } from './../modulos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./modulos-edit-modal.component.scss')],
  templateUrl: './modulos-edit-modal.component.html'
})

export class ModulosEditModalComponent extends DialogComponent<ModulosInterface, any> implements OnInit, ModulosInterface {

  idmodulo: number;
  nombre: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  modulo: ModulosInterface = {
    idmodulo: 0,
    nombre: '',
  };

  idmoduloAC: AbstractControl;
  nombreAC: AbstractControl;

  constructor(
    private service: ModulosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idmoduloAC' : this.id,
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idmoduloAC = this.form.controls['idmoduloAC'];
    this.nombreAC = this.form.controls['nombreAC'];

  }

  ngOnInit() {

  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: ModulosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editModulos({

          idmodulo: this.idmodulo,
          nombre: this.nombre,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getModulos(): void {
    this.service.getModulos(this.id)
        .subscribe( data => {
          this.modulo = data[1];
        },
        error => console.log(error),
        () => console.log('Get modulo complete'));
  }

}
