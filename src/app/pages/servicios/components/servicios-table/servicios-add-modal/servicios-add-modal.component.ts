import { ServiciosInterface } from './../../../../servicios/components/servicios-table/servicios.interface';
import { ServiciosResponseInterface } from './../../../../servicios/components/servicios-table/servicios-response.interface';
import { ServiciosService } from './../../../../servicios/components/servicios-table/servicios.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ServiciosService } from './../servicios.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ServiciosInterface } from './../servicios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosResponseInterface } from 'app/pages/servicios/components/servicios-table/servicios-response.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./servicios-add-modal.component.scss')],
  templateUrl: './servicios-add-modal.component.html',
  providers: [
    ServiciosService
  ]
})

export class ServiciosAddModalComponent extends DialogComponent<ServiciosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  public form: FormGroup;

  nombreAC: AbstractControl;
  precioAC: AbstractControl;
  ivaAC: AbstractControl;

  public avales: ServiciosInterface[];

  constructor(
    private service: ServiciosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private serviciosService: ServiciosService,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'precioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'ivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      
    });

    this.nombreAC = this.form.controls['nombreAC'];
    this.precioAC = this.form.controls['precioAC'];
    this.ivaAC = this.form.controls['ivaAC'];


  }


  ngOnInit() {
    this.getServicios()
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ServiciosInterface): void {
    console.log(values);
      this.service.add(values)
        .subscribe((data: ServiciosResponseInterface) => {
            this.data = data;
            this.confirm();
        });
  }

  getServicios() {
    this.serviciosService.all()
      .subscribe( (res: ServiciosResponseInterface) =>
        res.success ? this.avales = res.result : null)
  }
}
