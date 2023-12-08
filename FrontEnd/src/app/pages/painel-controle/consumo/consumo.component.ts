import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Consumo } from 'src/app/models/consumo';
import { ConsumoService } from 'src/app/services/consumo.service';
import { fromEvent, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.scss']
})
export class ConsumoComponent implements OnInit {

  pesquisarConsumo!: string;
  mostrar: any;
  consumos$: Observable<Consumo[]>;
  idUnidade: string;
  userId: string;
  data: boolean = false;

  @ViewChild('searchConsumo', { static: false }) searchInfConsumo: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private consumoService: ConsumoService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
  }

  listConsumoUnidadeById(unidadeId) {
   this.consumos$ = this.consumoService.list(unidadeId);
   this.idUnidade = unidadeId;
   this.data = true;
  }

  onEdit(id) {
    this.router.navigate([`/editar-consumo/${id}`]);
  }

  searchAllConsumo() {
    let keyup$ = fromEvent(this.searchInfConsumo.nativeElement, 'keyup');
    this.consumos$ = keyup$.pipe(
      switchMap(() => this.filterConsumo(this.pesquisarConsumo))
    )
  }

  filterConsumo(pesquisarConsumo: string): Observable<Consumo[]> {
    if(pesquisarConsumo.length === 0) {
      return this.consumos$ = this.consumoService.list(this.idUnidade);
    }
    return this.consumoService.searchConsumo(pesquisarConsumo, this.idUnidade);

  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja excluir o produto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.consumoService.delete(id, this.userId).subscribe(()=> {
          this.consumoService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O produto foi excluido.',
            'toast-error',
            'danger'
          );
          this.listConsumoUnidadeById(this.idUnidade);
        });
      }
    });
  }

  formConsumo() {
    this.router.navigate(['/form-consumo']);
  }

  pesquisarP(evento) {
    this.mostrar = evento;
  }
}
