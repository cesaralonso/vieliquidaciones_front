import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MecanicosService } from './../mecanicos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { MecanicosInterface } from './../mecanicos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./mecanicos-add-modal.component.scss')],
  templateUrl: './mecanicos-add-modal.component.html'
})

export class MecanicosAddModalComponent extends DialogComponent<MecanicosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  taller_idtallerAC: AbstractControl;
  persona_idpersonaAC: AbstractControl;

  constructor(
    private service: MecanicosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'persona_idpersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
    this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];

  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: MecanicosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addMecanicos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
