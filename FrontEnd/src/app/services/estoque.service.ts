import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estoque, HistoricoEstoque } from '../models/estoque';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private readonly API = `${environment.API}v1/estoque/all/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  list(unidadeId: string): Observable<Estoque[]> {
    let apiRoute = `${environment.API}v1/estoque/all/${unidadeId}`;
    return this.http.get<Estoque[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Estoque> {
    let apiRoute = `${environment.API}v1/estoque/unique/${id}`;
    return this.http.get<Estoque>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  searchStock(search, unidadeId): Observable<Estoque[]> {
    let apiRoute = `${environment.API}v1/estoque/sch/${search}/${unidadeId}`;
    return this.http.get<Estoque[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadHistoricoId(estoqueId): Observable<HistoricoEstoque[]> {
    let apiRoute  = `${environment.API}v1/historico/estoque/${estoqueId}`;
    return this.http.get<HistoricoEstoque[]>(apiRoute);
  }

  create(estoque): Observable<Estoque> {
    let apiRoute = `${environment.API}v1/estoque`;
    return this.http.post<Estoque>(apiRoute, estoque);
  }

  createHistorico(empresaId: string, historico: HistoricoEstoque): Observable<HistoricoEstoque> {
    let apiRoute = `${environment.API}v1/historico/estoque/${empresaId}`;
    return this.http.post<HistoricoEstoque>(apiRoute, historico);
  }

  update(estoque): Observable<Estoque> {
    let apiRoute = `${environment.API}v1/estoque/${estoque.id}`;
    return this.http.put<Estoque>(apiRoute, estoque);
  }

  updateHistorico(estoqueId: string, historicoId: string, historico: HistoricoEstoque): Observable<HistoricoEstoque> {
    let apiRoute = `${environment.API}v1/historico/estoque/${estoqueId}/${historicoId}`;
    return this.http.put<HistoricoEstoque>(apiRoute, historico);
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/estoque/${id}/${userId}`;
    return this.http.delete<any>(apiRoute);
  }

  deleteHistorico(estoqueId: string, historicoId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/historico/estoque/${estoqueId}/${historicoId}`;
    return this.http.delete<any>(apiRoute);
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
