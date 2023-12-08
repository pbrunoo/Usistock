import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Estoque } from '../models/estoque';
import { Orcamento, Produto } from '../models/orcamento';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  list(unidadeId: string): Observable<Orcamento[]> {
    let apiRoute = `${environment.API}v1/orcamento/all/${unidadeId}`;
    return this.http.get<Orcamento[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  listClient(unidadeId: string): Observable<Cliente[]> {
    let apiRoute = `${environment.API}v1/cliente/all/${unidadeId}`;
    return this.http.get<Cliente[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  listProduto(unidadeId: string): Observable<Estoque[]> {
    let apiRoute = `${environment.API}v1/estoque/all/${unidadeId}`;
    return this.http.get<Estoque[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Orcamento> {
    let apiRoute = `${environment.API}v1/orcamento/unique/${id}`;
    return this.http.get<Orcamento>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadProduto(orcamentoId): Observable<Produto[]> {
    let apiRoute  = `${environment.API}v1/produto/orcamento/${orcamentoId}`;
    return this.http.get<Produto[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  searchAllOrcamento(search, unidadeId): Observable<Orcamento[]> {
    let apiRoute = `${environment.API}v1/orcamento/sch/${search}/${unidadeId}`;
    return this.http.get<Orcamento[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  create(orcamento): Observable<Orcamento> {
    let apiRoute = `${environment.API}v1/orcamento`;
    return this.http.post<Orcamento>(apiRoute, orcamento).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  createProduto(empresaId: string, produto: Produto): Observable<Produto> {
    let apiRoute = `${environment.API}v1/produto/orcamento/${empresaId}`;
    return this.http.post<Produto>(apiRoute, produto).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  update(orcamentoId: string, orcamento): Observable<Orcamento> {
    let apiRoute = `${environment.API}v1/orcamento/${orcamentoId}`;
    return this.http.put<Orcamento>(apiRoute, orcamento).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/orcamento/${id}/${userId}`;
    return this.http.delete<any>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  deleteProduto(orcamentoId: string, produtoId): Observable<any> {
    let apiRoute = `${environment.API}v1/produto/orcamento/${orcamentoId}/${produtoId}`;
    return this.http.delete<any>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  viewError(e: any): Observable<any> {
    this.viewMessage('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Não foi possível realizar a operação. Tente novamente mais tarde.', 'toast-error','danger');
    return EMPTY;
  }

  viewMessage(message: string, type: string, estilo: string): void {
    this.toastr.show(message,'',{
      closeButton: true,
      disableTimeOut: false,
      enableHtml: true,
      toastClass: "alert alert-"+estilo+" alert-with-icon",
      positionClass: 'toast-top-center'
    },
    type);
  }
}
