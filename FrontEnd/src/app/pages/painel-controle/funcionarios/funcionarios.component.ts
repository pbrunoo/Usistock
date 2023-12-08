import { debounceTime, map, mergeAll, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  funcionarios$: Observable<Funcionario[]>;
  userId: string;
  data: boolean = false;
  pesquisarFuncionario!: string;
  @ViewChild('searchFuncionario', { static: false }) searchInfoFuncionario!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('login');
    this.funcionarios$ = this.funcionarioService.list();
    this.noData();
  }

  searchAllFuncionario() {
    let keyup$ = fromEvent(this.searchInfoFuncionario.nativeElement, 'keyup');
    this.funcionarios$ = keyup$.pipe(
      debounceTime(700),
      switchMap(() => this.filterFuncionario(this.pesquisarFuncionario))
    );
  }

  filterFuncionario(pesquisarFuncionario: string): Observable<Funcionario[]> {
    if(pesquisarFuncionario.indexOf('/') !== -1) {
      const dateType = pesquisarFuncionario.split('/');
      pesquisarFuncionario = `${dateType[2]}-${dateType[1]}-${dateType[0]}`;
    }

    if(pesquisarFuncionario.length == 0) {
      return this.funcionarios$ = this.funcionarioService.list();
    }
      return this.funcionarioService.searchFuncionario(pesquisarFuncionario);
  }

  onEdit(id) {
    this.router.navigate([`/editar-funcionario/${id}`]);
  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?', text: "Deseja excluir o funcionário?", icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar', confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDeleteStaff(id, this.userId);
      }
    });
  }

  isDeleteStaff(id, userId) {
    this.funcionarioService.delete(id, userId).subscribe(()=> {
      this.funcionarioService.viewMessage(
        '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O funcionário foi excluido.',
        'toast-error',
        'danger'
      );
      this.funcionarios$ = this.funcionarioService.list();
    },
    error =>{
      this.funcionarioService.viewMessage(
        '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Ocorreu um erro ao excluir.',
          'toast-error', 'danger'
      );
    },
    ()=> {console.log('all Right')}
    );
  }

  noData() {
    this.funcionarioService.list().subscribe((e) => {
      if(e){
        this.data = true;
      }else {
        this.data = false;
      }
    });
  }

  formFuncionario() {
    this.router.navigate(['/form-funcionarios']);
  }

}
