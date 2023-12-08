import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Consumo } from 'src/app/models/consumo';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Unidade } from 'src/app/models/unidade'
import { PedidosService } from 'src/app/services/pedidos.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-form-pedidos',
  templateUrl: './form-pedidos.component.html',
  styleUrls: ['./form-pedidos.component.scss']
})
export class FormPedidosComponent implements OnInit {
  opcao: string;
  idEdit: any;
  save: number = 0;
  nomeBotao: string;
  unidades$: Observable<Unidade[]>;
  stocks$: Observable<Consumo[]>;
  fornecedores$: Observable<Fornecedor[]>
  msgError: string;
  msgSuccess: string;
  sucesso: boolean = false;
  erro: boolean = false;

  hoje = new Date();
  formPedido: any = {
    data: this.hoje,
    unidadeId: null,
    pedido: null,
    descricao: null,
    statusPedido: "Aberto",
    status: 1,
    userCreated: localStorage.getItem("login"),
    createAt: this.hoje
  }

  formItens: any = {
    produto: null,
    fornecedorId: null,
    quantidade: null,
    vlUnitario: null,
  }

  itens: any = [];
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private selectService: SelectService,
    private pedidosService: PedidosService,
    private location: Location
  ) { }

  ngOnInit() {
    this.idEdit = this.activatedRoute.snapshot.params['id'];
    this.unidades$ = this.selectService.list();

    switch(this.router.url) {
      case "/form-pedidos":
        this.opcao = "Cadastrar";
        this.nomeBotao = "Salvar";
      break;
      case `/editar-pedidos/${this.idEdit}`:
        this.opcao = "Editar";
        this.nomeBotao = "Editar";
        this.save = 1;
      }
  }
  adicionar() {
      this.itens.push({
        produto: this.formItens.produto,
        quantidade: this.formItens.quantidade,
        fornecedorId: this.formItens.fornecedorId,
        vlUnitario: this.formItens.vlUnitario,
        vlTotal: this.formItens.quantidade * this.formItens.vlUnitario
      });
      
  }
///////////
  /*somar() {
    var soma = 0;
    for(let i = 0; i <this.itens.length; i++) {
      soma = soma + this.itens[i].itemVlTotal;
    }
    return soma;
  }*/
  //////

  remove(i) {
    this.itens.splice(i,1);
    
  }
  
  enviar() {
    if(this.save === 0) {
      this.pedidosService.create(this.formPedido).subscribe((result: any)=> {
        this.msgSuccess = 'Cadastrado com Sucesso';
        this.sucesso = true,
        setTimeout(() => {
          this.location.back();
        }, 3000),
        error=> {
          this.erro = true;
          this.msgError = ' Erro ao cadastrar, tente novamente mais tarde';
          setTimeout(() => {
            window.location.reload();
          }, 3000)
        },

        ()=> console.log('Completed')
      });
      return;
    }
  }

  getSubTotal(items) {
    let subtotal = 0;
    subtotal = items.reduce((acc, item) => acc + (item.vlUnitario * (item.quantidade|| 1)), 0);
    return subtotal;
  }

  voltar() {
    this.router.navigate(['/pedidos']);
  }

  onChange($event, unidadeValue) {
    this.fornecedores$ = this.pedidosService.listFornecedor(unidadeValue);
    this.stocks$ = this.pedidosService.loadConsumo(unidadeValue);
  }
}
