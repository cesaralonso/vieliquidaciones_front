import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CoordenadasService } from './../coordenadas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CoordenadasInterface } from './../coordenadas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./coordenadas-edit-modal.component.scss')],
  templateUrl: './coordenadas-edit-modal.component.html'
})

export class CoordenadasEditModalComponent extends DialogComponent<CoordenadasInterface, any> implements OnInit, CoordenadasInterface {

  idcoordenada: number;
  latitud: number;
  longitud: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  coordenada: CoordenadasInterface = {
    idcoordenada: 0,
    latitud: 0,
    longitud: 0,

  };

  idcoordenadaAC: AbstractControl;
  latitudAC: AbstractControl;
  longitudAC: AbstractControl;


  constructor(
    private service: CoordenadasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);


    this.form = fb.group({

      'idcoordenadaAC' : this.id,
      'latitudAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'longitudAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idcoordenadaAC = this.form.controls['idcoordenadaAC'];
    this.latitudAC = this.form.controls['latitudAC'];
    this.longitudAC = this.form.controls['longitudAC'];
  }

  ngOnInit() {

  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: CoordenadasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editCoordenadas({

          idcoordenada: this.idcoordenada,
          latitud: this.latitud,
          longitud: this.longitud,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getCoordenadas(): void {
    this.service.getCoordenadas(this.id)
        .subscribe( data => {
          this.coordenada = data[1];
        },
        error => console.log(error),
        () => console.log('Get coordenada complete'));
  }

}
