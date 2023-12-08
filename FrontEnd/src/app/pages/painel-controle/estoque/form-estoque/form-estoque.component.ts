import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricoEstoque } from 'src/app/models/estoque';
import { EstoqueService } from 'src/app/services/estoque.service';
import { SelectService } from 'src/app/services/select.service';
import { Unidade } from 'src/app/models/unidade'

@Component({
  selector: 'form-estoque',
  templateUrl: './form-estoque.component.html',
  styleUrls: ['./form-estoque.component.scss']
})
export class FormEstoqueComponent implements OnInit {

  opcaoRegisterOrEdit: string;
  today = new Date();
  idEdit: any;
  unidades: Unidade[];
  //private eEdit: number = -1;
  save: number = 0;

  formEstoque: any = {
    produto:null,
    unidadeId: null,
    status: 1,
    createAt: this.datepipe.transform(this.today, 'dd/MM/yyyy'),
    userCreated: localStorage.getItem('login')
  }

  historicoEstoque: any = {
    quantidade: null,
    vlUnitario: null
  }

  itensEstoque: any = [];
  deleteHistorico: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private selectService: SelectService,
    private estoqueService: EstoqueService,
    private datepipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit() {
    this.selectService.list().subscribe((result: any) => {
      this.unidades = result;
    });

    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url) {
      case "/form-estoque":
        this.opcaoRegisterOrEdit = "Cadastrar";
      break;
      case `/editar-estoque/${this.idEdit}`:
        this.opcaoRegisterOrEdit = "Editar";
        this.save = 1;

        this.estoqueService.loadById(this.idEdit).subscribe((result: any) => {
          if(result) {
            this.loadingEstoque(result);
          }
          result = [];
        });
      break;
    }
  }

  loadingEstoque(result) {
    this.formEstoque = result;
    this.formEstoque.userUpdated = localStorage.getItem('login');
    this.formEstoque.updateAt = this.datepipe.transform(this.today, 'dd/MM/yyyy');
    this.estoqueService.loadHistoricoId(this.idEdit).subscribe((servicosFor: any) => {
      this.itensEstoque = servicosFor;
    });
  }

  /*adicionar() {
    if(this.eEdit == -1) {
      this.itensEstoque.push({
        data: this.hoje,
        quantidade: this.historicoEstoque.quantidade,
        vlUnitario: this.historicoEstoque.vlUnitario,
        itemVlTotal: this.historicoEstoque.quantidade * this.historicoEstoque.vlUnitario
      });
      this.historicoEstoque.quantidade = "";
      this.historicoEstoque.vlUnitario = "";
    } else {
      this.itensEstoque[this.eEdit].quantidade = this.historicoEstoque.quantidade;
      this.itensEstoque[this.eEdit].vlUnitario = this.historicoEstoque.vlUnitario;
      this.eEdit = -1;
      this.historicoEstoque.quantidade = "";
      this.historicoEstoque.vlUnitario = "";
    }


  }
  editar(i) {
    this.historicoEstoque.quantidade = this.itensEstoque[i].quantidade;
    this.historicoEstoque.vlUnitario = this.itensEstoque[i].vlUnitario;
    this.eEdit = i;
  }

  deleteItem(id, i) {
    this.excluirHistorico.push({
      id: id
    });
    this.itensEstoque.splice(i,1);
  }*/

  enviarEstoque() {
    if(this.save === 0) {
      this.estoqueService.create(this.formEstoque).subscribe(
        success => {
          this.estoqueService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O produto ${this.formEstoque.produto} foi criado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/estoque']);
        },
        error => {
          this.estoqueService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },

        () => console.log('Completed')

      );

      return;
    }
    if(this.save === 1) {
      this.estoqueService.update(this.formEstoque).subscribe(success => {
        this.estoqueService.viewMessage(
          `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O produto ${this.formEstoque.produto} Foi atualizado.`,
          'toast-error',
          'success'
        );
        this.router.navigate(['/estoque']);
      },
      error => {
        this.estoqueService.viewMessage(
          `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao atualizar, tente mais tarde.`,
          'toast-error',
          'danger'
        );
      },

      () => console.log('Completed')

      );
    }

  }

  getEstoque(itensEstoque) {
    let subtotal = 0;
    subtotal = itensEstoque.reduce((acc, item) => acc + ((item.quantidade|| 1)), 0);
    this.formEstoque.total = subtotal;
    return subtotal;
  }

  getTotal(itensEstoque) {
    let subtotal = 0;
    subtotal = itensEstoque.reduce((acc, item) => acc + ((item.quantidade * item.vlUnitario|| 1)), 0);
    this.formEstoque.vlTotal = subtotal;
    return subtotal;
  }

  voltar() {
    this.router.navigate(['/estoque']);
  }
}
