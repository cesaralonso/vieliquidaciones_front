import { ChoferesService } from 'app/pages/choferes/components/choferes-table/choferes.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FianzasService } from './../fianzas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { FianzasInterface } from './../fianzas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChoferesInterface } from 'app/pages/choferes/components/choferes-table/choferes.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./fianzas-add-modal.component.scss')],
  templateUrl: './fianzas-add-modal.component.html',
  providers: [
    ChoferesService
  ]
})

export class FianzasAddModalComponent extends DialogComponent<FianzasInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public montopagado: AbstractControl;
  public montoadeudado: AbstractControl;
  public status: AbstractControl;
  public chofer_idchofer: AbstractControl;

  public choferes: ChoferesInterface[];
  constructor(
    private service: FianzasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'montopagado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'montoadeudado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchofer' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.montopagado = this.form.controls['montopagado'];
    this.montoadeudado = this.form.controls['montoadeudado'];
    this.status = this.form.controls['status'];
    this.chofer_idchofer = this.form.controls['chofer_idchofer'];
  }

  ngOnInit() {
    this.getAllChoferes()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: FianzasInterface): void {
    this.service.create( values )
      .subscribe( data => {
        this.data = data;
        this.confirm();
      });
  }

  getAllChoferes() {
    this.choferesService.all()
      .subscribe( res => res.success ? this.choferes = res.result : null)
  }
}
