import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-form-funcionarios',
  templateUrl: './form-funcionarios.component.html',
  styleUrls: ['./form-funcionarios.component.scss']
})
export class FormFuncionariosComponent implements OnInit {

  dataData= new Date();
  empresas: Empresa[];
  opcao: string;

  formFuncionario: any = {
    nomeCompleto: null,
    rg: null,
    cpf: null,
    estadoCivil: null,
    sexo: null,
    dataNascimento: null,
    filial: null,
    endereco: null,
    complemento: null,
    bairro: null,
    cidade: null,
    cep: null,
    uf: null,
    telefone: null,
    email: null,
    escolaridade: null,
    status: 1,
    userCreated: localStorage.getItem('login'),
    createAt: this.datePipe.transform(this.dataData, 'dd/MM/yyyy'),
    trabalhista: {
      pis: null,
      dataAdmissao: null,
      salarioAdmissao: null,
      salarioAtual: null,
      funcao: null,
      empresa: null,
      empresaAnterior: null
    }

  };

  idEdit: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private funcionarioService: FuncionarioService,
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.funcionarioService.listEmpresa().subscribe(retorno => {
      this.empresas = retorno;
    });
    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url){
      case "/form-funcionarios":
        this.opcao = "Cadastrar";
      break;
      case `/editar-funcionario/${this.idEdit}`:
        this.opcao = "Editar";

        this.funcionarioService.loadById(this.idEdit).subscribe((result: any) => {
          if(result) {
            this.formFuncionario = result;
            this.formFuncionario.userUpdated = localStorage.getItem('login');
            this.formFuncionario.updatedAt = this.datePipe.transform(this.dataData, 'dd/MM/yyyy');
          }
        });
      break
    }
  }

  funcionarios() {
    this.router.navigate(['/funcionarios']);
  }

  enviarFuncionario(enviadoFuncionario) {
    if(enviadoFuncionario == 1) {
      this.funcionarioService.create(this.formFuncionario).subscribe(
        success => {
          this.funcionarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O funcionario ${this.formFuncionario.nomeCompleto} foi criado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/funcionarios']);
        },
        error => {
          this.funcionarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );
      return;
    }

    if(enviadoFuncionario === 2) {
      this.funcionarioService.update(this.formFuncionario).subscribe(
        success => {
          this.funcionarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O funcionário ${this.formFuncionario.nomeCompleto} Foi atualizado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/funcionarios']);
        },
        error => {
          this.funcionarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao atualizar, tente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );
    }
  }
}
