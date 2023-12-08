import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicos } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.scss']
})
export class FormEmpresaComponent implements OnInit {

  opcaoRegisterOrEdit: string;
  showDate= new Date();
  listServicosEmpresa:Servicos[] = [];
  stringResultRegisterOrEdit: string;

  formEmpresa: any = {
    cnpj: null,
    inscrEstadual: null,
    razaoSocial: null,
    nomeFantasia: null,
    cep: null,
    endereco: null,
    complemento: null,
    numero: null,
    bairro: null,
    cidade: null,
    uf: null,
    telefone: null,
    email: null,
    status: 1,
    pis: null,
    cofins: null,
    iss: null,
    inss: null,
    irrf: null,
    csll: null,
    userCreated: localStorage.getItem('login'),
    createAt: this.datePipe.transform(this.showDate, 'dd/MM/yyyy'),
    servicos: []
  }

  servicos: any = {
    cnae: null,
    itemLc: null,
    ativMuni: null
  }

  idEdit: any;
  itensServico: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private empresaService: EmpresaService
    ) { }

  ngOnInit() {
    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url){
      case "/form-empresa":
        this.opcaoRegisterOrEdit = "Cadastrar";
      break;
      case `/editar-empresa/${this.idEdit}`:
        this.opcaoRegisterOrEdit = "Editar";

        this.empresaService.loadById(this.idEdit).subscribe((result: any) => {
          if(result) {
            this.loadingEmpresa(result);
          }
          result = [];
        });
      break;
    }
  }

  loadingEmpresa(result) {
    this.formEmpresa = result;
    this.formEmpresa.userUpdated = localStorage.getItem('login'),
    this.formEmpresa.updateAt = this.datePipe.transform(this.showDate, 'dd/MM/yyyy')
    this.empresaService.localServiceId(this.idEdit).subscribe((listServicosEmpresa) => {
      this.itensServico = listServicosEmpresa;
    });
    return;
  }

  addServicos() {
    this.itensServico.push({
      cnae: this.servicos.cnae,
      itemLc: this.servicos.itemLc,
      ativMuni: this.servicos.ativMuni
    });
    this.clearImputsServicos();
  }

  clearImputsServicos() {
    this.servicos.cnae = "";
    this.servicos.itemLc = "";
    this.servicos.ativMuni = "";
  }

  remover(i) {
    this.itensServico.splice(i,1);
  }

  sendEmpresa(senderEmpresa) {
    if(senderEmpresa === 1) {
      this.stringResultRegisterOrEdit = 'cadastrada';
      this.registerEmpresa(this.formEmpresa);
      return;
    }

    if(senderEmpresa === 2) {
      this.stringResultRegisterOrEdit = 'editada';
      this.updateEmpresa(this.formEmpresa);
      return;
    }
  }

  registerEmpresa(formEmpresa) {
    this.empresaService.create(formEmpresa).subscribe((result: any) => {
      this.registerServicos(result);
      this.successAlert(this.formEmpresa, this.stringResultRegisterOrEdit);
      this.router.navigate(['/empresa']);
      },
      error => {
        this.errorAlert();
      },
      () => console.log('Completed')
    );
  }

  registerServicos(result) {
    for(let servico of this.itensServico){
      this.empresaService.createServices(result.id, servico).subscribe(
        success => {console.log('tudo ok')}, error => {'algo deu errado'}
      );
    }
  }

  updateEmpresa(formEmpresa) {
    this.empresaService.updateEmpresa(formEmpresa).subscribe((res: any) => {
     this.updateServicos();
      this.successAlert(this.formEmpresa, this.stringResultRegisterOrEdit);
      this.router.navigate(['/empresa']);
    },
    (error) => {console.error(error)}, () => {console.log('completo')})
  }

  updateServicos() {
    this.empresaService.deleteServicos(this.idEdit, this.formEmpresa.servicos.cnae).subscribe((result: any) => {
      for(let servico of this.itensServico){
        this.empresaService.createServices(this.idEdit, servico).subscribe(() => {
          console.log(this.itensServico);
        }
      );}
    },
    error => {
      console.log('erro ao excluir');
    });
  }

  successAlert(formEmpresa, stringResultRegisterOrEdit) {
    this.empresaService.viewMessage(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ${formEmpresa.razaoSocial} Foi ${stringResultRegisterOrEdit}.`,
      'toast-error', 'success'
    );
  }

  errorAlert() {
    this.empresaService.viewMessage(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente mais tarde.`,
      'toast-error', 'danger'
    );
  }

}
