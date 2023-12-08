import { ElementRef } from '@angular/core';
import { debounceTime, map, mergeAll, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadesService } from 'src/app/services/unidades.service';
import { Unidade } from 'src/app/models/unidade';
import Swal from 'sweetalert2'
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  @ViewChild('pesquisar' , {static: false} ) searchInfoUnity!: ElementRef<HTMLInputElement>;
  textPesquisar: string;
  unidades$: Observable<Unidade[]>;
  userId: string;
  showData: boolean = true;

  constructor(
    private router: Router,
    private unidadeService: UnidadesService
    ) { }

  ngOnInit() {
    this.listUnidades();
    this.gato();
  }

  listUnidades() {
    this.unidades$ = this.unidadeService.list();
  }

  gato() {
    this.unidadeService.list()
      .subscribe((e) => {e ? this.showData = true : this.showData = false; })
  }

  onEdit(id) {
    this.router.navigate([`/editar-unidade/${id}`]);
  }

  searchAllUnity() {
    let keyup$ = fromEvent(this.searchInfoUnity.nativeElement, 'keyup');
    this.unidades$ = keyup$.pipe(
      debounceTime(700),
      switchMap(() => this.filterUnity(this.textPesquisar))
    );
  }

  filterUnity(textPesquisar: string): Observable<Unidade[]> {
    if(textPesquisar.length === 0) {
      return this.unidades$ = this.unidadeService.list();
    }
    return this.unidadeService.search(textPesquisar);
  }


  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?', text: "Deseja excluir a unidade?", icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#3085d6', cancelButtonColor: '#eb5e2e', cancelButtonText: 'Cancelar', confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDelete(id, this.userId);
      }
    });
  }

  isDelete(id, userId) {
    this.unidadeService.delete(id, userId).subscribe( success => {
      this.unidadeService.viewMessage(
        '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> A unidade foi excluida.',
        'toast-error', 'danger'
      );
      this.listUnidades();
    },
    error => {
      this.unidadeService.viewMessage(
        '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Ocorreu um erro ao excluir.',
        'toast-error', 'danger'
      );
    },
    () => console.log('tudo completo')
    );
  }

 showformUnidades() {
   this.router.navigate(['/form-unidade']);
 }
}
