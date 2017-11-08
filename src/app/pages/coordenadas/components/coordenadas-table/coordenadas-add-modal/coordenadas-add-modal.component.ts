import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CoordenadasService } from './../coordenadas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CoordenadasInterface } from './../coordenadas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./coordenadas-add-modal.component.scss')],
  templateUrl: './coordenadas-add-modal.component.html'
})

export class CoordenadasAddModalComponent extends DialogComponent<CoordenadasInterface, any> implements OnInit {



  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  latitudAC: AbstractControl;
  longitudAC: AbstractControl;




  constructor(
    private service: CoordenadasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    this.form = fb.group({

      'latitudAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'longitudAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.latitudAC = this.form.controls['latitudAC'];
    this.longitudAC = this.form.controls['longitudAC'];

  }


  ngOnInit() {

    // Obtiene Estatus de Coordenadas

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: CoordenadasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addCoordenadas(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
