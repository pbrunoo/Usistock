import { debounceTime, map, mergeAll, switchMap } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Estoque } from 'src/app/models/estoque';
import { EstoqueService } from 'src/app/services/estoque.service';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
  showEstoque: any;
  userId: string;
  estoques$: Observable<Estoque[]>;
  idUnidade: string;
  showData: boolean = false;
  findEstoque!: string;

  @ViewChild('searchEstoque', {static: false} ) searchInfoEstoque!: ElementRef<HTMLInputElement>;



  constructor(
    private router: Router,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
  }

  listEstoqueUnidadeById(unidadeId) {
    this.estoques$ = this.estoqueService.list(unidadeId);
    this.idUnidade = unidadeId;
    this.gato(unidadeId)
  }

  gato(unidadeId) {
    this.estoqueService.list(unidadeId)
      .subscribe((e) => {
        console.log(e);
        if(e)
          this.showData = true;
      })
  }

  searchAllEstoque() {
    let keyup$ = fromEvent(this.searchInfoEstoque.nativeElement, 'keyup');
    this.estoques$ = keyup$.pipe(
     debounceTime(700),
     switchMap(() => this.filterEstoque(this.findEstoque))
    )
  }

  filterEstoque(pesquisarEstoque: string): Observable<Estoque[]> {
    if(pesquisarEstoque.length === 0) {
      return this.estoques$ = this.estoqueService.list(this.idUnidade);
    }
    return this.estoqueService.searchStock(pesquisarEstoque, this.idUnidade);
  }

  onEdit(id) {
    this.router.navigate([`/editar-estoque/${id}`]);
  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?', text: "Deseja excluir o produto?", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e', cancelButtonText: 'Cancelar', confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
       this.isDelete(id)
      }
    });
  }

  isDelete(id) {
    this.estoqueService.delete(id, this.userId).subscribe(()=> {
      this.deleteAlert();
      this.listEstoqueUnidadeById(this.idUnidade);
    });
  }

  deleteAlert() {
    this.estoqueService.viewMessage(
      '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O estoque foi excluido.',
      'toast-error', 'danger'
    );
  }

  showFormEstoque() {
    this.router.navigate(['/form-estoque']);
  }

  showListEstoque(evento) {
    this.showEstoque = evento;
  }
}
