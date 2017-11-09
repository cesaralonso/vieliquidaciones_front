import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CorralonesService } from './../corralones.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CorralonesInterface } from './../corralones.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./corralones-add-modal.component.scss')],
  templateUrl: './corralones-add-modal.component.html'
})

export class CorralonesAddModalComponent extends DialogComponent<CorralonesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

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
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

      'infraccionNumeroAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'corralonNombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'motivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'permisotaxiasignado_idpermisotaxiasignadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

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
        .addCorralones(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
