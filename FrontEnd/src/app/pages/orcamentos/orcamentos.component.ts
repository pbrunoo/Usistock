import { ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Orcamento } from 'src/app/models/orcamento';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.scss']
})
export class OrcamentosComponent implements OnInit {

  pesquisarOrcamento!: string;
  mostrar: any;
  userId: string;
  orcamentos$: Observable<Orcamento[]>;
  idUnidade: string;
  data: boolean = false;

  @ViewChild('searchOrcamento', {static: false}) searchInfOrcamento!: ElementRef<HTMLInputElement>;

  constructor(
    private router:Router,
    private orcamentoService: OrcamentoService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
  }

  listOrcamentoUnidadeById(unidadeId) {
    this.orcamentos$ = this.orcamentoService.list(unidadeId);
    this.idUnidade = unidadeId;
    this.data = true;
  }

  searchAllOrcamento() {
    let keyup$ = fromEvent(this.searchInfOrcamento.nativeElement, 'keyup');
    this.orcamentos$ = keyup$.pipe(
      debounceTime(700),
      switchMap(() => this.filterOrcamento(this.pesquisarOrcamento))
    );
  }

  filterOrcamento(pesquisarOrcamento: string): Observable<Orcamento[]> {
    if(pesquisarOrcamento.indexOf('/') !== -1) {
      const dateType = pesquisarOrcamento.split('/');
      pesquisarOrcamento = `${dateType[2]}-${dateType[1]}-${dateType[0]}`;
    }
    if(pesquisarOrcamento.length === 0) {
      return this.orcamentos$ = this.orcamentoService.list(this.idUnidade);
    }
    return this.orcamentoService.searchAllOrcamento(pesquisarOrcamento, this.idUnidade);
  }

  onEdit(id) {
    this.router.navigate([`/editar-orcamento/${id}`]);
  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja excluir o orçamento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orcamentoService.delete(id, this.userId).subscribe(()=> {
          this.orcamentoService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O orçamento foi excluido.',
            'toast-error',
            'danger'
          );
          this.listOrcamentoUnidadeById(this.idUnidade)
        });
      }
    });
  }

  formOrcamento() {
    this.router.navigate(['/form-orcamento']);
  }

  pesquisarP(evento) {
    this.mostrar = evento;
  }
}
