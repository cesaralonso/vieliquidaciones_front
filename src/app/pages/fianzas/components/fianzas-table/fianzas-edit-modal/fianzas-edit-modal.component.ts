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
  selector: 'edit-service-modal',
  styleUrls: [('./fianzas-edit-modal.component.scss')],
  templateUrl: './fianzas-edit-modal.component.html',
  providers: [
    ChoferesService
  ]
})

export class FianzasEditModalComponent extends DialogComponent<FianzasInterface, any> implements OnInit, FianzasInterface {


  idfianza: number;
  montopagado: number;
  montoadeudado: number;
  status: string;
  chofer_idchofer:number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;

  public idfianzaAC: AbstractControl;
  public montopagadoAC: AbstractControl;
  public montoadeudadoAC: AbstractControl;
  public statusAC: AbstractControl;
  public chofer_idchoferAC: AbstractControl;
  
  public choferes: ChoferesInterface[];
  constructor(
    private service: FianzasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this.form = fb.group({
      'montopagadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'montoadeudadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer_idchoferAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.montopagadoAC = this.form.controls['montopagadoAC'];
    this.montoadeudadoAC = this.form.controls['montoadeudadoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  }

  ngOnInit() {
    this.getAllChoferes()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: FianzasInterface): void {
    this.service.edit({
        idfianza: this.idfianza,
        montopagado: this.montopagado,
        montoadeudado: this.montoadeudado,
        status: this.status,
        chofer_idchofer: this.chofer_idchofer,
      })
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
