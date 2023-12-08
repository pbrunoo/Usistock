import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { Unidade } from 'src/app/models/unidade';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-form-unidades',
  templateUrl: './form-unidades.component.html',
  styleUrls: ['./form-unidades.component.scss']
})
export class FormUnidadesComponent implements OnInit {

  unidadess: Unidade[];
  empresas: Empresa[];
  opcaoRegisterOrEdit: string;
  idEdit: any;
  showDate= new Date();
  stringResultRegisterOrEdit: string;

  formUnidade: any = {
    nomeUnidade: null,
    idEmpresa: null,
    status: 1,
    validationControllers: {
      userCreated: localStorage.getItem('login'),
      createAt: this.datepipe.transform(this.showDate, 'dd/MM/yyyy')
    }
  }
  constructor(
    private router: Router,
    private unidadeService: UnidadesService,
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe
    ) { }

  ngOnInit() {
    this.listEmpresas();
    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url) {
      case "/form-unidade":
        this.opcaoRegisterOrEdit = "cadastrar";
      break;
      case `/editar-unidade/${this.idEdit}`:
        this.opcaoRegisterOrEdit = "Editar";
        this.unidadeService.loadById(this.idEdit)
        .subscribe((result: any) => {
          if(result) {
            this.loadingUnidade(result);
          }
          result = [];
        });
      break;
    }
  }

  listEmpresas() {
    this.unidadeService.listEmpresa().subscribe(result => {
      this.empresas = result;
    });
  }

  loadingUnidade(result) {
    this.formUnidade = result;
    this.formUnidade.validationControllers.userUpdated = localStorage.getItem('login');
    this.formUnidade.validationControllers.updateAt = this.datepipe.transform(this.showDate, 'dd/MM/yyyy');
    return;
  }

  sendUnidade(sentUnidade) {
    if(sentUnidade === 1) {
      this.registerUnidade(this.formUnidade);
      return;
    }

    if(sentUnidade === 2) {
      this.unidadeService.update(this.formUnidade).subscribe(
        success => {
          this.unidadeService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> A unidade ${this.formUnidade.nomeUnidade} foi atualizada.`,
            'toast-error', 'success'
          );
          this.router.navigate(['/unidades']);
        },
        error => {
          this.unidadeService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao atualizar, tente novamente mais tarde.`,
            'toast-error', 'danger'
          );
        },
        () => console.log('tudo completo')
      )
    }
  }

  registerUnidade(formUnidade) {
    this.unidadeService.create(formUnidade).subscribe(
      success => {
        this.stringResultRegisterOrEdit = 'criada';
        this.successAlert(this.formUnidade, this.stringResultRegisterOrEdit);
        this.router.navigate(['/unidades']);
      },
      error => {
        this.errorAlert();
      },
      () => console.log('tudo completo')
    );
  }

  successAlert(formUnidade, stringResultRegisterOrEdit) {
    this.unidadeService.viewMessage(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> A unidade ${formUnidade.nomeUnidade} foi ${stringResultRegisterOrEdit}.`,
      'toast-error', 'success'
    );
  }

  errorAlert() {
    this.unidadeService.viewMessage(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente mais tarde.`,
      'toast-error', 'danger'
    );
  }
}
