import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  searchClient: string;
  showData: boolean = false;
  showClient: any;
  clientes$: Observable<Cliente[]>
  userId: string;
  idUnidade: string;

  @ViewChild('searchCliente', { static: false }) searchInfoClient!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private clienteService: ClienteService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
  }

  listClientUnidadeById(unidadeId): void {
    this.clientes$ = this.clienteService.list(unidadeId);
    this.idUnidade = unidadeId;
    this.showData = true;
  }

  searchAllClient() {
    let keyup$ = fromEvent(this.searchInfoClient.nativeElement, 'keyup');
    this.clientes$ = keyup$.pipe(
      debounceTime(700),
      switchMap(() => this.filterClient(this.searchClient))
    );
  }

  filterClient(findClient: string): Observable<Cliente[]> {
    if(findClient.length === 0) {
      return this.clientes$ = this.clienteService.list(this.idUnidade);
    }
    return this.clienteService.search(findClient, this.idUnidade);
  }

  onEdit(id): void {
    this.router.navigate([`/editar-cliente/${id}`]);
  }

  onDelete(id): void {
    Swal.fire({
      title: 'Tem Certeza?', text: "Deseja excluir o cliente?", icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#3085d6', cancelButtonColor: '#eb5e2e', cancelButtonText: 'Cancelar', confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeleteClient(id, this.userId);
      }
    })
  }

  isDeleteClient(id, userId) {
    this.clienteService.delete(id, userId).subscribe(
      success => {
        this.clienteService.viewMessage(
          '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O cliente foi excluido.',
          'toast-error', 'danger'
        );
        this.listClientUnidadeById(this.idUnidade);
      },
      error => {
        this.clienteService.viewMessage(
          '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Ocorreu um erro ao excluir.',
          'toast-error', 'danger'
        );
      },
      () => console.log('tudo completo')

    );
  }

  showFormClients() {
    this.router.navigate(["/form-clientes"]);
  }

  showListClient(event) {
    this.showClient = event;
  }

}
