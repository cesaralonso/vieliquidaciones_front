import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CorralonesService } from './../corralones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CorralonesInterface } from './../corralones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./corralones-edit-modal.component.scss')],
  templateUrl: './corralones-edit-modal.component.html'
})

export class CorralonesEditModalComponent extends DialogComponent<CorralonesInterface, any> implements OnInit, CorralonesInterface {


  idcorralon: number;
  infraccionNumero: number;
  corralonNombre: string;
  fecha: string;
  motivo: string;
  status: string;
  permisotaxiasignado_idpermisotaxiasignado:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  corralon: CorralonesInterface = {

    idcorralon: 0,
    infraccionNumero: 0,
    corralonNombre: '',
    fecha: '',
    motivo: '',
    status: '',
    permisotaxiasignado_idpermisotaxiasignado:0,
  };

  idcorralonAC: AbstractControl;
  infraccionNumeroAC: AbstractControl;
  corralonNombreAC: AbstractControl;
  fechaAC: AbstractControl;
  motivoAC: AbstractControl;
  statusAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;



  constructor(
    private service: CorralonesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idcorralonAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'infraccionNumeroAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'corralonNombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'motivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });


    this.idcorralonAC = this.form.controls['idcorralonAC'];
    this.infraccionNumeroAC = this.form.controls['infraccionNumeroAC'];
    this.corralonNombreAC = this.form.controls['corralonNombreAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.motivoAC = this.form.controls['motivoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: CorralonesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editCorralones({


          idcorralon: this.idcorralon,
          infraccionNumero: this.infraccionNumero,
          corralonNombre: this.corralonNombre,
          fecha: this.fecha,
          motivo: this.motivo,
          status: this.status,
          permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getCorralones(): void {
    this.service.getCorralones(this.id)
        .subscribe( data => {
          this.corralon = data[1];
        },
        error => console.log(error),
        () => console.log('Get corralon complete'));
  }

}
