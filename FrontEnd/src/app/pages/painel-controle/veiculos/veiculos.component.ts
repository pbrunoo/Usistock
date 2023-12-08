import { ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Veiculo } from 'src/app/models/veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  pesquisarVeiculo!: string;
  mostrar:any;
  veiculos$: Observable<Veiculo[]>;
  idUnidade: string;
  userId: string;
  data: boolean = false;

  @ViewChild('searchVeiculo', { static: false }) searchInfoVeiculo: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private veiculoService: VeiculoService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
  }

  listVeiculoUnidadeById(unidadeId) {
    this.veiculos$ = this.veiculoService.list(unidadeId);
    this.data = true;
    this.idUnidade = unidadeId;
  }

  searchAllVeiculos() {
    let keyup$ = fromEvent(this.searchInfoVeiculo.nativeElement, 'keyup');
    this.veiculos$ = keyup$.pipe(
      switchMap(() => this.filterVeiculos(this.pesquisarVeiculo))
    )
  }

  filterVeiculos(pesquisarVeiculo: string): Observable<Veiculo[]> {
    if(pesquisarVeiculo.length === 0) {
      return this.veiculos$ = this.veiculoService.list(this.idUnidade);
    }
    return this.veiculoService.searchAllVeiculo(pesquisarVeiculo, this.idUnidade);
  }

  onEdit(id) {
    this.router.navigate([`/editar-veiculo/${id}`]);
  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja excluir o veículo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.veiculoService.delete(id, this.userId).subscribe(()=> {
          this.veiculoService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O veículo foi excluido.',
            'toast-error',
            'danger'
          );
          this.listVeiculoUnidadeById(this.idUnidade)
        });
      }
    });
  }

  formVeiculos() {
    this.router.navigate(['/form-veiculos']);
  }

  pesquisarP(evento) {
    this.mostrar = evento;
  }
}
