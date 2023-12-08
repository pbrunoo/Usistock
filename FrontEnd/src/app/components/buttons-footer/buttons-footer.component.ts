import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'buttons-footer',
  templateUrl: './buttons-footer.component.html',
  styleUrls: ['./buttons-footer.component.scss']
})
export class ButtonsFooterComponent implements OnInit {

  @Input() valida: any = '';
  @Output() enviarSubmit = new EventEmitter();
  @Input() idUser: any;
  @Input() idUnidade: any;
  @Input() idCliente: any;
  @Input() idVeiculo: any;
  @Input() idFornecedor: any;
  @Input() idConsumo: any;
  @Input() idFuncionario: any;
  @Input() idEmpresa: any;
  @Input() idEstoque: any;
  
  nameBotao: string = "Editar";
  
  enviado:any = {
    user: 1,
    unidade: 1,
    empresa: 1,
    cliente: 1,
    veiculo: 1,
    fornecedor: 1,
    consumo: 1,
    funcionario: 1,
    estoque: 1
  };

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.router.url =="/form-user") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-unidade") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-empresa") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-clientes") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-veiculos") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-fornecedor") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-consumo") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url =="/form-funcionarios") {
      this.nameBotao = "Salvar";
      return;
    }
    if(this.router.url==="/form-estoque") {
      this.nameBotao = "Salvar";
      return;
    }
  }

  enviar() {
    switch(this.router.url){
      case "/form-user":
        this.enviado.user = 1;
        this.enviarSubmit.emit(this.enviado.user);
      break;
      case `/editar-user/${this.idUser}`:
        this.enviado.editUser = 2;
        this.enviarSubmit.emit(this.enviado.editUser);
      break;
      case "/form-unidade":
        this.enviado.unidade = 1;
        this.enviarSubmit.emit(this.enviado.unidade);
      break;
      case `/editar-unidade/${this.idUnidade}`:
        this.enviado.unidade = 2;
        this.enviarSubmit.emit(this.enviado.unidade);
      break;
      case "/form-clientes":
        this.enviado.unidade = 1;
        this.enviarSubmit.emit(this.enviado.unidade);
      break;
      case `/editar-cliente/${this.idCliente}`:
        this.enviado.unidade = 2;
        this.enviarSubmit.emit(this.enviado.unidade);
      break;
      case "/form-veiculos":
        this.enviado.veiculo = 1;
        this.enviarSubmit.emit(this.enviado.veiculo);
      break;
      case `/editar-veiculo/${this.idVeiculo}`:
        this.enviado.veiculo = 2;
        this.enviarSubmit.emit(this.enviado.veiculo);
      break;
      case "/form-fornecedor":
        this.enviado.fornecedor = 1;
        this.enviarSubmit.emit(this.enviado.fornecedor);
      break;
      case `/editar-fornecedor/${this.idFornecedor}`:
        this.enviado.fornecedor = 2;
        this.enviarSubmit.emit(this.enviado.fornecedor);
      break;
      case "/form-consumo":
        this.enviado.consumo = 1;
        this.enviarSubmit.emit(this.enviado.consumo);
      break;
      case `/editar-consumo/${this.idConsumo}`:
        this.enviado.consumo = 2;
        this.enviarSubmit.emit(this.enviado.consumo);
      break;
      case "/form-funcionarios":
        this.enviado.funcionario = 1;
        this.enviarSubmit.emit(this.enviado.funcionario);
      break;
      case `/editar-funcionario/${this.idFuncionario}`:
        this.enviado.funcionario = 2;
        this.enviarSubmit.emit(this.enviado.funcionario);
      break;
      case "/form-empresa":
        this.enviado.empresa = 1;
        this.enviarSubmit.emit(this.enviado.empresa);
      break;
      case `/editar-empresa/${this.idEmpresa}`:
        this.enviado.empresa = 2;
        this.enviarSubmit.emit(this.enviado.empresa);
      break;
      case "/form-estoque":
        this.enviado.estoque = 1;
        this.enviarSubmit.emit(this.enviado.estoque);
      break;
      case `/editar-estoque/${this.idEstoque}`:
        this.enviado.estoque = 2;
        this.enviarSubmit.emit(this.enviado.estoque);
      break;
    }
  }

  voltar(){
    switch(this.router.url){
      case "/form-pedidos":
        this.router.navigate(['/pedidos']);
      break;
      case "/form-orcamento":
        this.router.navigate(['/orcamentos']);
      break;
      case "/form-clientes":
        this.router.navigate(['/clientes']);
      break;
      case "/form-empresa":
        this.router.navigate(['/empresa']);
      break;
      case "/form-estoque":
        this.router.navigate(['/estoque']);
      break;
      case "/form-unidade":
        this.router.navigate(['/unidades']);
      break;
      case `/editar-unidade/${this.idUnidade}`:
        this.router.navigate(['/unidades']);
      break;
      case "/form-funcionarios":
        this.router.navigate(['/funcionarios']);
      break;
      case "/form-fornecedor":
        this.router.navigate(['/fornecedor']);
      break;
      case "/form-consumo":
        this.router.navigate(['/consumo']);
      break;
      case "/form-veiculos":
        this.router.navigate(['/veiculos']);
      break;
      case `/editar-veiculo/${this.idVeiculo}`:
        this.router.navigate(['/veiculos']);
      break;
      case "/form-user":
        this.router.navigate(['/user']);
      break;
      case `/editar-user/${this.idUser}`:
        this.router.navigate(['/user']);
      break;
      case `/editar-cliente/${this.idCliente}`:
        this.router.navigate(['/clientes']);
      break;
      case `/editar-fornecedor/${this.idFornecedor}`:
        this.router.navigate(['/fornecedor']);
      break;
      case `/editar-consumo/${this.idConsumo}`:
        this.router.navigate(['/consumo']);
      break;
      case `/editar-funcionario/${this.idFuncionario}`:
        this.router.navigate(['/funcionarios']);
      break;
      case `/editar-empresa/${this.idEmpresa}`:
        this.router.navigate(['/empresa']);
      break;
      case `/editar-estoque/${this.idEstoque}`:
        this.router.navigate(['/estoque']);
      break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

}
