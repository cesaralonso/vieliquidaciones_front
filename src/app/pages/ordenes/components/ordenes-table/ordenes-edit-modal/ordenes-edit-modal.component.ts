import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdenesService } from './../ordenes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { OrdenesInterface } from './../ordenes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ordenes-edit-modal.component.scss')],
  templateUrl: './ordenes-edit-modal.component.html'
})

export class OrdenesEditModalComponent extends DialogComponent<OrdenesInterface, any> implements OnInit, OrdenesInterface {


  idorden: number;
  fecha: string;
  status: string;
  manoObra: number;
  subtotal: number;
  total: number;
  anticipo: number;
  descripcion: string;
  vehiculoreparando_idvehiculoreparando: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  idordenAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;
  manoObraAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  anticipoAC: AbstractControl;
  vehiculoreparando_idvehiculoreparandoAC: AbstractControl;



  constructor(
    private service: OrdenesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idordenAC' : this.id,
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'manoObraAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'subtotalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'anticipoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'vehiculoreparando_idvehiculoreparandoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idordenAC = this.form.controls['idordenAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.manoObraAC = this.form.controls['manoObraAC'];
    this.subtotalAC = this.form.controls['subtotalAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.anticipoAC = this.form.controls['anticipoAC'];
    this.vehiculoreparando_idvehiculoreparandoAC = this.form.controls['vehiculoreparando_idvehiculoreparandoAC'];

  }

  ngOnInit() {


  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: OrdenesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editOrdenes({

          idorden: this.idorden,
          fecha: this.fecha,
          status: this.status,
          manoObra: this.manoObra,
          subtotal: this.subtotal,
          total: this.total,
          descripcion: this.descripcion,
          anticipo: this.anticipo,
          vehiculoreparando_idvehiculoreparando: this.vehiculoreparando_idvehiculoreparando,


        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

}
