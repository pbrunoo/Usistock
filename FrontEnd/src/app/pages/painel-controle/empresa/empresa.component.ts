import { ElementRef } from '@angular/core';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, of } from 'rxjs';
import { Empresa, Servicos } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  searchEmpresa!: string;
  @ViewChild('searhEmpresa', {static: false} ) searchInfoEmpresa!: ElementRef<HTMLInputElement>;

  itensServico: any = [{
    cnae: null,
    itemLc: null,
    ativMuni: null
  }];

  empresas$: Observable<Empresa[]>;
  userId: string;
  idUnidade: string;
  showData: boolean = false;
  var: any;

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.listEmpresa();
    this.var = this.empresaService.list().subscribe(
      (e) => {e ? this.showData = true : this.showData = false });
    this.userId = localStorage.getItem('login');
  }

  listEmpresa() {
    this.empresas$ = this.empresaService.list();
  }

  searchAllEmpresa() {
    let keyup$ = fromEvent(this.searchInfoEmpresa.nativeElement, 'keyup');
    this.empresas$ = keyup$.pipe(
     debounceTime(700),
     switchMap(() => this.filterEmpresa(this.searchEmpresa))
    )
  }

  filterEmpresa(searchEmpresa: string): Observable<Empresa[]> {
    if(searchEmpresa.length === 0) {
      return this.empresas$ = this.empresaService.list();
    }
    return this.empresaService.searchEmpresa(searchEmpresa);
  }


  showformEmpresa() {
    this.router.navigate(['/form-empresa']);
  }

  onEdit(id) {
    this.router.navigate([`/editar-empresa/${id}`]);
  }

  onDelete(id) {
    Swal.fire({
      title: 'Tem Certeza?', text: "Deseja excluir a empresa?", icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#3085d6', cancelButtonColor: '#eb5e2e', cancelButtonText: 'Cancelar', confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDelete(id, this.userId);
      }
    });
  }

  isDelete(id, userId) {
    this.empresaService.delete(id, userId).subscribe( success => {
      this.empresaService.viewMessage(
        '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>A empresa foi excluida.',
        'toast-error', 'danger'
      );
      this.listEmpresa();
    },
    error => {
      this.empresaService.viewMessage(
        '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Ocorreu um erro ao excluir.',
        'toast-error', 'danger'
      );
    },
    () => console.log('tudo completo')
    );
  }

}
