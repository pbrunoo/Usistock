import { debounceTime, map, mergeAll, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  pesquisarFornecedor!: string;
  fornecedores$: Observable<Fornecedor[]>;
  mostrar: any;
  userId: string;
  idUdidade: string;
  data: boolean = false;

  @ViewChild('searchFornecedor', { static: false }) searchInfoFornecedor!: ElementRef<HTMLInputElement>;


  constructor(
    private router: Router,
    private fornecedorService: FornecedorService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
  }

  listFornecedorUnidadeById(unidadeId) {
    this.fornecedores$ = this.fornecedorService.list(unidadeId);
    this.data = true;
    this.idUdidade = unidadeId;
  }

  searchAllFornecedor() {
    let keyup$ = fromEvent(this.searchInfoFornecedor.nativeElement, 'keyup');
    this.fornecedores$ = keyup$
      .pipe(
        debounceTime(700),
        switchMap(() => this.filterFornecedor(this.pesquisarFornecedor))
      );
   }

  filterFornecedor(pesquisarFornecedor: string): Observable<Fornecedor[]> {
    if(pesquisarFornecedor.length === 0) {
      return this.fornecedores$ = this.fornecedorService.list(this.idUdidade);
    }
    return this.fornecedorService.searchFornecedor(pesquisarFornecedor, this.idUdidade);
  }

  onEdit(id) {
    this.router.navigate([`/editar-fornecedor/${id}`]);
  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja excluir o fornecedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fornecedorService.delete(id, this.userId).subscribe(()=> {
          this.fornecedorService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O fornecedor foi excluido.',
            'toast-error',
            'danger'
          );
          this.listFornecedorUnidadeById(this.idUdidade);
        });
      }
    });
  }

  formFornecedor() {
    this.router.navigate(['/form-fornecedor']);
  }

  pesquisarP(evento) {
    this.mostrar = evento;
  }
}
