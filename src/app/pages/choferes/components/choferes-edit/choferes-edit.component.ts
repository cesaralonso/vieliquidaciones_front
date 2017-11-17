import { ChoferesResponseInterface } from './../choferes-table/choferes-response.interface';
import { PersonasService } from './../../../personas/components/personas-table/personas.service';
import { PersonasInterface } from './../../../personas/components/personas-table/personas.interface';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { ChoferesService } from 'app/pages/choferes/components/choferes-table/choferes.service';
import { ChoferesInterface } from 'app/pages/choferes/components/choferes-table/choferes.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasEditModalComponent } from 'app/pages/personas/components/personas-table/personas-edit-modal/personas-edit-modal.component';

@Component({
  selector: 'app-choferes-edit',
  templateUrl: './choferes-edit.component.html',
  styleUrls: ['./choferes-edit.component.scss'],
  providers: [
    PersonasService,
    ChoferesService
  ]
})
export class ChoferesEditComponent implements OnInit {
  public chofer: ChoferesInterface = {
    idchofer: null,
    licencia: '',
    status: '',
    chofer: null,
    fianza: 0,
    aval1: null,
    aval2: null,
    aval3: null,
    aval4: null
  }
  constructor(
    private choferesService: ChoferesService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private personaService: PersonasService,
    private router:Router,
    activatedRoute: ActivatedRoute,
  ) { 
    activatedRoute.params
    .flatMap( parameters => this.choferesService.findById( parameters['id'] ))
    .subscribe( (choferInfo: ChoferesResponseInterface) => {
      if ( choferInfo.success )
        this.chofer = choferInfo.result
    })

  }

  ngOnInit() {
  }

  editPersonasModalShow( id ) {
    this.personaService.findById( id )
      .flatMap( personaInfo => 
        personaInfo.success 
          ? this.dialogService.addDialog(PersonasEditModalComponent, personaInfo.result)
          : null)
      .subscribe( data =>
        data ? this.showToast(data) : null,
        error => console.log(error),
        () => console.log('Modified complete'));
  }

  showToast( data ) {
    if ( data.success )
      this.toastrService.success(data.message);
    else
      this.toastrService.error(data.message);
  }
  onSubmitChofer( vaues ) {
    this.choferesService.edit( this.chofer )
      .subscribe( (data: ChoferesResponseInterface) => {
        if ( data.success )
          this.router.navigate(['/pages/choferes/all'])
        else 
          this.showToast( data )
      })
  }

}
