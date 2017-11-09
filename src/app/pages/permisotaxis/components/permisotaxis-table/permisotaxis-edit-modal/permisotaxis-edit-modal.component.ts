import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxisService } from './../permisotaxis.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PermisotaxisInterface } from './../permisotaxis.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisotaxis-edit-modal.component.scss')],
  templateUrl: './permisotaxis-edit-modal.component.html'
})

export class PermisotaxisEditModalComponent extends DialogComponent<PermisotaxisInterface, any> implements OnInit, PermisotaxisInterface {

  idpermisotaxi: number;
  liquidez: number;
  liquidezDom: number;
  numero: string;
  propietario: number;
  fechaAlta: string;
  vigencia: string;
  status: string;


  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  permisotaxi: PermisotaxisInterface = {

    idpermisotaxi: 0,
    liquidez: 0,
    liquidezDom: 0,
    numero: '',
    propietario: 0,
    fechaAlta: '',
    vigencia: '',
    status: '',
  };

  idpermisotaxiAC: AbstractControl;
  liquidezAC: AbstractControl;
  liquidezDomAC: AbstractControl;
  numeroAC: AbstractControl;
  propietarioAC: AbstractControl;
  fechaAltaAC: AbstractControl;
  vigenciaAC: AbstractControl;
  statusAC: AbstractControl;



  constructor(
    private service: PermisotaxisService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idpermisotaxiAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'liquidezAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'liquidezDomAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'numeroAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'propietarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAltaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'vigenciaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idpermisotaxiAC = this.form.controls['idpermisotaxiAC'];
    this.liquidezAC = this.form.controls['liquidezAC'];
    this.liquidezDomAC = this.form.controls['liquidezDomAC'];
    this.numeroAC = this.form.controls['numeroAC'];
    this.propietarioAC = this.form.controls['propietarioAC'];
    this.fechaAltaAC = this.form.controls['fechaAltaAC'];
    this.vigenciaAC = this.form.controls['vigenciaAC'];
    this.statusAC = this.form.controls['statusAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisotaxisInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editPermisotaxis({


          idpermisotaxi: this.idpermisotaxi,
          liquidez: this.liquidez,
          liquidezDom: this.liquidezDom,
          numero: this.numero,
          propietario: this.propietario,
          fechaAlta: this.fechaAlta,
          vigencia: this.vigencia,
          status: this.status,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getPermisotaxis(): void {
    this.service.getPermisotaxis(this.id)
        .subscribe( data => {
          this.permisotaxi = data[1];
        },
        error => console.log(error),
        () => console.log('Get permisotaxi complete'));
  }

}
