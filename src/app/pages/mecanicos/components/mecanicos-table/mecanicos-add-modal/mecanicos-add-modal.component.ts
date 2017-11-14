import { PersonasInterface } from './../../../../personas/components/personas-table/personas.interface';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { MecanicosService } from './../mecanicos.service';
import { MecanicosInterface } from './../mecanicos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TalleresService } from 'app/pages/talleres/components/talleres-table/talleres.service';
import { TalleresInterface } from 'app/pages/talleres/components/talleres-table/talleres.interface';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./mecanicos-add-modal.component.scss')],
  templateUrl: './mecanicos-add-modal.component.html',
  providers: [
    TalleresService,
    PersonasService
  ]
})

export class MecanicosAddModalComponent extends DialogComponent<MecanicosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  public taller_idtaller: AbstractControl;
  public persona_idpersona: AbstractControl;

  public talleres: TalleresInterface[];
  public personas: PersonasInterface[];

  constructor(
    private mecanicosService: MecanicosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private talleresService: TalleresService,
    private personasService: PersonasService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
      'taller_idtaller' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'persona_idpersona' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.taller_idtaller = this.form.controls['taller_idtaller'];
    this.persona_idpersona = this.form.controls['persona_idpersona'];
  }

  ngOnInit() {
    this.getAllTalleres()
    this.getAllPersonas()
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  getAllTalleres() {
    this.talleresService.all()
      .subscribe( res => res.success ? this.talleres = res.result : null)
  }
  
  getAllPersonas() {
    this.personasService.all()
      .subscribe( res => res.success ? this.personas = res.result : null)
  }

  onSubmit(values: MecanicosInterface): void {
    this.mecanicosService.create( values )
      .subscribe( data => {
          this.data = data;
          this.confirm();
        });
  }
}
