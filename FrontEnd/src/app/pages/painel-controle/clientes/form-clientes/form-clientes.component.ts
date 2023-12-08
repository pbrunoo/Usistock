import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectService } from 'src/app/services/select.service';
import { Unidade } from 'src/app/models/unidade';
import { DatePipe, Location } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit {

  unidades: Unidade[];
  opcaoRegisterOrEdit: string;
  ShowDate = new Date();
  stringResultRegisterOrEdit: string;
  stringResultErrorRegisterOrEdit: string;

  formClient: any = {
    cpfCnpj: null,
    inscEstadual: null,
    razaoSocial:null,
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
    unidadeId: null,
    status: 1,
    validationParameters: {
      userCreated: localStorage.getItem('login'),
      createdAt: this.datepipe.transform(this.ShowDate, 'dd/MM/yyyy'),
    }

  }

  idEdit: any;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private selectService: SelectService,
    public datepipe: DatePipe,
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.selectService.list().subscribe(result => {
      this.unidades = result;
    });
    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url){
      case "/form-clientes":
        this.opcaoRegisterOrEdit = "Cadastrar";
      break;
      case `/editar-cliente/${this.idEdit}`:
        this.opcaoRegisterOrEdit = "Editar";

        this.clienteService.loadById(this.idEdit).subscribe((result: any) => {
          if(result) {
            this.formClient = result;
            this.formClient.validationParameters.userUpdated = localStorage.getItem('login');
            this.formClient.validationParameters.updateAt = this.datepipe.transform(this.ShowDate, 'dd/MM/yyyy');
            return;
          }
          result = [];
        });
      break
    }
  }

  sendClient(senderClient) {
    if(senderClient === 1) {
      this.stringResultRegisterOrEdit = 'criado';
      this.stringResultErrorRegisterOrEdit = 'cadastrar';
      this.registerClient(this.formClient);
      return;
    }

    if(senderClient === 2) {
      this.stringResultRegisterOrEdit = 'editado';
      this.stringResultErrorRegisterOrEdit = 'editar';
      this.updateClient(this.formClient);
    }

  }

  registerClient(formClient) {
    this.clienteService.create(formClient).subscribe(
      success => {
       this.successAlert(formClient);
      },
      error => {
        this.errorAlert();
      },
      () => console.log('tudo completo')

    );
  }

  updateClient(formClient) {
    this.clienteService.update(formClient).subscribe(
      success => {
        this.successAlert(formClient);
        this.router.navigate(['/clientes']);
      },
      error => {
        this.errorAlert();
      },
      () => console.log('tudo completo')
    );
  }

  successAlert(formClient) {
    this.clienteService.viewMessage(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O cliente ${formClient.razaoSocial} foi
      ${this.stringResultRegisterOrEdit}.`,
      'toast-error',
      'success'
    );
    this.router.navigate(['/clientes']);
  }

  errorAlert() {
    this.clienteService.viewMessage(
      `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao
      ${this.stringResultErrorRegisterOrEdit}, tente novamente mais tarde.`,
      'toast-error',
      'danger'
    );
  }

}
