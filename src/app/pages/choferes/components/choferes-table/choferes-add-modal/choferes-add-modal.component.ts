import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { ChoferesInterface } from './../../../../choferes/components/choferes-table/choferes.interface';
import { ChoferesService } from './../../../../choferes/components/choferes-table/choferes.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChoferesResponseInterface } from 'app/pages/choferes/components/choferes-table/choferes-response.interface';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./choferes-add-modal.component.scss')],
  templateUrl: './choferes-add-modal.component.html',
  providers: [
    ChoferesService,
    PersonasService
  ]
})

export class ChoferesAddModalComponent extends DialogComponent<ChoferesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  public form: FormGroup;

  public licencia: AbstractControl;
  public status: AbstractControl;
  public chofer: AbstractControl;
  public fianza: AbstractControl;
  public aval1: AbstractControl;
  public aval2: AbstractControl;
  public aval3: AbstractControl;
  public aval4: AbstractControl;

  public avales: ChoferesInterface[];

  constructor(
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private choferesService: ChoferesService,
    private personasService: PersonasService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'licencia' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'chofer' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fianza' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval1' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval2' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval3' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'aval4' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.licencia = this.form.controls['licencia'];
    this.status = this.form.controls['status'];
    this.chofer = this.form.controls['chofer'];
    this.fianza = this.form.controls['fianza'];
    this.aval1 = this.form.controls['aval1'];
    this.aval2 = this.form.controls['aval2'];
    this.aval3 = this.form.controls['aval3'];
    this.aval4 = this.form.controls['aval4'];
  }


  ngOnInit() {
    this.getChoferes()
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ChoferesInterface): void {
    console.log(values);
      this.choferesService.create(values)
        .subscribe((data: ChoferesResponseInterface) => {
            this.data = data;
            this.confirm();
        });
  }

  getChoferes() {
    this.personasService.all()
      .subscribe( (res: ChoferesResponseInterface) =>
        res.success ? this.avales = res.result : null)
  }
}
