import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Estoque } from 'src/app/models/estoque';
import { Unidade } from 'src/app/models/unidade';
import Swal from 'sweetalert2';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-form-orcamento',
  templateUrl: './form-orcamento.component.html',
  styleUrls: ['./form-orcamento.component.scss']
})
export class FormOrcamentoComponent implements OnInit {

  hoje = new Date();
  nameBotao: string = "Editar";
  idEdit: any;
  save: number = 0;
  opcao: string;
  verifica: string;
  excluirProduto: any =[];
  userId: any;
  idOrcamento: string;

  unidades: Unidade[];
  clients:Cliente[];
  stocks: Estoque[];

  formOrcamento: any = {
    data: this.hoje,
    unidadeId: null,
    clienteId: null,
    statusPedido: "Negociando",
    status: 1,
    createAt: this.hoje,
    userCreated:localStorage.getItem("login"),
    condicaoPagamento: null,
    prazoPagamento: null,
    observacao: null
  }

  formOrcItem: any = {
    produto: null,
    volume: null,
    vlUnitario: null,
  }
  itensOrc: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private  selectService:SelectService,
    private orcamentoService:OrcamentoService
  ) { }

  ngOnInit() {
    this.idEdit = this.activatedRoute.snapshot.params['id'];
    this.userId = localStorage.getItem('login');

    this.selectService.list().subscribe(resultadoUnidade => {
      this.unidades = resultadoUnidade;
    });
    switch(this.router.url) {
      case "/form-orcamento":
        this.opcao = "Novo";
        this.nameBotao = "Salvar";
        this.save = 1;
      break;
      case `/editar-orcamento/${this.idEdit}`:
        this.opcao = "Editar";

        this.orcamentoService.loadById(this.idEdit).subscribe((result: any)=> {
          if(result) {
            this.formOrcamento = result;
            this.orcamentoService.listClient(result.unidadeId).subscribe(resultado => {
              this.clients = resultado;
            });
            this.orcamentoService.listProduto(result.unidadeId).subscribe(resultStok => {
              this.stocks = resultStok;
            });
            this.formOrcamento.updateAt = this.hoje;
            this.formOrcamento.userUpdated = localStorage.getItem('login');
          }
          this.orcamentoService.loadProduto(result.id). subscribe((produtoFor: any) => {
            if(this.itensOrc) {
              this.itensOrc = produtoFor;
              return;
            }
          });
        });
      break
    }
  }

  enviar() {
    if(this.save === 1) {
      this.orcamentoService.create(this.formOrcamento).subscribe((result: any) => {
        this.idOrcamento = result.id;
        for(let item of this.itensOrc) {
          this.orcamentoService.createProduto(result.id, item).subscribe(
            succes => {},
            error=> {},
          );
        }

        this.orcamentoService.viewMessage(
          `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O orçamento ${this.formOrcamento.clienteId} foi criado.`,
          'toast-error',
          'success'
        );

        this.router.navigate(['/orcamentos']),
        error=> {
          this.orcamentoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },

        ()=> console.log('Completed')
      });
      return;
    }

    if(this.save === 0) {
      this.orcamentoService.update(this.idEdit, this.formOrcamento).subscribe(
        (result: any) => {
          for(let excluir of this.excluirProduto) {
            this.orcamentoService.deleteProduto(this.idEdit, excluir.id).subscribe();
          }
          this.orcamentoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O orçamento ${this.formOrcamento.clienteId} foi atualizado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/orcamentos']);
        },
        error => {
          this.orcamentoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );

    }
  }

  add() {
    this.itensOrc.push({
      produto: this.formOrcItem.produto,
      volume: this.formOrcItem.volume,
      vlUnitario: this.formOrcItem.vlUnitario
    });
  }

  remove(id, i) {
    this.excluirProduto.push({
      id: id
    });
    this.itensOrc.splice(i,1);

  }

  voltar() {
    this.router.navigate(['/orcamentos']);
  }

  aprovar() {
    this.formOrcamento.statusPedido = "Aprovado";
  }

  faturar() {
    this.formOrcamento.statusPedido = "Faturado";
    this.formOrcamento.status = 0;
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja faturar esse orçamento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orcamentoService.update(this.idEdit, this.formOrcamento).subscribe(()=> {
          this.orcamentoService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O orçamento foi faturado.',
            'toast-error',
            'danger'
          );
        });
        this.router.navigate(['/list-faturamento']);
      }
    });
  }


  cancelar() {
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja cancelar esse orçamento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orcamentoService.delete(this.idEdit, this.userId).subscribe(()=> {
          this.orcamentoService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O orçamento foi cancelado.',
            'toast-error',
            'danger'
          );
        });
        this.router.navigate(['/orcamentos']);
      }
    });

  }

  getSubTotal(items) {
    if(items) {
      let subtotal = 0;
      subtotal = items.reduce((acc, item) => acc + (item.volume * (item.vlUnitario || 1)), 0);
      return subtotal;
    }
  }

  getTon(items) {
   if(items) {
    let subtotal = 0;
    subtotal = items.reduce((acc, item) => acc + ( (item.volume || 1)), 0);
    return subtotal;
   }
  }

  onChange($event, unidadeValue) {
    this.orcamentoService.listClient(unidadeValue).subscribe(result => {
      this.clients = result;
    });
    this.orcamentoService.listProduto(unidadeValue).subscribe(result=> {
      this.stocks = result;
    });
  }
}
