import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TalleresService } from './../talleres.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TalleresInterface } from './../talleres.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./talleres-add-modal.component.scss')],
  templateUrl: './talleres-add-modal.component.html'
})

export class TalleresAddModalComponent extends DialogComponent<TalleresInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

    nombreAC: AbstractControl;
    direccionAC: AbstractControl;
    descripcionAC: AbstractControl;
    telefonoAC: AbstractControl;
    coordenada_idcoordenadaAC: AbstractControl;


  constructor(
    private service: TalleresService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

            'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'direccionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'descripcionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'telefonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'coordenada_idcoordenadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

        this.nombreAC = this.form.controls['nombreAC'];
        this.direccionAC = this.form.controls['direccionAC'];
        this.descripcionAC = this.form.controls['descripcionAC'];
        this.telefonoAC = this.form.controls['telefonoAC'];
        this.coordenada_idcoordenadaAC = this.form.controls['coordenada_idcoordenadaAC'];
  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TalleresInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addTalleres(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
