import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdenesService } from './../ordenes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { OrdenesInterface } from './../ordenes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdenesResponseInterface } from 'app/pages/ordenes/components/ordenes-table/ordenes-response.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordenes-add-modal.component.scss')],
  templateUrl: './ordenes-add-modal.component.html',
  providers: [
    OrdenesService
  ]
})

export class OrdenesAddModalComponent extends DialogComponent<OrdenesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  public form: FormGroup;

  fechaAC: AbstractControl;
  statusAC: AbstractControl;
  manoObraAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  anticipoAC: AbstractControl;
  vehiculoreparando_idvehiculoreparandoAC: AbstractControl;

  public avales: OrdenesInterface[];

  constructor(
    private service: OrdenesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private ordenesService: OrdenesService,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'manoObraAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'subtotalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'anticipoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'vehiculoreparando_idvehiculoreparandoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.fechaAC = this.form.controls['fechaAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.manoObraAC = this.form.controls['manoObraAC'];
    this.subtotalAC = this.form.controls['subtotalAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.anticipoAC = this.form.controls['anticipoAC'];
    this.vehiculoreparando_idvehiculoreparandoAC = this.form.controls['vehiculoreparando_idvehiculoreparandoAC'];

  }


  ngOnInit() {
    this.getOrdenes()
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: OrdenesInterface): void {
    console.log(values);
      this.service.create(values)
        .subscribe((data: OrdenesResponseInterface) => {
            this.data = data;
            this.confirm();
        });
  }

  getOrdenes() {
    this.ordenesService.all()
      .subscribe( (res: OrdenesResponseInterface) =>
        res.success ? this.avales = res.result : null)
  }
}
